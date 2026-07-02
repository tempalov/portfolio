import { Mail, Send } from "lucide-react";
import type { ProfileBundle } from "../data/profile";

type Props = { content: ProfileBundle };

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
          rel="noopener noreferrer"
        >
          <Send size={18} strokeWidth={1.75} />
          @tempalov
        </a>
      </div>
      <p className="contact-meta">
        {content.contactFormat} {content.contactLocation}
      </p>
    </section>
  );
}
