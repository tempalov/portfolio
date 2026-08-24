import { Github, Mail, Phone, Send } from "lucide-react";
import type { Locale, ProfileBundle } from "../data/profile";
import { SECTIONS, useActiveSection, type SectionId } from "../hooks/useActiveSection";
import { homePath, pathFor, type Route } from "../lib/routes";
import { ThemeToggle } from "./ThemeToggle";

type Props = {
  locale: Locale;
  content: ProfileBundle;
  route: Route;
};

export function Sidebar({ locale, content, route }: Props) {
  const active = useActiveSection();
  const onHome = route.kind === "home";

  // На странице кейса секций нет — якоря должны уводить на главную, иначе
  // ссылки ведут в никуда и краулер видит битую навигацию.
  const sectionHref = (id: SectionId) =>
    onHome ? `#${id}` : `${homePath(locale)}#${id}`;

  const navLabels: Record<SectionId, string> =
    locale === "ru"
      ? {
          about: "О себе",
          projects: "Кейсы",
          experience: "Опыт",
          education: "Курсы",
          stack: "Стек",
        }
      : locale === "zh"
        ? {
            about: "关于",
            projects: "案例",
            experience: "经历",
            education: "课程",
            stack: "技术栈",
          }
        : {
            about: "About",
            projects: "Work",
            experience: "Experience",
            education: "Education",
            stack: "Stack",
          };

  const labelLight =
    locale === "ru" ? "Светлая тема" : locale === "zh" ? "浅色主题" : "Light mode";
  const labelDark =
    locale === "ru" ? "Тёмная тема" : locale === "zh" ? "深色主题" : "Dark mode";

  const statusLine =
    locale === "ru"
      ? "Только удалённо · Москва · UTC+3"
      : locale === "zh"
        ? "仅远程协作 · 莫斯科 · UTC+3"
        : "Remote only · Moscow · UTC+3";

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <img
          className="sidebar-avatar"
          src="/avatar.jpg"
          alt={content.profile.name}
          loading="eager"
        />
        {/* h1 на странице должен быть один и по теме страницы. На главной тема —
            это человек, на странице кейса — сам кейс, поэтому имя там уходит
            в обычный абзац и превращается в ссылку на главную. */}
        {onHome ? (
          <h1>{content.profile.name}</h1>
        ) : (
          <p className="sidebar-name">
            <a href={homePath(locale)}>{content.profile.name}</a>
          </p>
        )}
        <p className="sidebar-role">{content.profile.role}</p>
        <p className="sidebar-tagline">{content.profile.summary}</p>

        <nav className="sidebar-nav" aria-label="Sections">
          {SECTIONS.map((id) => (
            <a
              key={id}
              href={sectionHref(id)}
              className={`sidebar-nav-link${onHome && active === id ? " is-active" : ""}`}
            >
              {navLabels[id]}
            </a>
          ))}
        </nav>
      </div>

      <div className="sidebar-foot">
        <div className="sidebar-status">
          <span className="accent">●</span> {statusLine}
        </div>

        <div className="sidebar-social">
          <a
            href={`mailto:${content.profile.email}`}
            aria-label={content.profile.email}
            title={content.profile.email}
          >
            <Mail size={20} strokeWidth={1.5} />
          </a>
          <a
            href={`tel:${content.profile.phone.replace(/[^\d+]/g, "")}`}
            aria-label={content.profile.phone}
            title={content.profile.phone}
          >
            <Phone size={20} strokeWidth={1.5} />
          </a>
          <a
            href={content.profile.telegram}
            target="_blank"
            rel="me noopener noreferrer"
            aria-label="Telegram"
            title="Telegram: @tempalov"
          >
            <Send size={20} strokeWidth={1.5} />
          </a>
          <a
            href="https://github.com/tempalov"
            target="_blank"
            rel="me noopener noreferrer"
            aria-label="GitHub"
            title="GitHub: @tempalov"
          >
            <Github size={20} strokeWidth={1.5} />
          </a>
        </div>

        <div className="sidebar-actions">
          <ThemeToggle labelLight={labelLight} labelDark={labelDark} />
          {/* Переключатель остаётся на текущей странице: с кейса ведёт на тот же
              кейс на другом языке, а не выбрасывает на главную. */}
          <nav className="locale-switcher" aria-label="Language">
            <a
              href={pathFor("ru", route)}
              className={locale === "ru" ? "locale-active" : ""}
              aria-current={locale === "ru" ? "page" : undefined}
              hrefLang="ru"
            >
              RU
            </a>
            <a
              href={pathFor("en", route)}
              className={locale === "en" ? "locale-active" : ""}
              aria-current={locale === "en" ? "page" : undefined}
              hrefLang="en"
            >
              EN
            </a>
            <a
              href={pathFor("zh", route)}
              className={locale === "zh" ? "locale-active" : ""}
              aria-current={locale === "zh" ? "page" : undefined}
              hrefLang="zh-CN"
              lang="zh-CN"
            >
              中
            </a>
          </nav>
        </div>
      </div>
    </aside>
  );
}
