# tempalov.ru — портфолио

Личный сайт-визитка Олега Темпалова, Solutions Architect.

🔗 **Прод:** [tempalov.ru](https://tempalov.ru)

## Стек

- **Frontend:** React 19 · TypeScript · Vite 7
- **Стили:** vanilla CSS (custom properties, без UI-фреймворка)
- **Иконки:** [lucide-react](https://lucide.dev)
- **Шрифты:** Inter Variable + JetBrains Mono Variable (self-hosted)
- **Двуязычность:** RU / EN, переключение в шапке
- **Тема:** light / dark с переключателем (`prefers-color-scheme`-aware, persist в `localStorage`)

## Архитектура

Одностраничный SPA в стиле split-layout (`brittanychiang.com`-вдохновлённый): sticky-сайдбар слева, scrollable content справа. На mobile стэкается в одну колонку.

Секции:
- **О себе** — параграф + pillars (системы, сети/прокси/безопасность, облака/автоматизация/AI)
- **Кейсы** — 2 группы (Infrastructure & operations, Automation & AI agents) с hover-карточками
- **Опыт** — timeline с логотипами компаний и локациями
- **Курсы** — образование

Сайдбар содержит фото, имя, роль, активный nav со sliding-underline индикатором, контакты и переключатели темы/локали.

## Файлы

```
src/
├── components/         # React-компоненты (Sidebar, секции, TimelineEntry, и т.д.)
├── data/profile.ts     # весь контент: RU + EN бандлы
├── hooks/              # useTheme, useLocaleMeta
└── styles/             # tokens.css (цвета/шрифты/spacing), fonts.css

public/
├── avatar.jpg          # фото в сайдбар
├── favicon.svg         # `>_` иконка вкладки
├── fonts/              # self-hosted Inter + JetBrains Mono
└── logos/              # логотипы компаний для timeline

docs/superpowers/
├── specs/              # design specs (источник правды дизайна)
└── plans/              # implementation plans
```

## Разработка

```bash
npm install
npm run dev          # vite dev server
npm run build        # tsc -b + vite build → dist/
npm run preview      # preview production build
```

## Деплой

VK Cloud, Docker behind shared Angie reverse proxy. См. `DEPLOY.md`.

## Версии

- **v1.0** — первый публичный релиз: brittany-chiang-style split layout, навигация по 4 секциям, бенчмарк по 5 EN-портфолио + 2 RU-сайтам.
- См. `CHANGELOG.md` для деталей по контенту.

## Лицензия

Контент (текст, фото) © Oleg Tempalov. Код — для личного референса; форк/use-as-template OK с указанием авторства.
