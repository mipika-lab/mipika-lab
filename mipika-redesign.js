(() => {
  "use strict";

  if (document.getElementById("ml-bottom-nav")) return;

  const style = document.createElement("style");

  style.textContent = `
    :root {
      --ml-pink: #f43d88;
      --ml-ink: #17131c;
      --ml-bg: #fff6fa;
    }

    body {
      background: var(--ml-bg);
      color: var(--ml-ink);
      padding-bottom: calc(76px + env(safe-area-inset-bottom));
    }

    body > header {
      background: #151219;
      color: #fff;
      border-bottom: 4px solid var(--ml-pink);
    }

    body > header h1 {
      color: #fff;
    }

    body > nav {
      background: #fff4f8;
      top: 0;
      border-bottom: 1px solid #f6d8e4;
    }

    body > nav a {
      background: #fff;
      color: #34303a;
    }

    body > nav a:hover,
    body > nav a:focus-visible {
      background: #ffe0ec;
      color: #ad1456;
    }

    main {
      max-width: 1080px;
    }

    main > .panel,
    main section .panel {
      border-color: #f3d9e5;
    }

    #ml-home-panel {
      border: 0;
      padding: 0 0 20px;
      margin: 6px 0 24px;
    }

    #ml-home-panel .ml-hero {
      background: linear-gradient(125deg, #211826, #44243a);
      padding: 24px 20px;
      border-radius: 20px;
      color: #fff;
    }

    #ml-home-panel .ml-eyebrow {
      color: #ffc6db;
      font-size: 12px;
      font-weight: 800;
      letter-spacing: .08em;
    }

    #ml-home-panel h2 {
      font-size: clamp(23px, 5vw, 34px);
      margin: 9px 0;
      color: #fff;
    }

    #ml-home-panel .ml-sub {
      margin: 0;
      color: #f1dce8;
      font-size: 14px;
    }

    #ml-home-panel .ml-label {
      font-size: 15px;
      font-weight: 800;
      margin: 18px 0 10px;
    }

    #ml-home-panel .ml-grid {
      display: grid;
      grid-template-columns: repeat(3, minmax(0, 1fr));
      gap: 11px;
    }

    #ml-home-panel .ml-card {
      display: flex;
      flex-direction: column;
      gap: 8px;
      text-decoration: none;
      background: #fff;
      border: 1px solid #f4d8e5;
      border-radius: 15px;
      padding: 17px 13px;
      box-shadow: 0 3px 12px #320f2310;
      color: #29212b;
    }

    #ml-home-panel .ml-card:focus-visible {
      outline: 3px solid #ff5c9b;
      outline-offset: 2px;
    }

    #ml-home-panel .ml-icon {
      color: #dd2b76;
      font-size: 25px;
    }

    #ml-home-panel .ml-card strong {
      font-size: 15px;
    }

    #ml-home-panel .ml-card small {
      font-size: 12px;
      color: #766976;
      line-height: 1.45;
    }

    #ml-bottom-nav {
      position: fixed;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: 1000;
      display: flex;
      justify-content: space-around;
      align-items: stretch;
      background: #17131c;
      border-top: 2px solid #f43d88;
      padding:
        5px max(5px, env(safe-area-inset-right))
        calc(5px + env(safe-area-inset-bottom))
        max(5px, env(safe-area-inset-left));
      box-shadow: 0 -4px 16px #19091e33;
    }

    #ml-bottom-nav a {
      display: flex;
      flex: 1;
      min-width: 0;
      align-items: center;
      flex-direction: column;
      gap: 2px;
      text-align: center;
      text-decoration: none;
      color: #fff;
      font-size: 10px;
      font-weight: 700;
      padding: 6px 2px;
      border-radius: 10px;
    }

    #ml-bottom-nav a span {
      font-size: 20px;
      line-height: 1.2;
    }

    #ml-bottom-nav a[aria-current="page"] {
      background: #462337;
      color: #ff80b5;
    }

    #ml-bottom-nav a:focus-visible {
      outline: 2px solid #fff;
    }

    section[id] {
      scroll-margin-top: 76px;
    }

    @media (max-width: 620px) {
      #ml-home-panel .ml-grid {
        grid-template-columns: repeat(2, minmax(0, 1fr));
        gap: 9px;
      }

      #ml-home-panel .ml-card {
        padding: 14px 11px;
      }

      #ml-home-panel .ml-card strong {
        font-size: 14px;
      }

      #ml-bottom-nav a {
        min-height: 47px;
      }
    }

    @media (min-width: 900px) {
      #ml-bottom-nav {
        left: 50%;
        right: auto;
        transform: translateX(-50%);
        width: min(700px, 100%);
        border-radius: 16px 16px 0 0;
      }
    }

    @media (prefers-reduced-motion: no-preference) {
      #ml-home-panel .ml-card {
        transition: transform .15s;
      }

      #ml-home-panel .ml-card:hover {
        transform: translateY(-2px);
      }
    }
  `;

  document.head.append(style);

  const home = document.getElementById("home");

  if (!home) return;

  const panel = document.createElement("div");

  panel.id = "ml-home-panel";

  panel.innerHTML = `
    <div class="ml-hero">
      <div class="ml-eyebrow">
        MIPIKA LAB · 5264
      </div>

      <h2>登みひ果を、誰よりも深く。</h2>

      <p class="ml-sub">
        かわいさはデザインに。分析は数字で。
      </p>
    </div>

    <div class="ml-label">何を調べる？</div>

    <div class="ml-grid">

      <a class="ml-card" href="#data">
        <span class="ml-icon">▥</span>
        <strong>成績分析</strong>
        <small>コース別・期間別</small>
      </a>

      <a class="ml-card" href="#log">
        <span class="ml-icon">≡</span>
        <strong>レース履歴</strong>
        <small>全出走から検索</small>
      </a>

      <a class="ml-card" href="#schedule">
        <span class="ml-icon">▦</span>
        <strong>出走予定</strong>
        <small>次の開催を確認</small>
      </a>

      <a class="ml-card" href="./odds.html">
        <span class="ml-icon">¥</span>
        <strong>オッズ分析</strong>
        <small>買い目・資金分配</small>
      </a>

      <a class="ml-card" href="#log">
        <span class="ml-icon">⌕</span>
        <strong>詳細検索</strong>
        <small>開催場・コース・着順</small>
      </a>

      <a class="ml-card" href="#gallery">
        <span class="ml-icon">▧</span>
        <strong>ギャラリー</strong>
        <small>写真・動画</small>
      </a>

    </div>
  `;

  home.prepend(panel);

  const items = [
    ["#home", "⌂", "HOME"],
    ["#data", "▥", "成績"],
    ["#log", "≡", "履歴"],
    ["./odds.html", "¥", "オッズ"],
    ["#schedule", "☰", "予定"]
  ];

  const nav = document.createElement("nav");

  nav.id = "ml-bottom-nav";

  nav.setAttribute("aria-label", "下部メニュー");

  for (const [href, icon, label] of items) {
    const a = document.createElement("a");

    a.href = href;

    const iconElement = document.createElement("span");
    iconElement.setAttribute("aria-hidden", "true");
    iconElement.textContent = icon;

    const labelElement = document.createElement("small");
    labelElement.textContent = label;

    a.append(iconElement, labelElement);

    if (href === "#home") {
      a.setAttribute("aria-current", "page");
    }

    nav.append(a);
  }

  document.body.append(nav);

  nav.addEventListener("click", e => {
    const link = e.target.closest("a");

    if (!link) return;

    nav.querySelectorAll("a").forEach(a => {
      a.removeAttribute("aria-current");
    });

    link.setAttribute("aria-current", "page");
  });

})();
