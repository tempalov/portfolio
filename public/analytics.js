// Счётчики для всех страниц сайта: приложения (/, /en/, /zh/), плоской
// страницы фактов /ai/ и 404-й. Держим одним файлом, а не тремя копиями
// вендорских сниппетов — иначе страницы незаметно расходятся, как и вышло
// с /ai/ и 404.html, которые не считались вообще.
//
// 404 считать важно отдельно: это единственный способ увидеть битые внешние
// ссылки на сайт.

(function () {
  // Считаем только людей на боевом домене. Без этих проверок в Метрику
  // писали дев-сервер (localhost:5173), безголовые браузеры мониторингов,
  // которых она принимала за людей, и проверки самого сайта.
  if (location.hostname !== "tempalov.ru") return;
  if (navigator.webdriver || /HeadlessChrome/.test(navigator.userAgent)) return;

  // Свой браузер выключается один раз: открыть tempalov.ru/?notrack.
  // Флаг живёт в localStorage этого браузера, снимается через ?track.
  try {
    var query = new URLSearchParams(location.search);
    if (query.has("notrack")) localStorage.setItem("notrack", "1");
    if (query.has("track")) localStorage.removeItem("notrack");
    if (localStorage.getItem("notrack") === "1") return;
  } catch (e) {
    // Хранилище закрыто (приватный режим, запрет cookies) — считаем как обычно.
  }

  // Google Analytics 4. Только измерение, на индексацию не влияет —
  // нужен ради данных по EN/ZH-аудитории.
  var s = document.createElement("script");
  s.async = 1;
  s.src = "https://www.googletagmanager.com/gtag/js?id=G-KMST3XGHWV";
  document.head.appendChild(s);
  window.dataLayer = window.dataLayer || [];
  function gtag() {
    dataLayer.push(arguments);
  }
  gtag("js", new Date());
  gtag("config", "G-KMST3XGHWV");

  // Яндекс.Метрика. Кроме аналитики даёт Вебмастеру источник для «Обхода
  // страниц по счётчикам Метрики» — единственный счётчик, реально влияющий
  // на индексацию в Яндексе.
  (function (m, e, t, r, i, k, a) {
    m[i] =
      m[i] ||
      function () {
        (m[i].a = m[i].a || []).push(arguments);
      };
    m[i].l = 1 * new Date();
    for (var j = 0; j < document.scripts.length; j++) {
      if (document.scripts[j].src === r) return;
    }
    k = e.createElement(t);
    a = e.getElementsByTagName(t)[0];
    k.async = 1;
    k.src = r;
    a.parentNode.insertBefore(k, a);
  })(window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

  // Без ssr:true. Этот флаг отключает автоматическую отправку хита и ждёт
  // ручного ym(id,'hit',...) — для статики он просто глушит счётчик.
  ym(111365157, "init", {
    clickmap: true,
    trackLinks: true,
    accurateTrackBounce: true,
    webvisor: true,
  });
})();
