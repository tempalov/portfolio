import { useState } from "react";
import { AboutSection } from "./components/AboutSection";
import { EducationSection } from "./components/EducationSection";
import { ExperienceSection } from "./components/ExperienceSection";
import { ProjectsSection } from "./components/ProjectsSection";
import { Sidebar } from "./components/Sidebar";
import { Spotlight } from "./components/Spotlight";
import { useLocaleMeta } from "./hooks/useLocaleMeta";
import { profileByLocale, type Locale } from "./data/profile";

function App() {
  const [locale, setLocale] = useState<Locale>("ru");
  const content = profileByLocale[locale];

  useLocaleMeta(locale, content.meta);

  return (
    <>
      <Spotlight />
      <div className="app-shell">
        <main className="layout">
          <Sidebar locale={locale} setLocale={setLocale} content={content} />
          <div className="content">
            <AboutSection locale={locale} content={content} />
            <ProjectsSection locale={locale} content={content} />
            <ExperienceSection locale={locale} content={content} />
            <EducationSection locale={locale} content={content} />
          </div>
        </main>
        <footer className="footer">© 2026 Oleg Tempalov</footer>
      </div>
    </>
  );
}

export default App;
