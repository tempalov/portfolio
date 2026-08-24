"""Генератор OG-картинок 1200×630 для превью ссылок (Telegram, Slack, X, LinkedIn).

Почему отдельный ручной шаг, а не часть `npm run build`: образ сборки —
node:22-alpine, там нет ни Python, ни Pillow. Тащить в Docker графическую
библиотеку ради трёх статичных картинок дороже, чем сгенерировать их один раз
и закоммитить: имя и роль меняются раз в год.

Перегенерировать после правки profile.profile.name / .role / .summary:

    python scripts/og-image.py

Тексты берутся из собранного бандла (dist-server), чтобы картинка не могла
разойтись с тем, что написано на сайте. Перед запуском нужен `npm run build`.
"""

import json
import pathlib
import subprocess
import sys

from PIL import Image, ImageDraw, ImageFilter, ImageFont

ROOT = pathlib.Path(__file__).resolve().parent.parent
OUT = ROOT / "public" / "og"

W, H = 1200, 630

# Ночная палитра сайта (src/styles/tokens.css, тёмная тема).
BG = "#0a192f"
SURFACE = "#112240"
TEXT = "#e6f1ff"
TEXT_2 = "#ccd6f6"
MUTED = "#8892b0"
ACCENT = "#64ffda"

FONTS = pathlib.Path("C:/Windows/Fonts")
# Segoe UI закрывает латиницу и кириллицу, YaHei — иероглифы.
FACE = {
    "ru": (FONTS / "seguisb.ttf", FONTS / "segoeui.ttf"),
    "en": (FONTS / "seguisb.ttf", FONTS / "segoeui.ttf"),
    "zh": (FONTS / "msyhbd.ttc", FONTS / "msyh.ttc"),
}


def load(path, size):
    if not path.exists():
        sys.exit(f"нет шрифта: {path}")
    return ImageFont.truetype(str(path), size)


def _is_cjk(ch):
    o = ord(ch)
    return (
        0x3000 <= o <= 0x303F  # пунктуация CJK
        or 0x3400 <= o <= 0x4DBF
        or 0x4E00 <= o <= 0x9FFF  # иероглифы
        or 0xFF00 <= o <= 0xFFEF  # полноширинные формы
    )


def _tokens(text):
    """Единицы переноса: иероглиф ломается сам по себе, латиница — по словам.

    Делить только по пробелам нельзя: китайская фраза со вставленным «AI»
    выглядит как два слова, второе из которых длиннее строки и никуда не
    переносится — текст уезжает за край картинки.
    """
    out, buf = [], ""
    for ch in text:
        if _is_cjk(ch):
            if buf:
                out.append(buf)
                buf = ""
            out.append(ch)
        elif ch == " ":
            if buf:
                out.append(buf)
                buf = ""
            out.append(" ")
        else:
            buf += ch
    if buf:
        out.append(buf)
    return out


def wrap(draw, text, font, max_w):
    if not text:
        return []
    lines, cur = [], ""
    for tok in _tokens(text):
        if tok == " " and not cur:
            continue  # пробел не начинает строку
        probe = cur + tok
        if draw.textlength(probe, font=font) > max_w and cur:
            lines.append(cur.rstrip())
            cur = "" if tok == " " else tok
        else:
            cur = probe
    if cur.strip():
        lines.append(cur.rstrip())
    return lines


def circle_avatar(size):
    src = Image.open(ROOT / "public" / "avatar.jpg").convert("RGB").resize((size, size), Image.LANCZOS)
    mask = Image.new("L", (size * 4, size * 4), 0)
    ImageDraw.Draw(mask).ellipse((0, 0, size * 4, size * 4), fill=255)
    src.putalpha(mask.resize((size, size), Image.LANCZOS))
    return src


# Опорные технологии в подвале карточки. Латиница во всех локалях: названия
# продуктов не переводятся, а строка работает как доказательство предметности.
CHIPS = ["Active Directory", "Exchange", "VMware", "MikroTik", "Keycloak", "Ansible"]


