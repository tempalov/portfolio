import {
  FileLock,
  HelpCircle,
  Lock,
  Shield,
  type LucideIcon,
} from "lucide-react";
import type { TimelineItem } from "../data/profile";

type Props = { item: TimelineItem };

const ICON_MAP: Record<string, LucideIcon> = {
  Lock,
  FileLock,
  Shield,
  HelpCircle,
};

export function TimelineEntry({ item }: Props) {
  const Icon = item.logoIcon ? ICON_MAP[item.logoIcon] : undefined;

  return (
    <div className="timeline-entry">
      <div className="timeline-period">{item.period}</div>
      <div>
        <div className="timeline-head">
          {item.logo ? (
            <img
              className="timeline-logo"
              src={item.logo}
              alt=""
              loading="lazy"
              referrerPolicy="no-referrer"
            />
          ) : Icon ? (
            <span className="timeline-icon" aria-hidden="true">
              <Icon size={18} strokeWidth={1.75} />
            </span>
          ) : null}
          <div>
            <h3 className="timeline-role">{item.role}</h3>
            <p className="timeline-company">{item.company}</p>
            {item.location && (
              <p className="timeline-location">
                <span aria-hidden="true">📍</span> {item.location}
              </p>
            )}
          </div>
        </div>
        <ul className="timeline-highlights">
          {item.highlights.map((h, idx) => (
            <li key={idx}>{h}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
