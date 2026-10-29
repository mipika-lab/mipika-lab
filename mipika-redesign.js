(() => {
  "use strict";

  if (document.getElementById("ml-bottom-nav")) return;

  const style = document.createElement("style");

  style.textContent = `
    :root {
      --ml-brown: #604638;
      --ml-dark: #392820;
      --ml-pink: #e7a8be;
      --ml-bg: #faf5f0;
      --ml-white: #ffffff;
    }

    body {
      background: var(--ml-bg);
      color: var(--ml-dark);
      padding-bottom: calc(85px + env(safe-area-inset-bottom));
    }

    body > header {
      background: linear-gradient(135deg, #392820, #765343);
      color: white;
      border-bottom: 4px solid var(--ml-pink);
      padding: 24px 18px;
    }

    body > header h1 {
      color: white;
      font-size: 26px;
    }

    body > nav {
      background: #fff9f6;
      border-bottom: 1px solid #e8d6cc;
    }

    body > nav a {
      background: #f1e6df;
      color: #604638;
    }

    body > nav a:hover {
      background: #f7e1e9;
    }

    main {
      max-width: 1080px;
    }

    main section .panel {
      background: white;
      border-color: #e8d6cc;
      border-radius: 16px;
    }

    #ml-home-panel {
      margin: 8px 0 26px;
    }

    #ml-home-panel .ml-hero {
      background: linear-gradient(135deg, #604638, #8c6958);
      padding: 26px 20px;
      border-radius: 20px;
      color: white;
      box-shadow: 0 5px 18px #39282022;
    }

    #ml-home-panel .ml-eyebrow {
      color: #f8d4e1;
      font-size: 12px;
      font-weight: 800;
      letter-spacing: 2px;
    }

    #ml-home-panel h2 {
      font-size: clamp(23px, 5vw, 34px);
      color: white;
      margin: 12px 0;
    }

    #ml-home-panel .ml-sub {
      color: #fff2eb;
      font-size: 14px;
      margin: 0;
    }

    #ml-home-panel .ml-label {
      font-size: 18px;
      font-weight: 800;
      color: #604638;
      margin: 22px 0 14px;
      border-left: 5px solid #e7a8be;
      padding-left: 10px;
    }

    #ml-home-panel .ml-grid {
      display: grid;
      grid-template-columns: repeat(3, minmax(0, 1fr));
      gap: 12px;
    }

    #ml-home-panel .ml-card {
      display: flex;
      flex-direction: column;
      gap: 9px;
      text-decoration: none;
      background: white;
      border: 1px solid #eadbd2;
      border-radius: 17px;
      padding: 20px 15px;
      color: #392820;
      box-shadow: 0 3px 12px #39282012;
      transition: transform .2s, box-shadow .2s;
    }

    #ml-home-panel .ml-card:hover {
      transform: translateY(-3px);
      box-shadow: 0 6px 18px #39282022;
    }

    #ml-home-panel .ml-card:focus-visible {
      outline: 3px solid #b87f95;
      outline-offset: 2px;
    }

    #ml-home-panel .ml-icon {
      font-size: 27px;
      color: #9b6f59;
    }

    #ml-home-panel .ml-card strong {
      font-size: 15px;
      color: #604638;
    }

    #ml-home-panel .ml-card small {
      font-size: 12px;
      color: #887267;
      line-height: 1.5;
    }

    #ml-bottom-nav {
      position: fixed;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: 1000;
      display: flex;
      justify-content: space-around;
      background: #392820;
      border-top: 3px solid #e7a8be;
      padding:
        6px 5px
        calc(7px + env(safe-area-inset-bottom));
      box-shadow: 0 -4px 15px #39282033;
    }

    #ml-bottom-nav a {
      display: flex;
      flex: 1;
      min-width: 0;
      align-items: center;
      flex-direction: column;
      justify-content: center;
      gap: 4px;
      color: white;
      text-decoration: none;
      font-size: 11px;
      font-weight: 700;
      padding: 8px 3px;
      border-radius: 12px;
    }

    #ml-bottom-nav a span {
      font-size: 21px;
    }

    #ml-bottom-nav a[aria-current="page"] {
      background: #765343;
      color: #ffd6e4;
    }

    section[id] {
      scroll-margin-top: 85px;
    }

    @media (max-width: 620px) {
      #ml-home-panel .ml-grid {
        grid-template-columns: repeat(2, minmax(0, 1fr));
        gap: 10px;
      }

      #ml-home-panel .ml-card {
        padding: 16px 12px;
      }

      #ml-home-panel .ml-card strong {
        font-size: 14px;
      }
    }

    @media (min-width: 900px) {
      #ml-bottom-nav {
        left: 50%;
        right: auto;
        transform: translateX(-50%);
        width: min(700px, 100%);
        border-radius: 18px 18px 0 0;
      }
    }

    @media (prefers-reduced-motion: reduce) {
      #ml-home-panel .ml-card {
        transition: none;
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
        レースは真剣に分析。応援は全力で。
      </p>
    </div>

    <div class="ml-label">
      🤎 何を調べる？
    </div>

    <div class="ml-grid">

      <a class="ml-card" href="#data">
        <span class="ml-icon">📊</span>
        <strong>成績分析</strong>
        <small>コース別・期間別</small>
      </a>

      <a class="ml-card" href="#log">
        <span class="ml-icon">🚤</span>
        <strong>レース履歴</strong>
        <small>全出走から検索</small>
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

  const items = [
    ["#home", "🏠", "HOME"],
    ["#data", "📊", "成績"],
    ["#log", "🚤", "履歴"],
    ["./odds.html", "💰", "オッズ"],
    ["#schedule", "☰", "予定"]
  ];

  const nav = document.createElement("nav");

  nav.id = "ml-bottom-nav";
  nav.setAttribute("aria-label", "下部メニュー");

  for (const [href, icon, label] of items) {
    const a = document.createElement("a");

    a.href = href;

    const span = document.createElement("span");
    span.textContent = icon;
    span.setAttribute("aria-hidden", "true");

    const small = document.createElement("small");
    small.textContent = label;

    a.append(span, small);

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
