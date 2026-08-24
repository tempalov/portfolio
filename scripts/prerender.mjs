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

function buildMeta(locale, page) {
  const cfg = LOCALES[locale];
  const alternates = Object.values(LOCALES)
    .filter((l) => l !== cfg)
    .map((l) => l.ogLocale);

  // @graph: страница → Person → WebSite. Даёт поисковикам и AI-ассистентам
  // связную «карточку сущности», а не разрозненные поля. Головной узел разный
  // у главной (ProfilePage) и у кейса (Article + BreadcrumbList), но Person и
  // WebSite общие: так все страницы сайта сходятся на одну и ту же сущность.
  const personId = `${SITE}/#person`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      ...page.headNodes(personId, cfg),
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
        // Только языки, на которых он реально говорит. Китайская локаль сайта —
        // это позиционирование под рынок, а не владение языком; заявлять здесь
        // китайский нельзя: ассистенты пересказывают эти поля как факт.
        knowsLanguage: [
          { "@type": "Language", name: "Russian", alternateName: "ru" },
          { "@type": "Language", name: "English", alternateName: "en" },
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
    `<title>${esc(page.title)}</title>`,
    `<meta name="description" content="${esc(page.description)}" />`,
    `<link rel="canonical" href="${page.url}" />`,
    `<link rel="alternate" hreflang="ru" href="${page.alt.ru}" />`,
    `<link rel="alternate" hreflang="en" href="${page.alt.en}" />`,
    `<link rel="alternate" hreflang="zh-CN" href="${page.alt.zh}" />`,
    `<link rel="alternate" hreflang="x-default" href="${page.alt.ru}" />`,
    `<meta property="og:type" content="${page.ogType}" />`,
    `<meta property="og:url" content="${page.url}" />`,
    `<meta property="og:title" content="${esc(page.title)}" />`,
    `<meta property="og:description" content="${esc(page.description)}" />`,
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

/** Записать одну страницу: подставить lang, мету и отрендеренное приложение. */
function emit(locale, route, page, outFile) {
  const cfg = LOCALES[locale];
  const appHtml = render(locale, route);
  const html = template
    .replace(/<html lang="[^"]*"/, `<html lang="${cfg.htmlLang}"`)
    .replace(
      /<!--meta:start-->[\s\S]*?<!--meta:end-->/,
      `<!--meta:start-->\n    ${buildMeta(locale, page)}\n    <!--meta:end-->`,
    )
    .replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`);

  const outPath = path.join(root, "dist", outFile);
  mkdirSync(path.dirname(outPath), { recursive: true });
  writeFileSync(outPath, html);
  return html.length;
}

const homeAlt = { ru: LOCALES.ru.url, en: LOCALES.en.url, zh: LOCALES.zh.url };

// --- Главные страницы ---
for (const locale of Object.keys(LOCALES)) {
  const cfg = LOCALES[locale];
  const meta = profileByLocale[locale].meta;
  const size = emit(
    locale,
    { kind: "home" },
    {
      url: cfg.url,
      title: meta.title,
      description: meta.description,
      alt: homeAlt,
      ogType: "website",
      headNodes: (personId) => [
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
      ],
    },
    cfg.outFile,
  );
  console.log(`prerender: ${cfg.outFile} (${(size / 1024).toFixed(0)} KB, lang=${cfg.htmlLang})`);
}

// --- Страницы кейсов ---
// Каждый кейс получает свой адрес во всех трёх локалях. Одиннадцать тем на
// одном URL конкурировали за одну страницу; поиск и retrieval у LLM работают
// с документом целиком, поэтому страница про одну тему бьёт страницу, где
// эта тема — один абзац из одиннадцати.
const caseUrl = (locale, slug) =>
  `${SITE}${locale === "ru" ? "" : `/${locale}`}/cases/${slug}/`;

// Слаги общие для всех локалей — берём из русского бандла как из опорного.
const slugs = profileByLocale.ru.caseStudies.map((c) => c.slug);
const caseSitemapEntries = [];

for (const locale of Object.keys(LOCALES)) {
  const cfg = LOCALES[locale];
  for (const slug of slugs) {
    const c = profileByLocale[locale].caseStudies.find((x) => x.slug === slug);
    if (!c) throw new Error(`prerender: кейс ${slug} отсутствует в локали ${locale}`);

    const url = caseUrl(locale, slug);
    const alt = { ru: caseUrl("ru", slug), en: caseUrl("en", slug), zh: caseUrl("zh", slug) };

    emit(
      locale,
      { kind: "case", slug },
      {
        url,
        title: `${c.title} — ${cfg.person.name}`,
        description: c.impact,
        alt,
        ogType: "article",
        headNodes: (personId, cfgLocal) => [
          {
            "@type": "Article",
            "@id": `${url}#article`,
            url,
            headline: c.title,
            description: c.impact,
            articleBody: c.summary,
            inLanguage: cfgLocal.htmlLang,
            keywords: c.stack.join(", "),
            about: c.stack.map((name) => ({ "@type": "Thing", name })),
            author: { "@id": personId },
            publisher: { "@id": personId },
            mainEntityOfPage: url,
            isPartOf: { "@id": `${SITE}/#website` },
          },
          {
            "@type": "BreadcrumbList",
            "@id": `${url}#breadcrumbs`,
            itemListElement: [
              { "@type": "ListItem", position: 1, name: cfgLocal.person.name, item: cfgLocal.url },
              { "@type": "ListItem", position: 2, name: c.title, item: url },
            ],
          },
        ],
      },
      `${locale === "ru" ? "" : `${locale}/`}cases/${slug}/index.html`,
    );

    if (locale === "ru") {
      caseSitemapEntries.push({ slug, alt });
    }
  }
}
console.log(
  `prerender: ${slugs.length} кейсов × ${Object.keys(LOCALES).length} локали = ` +
    `${slugs.length * Object.keys(LOCALES).length} страниц`,
);

// Sitemap собираем здесь, а не держим статикой в public/: иначе lastmod
// замерзает на дате, когда файл написали руками, и краулеры перестают
// использовать его как сигнал к переобходу. Сайт пересобирается только когда
// меняется контент, так что дата сборки — честное значение lastmod.
const lastmod = new Date().toISOString().slice(0, 10);

const hreflang = Object.values(LOCALES)
  .map((l) => `    <xhtml:link rel="alternate" hreflang="${l.htmlLang}" href="${l.url}"/>`)
  .concat(`    <xhtml:link rel="alternate" hreflang="x-default" href="${LOCALES.ru.url}"/>`)
  .join("\n");

/** hreflang-блок для набора адресов «одна страница на трёх языках». */
const altBlock = (alt) =>
  Object.entries(LOCALES)
    .map(([loc, l]) => `    <xhtml:link rel="alternate" hreflang="${l.htmlLang}" href="${alt[loc]}"/>`)
    .concat(`    <xhtml:link rel="alternate" hreflang="x-default" href="${alt.ru}"/>`)
    .join("\n");

const sitemapUrls = [
  ...Object.values(LOCALES).map((l, i) => ({
    loc: l.url,
    priority: i === 0 ? "1.0" : "0.9",
    alternates: hreflang,
  })),
  // Страница фактов для AI-ассистентов: у неё нет языковых версий.
  { loc: `${SITE}/ai/`, priority: "0.8", alternates: null },
  // Кейсы: по три адреса на кейс, каждый со ссылками на свои языковые версии.
  ...caseSitemapEntries.flatMap(({ alt }) =>
    Object.keys(LOCALES).map((loc) => ({
      loc: alt[loc],
      priority: "0.7",
      alternates: altBlock(alt),
    })),
  ),
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
