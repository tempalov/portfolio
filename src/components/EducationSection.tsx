import type { Locale, ProfileBundle } from "../data/profile";
import { TimelineEntry } from "./TimelineEntry";

type Props = { locale: Locale; content: ProfileBundle };

export function EducationSection({ locale, content }: Props) {
  const eyebrow = locale === "ru" ? "Курсы" : locale === "zh" ? "课程" : "Education";

  return (
    <section id="education" className="block">
      <p className="block-eyebrow-mobile">{eyebrow}</p>
      <div className="timeline">
        {content.education.map((item, idx) => (
          <TimelineEntry key={idx} item={item} />
        ))}
      </div>
    </section>
  );
}
