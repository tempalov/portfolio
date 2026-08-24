// IndexNow: одним запросом сообщаем Bing, Yandex, Seznam, Naver и Yep,
// что страницы обновились. Bing раздаёт индекс дальше в Yahoo и DuckDuckGo,
// так что это самый короткий путь до всех не-Google поисковиков.
//
// Запускать после деплоя: `node scripts/indexnow.mjs`
//
// Ключ не секрет: протокол требует, чтобы он лежал открытым файлом в корне
// сайта — именно так поисковик проверяет, что домен принадлежит отправителю.

import { readdirSync, readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const HOST = "tempalov.ru";
const SITE = `https://${HOST}`;

// Имя key-файла в public/ и есть сам ключ — держим один источник правды,
// чтобы ключ и его расположение не разъехались при ротации.
const keyFile = readdirSync(path.join(root, "public")).find((f) =>
  /^[0-9a-f]{32}\.txt$/.test(f),
);
if (!keyFile) throw new Error("indexnow: key file not found in public/");
const key = keyFile.replace(/\.txt$/, "");

// URL берём из собранного sitemap, а не из отдельного списка: так пинг
// физически не может разойтись с тем, что отдаётся поисковикам.
const sitemapPath = path.join(root, "dist", "sitemap.xml");
let sitemap;
try {
  sitemap = readFileSync(sitemapPath, "utf-8");
} catch {
  throw new Error("indexnow: dist/sitemap.xml not found — run `npm run build` first");
}
const urlList = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
if (!urlList.length) throw new Error("indexnow: no <loc> entries in sitemap");

const body = JSON.stringify({
  host: HOST,
  key,
  keyLocation: `${SITE}/${keyFile}`,
  urlList,
});

// api.indexnow.org раздаёт всем участникам протокола; Яндекс дублируем
// напрямую — у него собственный приёмник и он отвечает быстрее.
const endpoints = ["https://api.indexnow.org/IndexNow", "https://yandex.com/indexnow"];

for (const endpoint of endpoints) {
  try {
    const res = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json; charset=utf-8" },
      body,
    });
    // 200 — принято, 202 — принято и поставлено в очередь. Оба нормальны.
    console.log(`indexnow: ${endpoint} → ${res.status}`);
  } catch (e) {
    console.error(`indexnow: ${endpoint} failed — ${e.message}`);
  }
}

console.log(`indexnow: submitted ${urlList.length} URLs with key ${key.slice(0, 8)}…`);
