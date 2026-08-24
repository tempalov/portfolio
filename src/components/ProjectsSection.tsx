import type { Locale, ProfileBundle } from "../data/profile";
import { CaseGroup } from "./CaseGroup";

type Props = { locale: Locale; content: ProfileBundle };

export function ProjectsSection({ locale, content }: Props) {
  const infra = content.caseStudies.filter((c) => c.group === "infra");
  const ai = content.caseStudies.filter((c) => c.group === "ai");
  const eyebrow = locale === "ru" ? "Кейсы" : locale === "zh" ? "案例" : "Work";
  const moreLabel =
    locale === "ru" ? "Разобрать подробно" : locale === "zh" ? "查看详情" : "Read the full case";

  return (
    <section id="projects" className="block">
      <p className="block-eyebrow-mobile">{eyebrow}</p>
      <CaseGroup
        locale={locale}
        eyebrow={content.caseGroups.infra.eyebrow}
        cases={infra}
        moreLabel={moreLabel}
      />
      <CaseGroup
        locale={locale}
        eyebrow={content.caseGroups.ai.eyebrow}
        cases={ai}
        moreLabel={moreLabel}
      />
    </section>
  );
}
