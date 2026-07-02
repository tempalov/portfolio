import type { Locale, ProfileBundle } from "../data/profile";
import { TimelineEntry } from "./TimelineEntry";

type Props = { locale: Locale; content: ProfileBundle };

export function ExperienceSection({ locale, content }: Props) {
  const eyebrow = locale === "ru" ? "Опыт" : locale === "zh" ? "经历" : "Experience";

  return (
    <section id="experience" className="block">
      <p className="block-eyebrow-mobile">{eyebrow}</p>
      <div className="timeline">
        {content.timeline.map((item, idx) => (
          <TimelineEntry key={idx} item={item} />
        ))}
      </div>
    </section>
  );
}
