import { useCallback, useEffect, useState } from "react";

export type Theme = "light" | "dark";

const STORAGE_KEY = "theme";

function readInitial(): Theme {
  if (typeof window === "undefined") return "light";
  const stored = window.localStorage.getItem(STORAGE_KEY);
  if (stored === "light" || stored === "dark") return stored;
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

export function useTheme() {
  // null until mounted: server and first client render must match (SSR hydration)
  const [theme, setTheme] = useState<Theme | null>(null);

  useEffect(() => {
    setTheme(readInitial());
  }, []);

  useEffect(() => {
    if (theme === null) return;
    document.documentElement.setAttribute("data-theme", theme);
    window.localStorage.setItem(STORAGE_KEY, theme);
  }, [theme]);

  const toggle = useCallback(() => {
    setTheme((prev) => ((prev ?? readInitial()) === "light" ? "dark" : "light"));
  }, []);

  return { theme: theme ?? "light", toggle };
}
