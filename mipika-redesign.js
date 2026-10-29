(() => {
  "use strict";

  // 二重実行を防止
  if (window.__MIPIKA_REDESIGN_V4__) return;
  window.__MIPIKA_REDESIGN_V4__ = true;

  const css = document.createElement("style");
  css.id = "mipika-layout-v4";

  css.textContent = `
    :root {
      --ml-brown: #604638;
      --ml-brown-light: #8b6b59;
      --ml-cream: #f7f2eb;
      --ml-pink: #e9b8ca;
      --ml-border: #e6d7c8;
      --ml-text: #574134;
    }

    *, *::before, *::after {
      box-sizing: border-box;
    }

    html {
      scroll-behavior: smooth;
      scroll-padding-top: 24px;
    }

    body {
      margin: 0;
      background: var(--ml-cream) !important;
      color: var(--ml-text) !important;
      line-height: 1.65;
      overflow-x: hidden;
      padding-bottom: 85px !important;
    }

    /* ヘッダー */
    body > header {
      background: var(--ml-brown) !important;
      color: white !important;
      padding: 19px 19px 17px !important;
      border-bottom: 3px solid var(--ml-pink) !important;
      border-radius: 0 !important;
    }

    body > header h1 {
      color: white !important;
      font-size: 25px !important;
      line-height: 1.3;
      margin: 0 0 5px !important;
      letter-spacing: .04em;
    }

    /* 重複するキャッチコピーを非表示 */
    body > header > div {
      display: none !important;
    }

    body > header small {
      display: block;
      font-size: 11px;
      line-height: 1.6;
      opacity: .9;
    }

    /* 従来の上部ナビ */
    body > nav:not(#ml-bottom-nav) {
      background: #fffaf6 !important;
      border-bottom: 1px solid var(--ml-border);
    }

    body > nav:not(#ml-bottom-nav) a {
      background: #eee6dc !important;
      color: var(--ml-brown) !important;
    }

    /* メイン */
    main {
      width: 100%;
      max-width: 1050px !important;
      margin: 0 auto;
      padding: 14px 16px 105px !important;
    }

    main > section {
      min-width: 0;
      margin: 0;
      padding: 23px 0 30px !important;
      border-bottom: 1px solid var(--ml-border);
      scroll-margin-top: 25px;
    }

    main h2 {
      color: var(--ml-brown);
      font-size: 22px;
      line-height: 1.4;
      margin: 12px 0 18px;
    }

    main h3 {
      color: var(--ml-brown);
      line-height: 1.5;
      margin: 22px 0 12px;
    }

    main h4 {
      line-height: 1.5;
    }

    main p,
    main li {
      overflow-wrap: anywhere;
    }

    /* HOME：重複した見出しを整理 */
    #ml-home-panel .ml-hero {
      display: none !important;
    }

    #home > h2:first-child {
      display: none !important;
    }

    #ml-home-panel {
      margin: 0 0 20px !important;
    }

    #ml-home-panel .ml-label {
      color: var(--ml-brown);
      font-size: 19px;
      font-weight: 800;
      line-height: 1.4;
      margin: 0 0 16px !important;
      padding: 0;
      border: 0;
    }

    /* HOMEメニュー */
    #ml-home-panel .ml-grid {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 12px !important;
    }

    #ml-home-panel .ml-card {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: flex-start;
      gap: 8px;
      min-width: 0;
      min-height: 130px;
      padding: 17px 14px !important;
      background: #fffdfa !important;
      border: 1px solid var(--ml-border) !important;
      border-radius: 17px !important;
      box-shadow: 0 3px 10px #6046380d;
      color: var(--ml-brown) !important;
      text-decoration: none !important;
    }

    #ml-home-panel .ml-card:hover {
      background: #fff6f8 !important;
      border-color: var(--ml-pink) !important;
    }

    #ml-home-panel .ml-icon {
      font-size: 26px;
      line-height: 1.2;
    }

    #ml-home-panel .ml-card strong {
      display: block;
      color: var(--ml-brown);
      font-size: 15px;
      line-height: 1.4;
    }

    #ml-home-panel .ml-card small {
      display: block;
      color: #887568;
      font-size: 12px;
      line-height: 1.5;
    }

    /* 写真 */
    main img.hero {
      display: block;
      width: 100%;
      max-width: 100%;
      height: auto;
      margin: 16px auto !important;
      border-radius: 18px !important;
    }

    /* 情報カード */
    main .panel {
      min-width: 0;
      background: #fffdfa !important;
      border: 1px solid var(--ml-border) !important;
      border-radius: 17px !important;
      padding: 17px !important;
      margin: 15px 0 !important;
      box-shadow: 0 2px 9px #6046380a;
    }

    /* 数字のカード */
    .stats {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 11px !important;
    }

    .stat {
      min-width: 0;
      background: #f3ece4 !important;
      border-radius: 14px !important;
      padding: 15px 13px !important;
    }

    .stat b {
      display: block;
      color: var(--ml-brown);
      font-size: clamp(21px, 5vw, 28px) !important;
      line-height: 1.3;
      font-variant-numeric: tabular-nums;
      overflow-wrap: anywhere;
    }

    .muted {
      color: #887568;
    }

    /* レース履歴 */
    .entry {
      min-width: 0;
      gap: 11px !important;
      padding: 15px !important;
      margin: 11px 0 !important;
      background: #fffdfa !important;
      border: 1px solid var(--ml-border) !important;
      border-radius: 14px !important;
    }

    .finish {
      background: #eee6dc !important;
      color: var(--ml-brown);
    }

    /* 表 */
    main table {
      max-width: 100%;
      font-size: 13px;
      border-collapse: collapse;
    }

    main th,
    main td {
      padding: 9px 8px;
    }

    /* 入力欄・ボタン */
    main input,
    main select,
    main textarea {
      max-width: 100%;
      border-radius: 10px;
    }

    main button {
      border-radius: 10px;
    }

    /* スマホ下部メニュー */
    #ml-bottom-nav {
      position: fixed !important;
      left: 0 !important;
      right: 0 !important;
      bottom: 0 !important;
      top: auto !important;
      z-index: 9999 !important;
      display: flex !important;
      justify-content: space-around;
      background: var(--ml-brown) !important;
      border-top: 2px solid var(--ml-pink);
      padding:
        3px 5px
        calc(4px + env(safe-area-inset-bottom))
        !important;
      box-shadow: 0 -3px 12px #0002;
    }

    #ml-bottom-nav a {
      display: flex !important;
      flex: 1;
      min-width: 0;
      min-height: 49px;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 2px !important;
      padding: 5px 2px !important;
      color: white !important;
      background: transparent !important;
      text-decoration: none !important;
      font-size: 11px;
      font-weight: 700;
      border-radius: 11px;
    }

    #ml-bottom-nav a span {
      font-size: 19px !important;
      line-height: 1.2;
    }

    #ml-bottom-nav a small {
      font-size: 10px !important;
      color: inherit !important;
    }

    #ml-bottom-nav a[aria-current="page"] {
      background: #866755 !important;
      color: #ffe0eb !important;
    }

    #ml-bottom-nav a:focus-visible,
    #ml-home-panel a:focus-visible {
      outline: 3px solid var(--ml-pink);
      outline-offset: 2px;
    }

    /* スマホ */
    @media (max-width: 700px) {
      body > nav:not(#ml-bottom-nav) {
        display: none !important;
      }

      main {
        padding: 12px 14px 100px !important;
      }

      main > section {
        padding: 19px 0 28px !important;
      }

      main h2 {
        font-size: 20px;
      }

      main .panel {
        padding: 15px !important;
      }

      #ml-home-panel .ml-grid {
        grid-template-columns: repeat(2, minmax(0, 1fr));
      }

      #ml-home-panel .ml-card {
        min-height: 124px;
      }

      .entry {
        flex-wrap: wrap;
      }

      main input,
      main select,
      main textarea {
        font-size: 16px;
      }

      main table {
        display: block;
        overflow-x: auto;
        -webkit-overflow-scrolling: touch;
      }
    }

    /* PC */
    @media (min-width: 701px) {
      main {
        padding: 25px 28px 110px !important;
      }

      #ml-home-panel .ml-grid {
        grid-template-columns: repeat(3, minmax(0, 1fr));
      }

      .stats {
        grid-template-columns: repeat(3, minmax(0, 1fr));
      }

      #ml-bottom-nav {
        left: 50% !important;
        right: auto !important;
        transform: translateX(-50%);
        width: min(700px, 100%);
        border-radius: 16px 16px 0 0;
      }
    }

    @media (prefers-reduced-motion: reduce) {
      html {
        scroll-behavior: auto;
      }
    }
  `;

  document.head.appendChild(css);

  // HOMEを取得
  const home = document.getElementById("home");
  if (!home) return;

  // 古い追加パネルを削除
  const oldPanel = document.getElementById("ml-home-panel");
  if (oldPanel) oldPanel.remove();

  // 追加メニュー
  const panel = document.createElement("div");
  panel.id = "ml-home-panel";

  panel.innerHTML = `
    <div class="ml-label">🤎 何を調べる？</div>

    <div class="ml-grid">
      <a class="ml-card" href="#data">
        <span class="ml-icon">📊</span>
        <strong>成績分析</strong>
        <small>コース別・期間別</small>
      </a>

      <a class="ml-card" href="#log">
        <span class="ml-icon">🚤</span>
        <strong>レース履歴</strong>
        <small>179走の記録を検索</small>
      </a>

      <a class="ml-card" href="#schedule">
        <span class="ml-icon">📅</span>
        <strong>出走予定</strong>
        <small>次の開催を確認</small>
      </a>

      <a class="ml-card" href="./odds.html">
        <span class="ml-icon">💰</span>
        <strong>オッズ分析</strong>
        <small>買い目・資金分配</small>
      </a>

      <a class="ml-card" href="#log">
        <span class="ml-icon">🔍</span>
        <strong>詳細検索</strong>
        <small>開催場・コース・着順</small>
      </a>

      <a class="ml-card" href="#gallery">
        <span class="ml-icon">📸</span>
        <strong>ギャラリー</strong>
        <small>写真・動画</small>
      </a>
    </div>
  `;

  home.prepend(panel);

  // 以前の固定メニューを削除
  const oldNav = document.getElementById("ml-bottom-nav");
  if (oldNav) oldNav.remove();

  // 新しい固定メニュー
  const nav = document.createElement("nav");
  nav.id = "ml-bottom-nav";
  nav.setAttribute("aria-label", "下部メニュー");

  const menus = [
    ["#home", "🏠", "HOME"],
    ["#data", "📊", "成績"],
    ["#log", "🚤", "履歴"],
    ["./odds.html", "💰", "オッズ"],
    ["#schedule", "📅", "予定"]
  ];

  menus.forEach(([href, icon, label]) => {
    const a = document.createElement("a");
    a.href = href;

    const span = document.createElement("span");
    span.textContent = icon;
    span.setAttribute("aria-hidden", "true");

    const small = document.createElement("small");
    small.textContent = label;

    a.append(span, small);
    nav.appendChild(a);
  });

  document.body.appendChild(nav);

  function updateNav() {
    const hash = location.hash || "#home";

    nav.querySelectorAll("a").forEach(a => {
      if (a.getAttribute("href") === hash) {
        a.setAttribute("aria-current", "page");
      } else {
        a.removeAttribute("aria-current");
      }
    });
  }

  window.addEventListener("hashchange", updateNav);
  updateNav();

})();
