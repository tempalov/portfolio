import { renderToString } from "react-dom/server";
import App from "./App";
import type { Locale } from "./data/profile";

export { profileByLocale } from "./data/profile";

export function render(locale: Locale): string {
  return renderToString(<App locale={locale} />);
}
