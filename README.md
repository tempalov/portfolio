# tempalov.ru

Исходный код личного сайта-визитки. Прод: **[tempalov.ru](https://tempalov.ru/)**

## Стек

React 19 · TypeScript · Vite 7 · vanilla CSS (custom properties, без UI-фреймворка).
Шрифты Inter Variable и JetBrains Mono Variable — self-hosted, иконки [lucide-react](https://lucide.dev).

## Особенности

- **Три языка** — русский, английский, китайский.
- **Статический пререндер (SSG)** — на сборке приложение рендерится в готовый HTML
  для каждого языка на своём URL (`/`, `/en/`, `/zh/`), со своими мета-тегами,
  `hreflang` и JSON-LD. Поисковикам и AI-краулерам не нужно выполнять JavaScript;
  в браузере статика оживает через гидратацию.
- **Разметка сущности** — `ProfilePage → Person → WebSite` в JSON-LD плюс `llms.txt`.

## Разработка

```bash
npm install
npm run dev      # дев-сервер
npm run build    # сборка + пререндер трёх локалей в dist/
npm run preview  # просмотр собранного
```

Весь контент — в [`src/data/profile.ts`](src/data/profile.ts), по бандлу на локаль.
Пререндер — [`scripts/prerender.mjs`](scripts/prerender.mjs).
