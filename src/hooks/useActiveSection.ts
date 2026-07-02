import { useEffect, useState } from "react";

export const SECTIONS = ["about", "projects", "experience", "education"] as const;
export type SectionId = (typeof SECTIONS)[number];

export function useActiveSection(): SectionId {
  const [active, setActive] = useState<SectionId>("about");

  useEffect(() => {
    if (typeof window === "undefined") return;

    const elements = SECTIONS.map((id) => document.getElementById(id)).filter(
      (el): el is HTMLElement => el !== null,
    );
    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) {
          setActive(visible[0].target.id as SectionId);
        }
      },
      {
        rootMargin: "-30% 0px -60% 0px",
        threshold: [0, 0.25, 0.5, 0.75, 1],
      },
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return active;
}
