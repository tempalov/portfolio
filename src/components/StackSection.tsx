import type { Locale, ProfileBundle } from "../data/profile";

type Props = { locale: Locale; content: ProfileBundle };

/**
 * Самый глубокий слой страницы: полный технологический стек.
 * Здесь ничего не прячем — кто досюда долистал, тому нужны детали.
 */
export function StackSection({ locale, content }: Props) {
  const eyebrow = locale === "ru" ? "Стек" : locale === "zh" ? "技术栈" : "Stack";
  const note =
    locale === "ru"
      ? "Всё, с чем работал в проде. Не список из резюме, а то, что реально поднимал и поддерживал."
      : locale === "zh"
        ? "全部在生产环境中实际使用过的技术。不是简历里的清单，而是真正搭建并维护过的东西。"
        : "Everything I have run in production. Not a résumé list, but what I actually built and maintained.";

  return (
    <section id="stack" className="block">
      <p className="block-eyebrow-mobile">{eyebrow}</p>
      <p className="stack-note">{note}</p>

      {content.hero.pillars.map((pillar) => {
        const all = [
          ...pillar.body.split(" · "),
          ...(pillar.more ? pillar.more.split(" · ") : []),
        ];
        return (
          <div className="tag-group" key={pillar.label}>
            <h3>{pillar.label}</h3>
            <p className="tag-group-intro">{pillar.intro}</p>
            <div className="tag-list">
              {all.map((tag) => (
                <span className="chip" key={tag}>
                  {tag.trim()}
                </span>
              ))}
            </div>
          </div>
        );
      })}
    </section>
  );
}
