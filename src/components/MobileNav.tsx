import type { Locale } from "../data/profile";
import { SECTIONS, useActiveSection, type SectionId } from "../hooks/useActiveSection";

type Props = { locale: Locale };

export function MobileNav({ locale }: Props) {
  const active = useActiveSection();

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

  return (
    <nav className="mobile-nav" aria-label="Sections">
      {SECTIONS.map((id) => (
        <a
          key={id}
          href={`#${id}`}
          className={`mobile-nav-link${active === id ? " is-active" : ""}`}
        >
          {navLabels[id]}
        </a>
      ))}
    </nav>
  );
}
