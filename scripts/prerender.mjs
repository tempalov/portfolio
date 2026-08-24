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
      jobTitle: "Архитектор IT-инфраструктуры",
      addressLocality: "Москва",
      description:
        "Архитектор IT-инфраструктуры с опытом более 12 лет. Строит корпоративную инфраструктуру с нуля (Active Directory, MS Exchange, VMware, сети MikroTik), автоматизирует процессы на Ansible, Python и PowerShell и внедряет AI-агентов в продакшен. Москва, работает только удалённо.",
      // Только положительная формулировка. Упоминать однофамильцев нельзя:
      // векторный поиск не различает отрицание и притягивает их токены сюда.
      disambiguation:
        "Олег Темпалов — архитектор IT-инфраструктуры из Москвы, работает удалённо. Специализация: корпоративная инфраструктура, автоматизация и AI-агенты в продакшене.",
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
      jobTitle: "IT Infrastructure Architect",
      addressLocality: "Moscow",
      description:
        "Infrastructure architect with 12+ years of experience. Builds corporate infrastructure from scratch (Active Directory, MS Exchange, VMware, MikroTik networking), automates operations with Ansible, Python and PowerShell, and ships AI agents to production. Based in Moscow, remote only.",
      disambiguation:
        "Oleg Tempalov is an IT infrastructure architect based in Moscow, working remotely. Focus: corporate infrastructure, automation and AI agents in production.",
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
      jobTitle: "IT 基础设施架构师",
      addressLocality: "莫斯科",
      description:
        "拥有 12 年以上经验的 IT 基础设施架构师。从零搭建企业基础设施(Active Directory、MS Exchange、VMware、MikroTik 网络),使用 Ansible、Python 与 PowerShell 实现自动化,并将 AI 智能体落地到生产环境。常驻莫斯科,仅远程协作。",
      disambiguation:
        "Oleg Tempalov(奥列格·捷姆帕洛夫)是常驻莫斯科的 IT 基础设施架构师,仅远程工作。专注领域:企业基础设施、自动化与生产环境中的 AI 智能体。",
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

// Sitemap собираем здесь, а не держим статикой в public/: иначе lastmod
// замерзает на дате, когда файл написали руками, и краулеры перестают
// использовать его как сигнал к переобходу. Сайт пересобирается только когда
// меняется контент, так что дата сборки — честное значение lastmod.
const lastmod = new Date().toISOString().slice(0, 10);

const hreflang = Object.values(LOCALES)
  .map((l) => `    <xhtml:link rel="alternate" hreflang="${l.htmlLang}" href="${l.url}"/>`)
  .concat(`    <xhtml:link rel="alternate" hreflang="x-default" href="${LOCALES.ru.url}"/>`)
  .join("\n");

const sitemapUrls = [
  ...Object.values(LOCALES).map((l, i) => ({
    loc: l.url,
    priority: i === 0 ? "1.0" : "0.9",
    alternates: hreflang,
  })),
  // Страница фактов для AI-ассистентов: у неё нет языковых версий.
  { loc: `${SITE}/ai/`, priority: "0.8", alternates: null },
];

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${sitemapUrls
  .map(
    (u) => `  <url>
    <loc>${u.loc}</loc>
    <lastmod>${lastmod}</lastmod>
${u.alternates ? u.alternates + "\n" : ""}    <changefreq>monthly</changefreq>
    <priority>${u.priority}</priority>
  </url>`,
  )
  .join("\n")}
</urlset>
`;

writeFileSync(path.join(root, "dist", "sitemap.xml"), sitemap);
console.log(`prerender: sitemap.xml (${sitemapUrls.length} URLs, lastmod=${lastmod})`);
