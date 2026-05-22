import { Mail, Phone } from "lucide-react";
import { useEffect, useState } from "react";
import type { Locale, ProfileBundle } from "../data/profile";
import { ThemeToggle } from "./ThemeToggle";

type Props = {
  locale: Locale;
  setLocale: (l: Locale) => void;
  content: ProfileBundle;
};

const SECTIONS = ["about", "projects", "experience", "education"] as const;
type SectionId = (typeof SECTIONS)[number];

function useActiveSection(): SectionId {
  const [active, setActive] = useState<SectionId>("about");

  useEffect(() => {
    if (typeof window === "undefined") return;

    const elements = SECTIONS.map((id) => document.getElementById(id)).filter(
      (el): el is HTMLElement => el !== null,
    );
    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) {
          setActive(visible[0].target.id as SectionId);
        }
      },
      {
        rootMargin: "-30% 0px -60% 0px",
        threshold: [0, 0.25, 0.5, 0.75, 1],
      },
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return active;
}

export function Sidebar({ locale, setLocale, content }: Props) {
  const active = useActiveSection();

  const navLabels: Record<SectionId, string> =
    locale === "ru"
      ? { about: "О себе", projects: "Кейсы", experience: "Опыт", education: "Курсы" }
      : { about: "About", projects: "Cases", experience: "Experience", education: "Courses" };

  const labelLight = locale === "ru" ? "Светлая тема" : "Switch to light";
  const labelDark = locale === "ru" ? "Тёмная тема" : "Switch to dark";

  const statusLine =
    locale === "ru"
      ? "Только удалённо · Москва · UTC+3"
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
        <h1>{content.profile.name}</h1>
        <p className="sidebar-role">{content.profile.role}</p>
        <p className="sidebar-tagline">{content.profile.summary}</p>

        <nav className="sidebar-nav" aria-label="Sections">
          {SECTIONS.map((id) => (
            <a
              key={id}
              href={`#${id}`}
              className={`sidebar-nav-link${active === id ? " is-active" : ""}`}
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
        </div>

        <div className="sidebar-actions">
          <ThemeToggle labelLight={labelLight} labelDark={labelDark} />
          <div className="locale-switcher" role="tablist" aria-label="Language">
            <button
              type="button"
              className={locale === "ru" ? "locale-active" : ""}
              onClick={() => setLocale("ru")}
              role="tab"
              aria-selected={locale === "ru"}
            >
              RU
            </button>
            <button
              type="button"
              className={locale === "en" ? "locale-active" : ""}
              onClick={() => setLocale("en")}
              role="tab"
              aria-selected={locale === "en"}
            >
              EN
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
}
