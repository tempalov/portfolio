import { useEffect } from "react";
import type { Locale } from "../data/profile";

type MetaInput = {
  title: string;
  description: string;
};

function upsertMeta(
  selector: string,
  attr: "name" | "property",
  key: string,
  content: string,
) {
  let el = document.head.querySelector<HTMLMetaElement>(selector);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

export function useLocaleMeta(locale: Locale, meta: MetaInput) {
  useEffect(() => {
    document.title = meta.title;
    document.documentElement.lang = locale;

    upsertMeta(`meta[name="description"]`, "name", "description", meta.description);
    upsertMeta(`meta[property="og:title"]`, "property", "og:title", meta.title);
    upsertMeta(
      `meta[property="og:description"]`,
      "property",
      "og:description",
      meta.description,
    );
    upsertMeta(
      `meta[property="og:image"]`,
      "property",
      "og:image",
      `/og-image-${locale}.png`,
    );
    upsertMeta(`meta[property="og:url"]`, "property", "og:url", "https://tempalov.ru");
    upsertMeta(`meta[property="og:type"]`, "property", "og:type", "website");
    upsertMeta(
      `meta[property="og:locale"]`,
      "property",
      "og:locale",
      locale === "ru" ? "ru_RU" : "en_US",
    );
    upsertMeta(
      `meta[property="og:locale:alternate"]`,
      "property",
      "og:locale:alternate",
      locale === "ru" ? "en_US" : "ru_RU",
    );
    upsertMeta(
      `meta[name="twitter:card"]`,
      "name",
      "twitter:card",
      "summary_large_image",
    );
  }, [locale, meta.title, meta.description]);
}
