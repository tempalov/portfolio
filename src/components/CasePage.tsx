import { ArrowLeft, ArrowUpRight } from "lucide-react";
import type { Locale, ProfileBundle } from "../data/profile";
import { CASE_ICONS } from "../lib/caseIcons";
import { casePath, homePath } from "../lib/routes";

type Props = {
  locale: Locale;
  content: ProfileBundle;
  slug: string;
};

const L = {
  ru: {
    back: "К списку кейсов",
    what: "Что сделано",
    stack: "Стек",
    others: "Другие кейсы",
    cta: "Обсудить похожую задачу",
    home: "Главная",
    cases: "Кейсы",
  },
  en: {
    back: "Back to all work",
    what: "What was built",
    stack: "Stack",
    others: "Other work",
    cta: "Discuss a similar problem",
    home: "Home",
    cases: "Work",
  },
  zh: {
    back: "返回案例列表",
    what: "具体工作",
    stack: "技术栈",
    others: "其他案例",
    cta: "沟通类似需求",
    home: "首页",
    cases: "案例",
  },
} as const;

/**
 * Отдельная страница одного кейса. Существует ради органики: одиннадцать тем
 * на одном URL конкурировали друг с другом за одну страницу, а поиск и
 * retrieval у LLM работают с документом целиком — страница про одну тему
 * бьёт страницу, где эта тема один абзац из одиннадцати.
 */
export function CasePage({ locale, content, slug }: Props) {
  const t = L[locale];
  const c = content.caseStudies.find((x) => x.slug === slug);

  // Пререндер обходит только существующие слаги, но клиент может прийти
  // по любому адресу — тогда честно отправляем на главную, а не падаем.
  if (!c) {
    return (
      <section className="block">
        <p className="about-text">
          <a href={homePath(locale)}>{t.home}</a>
        </p>
      </section>
    );
  }

  const Icon = CASE_ICONS[c.slug];
  const others = content.caseStudies.filter((x) => x.slug !== slug);

  return (
    <article className="case-page">
      <nav className="case-page-crumbs" aria-label="Breadcrumb">
        <a href={homePath(locale)}>{t.home}</a>
        <span aria-hidden="true">/</span>
        <a href={`${homePath(locale)}#projects`}>{t.cases}</a>
      </nav>

      <header className="case-page-head">
        {Icon && (
          <Icon className="case-page-icon" size={28} strokeWidth={1.5} aria-hidden="true" />
        )}
        <h1 className="case-page-title">{c.title}</h1>
        <p className="case-page-impact">{c.impact}</p>
      </header>

      <section className="case-page-body">
        <h2 className="case-page-h2">{t.what}</h2>
        <p className="case-page-summary">{c.summary}</p>
      </section>

      <section className="case-page-body">
        <h2 className="case-page-h2">{t.stack}</h2>
        <div className="case-stack">
          {c.stack.map((s) => (
            <span className="chip" key={s}>
              {s}
            </span>
          ))}
        </div>
      </section>

      {/* Перелинковка: каждая страница кейса ссылается на все остальные —
          так краулер обходит весь раздел с любой точки входа. */}
      <section className="case-page-body">
        <h2 className="case-page-h2">{t.others}</h2>
        <ul className="case-page-others">
          {others.map((o) => (
            <li key={o.slug}>
              <a href={casePath(locale, o.slug)}>
                {o.title}
                <ArrowUpRight size={13} strokeWidth={2} aria-hidden="true" />
              </a>
            </li>
          ))}
        </ul>
      </section>

      <footer className="case-page-foot">
        <a className="case-page-back" href={`${homePath(locale)}#projects`}>
          <ArrowLeft size={15} strokeWidth={2} aria-hidden="true" />
          {t.back}
        </a>
        <a className="case-page-cta" href={`mailto:${content.profile.email}`}>
          {t.cta}
        </a>
      </footer>
    </article>
  );
}
