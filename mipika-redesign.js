(() => {
  "use strict";

  if (window.__MIPIKA_LAYOUT_6__) return;
  window.__MIPIKA_LAYOUT_6__ = true;

  const style = document.createElement("style");
  style.id = "mipika-layout-6";

  style.textContent = `
    :root {
      --brown:#604638;
      --brown-soft:#8d705f;
      --cream:#f7f2eb;
      --pink:#e9b8ca;
      --line:#e7d9cd;
      --text:#574134;
    }

    *,*::before,*::after { box-sizing:border-box; }
    html { scroll-behavior:smooth; }

    body {
      margin:0;
      background:var(--cream) !important;
      color:var(--text) !important;
      line-height:1.65;
      overflow-x:hidden;
      padding-bottom:90px !important;
    }

    body > header {
      background:var(--brown) !important;
      color:white !important;
      padding:18px 20px !important;
      border-bottom:3px solid var(--pink) !important;
    }

    body > header h1 {
      color:white !important;
      font-size:25px !important;
      margin:0 0 5px !important;
      line-height:1.3;
    }

    body > header > div { display:none !important; }

    body > header small {
      display:block;
      font-size:11px;
      line-height:1.5;
      opacity:.9;
    }

    body > nav:not(#ml-bottom-nav) {
      background:#fffaf6 !important;
    }

    body > nav:not(#ml-bottom-nav) a {
      background:#eee6dc !important;
      color:var(--brown) !important;
    }

    main {
      width:100%;
      max-width:1080px !important;
      margin:auto;
      padding:16px 17px 105px !important;
    }

    main > section {
      min-width:0;
      padding:23px 0 30px !important;
      border-bottom:1px solid var(--line);
      scroll-margin-top:20px;
    }

    main h2 {
      color:var(--brown);
      font-size:22px;
      line-height:1.4;
      margin:12px 0 18px;
    }

    main h3 {
      color:var(--brown);
      font-size:18px;
      line-height:1.5;
      margin:22px 0 12px;
    }

    main p,main li { overflow-wrap:anywhere; }

    #home > h2 { display:none !important; }

    #ml-home-panel { margin:0 0 22px !important; }

    #ml-home-panel .ml-label {
      margin:0 0 15px !important;
      color:var(--brown);
      font-size:19px;
      font-weight:800;
      border:0;
      padding:0;
    }

    #ml-home-panel .ml-grid {
      display:grid;
      grid-template-columns:repeat(2,minmax(0,1fr));
      gap:12px;
    }

    #ml-home-panel .ml-card {
      display:flex;
      flex-direction:column;
      justify-content:center;
      align-items:flex-start;
      gap:8px;
      min-width:0;
      min-height:120px;
      padding:16px 14px;
      background:#fffdfa !important;
      border:1px solid var(--line) !important;
      border-radius:17px !important;
      text-decoration:none !important;
      box-shadow:0 3px 12px #60463812;
      color:var(--brown) !important;
      transition:transform .18s,box-shadow .18s;
    }

    #ml-home-panel .ml-card:hover {
      background:#fff7f9 !important;
      border-color:var(--pink) !important;
      transform:translateY(-2px);
      box-shadow:0 5px 16px #60463818;
    }

    #ml-home-panel .ml-icon {
      font-size:25px;
      line-height:1.2;
    }

    #ml-home-panel .ml-card strong {
      color:var(--brown);
      font-size:14px;
      line-height:1.4;
    }

    #ml-home-panel .ml-card small {
      color:#8b7568;
      font-size:12px;
      line-height:1.5;
    }

    main img.hero {
      display:block;
      width:100%;
      max-width:100%;
      height:auto;
      margin:16px auto !important;
      border-radius:18px !important;
    }

    main .panel {
      min-width:0;
      background:#fffdfa !important;
      border:1px solid var(--line) !important;
      border-radius:17px !important;
      padding:17px !important;
      margin:15px 0 !important;
      box-shadow:0 2px 10px #6046380b;
    }

    .stats {
      display:grid;
      grid-template-columns:repeat(2,minmax(0,1fr));
      gap:11px !important;
    }

    .stat {
      min-width:0;
      padding:15px 13px !important;
      background:#f3ece4 !important;
      border-radius:14px !important;
    }

    .stat b {
      display:block;
      color:var(--brown);
      font-size:clamp(21px,5vw,28px) !important;
      line-height:1.3;
      font-variant-numeric:tabular-nums;
      overflow-wrap:anywhere;
    }

    .entry {
      min-width:0;
      padding:15px !important;
      margin:11px 0 !important;
      gap:11px !important;
      background:#fffdfa !important;
      border:1px solid var(--line) !important;
      border-radius:14px !important;
    }

    .finish {
      color:var(--brown);
      background:#eee6dc !important;
    }

    main table {
      max-width:100%;
      font-size:13px;
      border-collapse:collapse;
    }

    main th,main td { padding:9px 8px; }

    main input,main select,main textarea {
      max-width:100%;
      border-radius:10px;
    }

    main button { border-radius:10px; }

    #ml-bottom-nav {
      position:fixed !important;
      left:0 !important;
      right:0 !important;
      bottom:0 !important;
      top:auto !important;
      z-index:9999 !important;
      display:flex !important;
      justify-content:space-around;
      background:var(--brown) !important;
      border-top:2px solid var(--pink);
      padding:4px 5px calc(5px + env(safe-area-inset-bottom)) !important;
      box-shadow:0 -3px 12px #0002;
    }

    #ml-bottom-nav a {
      display:flex !important;
      flex:1;
      min-width:0;
      min-height:48px;
      flex-direction:column;
      align-items:center;
      justify-content:center;
      gap:2px;
      padding:5px 2px;
      background:transparent !important;
      color:white !important;
      text-decoration:none;
      font-weight:700;
      border-radius:11px;
    }

    #ml-bottom-nav a span {
      font-size:19px;
      line-height:1.2;
    }

    #ml-bottom-nav a small {
      font-size:10px;
      color:inherit !important;
    }

    #ml-bottom-nav a[aria-current="page"] {
      background:#866755 !important;
      color:#ffe0eb !important;
    }

    #ml-home-panel a:focus-visible,
    #ml-bottom-nav a:focus-visible {
      outline:3px solid var(--pink);
      outline-offset:3px;
    }

    @media(max-width:700px) {
      body > nav:not(#ml-bottom-nav) {
        display:none !important;
      }

      main { padding:12px 14px 100px !important; }

      main > section { padding:19px 0 28px !important; }

      main h2 { font-size:20px; }

      main .panel { padding:15px !important; }

      #ml-home-panel .ml-grid {
        grid-template-columns:repeat(2,minmax(0,1fr));
      }

      #ml-home-panel .ml-card {
        min-height:112px;
        padding:14px 11px;
      }

      .entry { flex-wrap:wrap; }

      main input,main select,main textarea { font-size:16px; }

      main table {
        display:block;
        overflow-x:auto;
        -webkit-overflow-scrolling:touch;
      }
    }

    @media(min-width:701px) {
      main { padding:25px 28px 110px !important; }

      #ml-home-panel .ml-grid {
        grid-template-columns:repeat(3,minmax(0,1fr));
      }

      .stats { grid-template-columns:repeat(3,minmax(0,1fr)); }

      #ml-bottom-nav {
        left:50% !important;
        right:auto !important;
        transform:translateX(-50%);
        width:min(700px,100%);
        border-radius:16px 16px 0 0;
      }
    }

    @media(prefers-reduced-motion:reduce) {
      html { scroll-behavior:auto; }
      #ml-home-panel .ml-card { transition:none; }
    }
  `;

  document.head.appendChild(style);

  const home=document.getElementById("home");
  if(!home)return;

  document.getElementById("ml-home-panel")?.remove();
  document.getElementById("ml-bottom-nav")?.remove();

  const panel=document.createElement("div");
  panel.id="ml-home-panel";

  panel.innerHTML=`
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
        <small>出走記録を検索</small>
      </a>

      <a class="ml-card" href="#schedule">
        <span class="ml-icon">📅</span>
        <strong>出走予定</strong>
        <small>次の開催を確認</small>
      </a>

      <a class="ml-card" href="./odds.html">
        <span class="ml-icon">💰</span>
        <strong>ODDS LAB</strong>
        <small>買い目・資金分配</small>
      </a>

      <a class="ml-card" href="./odds-status.html">
        <span class="ml-icon">📡</span>
        <strong>オッズ収集状況</strong>
        <small>保存データを確認</small>
      </a>

      <a class="ml-card" href="./odds-verify.html">
        <span class="ml-icon">🔍</span>
        <strong>オッズ詳細検証</strong>
        <small>データの整合性を確認</small>
      </a>

      <a class="ml-card" href="#gallery">
        <span class="ml-icon">📸</span>
        <strong>ギャラリー</strong>
        <small>写真・動画</small>
      </a>

      <a class="ml-card" href="#about">
        <span class="ml-icon">🤎</span>
        <strong>ABOUT</strong>
        <small>研究所について</small>
      </a>

    </div>
  `;

  home.prepend(panel);

  const nav=document.createElement("nav");
  nav.id="ml-bottom-nav";
  nav.setAttribute("aria-label","下部メニュー");

  const items=[
    ["#home","🏠","HOME"],
    ["#data","📊","成績"],
    ["#log","🚤","履歴"],
    ["./odds.html","💰","オッズ"],
    ["#schedule","📅","予定"]
  ];

  items.forEach(([href,icon,label])=>{
    const a=document.createElement("a");
    a.href=href;

    const span=document.createElement("span");
    span.textContent=icon;
    span.setAttribute("aria-hidden","true");

    const small=document.createElement("small");
    small.textContent=label;

    a.append(span,small);
    nav.appendChild(a);
  });

  document.body.appendChild(nav);

  function updateNav(){
    const current=location.hash||"#home";

    nav.querySelectorAll("a").forEach(a=>{
      if(a.getAttribute("href")===current){
        a.setAttribute("aria-current","page");
      }else{
        a.removeAttribute("aria-current");
      }
    });
  }

  window.addEventListener("hashchange",updateNav);
  updateNav();
})();
