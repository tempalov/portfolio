import { renderToString } from "react-dom/server";
import App from "./App";
import type { Locale } from "./data/profile";
import type { Route } from "./lib/routes";

export { profileByLocale } from "./data/profile";
export { casePath, homePath, LOCALES } from "./lib/routes";

export function render(locale: Locale, route: Route = { kind: "home" }): string {
  return renderToString(<App locale={locale} route={route} />);
}
