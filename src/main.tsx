import React from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import App from "./App";
import { parseLocation } from "./lib/routes";
import "./styles.css";

const rootEl = document.getElementById("root")!;
const { locale, route } = parseLocation(window.location.pathname);

const app = (
  <React.StrictMode>
    <App locale={locale} route={route} />
  </React.StrictMode>
);

if (rootEl.hasChildNodes()) {
  hydrateRoot(rootEl, app);
} else {
  createRoot(rootEl).render(app);
}
