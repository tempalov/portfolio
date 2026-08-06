import { useId, useState } from "react";
import { ArrowUpRight, type LucideIcon } from "lucide-react";
import type { CaseStudy } from "../data/profile";

type Props = {
  eyebrow: string;
  cases: CaseStudy[];
  icons: LucideIcon[];
};

/**
 * Карточка кейса. В покое — заголовок и строка результата; подробности и стек
 * раскрываются по наведению (мышь), по фокусу (клавиатура) и по нажатию (тач).
 * Скрытое содержимое остаётся в разметке: пререндер отдаёт его краулерам.
 */
function CaseCard({ c, Icon }: { c: CaseStudy; Icon?: LucideIcon }) {
  const [open, setOpen] = useState(false);
  const detailId = useId();

  return (
    <article className={`case${open ? " is-open" : ""}`}>
      {Icon ? (
        <Icon className="case-icon" size={20} strokeWidth={1.75} aria-hidden="true" />
      ) : (
        <span aria-hidden="true" />
      )}
      <div className="case-title-wrap">
        <h3 className="case-title">
          <button
            type="button"
            className="case-title-btn"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls={detailId}
          >
            {c.title}
            <ArrowUpRight size={14} strokeWidth={2} aria-hidden="true" />
          </button>
        </h3>
        {c.impact && <p className="case-impact">{c.impact}</p>}
        {/* Обёртка нужна для анимации высоты через grid 0fr → 1fr */}
        <div className="case-detail" id={detailId}>
          <div className="case-detail-inner">
            <p className="case-summary">{c.summary}</p>
            <div className="case-stack">
              {c.stack.map((s) => (
                <span className="chip" key={s}>
                  {s}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

export function CaseGroup({ eyebrow, cases, icons }: Props) {
  return (
    <div className="case-group">
      <div className="case-group-header">
        <span className="case-group-eyebrow">{eyebrow}</span>
        <div className="case-group-rule" aria-hidden="true" />
      </div>
      <div className="case-grid">
        {cases.map((c, idx) => (
          <CaseCard key={c.title} c={c} Icon={icons[idx]} />
        ))}
      </div>
    </div>
  );
}
