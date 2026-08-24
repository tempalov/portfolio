import type { Locale } from "../data/profile";

/**
 * Адреса страниц. Один источник правды: этим же модулем пользуются клиент
 * (main.tsx), серверный рендер и сборщик sitemap — расходиться им нельзя.
 *
 * Русская версия живёт в корне, остальные — под языковым префиксом:
 *   /            /en/            /zh/
 *   /cases/x/    /en/cases/x/    /zh/cases/x/
 */

export type Route = { kind: "home" } | { kind: "case"; slug: string };

export const LOCALES: Locale[] = ["ru", "en", "zh"];

const PREFIX: Record<Locale, string> = { ru: "", en: "/en", zh: "/zh" };

export function homePath(locale: Locale): string {
  return `${PREFIX[locale]}/`;
}

export function casePath(locale: Locale, slug: string): string {
  return `${PREFIX[locale]}/cases/${slug}/`;
}

/** Путь к тому же месту на другом языке — для переключателя и hreflang. */
export function pathFor(locale: Locale, route: Route): string {
  return route.kind === "case" ? casePath(locale, route.slug) : homePath(locale);
}

export function parseLocation(pathname: string): { locale: Locale; route: Route } {
  const parts = pathname.split("/").filter(Boolean);

  let locale: Locale = "ru";
  if (parts[0] === "en" || parts[0] === "zh") {
    locale = parts[0];
    parts.shift();
  }

  if (parts[0] === "cases" && parts[1]) {
    return { locale, route: { kind: "case", slug: parts[1] } };
  }
  return { locale, route: { kind: "home" } };
}
