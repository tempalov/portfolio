import type { Locale, ProfileBundle } from "../data/profile";

type Props = { locale: Locale; content: ProfileBundle };

export function AboutSection({ locale, content }: Props) {
  const aboutTextRu =
    "12+ лет в корпоративной IT-инфраструктуре. Начинал с поддержки пользователей и системного администрирования в IT-аутсорсе, постепенно дорос до архитектора систем полного цикла — от серверной комнаты и сетей до AI-агентов в эксплуатации. Одинаково уверенно собираю инфраструктуру с нуля, автоматизирую сложные бизнес-процессы агентными системами и встраиваю нейросети в реальные рабочие потоки.";

  const aboutTextEn =
    "12+ years in corporate IT infrastructure. Started with user support and system administration in IT outsourcing, grew into a full-cycle systems architect — from the server room and networks to AI agents in production. Equally comfortable across the stack: building infrastructure from scratch, automating complex business processes with agentic systems, and embedding LLMs into real working pipelines.";

  const eyebrow = locale === "ru" ? "О себе" : "About";

  return (
    <section id="about" className="block">
      <p className="block-eyebrow-mobile">{eyebrow}</p>
      <p className="about-text">{locale === "ru" ? aboutTextRu : aboutTextEn}</p>

      {content.hero.pillars.map((pillar) => (
        <div className="tag-group" key={pillar.label}>
          <h3>{pillar.label}</h3>
          <div className="tag-list">
            {pillar.body.split(" · ").map((tag) => (
              <span className="chip" key={tag}>
                {tag.trim()}
              </span>
            ))}
          </div>
        </div>
      ))}
    </section>
  );
}
