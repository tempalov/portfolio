import React from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import App from "./App";
import type { Locale } from "./data/profile";
import "./styles.css";

function detectLocale(pathname: string): Locale {
  if (pathname === "/en" || pathname.startsWith("/en/")) return "en";
  if (pathname === "/zh" || pathname.startsWith("/zh/")) return "zh";
  return "ru";
}

const rootEl = document.getElementById("root")!;
const app = (
  <React.StrictMode>
    <App locale={detectLocale(window.location.pathname)} />
  </React.StrictMode>
);

if (rootEl.hasChildNodes()) {
  hydrateRoot(rootEl, app);
} else {
  createRoot(rootEl).render(app);
}
