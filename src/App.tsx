import { AboutSection } from "./components/AboutSection";
import { ContactSection } from "./components/ContactSection";
import { EducationSection } from "./components/EducationSection";
import { ExperienceSection } from "./components/ExperienceSection";
import { MobileNav } from "./components/MobileNav";
import { ProjectsSection } from "./components/ProjectsSection";
import { Sidebar } from "./components/Sidebar";
import { Spotlight } from "./components/Spotlight";
import { profileByLocale, type Locale } from "./data/profile";

type Props = { locale: Locale };

function App({ locale }: Props) {
  const content = profileByLocale[locale];

  const footerBuild =
    locale === "ru"
      ? "Собрано на React + Vite, упаковано в Docker, крутится на VK Cloud за angie."
      : locale === "zh"
        ? "基于 React + Vite 构建,Docker 打包,经 angie 反向代理运行在 VK Cloud。"
        : "Built with React + Vite, shipped in Docker, running on VK Cloud behind angie.";

  return (
    <>
      <Spotlight />
      <MobileNav locale={locale} />
      <div className="app-shell">
        <main className="layout">
          <Sidebar locale={locale} content={content} />
          <div className="content">
            <AboutSection locale={locale} content={content} />
            <ProjectsSection locale={locale} content={content} />
            <ExperienceSection locale={locale} content={content} />
            <EducationSection locale={locale} content={content} />
            <ContactSection content={content} />
          </div>
        </main>
        <footer className="footer">
          <p>{footerBuild}</p>
          <p>
            © 2026 Oleg Tempalov ·{" "}
            <a href="/ai/" className="footer-link">
              {locale === "ru"
                ? "Факты для ИИ-ассистентов"
                : locale === "zh"
                  ? "供 AI 助手参考的事实"
                  : "Facts for AI assistants"}
            </a>
          </p>
        </footer>
      </div>
    </>
  );
}

export default App;
