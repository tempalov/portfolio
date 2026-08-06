// Prerender: renders the React app to static HTML for each locale.
// Runs after `vite build` (client) + `vite build --ssr` (server bundle).
// Output: dist/index.html (ru), dist/en/index.html, dist/zh/index.html —
// full content + per-locale meta, so search engines index all languages
// without executing JavaScript.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const { render, profileByLocale } = await import(
  new URL("../dist-server/entry-server.js", import.meta.url).href
);

const SITE = "https://tempalov.ru";

const LOCALES = {
  ru: {
    htmlLang: "ru",
    url: `${SITE}/`,
    ogLocale: "ru_RU",
    outFile: "index.html",
    person: {
      name: "Олег Темпалов",
      jobTitle: "Senior SysOps · Solutions Architect",
      addressLocality: "Москва",
      description:
        "Архитектор IT-инфраструктуры с опытом более 12 лет. Строит корпоративную инфраструктуру с нуля (Active Directory, MS Exchange, VMware, сети MikroTik), автоматизирует процессы на Ansible, Python и PowerShell и внедряет AI-агентов в продакшен. Москва, работает только удалённо.",
      disambiguation:
        "IT-специалист из Москвы, род. 1990-е. Не имеет отношения к Василию Ивановичу Темпалову — прокурору Ивдельского района, который в 1959 году вёл дело о гибели группы Дятлова.",
      knowsAbout: [
        "IT-инфраструктура",
        "Active Directory",
        "MS Exchange",
        "VMware vSphere",
        "сетевое администрирование",
        "MikroTik",
        "автоматизация",
        "Ansible",
        "Docker",
        "AI-агенты",
        "интеграция LLM",
      ],
    },
  },
  en: {
    htmlLang: "en",
    url: `${SITE}/en/`,
    ogLocale: "en_US",
    outFile: "en/index.html",
    person: {
      name: "Oleg Tempalov",
      jobTitle: "Staff Infrastructure Engineer · Solutions Architect",
      addressLocality: "Moscow",
      description:
        "Infrastructure architect with 12+ years of experience. Builds corporate infrastructure from scratch (Active Directory, MS Exchange, VMware, MikroTik networking), automates operations with Ansible, Python and PowerShell, and ships AI agents to production. Based in Moscow, remote only.",
      disambiguation:
        "Contemporary IT professional based in Moscow. Not related to Vasiliy Ivanovich Tempalov, the Ivdel district prosecutor who opened the 1959 Dyatlov Pass case.",
      knowsAbout: [
        "IT infrastructure",
        "Active Directory",
        "MS Exchange",
        "VMware vSphere",
        "network administration",
        "MikroTik",
        "automation",
        "Ansible",
        "Docker",
        "AI agents",
        "LLM integration",
      ],
    },
  },
  zh: {
    htmlLang: "zh-CN",
    url: `${SITE}/zh/`,
    ogLocale: "zh_CN",
    outFile: "zh/index.html",
    person: {
      name: "Oleg Tempalov",
      jobTitle: "Senior SysOps · 中俄技术对接",
      addressLocality: "莫斯科",
      description:
        "拥有 12 年以上经验的 IT 基础设施架构师。从零搭建企业基础设施(Active Directory、MS Exchange、VMware、MikroTik 网络),使用 Ansible、Python 与 PowerShell 实现自动化,并将 AI 智能体落地到生产环境。常驻莫斯科,仅远程协作。",
      disambiguation:
        "常驻莫斯科的当代 IT 专业人士。与 1959 年迪亚特洛夫事件中负责立案的伊夫杰利地区检察官瓦西里·捷姆帕洛夫无关。",
      knowsAbout: [
        "IT 基础设施",
        "Active Directory",
        "MS Exchange",
        "VMware vSphere",
        "网络管理",
        "MikroTik",
        "自动化",
        "Ansible",
        "Docker",
        "AI 智能体",
        "LLM 集成",
      ],
    },
  },
};

const esc = (s) => s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");

