import { ArrowUpRight, type LucideIcon } from "lucide-react";
import type { CaseStudy } from "../data/profile";

type Props = {
  eyebrow: string;
  cases: CaseStudy[];
  icons: LucideIcon[];
};

export function CaseGroup({ eyebrow, cases, icons }: Props) {
  return (
    <div className="case-group">
      <div className="case-group-header">
        <span className="case-group-eyebrow">{eyebrow}</span>
        <div className="case-group-rule" aria-hidden="true" />
      </div>
      <div className="case-grid">
        {cases.map((c, idx) => {
          const Icon = icons[idx];
          return (
            <article className="case" key={c.title}>
              {Icon ? (
                <Icon className="case-icon" size={20} strokeWidth={1.75} aria-hidden="true" />
              ) : (
                <span aria-hidden="true" />
              )}
              <div className="case-title-wrap">
                <h3 className="case-title">
                  {c.title}
                  <ArrowUpRight size={14} strokeWidth={2} aria-hidden="true" />
                </h3>
                {c.impact && <p className="case-impact">{c.impact}</p>}
                <p className="case-summary">{c.summary}</p>
                <div className="case-stack">
                  {c.stack.map((s) => (
                    <span className="chip" key={s}>
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
