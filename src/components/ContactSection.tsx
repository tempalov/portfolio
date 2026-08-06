import { Mail, Send } from "lucide-react";
import type { ProfileBundle } from "../data/profile";

type Props = { content: ProfileBundle };

// Видимые rel="me" ссылки на внешние профили: замыкают связку сущности,
// заявленную в JSON-LD sameAs. Без них ссылки шли только внутрь сайта.
const PROFILES: { label: string; href: string }[] = [
  { label: "GitHub", href: "https://github.com/tempalov" },
  { label: "Хабр Q&A", href: "https://qna.habr.com/user/tempalov" },
  { label: "Хабр", href: "https://habr.com/ru/users/tempalov/" },
];

export function ContactSection({ content }: Props) {
  return (
    <section id="contact" className="block contact-block">
      <p className="block-eyebrow-mobile">{content.sectionTitles.contactEyebrow}</p>
      <h2 className="block-title contact-title">{content.sectionTitles.contactTitle}</h2>
      <div className="contact-actions">
        <a className="contact-btn" href={`mailto:${content.profile.email}`}>
          <Mail size={18} strokeWidth={1.75} />
          {content.profile.email}
        </a>
        <a
          className="contact-btn"
          href={content.profile.telegram}
          target="_blank"
          rel="me noopener noreferrer"
        >
          <Send size={18} strokeWidth={1.75} />
          @tempalov
        </a>
      </div>
      <p className="contact-profiles">
        {PROFILES.map((p, i) => (
          <span key={p.href}>
            {i > 0 && <span aria-hidden="true"> · </span>}
            <a href={p.href} target="_blank" rel="me noopener noreferrer">
              {p.label}
            </a>
          </span>
        ))}
      </p>
      <p className="contact-meta">
        {content.contactFormat} {content.contactLocation}
      </p>
    </section>
  );
}
