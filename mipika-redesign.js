(() => {
"use strict";

const old = document.getElementById("ml-bottom-nav");
if (old) old.remove();

const oldPanel = document.getElementById("ml-home-panel");
if (oldPanel) oldPanel.remove();

const css = document.createElement("style");

css.textContent = `
:root {
  --brown:#604638;
  --brown-light:#8b6b56;
  --cream:#f7f2eb;
  --pink:#e9b8ca;
}

body {
  background:#f7f2eb !important;
  color:#574134 !important;
  padding-bottom:90px !important;
}

body > header {
  background:#604638 !important;
  border-bottom:3px solid #e9b8ca !important;
  border-radius:0 !important;
  padding:18px !important;
}

body > header h1 {
  color:white !important;
}

body > nav:not(#ml-bottom-nav) {
  background:#fffaf6 !important;
  border-bottom:1px solid #e8d7c9 !important;
}

body > nav:not(#ml-bottom-nav) a {
  background:#eee6dc !important;
  color:#604638 !important;
}

main {
  max-width:1000px;
}

#ml-home-panel {
  margin:12px 0 24px;
}

#ml-home-panel .ml-hero {
  background:linear-gradient(135deg,#604638,#907362);
  border-radius:18px;
  padding:24px 20px;
  color:white;
}

#ml-home-panel .ml-eyebrow {
  font-size:12px;
  font-weight:800;
  color:#f4d5df;
  letter-spacing:2px;
}

#ml-home-panel h2 {
  color:white;
  font-size:clamp(22px,5vw,30px);
  margin:12px 0;
}

#ml-home-panel .ml-sub {
  color:#fff2ea;
  font-size:14px;
}

#ml-home-panel .ml-label {
  font-size:18px;
  font-weight:800;
  color:#604638;
  margin:22px 0 14px;
}

#ml-home-panel .ml-grid {
  display:grid;
  grid-template-columns:repeat(2,minmax(0,1fr));
  gap:11px;
}

#ml-home-panel .ml-card {
  display:flex;
  flex-direction:column;
  gap:9px;
  padding:17px 13px;
  background:white;
  border:1px solid #eadbd1;
  border-radius:16px;
  text-decoration:none;
  color:#604638;
  box-shadow:0 3px 10px #60463812;
}

#ml-home-panel .ml-icon {
  font-size:25px;
}

#ml-home-panel .ml-card strong {
  font-size:15px;
  color:#604638;
}

#ml-home-panel .ml-card small {
  font-size:12px;
  color:#887568;
  line-height:1.5;
}

#ml-bottom-nav {
  position:fixed !important;
  left:0 !important;
  right:0 !important;
  bottom:0 !important;
  top:auto !important;
  z-index:9999 !important;
  display:flex !important;
  justify-content:space-around;
  background:#604638 !important;
  border-top:3px solid #e9b8ca;
  padding:7px 4px calc(7px + env(safe-area-inset-bottom));
  box-shadow:0 -3px 12px #0002;
}

#ml-bottom-nav a {
  display:flex !important;
  flex:1;
  min-width:0;
  flex-direction:column;
  align-items:center;
  justify-content:center;
  gap:4px;
  padding:7px 2px;
  color:white !important;
  background:transparent !important;
  text-decoration:none;
  font-size:11px;
  font-weight:700;
  border-radius:10px;
}

#ml-bottom-nav a span {
  font-size:22px;
}

#ml-bottom-nav a[aria-current="page"] {
  background:#866755 !important;
  color:#ffe0eb !important;
}

#ml-bottom-nav a:focus-visible,
#ml-home-panel a:focus-visible {
  outline:3px solid #e9b8ca;
  outline-offset:2px;
}

section[id] {
  scroll-margin-top:85px;
}

@media(min-width:700px) {
  #ml-home-panel .ml-grid {
    grid-template-columns:repeat(3,minmax(0,1fr));
  }

  #ml-bottom-nav {
    left:50% !important;
    right:auto !important;
    transform:translateX(-50%);
    width:min(700px,100%);
    border-radius:16px 16px 0 0;
  }
}
`;

document.head.appendChild(css);

const home = document.getElementById("home");

if (!home) return;

const panel = document.createElement("div");

panel.id = "ml-home-panel";

panel.innerHTML = `
<div class="ml-hero">
  <div class="ml-eyebrow">MIPIKA LAB · 5264</div>
  <h2>登みひ果を、誰よりも深く。</h2>
  <p class="ml-sub">レースは真剣に分析。応援は全力で。</p>
</div>

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

const nav = document.createElement("nav");

nav.id = "ml-bottom-nav";
nav.setAttribute("aria-label","下部メニュー");

const menus = [
["#home","🏠","HOME"],
["#data","📊","成績"],
["#log","🚤","履歴"],
["./odds.html","💰","オッズ"],
["#schedule","📅","予定"]
];

menus.forEach(([href,icon,label]) => {
  const a = document.createElement("a");
  a.href = href;

  const span = document.createElement("span");
  span.textContent = icon;
  span.setAttribute("aria-hidden","true");

  const small = document.createElement("small");
  small.textContent = label;

  a.append(span,small);
  nav.appendChild(a);
});

document.body.appendChild(nav);

function updateNav() {
  const hash = window.location.hash || "#home";

  nav.querySelectorAll("a").forEach(a => {
    if (a.getAttribute("href") === hash) {
      a.setAttribute("aria-current","page");
    } else {
      a.removeAttribute("aria-current");
    }
  });
}

window.addEventListener("hashchange",updateNav);
updateNav();

})();