function buildMeta(locale) {
  const cfg = LOCALES[locale];
  const meta = profileByLocale[locale].meta;
  const alternates = Object.values(LOCALES)
    .filter((l) => l !== cfg)
    .map((l) => l.ogLocale);

  // @graph: ProfilePage → Person → WebSite. Даёт поисковикам и AI-ассистентам
  // связную «карточку сущности», а не разрозненные поля.
  const personId = `${SITE}/#person`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ProfilePage",
        "@id": `${cfg.url}#profilepage`,
        url: cfg.url,
        name: meta.title,
        description: meta.description,
        inLanguage: cfg.htmlLang,
        mainEntity: { "@id": personId },
        isPartOf: { "@id": `${SITE}/#website` },
      },
      {
        "@type": "Person",
        "@id": personId,
        name: cfg.person.name,
        alternateName: ["Oleg Tempalov", "Олег Темпалов"],
        description: cfg.person.description,
        disambiguatingDescription: cfg.person.disambiguation,
        url: SITE + "/",
        mainEntityOfPage: { "@id": `${cfg.url}#profilepage` },
        image: `${SITE}/avatar.jpg`,
        email: "mailto:oleg@tempalov.ru",
        jobTitle: cfg.person.jobTitle,
        hasOccupation: {
          "@type": "Occupation",
          name: cfg.person.jobTitle,
          occupationalCategory: "15-1244.00 Network and Computer Systems Administrators",
          skills: cfg.person.knowsAbout.join(", "),
        },
        address: {
          "@type": "PostalAddress",
          addressLocality: cfg.person.addressLocality,
          addressCountry: "RU",
        },
        workLocation: {
          "@type": "Place",
          name: cfg.person.addressLocality,
        },
        sameAs: [
          "https://github.com/tempalov",
          "https://t.me/tempalov",
          "https://qna.habr.com/user/tempalov",
          "https://habr.com/ru/users/tempalov/",
        ],
        knowsAbout: cfg.person.knowsAbout,
        knowsLanguage: [
          { "@type": "Language", name: "Russian", alternateName: "ru" },
          { "@type": "Language", name: "English", alternateName: "en" },
          { "@type": "Language", name: "Chinese", alternateName: "zh" },
        ],
      },
      {
        "@type": "WebSite",
        "@id": `${SITE}/#website`,
        url: SITE + "/",
        name: cfg.person.name,
        inLanguage: cfg.htmlLang,
        publisher: { "@id": personId },
      },
    ],
  };

  return [
    `<title>${esc(meta.title)}</title>`,
    `<meta name="description" content="${esc(meta.description)}" />`,
    `<link rel="canonical" href="${cfg.url}" />`,
    `<link rel="alternate" hreflang="ru" href="${LOCALES.ru.url}" />`,
    `<link rel="alternate" hreflang="en" href="${LOCALES.en.url}" />`,
    `<link rel="alternate" hreflang="zh-CN" href="${LOCALES.zh.url}" />`,
    `<link rel="alternate" hreflang="x-default" href="${LOCALES.ru.url}" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:url" content="${cfg.url}" />`,
    `<meta property="og:title" content="${esc(meta.title)}" />`,
    `<meta property="og:description" content="${esc(meta.description)}" />`,
    `<meta property="og:image" content="${SITE}/avatar.jpg" />`,
    `<meta property="og:locale" content="${cfg.ogLocale}" />`,
    alternates
      .map((a) => `<meta property="og:locale:alternate" content="${a}" />`)
      .join("\n    "),
    `<meta name="twitter:card" content="summary" />`,
    `<script type="application/ld+json">${JSON.stringify(jsonLd)}</script>`,
  ].join("\n    ");
}

const template = readFileSync(path.join(root, "dist", "index.html"), "utf-8");

if (!template.includes("<!--meta:start-->") || !template.includes('<div id="root"></div>')) {
  throw new Error("prerender: template markers not found in dist/index.html");
}

for (const locale of Object.keys(LOCALES)) {
  const cfg = LOCALES[locale];
  const appHtml = render(locale);
  const html = template
    .replace(/<html lang="[^"]*"/, `<html lang="${cfg.htmlLang}"`)
    .replace(
      /<!--meta:start-->[\s\S]*?<!--meta:end-->/,
      `<!--meta:start-->\n    ${buildMeta(locale)}\n    <!--meta:end-->`,
    )
    .replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`);

  const outPath = path.join(root, "dist", cfg.outFile);
  mkdirSync(path.dirname(outPath), { recursive: true });
  writeFileSync(outPath, html);
  console.log(`prerender: ${cfg.outFile} (${(html.length / 1024).toFixed(0)} KB, lang=${cfg.htmlLang})`);
}
