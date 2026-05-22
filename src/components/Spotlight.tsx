import { useEffect, useRef } from "react";

export function Spotlight() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(pointer: coarse)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const el = ref.current;
    if (!el) return;

    let targetX = window.innerWidth / 2;
    let targetY = window.innerHeight / 2;
    let currentX = targetX;
    let currentY = targetY;
    let rafId = 0;
    let started = false;

    const handlePointer = (e: PointerEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
      if (!started) {
        started = true;
        currentX = targetX;
        currentY = targetY;
        el.classList.add("is-active");
      }
    };

    const tick = () => {
      currentX += (targetX - currentX) * 0.18;
      currentY += (targetY - currentY) * 0.18;
      el.style.setProperty("--cursor-x", `${currentX}px`);
      el.style.setProperty("--cursor-y", `${currentY}px`);
      rafId = requestAnimationFrame(tick);
    };

    window.addEventListener("pointermove", handlePointer, { passive: true });
    rafId = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("pointermove", handlePointer);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return <div ref={ref} className="spotlight" aria-hidden="true" />;
}
