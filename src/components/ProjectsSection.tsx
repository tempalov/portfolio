import {
  Activity,
  BarChart3,
  Bot,
  Building2,
  Headphones,
  KeyRound,
  Layers,
  Network,
  Shield,
  Users,
  Wrench,
  type LucideIcon,
} from "lucide-react";
import type { Locale, ProfileBundle } from "../data/profile";
import { CaseGroup } from "./CaseGroup";

type Props = { locale: Locale; content: ProfileBundle };

const INFRA_CASE_ICONS: LucideIcon[] = [
  Building2,
  Users,
  Wrench,
  KeyRound,
  Layers,
  Shield,
  Network,
  Activity,
];

const AI_CASE_ICONS: LucideIcon[] = [Bot, Headphones, BarChart3];

export function ProjectsSection({ locale, content }: Props) {
  const infra = content.caseStudies.filter((c) => c.group === "infra");
  const ai = content.caseStudies.filter((c) => c.group === "ai");
  const eyebrow = locale === "ru" ? "Кейсы" : locale === "zh" ? "案例" : "Work";

  return (
    <section id="projects" className="block">
      <p className="block-eyebrow-mobile">{eyebrow}</p>
      <CaseGroup
        eyebrow={content.caseGroups.infra.eyebrow}
        cases={infra}
        icons={INFRA_CASE_ICONS}
      />
      <CaseGroup
        eyebrow={content.caseGroups.ai.eyebrow}
        cases={ai}
        icons={AI_CASE_ICONS}
      />
    </section>
  );
}