def chip_row(img, d, items, x, y, font):
    """Ряд «плашек» — тот же приём, что .chip на сайте."""
    pad_x, pad_y, gap, radius = 16, 9, 10, 8
    overlay = Image.new("RGBA", img.size, (0, 0, 0, 0))
    od = ImageDraw.Draw(overlay)
    cx = x
    for it in items:
        w = d.textlength(it, font=font)
        box = (cx, y, cx + w + pad_x * 2, y + font.size + pad_y * 2)
        if box[2] > W - 70:
            break
        # accent-soft: тот же приём, что в CSS — акцент с низкой альфой.
        od.rounded_rectangle(box, radius=radius, fill=(100, 255, 218, 26))
        od.text((cx + pad_x, y + pad_y), it, font=font, fill=(100, 255, 218, 235))
        cx += w + pad_x * 2 + gap
    img.alpha_composite(overlay)


def build(locale, data):
    bold, regular = FACE[locale]
    img = Image.new("RGBA", (W, H), BG)

    # Мягкое свечение за аватаром — приём Spotlight с сайта. Рисуем на отдельном
    # слое и размываем: жёсткий край эллипса читается как артефакт, а не как свет.
    glow = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    ImageDraw.Draw(glow).ellipse((-260, 30, 660, 700), fill=(29, 45, 80, 255))
    img.alpha_composite(glow.filter(ImageFilter.GaussianBlur(110)))

    d = ImageDraw.Draw(img)
    d.rectangle((0, 0, W, 5), fill=ACCENT)

    av = 248
    ax, ay = 88, 148
    d = ImageDraw.Draw(img)
    avatar = circle_avatar(av)
    img.alpha_composite(Image.new("RGBA", (av, av), (0, 0, 0, 0)), (ax, ay))
    img.paste(avatar, (ax, ay), avatar)

    x = ax + av + 60
    max_w = W - x - 70

    f_name = load(bold, 64)
    f_role = load(regular, 31)
    f_sum = load(regular, 24)
    f_chip = load(regular, 19)
    f_foot = load(regular, 21)

    y = ay + 2
    d.text((x, y), data["name"], font=f_name, fill=TEXT)
    y += 88

    for line in wrap(d, data["role"], f_role, max_w)[:2]:
        d.text((x, y), line, font=f_role, fill=ACCENT)
        y += 42

    y += 10
    for line in wrap(d, data["summary"], f_sum, max_w)[:3]:
        d.text((x, y), line, font=f_sum, fill=TEXT_2)
        y += 35

    # Подвал: плашки со стеком и домен — на одной базовой линии по низу.
    chip_row(img, d, CHIPS, x, H - 196, f_chip)
    d = ImageDraw.Draw(img)
    d.line((x, H - 96, W - 70, H - 96), fill=(136, 146, 176, 60), width=1)
    d.text((x, H - 78), "tempalov.ru", font=f_foot, fill=MUTED)

    OUT.mkdir(parents=True, exist_ok=True)
    path = OUT / f"{locale}.png"
    img.convert("RGB").save(path, "PNG", optimize=True)
    return path, path.stat().st_size


def main():
    dump = subprocess.run(
        [
            "node",
            "--input-type=module",
            "-e",
            "const m=await import('./dist-server/entry-server.js');"
            "const o={};for(const l of ['ru','en','zh']){const p=m.profileByLocale[l].profile;"
            "o[l]={name:p.name,role:p.role,summary:p.summary};}console.log(JSON.stringify(o));",
        ],
        cwd=ROOT,
        capture_output=True,
        text=True,
    )
    if dump.returncode:
        sys.exit(f"не удалось прочитать бандл — сначала `npm run build`\n{dump.stderr}")

    data = json.loads(dump.stdout.strip().splitlines()[-1])
    for locale in ("ru", "en", "zh"):
        path, size = build(locale, data[locale])
        print(f"og: {path.relative_to(ROOT)} ({size / 1024:.0f} KB)")


if __name__ == "__main__":
    main()
