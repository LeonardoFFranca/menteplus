'use strict';
/* ================= Mente+ · app ================= */
const $ = s => document.querySelector(s);
const esc = s => String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const rnd = a => a[Math.floor(Math.random() * a.length)];
const shuf = a => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.random() * (i + 1) | 0; [a[i], a[j]] = [a[j], a[i]]; } return a; };
const strip = s => s.replace(/<[^>]+>/g, '');

/* ---------- Estado salvo ---------- */
const KEY = 'menteplus-v2';
const DEF = {done:{}, guides:{}, xp:0, jump:0, mist:[], ans:0, ok:0, lessons:0, time:0, best:0,
  set:{sfx:true, audio:true, listen:true, rate:0.9}, onboard:false};
let S;
try { S = Object.assign(JSON.parse(JSON.stringify(DEF)), JSON.parse(localStorage.getItem(KEY) || '{}')); S.set = Object.assign({}, DEF.set, S.set); }
catch (e) { S = JSON.parse(JSON.stringify(DEF)); }
try { const old = JSON.parse(localStorage.getItem('menteplus-data') || 'null'); if (old && !S.migrated) { S.xp += old.xp || 0; S.best = old.best || 0; S.migrated = true; } } catch (e) {}
function save() { try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) {} }

/* ---------- Trilha ---------- */
const KINDS = [
  {k:'l1', ic:'⭐', name:'Palavras', desc:'Conheça as palavras novas desta unidade, com imagem e áudio.'},
  {k:'l2', ic:'💬', name:'Frases', desc:'Monte e traduza as primeiras frases usando as palavras novas.'},
  {k:'l3', ic:'🎧', name:'Prática', desc:'Ouça, escreva e complete frases para fixar de verdade.'},
  {k:'rv', ic:'🏆', name:'Revisão', desc:'Um desafio final misturando tudo da unidade e das anteriores.'}
];
const NODES = [];
UNITS.forEach(u => KINDS.forEach(k => NODES.push(Object.assign({u:u.id, key:u.id + k.k, idx:NODES.length}, k))));
const secStart = s => NODES.findIndex(n => UNITS[n.u].s === s);
const unlocked = i => i === 0 || i <= S.jump || !!S.done[NODES[i - 1].key] || !!S.done[NODES[i].key];
function currentIdx() {
  for (let i = S.jump; i < NODES.length; i++) if (!S.done[NODES[i].key] && unlocked(i)) return i;
  for (let i = 0; i < NODES.length; i++) if (!S.done[NODES[i].key] && unlocked(i)) return i;
  return -1;
}
const learnedUnits = () => UNITS.filter(u => S.done[u.id + 'l1']);
const learnedWords = () => learnedUnits().flatMap(u => u.w.map(w => ({w, u})));
const DICT = {};
UNITS.forEach(u => u.w.forEach(w => { DICT[w[0].toLowerCase()] = w[1]; }));
STORIES.forEach(s => s.vocab.forEach(v => { DICT[v[0].toLowerCase()] = DICT[v[0].toLowerCase()] || v[1]; }));

/* ---------- Som e voz ---------- */
let AC;
function tone(seq) {
  if (!S.set.sfx) return;
  try {
    AC = AC || new (window.AudioContext || window.webkitAudioContext)();
    let t = AC.currentTime;
    seq.forEach(([f, d, type = 'sine', v = .16]) => {
      const o = AC.createOscillator(), g = AC.createGain();
      o.type = type; o.frequency.value = f;
      g.gain.setValueAtTime(0, t); g.gain.linearRampToValueAtTime(v, t + .01); g.gain.exponentialRampToValueAtTime(.001, t + d);
      o.connect(g).connect(AC.destination); o.start(t); o.stop(t + d + .02); t += d * .7;
    });
  } catch (e) {}
}
const SFX = {
  ok: () => tone([[660, .12], [990, .24]]),
  bad: () => { tone([[240, .16, 'triangle', .2], [190, .26, 'triangle', .2]]); try { navigator.vibrate && navigator.vibrate(90); } catch (e) {} },
  tap: () => tone([[560, .045, 'sine', .05]]),
  pair: () => tone([[880, .09, 'sine', .1]]),
  win: () => tone([[523, .14], [659, .14], [784, .14], [1046, .4]])
};
let voices = [];
function loadVoices() { try { voices = speechSynthesis.getVoices(); } catch (e) {} }
if ('speechSynthesis' in window) { loadVoices(); speechSynthesis.onvoiceschanged = loadVoices; }
function speak(text, slow) {
  if (!S.set.audio || !text) return;
  const rate = slow ? 0.55 : S.set.rate;
  if (window.AndroidTTS) { try { AndroidTTS.speak(String(text), rate); return; } catch (e) {} }
  if ('speechSynthesis' in window) {
    try {
      speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(text); u.lang = 'en-US'; u.rate = rate;
      const v = voices.find(v => /en[-_]US/i.test(v.lang)) || voices.find(v => /^en/i.test(v.lang)); if (v) u.voice = v;
      speechSynthesis.speak(u);
    } catch (e) {}
  }
}
const SPK = '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M3 9.5v5c0 .6.4 1 1 1h3l4.3 3.6c.7.5 1.7.1 1.7-.8V5.7c0-.9-1-1.3-1.7-.8L7 8.5H4c-.6 0-1 .4-1 1z"/><path d="M16 8.2a5 5 0 0 1 0 7.6M18.6 5.6a8.6 8.6 0 0 1 0 12.8" stroke="currentColor" stroke-width="2.2" fill="none" stroke-linecap="round"/></svg>';
const SLOW = '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M4 16c0-4 3.4-7.5 8-7.5s8 3.5 8 7.5H4z"/><circle cx="20.5" cy="13" r="2.2"/><path d="M6 16.5l-1.5 3M18 16.5l1.5 3M9 9.5l2 6.5M15 9.5l-2 6.5" stroke="#fff" stroke-width="1.4"/></svg>';
let SAYS = [];
const sayBtn = (text, cls = 'spk') => { SAYS.push(text); return `<button class="${cls}" onclick="event.stopPropagation();speak(SAYS[${SAYS.length - 1}])" aria-label="Ouvir">${SPK}</button>`; };

/* ---------- Mascote (Mentinho) ---------- */
function mascot(m = 'happy', cls = 'mas') {
  const mouth = m === 'wow' ? '<ellipse cx="60" cy="80" rx="7" ry="8.5" fill="#8a2f3c" stroke="#24313a" stroke-width="3"/>'
    : m === 'think' ? '<path d="M51 81q9-4 18 0" stroke="#24313a" stroke-width="4" fill="none" stroke-linecap="round"/>'
    : m === 'sad' ? '<path d="M50 84q10-9 20 0" stroke="#24313a" stroke-width="4" fill="none" stroke-linecap="round"/>'
    : '<path d="M47 75q13 15 26 0z" fill="#8a2f3c" stroke="#24313a" stroke-width="3.2" stroke-linejoin="round"/><path d="M53 82q7 4 14 0" stroke="#ff8fa3" stroke-width="3.5" fill="none" stroke-linecap="round"/>';
  const brow = m === 'think' ? '<path d="M37 41l12 3M83 41l-12 3" stroke="#24313a" stroke-width="3.5" stroke-linecap="round"/>' : '';
  const pup = m === 'think' ? 'cx="48" cy="56"' : 'cx="46" cy="59"';
  const pup2 = m === 'think' ? 'cx="78" cy="56"' : 'cx="76" cy="59"';
  return `<svg class="${cls}" viewBox="0 0 120 124" aria-hidden="true">
  <ellipse cx="60" cy="118" rx="36" ry="5" fill="#00000014"/>
  <path d="M60 27C57 13 45 7 33 9c1 13 13 20 27 18z" fill="#7be3ab" stroke="#178a57" stroke-width="3" stroke-linejoin="round"/>
  <path d="M60 27c4-15 17-21 29-17-2 13-15 19-29 17z" fill="#4fd38f" stroke="#178a57" stroke-width="3" stroke-linejoin="round"/>
  <path d="M14 70c-8 2-10 12-3 15 4 1 8-2 9-6" fill="#22b573" stroke="#178a57" stroke-width="3"/>
  <path d="M106 70c8 2 10 12 3 15-4 1-8-2-9-6" fill="#22b573" stroke="#178a57" stroke-width="3"/>
  <rect x="17" y="25" width="86" height="88" rx="42" fill="#22b573" stroke="#178a57" stroke-width="3.5"/>
  <rect x="23" y="29" width="74" height="74" rx="37" fill="#3fd08d"/>
  <ellipse cx="60" cy="92" rx="25" ry="15" fill="#8cecbd" opacity=".6"/>
  <circle cx="46" cy="57" r="13" fill="#fff" stroke="#24313a" stroke-width="3"/>
  <circle cx="76" cy="57" r="13" fill="#fff" stroke="#24313a" stroke-width="3"/>
  <circle ${pup} r="6.5" fill="#24313a"/><circle ${pup2} r="6.5" fill="#24313a"/>
  <circle cx="${m==='think'?50:48}" cy="${m==='think'?53:56}" r="2.3" fill="#fff"/><circle cx="${m==='think'?80:78}" cy="${m==='think'?53:56}" r="2.3" fill="#fff"/>
  ${brow}
  <ellipse cx="32" cy="74" rx="7" ry="4.5" fill="#ff8fa3" opacity=".75"/><ellipse cx="88" cy="74" rx="7" ry="4.5" fill="#ff8fa3" opacity=".75"/>
  ${mouth}
  <path d="M30 40q6-9 16-11" stroke="#ffffff90" stroke-width="4" fill="none" stroke-linecap="round"/>
  </svg>`;
}

/* ---------- UI util ---------- */
let tab = 'learn';
function toast(msg) { const t = $('#toast'); t.textContent = msg; t.classList.add('show'); clearTimeout(toast.h); toast.h = setTimeout(() => t.classList.remove('show'), 2200); }
function secVars(s) { const c = SECTIONS[s]; return `--c:${c.c};--d:${c.d};--l:${c.l};--sec:${c.c};--secD:${c.d};--secL:${c.l}`; }
function sheet(html) { closeSheet(); const d = document.createElement('div'); d.className = 'sheet-bg'; d.id = 'sheet'; d.innerHTML = `<div class="sheet">${html}</div>`; d.onclick = e => { if (e.target === d) closeSheet(); }; document.body.appendChild(d); }
function closeSheet() { const s = $('#sheet'); if (s) { s.remove(); return true; } return false; }
function confetti() { const cols = ['#22b573', '#2c9cf2', '#ff9a1f', '#9b5de5', '#f2547d', '#ffc23d']; for (let i = 0; i < 70; i++) { const c = document.createElement('div'); c.className = 'confetti'; c.style.left = Math.random() * 100 + 'vw'; c.style.background = rnd(cols); c.style.animationDuration = 1.6 + Math.random() * 1.8 + 's'; c.style.animationDelay = Math.random() * .5 + 's'; c.style.transform = `rotate(${Math.random() * 360}deg)`; document.body.appendChild(c); setTimeout(() => c.remove(), 4200); } }
function wordsHTML(text) { // inglês com palavras tocáveis
  return text.split(/(\s+)/).map(p => { if (/^\s+$/.test(p)) return p; const k = p.toLowerCase().replace(/^[^a-z']+|[^a-z']+$/g, ''); return `<span class="w" data-w="${esc(k)}" onclick="gloss(event,this.dataset.w)">${esc(p)}</span>`; }).join('');
}
function gloss(ev, w) {
  ev.stopPropagation(); speak(w);
  document.querySelectorAll('.gloss').forEach(g => g.remove());
  const tr = DICT[w]; if (!tr) return;
  const g = document.createElement('div'); g.className = 'gloss'; g.textContent = tr;
  const r = ev.target.getBoundingClientRect(); g.style.left = Math.max(8, Math.min(innerWidth - 180, r.left)) + 'px'; g.style.top = (r.bottom + 6) + 'px';
  document.body.appendChild(g); setTimeout(() => g.remove(), 1800);
}

/* ---------- Abas ---------- */
const TABS = [['learn', '🏠', 'Aprender'], ['practice', '🎯', 'Praticar'], ['words', '📖', 'Palavras'], ['profile', '😊', 'Perfil']];
function renderTabs() { $('#tabs').style.display = S.onboard ? 'flex' : 'none'; $('#tabs').innerHTML = TABS.map(([id, ic, t]) => `<button class="tab ${tab === id ? 'on' : ''}" onclick="go('${id}')"><i>${ic}</i>${t}</button>`).join(''); }
function go(t) { tab = t; SFX.tap(); render(); window.scrollTo(0, 0); if (t === 'learn') scrollToCurrent(); }
function render() {
  SAYS = [];
  renderTabs();
  if (!S.onboard) { $('#screen').innerHTML = welcomeHTML(); return; }
  $('#screen').innerHTML = tab === 'learn' ? learnHTML() : tab === 'practice' ? practiceHTML() : tab === 'words' ? wordsPageHTML() : profileHTML();
}
function topbar() { return `<div class="topbar"><div class="logo">mente<b>+</b></div><div class="chips"><div class="chip wd">📚 ${learnedWords().length}</div><div class="chip xp">⚡ ${S.xp}</div></div></div>`; }
function scrollToCurrent() { setTimeout(() => { const n = document.querySelector('.node.current'); if (n) n.scrollIntoView({block:'center', behavior:'smooth'}); }, 60); }

/* ---------- Boas-vindas ---------- */
let wStep = 0;
function welcomeHTML() {
  if (wStep === 0) return `<div class="welcome"><div class="mid">${mascot('happy')}<h1>Oi! Eu sou o Mentinho 👋</h1><p>Vou te levar do zero até o inglês fluente, um passinho de cada vez. Tudo grátis, sem limites e no seu ritmo.</p></div><button class="btn" onclick="wStep=1;SFX.tap();render()">Vamos começar</button></div>`;
  const opts = [['🌱', 'Nunca estudei inglês', 'Começar do zero absoluto', 0], ['🙂', 'Sei algumas palavras', 'Pular para "Dia a dia" (A1+)', 1], ['💬', 'Entendo frases simples', 'Pular para "Conversas" (A2)', 2], ['🚀', 'Consigo me comunicar', 'Pular para "Independente" (B1)', 3], ['🎓', 'Sou intermediário', 'Pular para "Avançado" (B2)', 4], ['🏅', 'Quero chegar à fluência', 'Pular para "Fluente" (C1)', 5]];
  return `<div class="welcome"><div style="display:flex;gap:12px;align-items:center;margin-bottom:18px">${mascot('think').replace('class="mas"', 'class="mas" style="width:84px;flex-shrink:0"')}<div class="bubble" style="font-size:17px">Quanto inglês você já sabe?</div></div><div class="tile-list">${opts.map(o => `<button class="ptile" onclick="pickLevel(${o[3]})"><div class="em" style="background:${SECTIONS[o[3]].l}">${o[0]}</div><div><strong>${o[1]}</strong><small>${o[2]}</small></div><span class="chev">›</span></button>`).join('')}</div><p style="text-align:center;color:var(--ink2);font-weight:700;font-size:14px;margin-top:18px">Você pode voltar a qualquer lição depois, quando quiser.</p></div>`;
}
function pickLevel(s) { S.onboard = true; S.jump = s > 0 ? secStart(s) : 0; save(); SFX.win(); tab = 'learn'; render(); scrollToCurrent(); if (s === 0) setTimeout(() => toast('Toque na primeira bolinha para começar! ⭐'), 600); }

/* ---------- Aprender (trilha) ---------- */
const OFF = [0, 52, 78, 52, 0, -52, -78, -52];
function learnHTML() {
  const cur = currentIdx();
  let h = topbar();
  SECTIONS.forEach((sec, s) => {
    const nodes = NODES.filter(n => UNITS[n.u].s === s), done = nodes.filter(n => S.done[n.key]).length, first = nodes[0].idx;
    h += `<div class="section-head" style="${secVars(s)}"><small>Seção ${s + 1} · ${sec.lvl}</small><h2>${sec.t}</h2><p>${sec.desc}</p><div class="bar"><div style="width:${done / nodes.length * 100}%"></div></div>${!unlocked(first) ? `<button class="jump" onclick="askJump(${s})">⏩ Pular para cá</button>` : ''}</div>`;
    UNITS.filter(u => u.s === s).forEach(u => {
      h += `<div style="${secVars(s)}"><div class="unit-head"><div class="u-txt"><small>Unidade ${u.id + 1}</small><strong>${u.t}</strong></div><button class="guide-btn" onclick="openGuide(${u.id})">📖 Guia</button></div><div class="path">`;
      const side = u.id % 2 ? 'left:calc(50% + 92px)' : 'left:calc(50% - 188px)';
      NODES.filter(n => n.u === u.id).forEach(n => {
        const st = S.done[n.key] ? 'done' : !unlocked(n.idx) ? 'locked' : '';
        const isCur = n.idx === cur;
        h += `<div class="node-wrap" style="transform:translateX(${OFF[n.idx % 8]}px)">${isCur ? `<div class="start-tip">${S.done[n.key] ? 'Revisar' : n.idx === 0 ? 'Começar' : 'Continuar'}</div>` : ''}<button class="node ${st} ${isCur ? 'current' : ''}" onclick="tapNode(${n.idx})"><span class="ic">${st === 'done' ? '✔️' : n.ic}</span></button><div class="node-label">${n.name}</div></div>`;
      });
      h += `<div class="path-mascot" style="${side};top:60px">${mascot(u.id % 3 === 1 ? 'think' : 'happy', 'mas')}</div></div></div>`;
    });
  });
  h += `<div class="path-end">${mascot('wow').replace('class="mas"', 'class="mas" style="width:110px"')}<br>Chegou até aqui? Você é fluente! 🎉</div>`;
  return h;
}
function askJump(s) {
  sheet(`${mascot('wow')}<h3>Pular para ${SECTIONS[s].t}?</h3><p>Vamos liberar a seção ${s + 1} (${SECTIONS[s].lvl}) e todas as anteriores. Você pode voltar e fazer qualquer lição quando quiser.</p><button class="btn" onclick="S.jump=Math.max(S.jump,secStart(${s}));save();closeSheet();render();scrollToCurrent()">Sim, pular</button><button class="link" onclick="closeSheet()">Agora não</button>`);
}
function tapNode(i) {
  const n = NODES[i], u = UNITS[n.u];
  if (!unlocked(i)) { SFX.bad(); toast('🔒 Complete a lição anterior para liberar esta'); return; }
  SFX.tap();
  sheet(`<div style="${secVars(u.s)}"><div style="font-size:54px">${n.ic}</div><h3>${n.name} · ${u.t}</h3><p>${n.desc}${!S.guides[u.id] && n.k === 'l1' ? '<br><br>💡 Dica: leia o <b>Guia</b> da unidade antes, é rapidinho!' : ''}</p><button class="btn sec" onclick="closeSheet();startNode(${i})">${S.done[n.key] ? 'Praticar de novo' : 'Começar · +' + (n.k === 'rv' ? 20 : 10) + ' XP'}</button>${!S.guides[u.id] ? `<button class="link" onclick="closeSheet();openGuide(${u.id})">Ler o guia primeiro</button>` : ''}</div>`);
}

/* ---------- Guia ---------- */
function guideHTML(u) {
  return `<div class="guide" style="${secVars(u.s)}"><div class="hero">${mascot('happy')}<div><small>Unidade ${u.id + 1} · ${SECTIONS[u.s].lvl}</small><h2>${u.t}</h2></div></div><div class="txt">${u.tip}</div><h3>Exemplos</h3>${u.ex.map(e => `<div class="ex-row">${sayBtn(e[0])}<div><b>${esc(e[0])}</b><small>${esc(e[1])}</small></div></div>`).join('')}<h3>Palavras da unidade</h3>${u.w.map(w => `<div class="ex-row"><span style="font-size:26px">${w[2]}</span><div style="flex:1"><b>${esc(w[0])}</b><small>${esc(w[1])}</small></div>${sayBtn(w[0])}</div>`).join('')}</div>`;
}
function openGuide(id) {
  const u = UNITS[id]; S.guides[id] = true; save(); SAYS = [];
  const first = NODES.find(n => n.u === id && !S.done[n.key]) || NODES.find(n => n.u === id);
  L = null;
  showOverlay(`<div class="lhead"><button class="xbtn" onclick="closeOverlay()">✕</button><div style="flex:1;font-weight:900;color:var(--ink2);text-transform:uppercase;letter-spacing:.8px;font-size:14px">Guia da unidade</div></div><div class="lbody">${guideHTML(u)}</div><div class="lfoot"><div class="inner">${unlocked(first.idx) ? `<button class="btn" style="${secVars(u.s)};background:var(--c);box-shadow:0 4px 0 var(--d)" onclick="startNode(${first.idx})">Começar: ${first.name}</button>` : `<button class="btn" onclick="closeOverlay()">Entendi</button>`}</div></div>`);
}

/* ---------- Geração de exercícios ---------- */
function tok(s) { return s.split(/\s+/).map(t => t.replace(/^[¿¡"“(]+|[.,!?;:"”)]+$/g, '')).filter(Boolean); }
const CONTR = {"i'm":'i am',"you're":'you are',"he's":'he is',"she's":'she is',"it's":'it is',"we're":'we are',"they're":'they are',"don't":'do not',"doesn't":'does not',"didn't":'did not',"can't":'cannot',"won't":'will not',"isn't":'is not',"aren't":'are not',"wasn't":'was not',"weren't":'were not',"haven't":'have not',"hasn't":'has not',"hadn't":'had not',"i'll":'i will',"you'll":'you will',"we'll":'we will',"they'll":'they will',"she'll":'she will',"he'll":'he will',"let's":'let us',"i've":'i have',"we've":'we have',"you've":'you have',"i'd":'i would',"you'd":'you would',"couldn't":'could not',"shouldn't":'should not',"wouldn't":'would not',"that's":'that is',"what's":'what is',"there's":'there is',"o'clock":'oclock'};
function norm(s) { return s.toLowerCase().replace(/[’`´]/g, "'").replace(/[.,!?;:"“”¿¡()]/g, ' ').split(/\s+/).filter(Boolean).map(w => CONTR[w] || w).join(' ').replace(/\bcan not\b/g, 'cannot'); }
function lev(a, b) { const m = a.length, n = b.length; let p = Array.from({length:n + 1}, (_, j) => j); for (let i = 1; i <= m; i++) { const c = [i]; for (let j = 1; j <= n; j++) c[j] = Math.min(p[j] + 1, c[j - 1] + 1, p[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1)); p = c; } return p[n]; }
const others = (arr, x, n) => shuf(arr.filter(y => y !== x)).slice(0, n);
const near = u => UNITS.filter(v => Math.abs(v.id - u.id) <= 2 && v.id !== u.id);

const EX = {
  intro: (u, w) => ({k:'intro', u:u.id, w}),
  tip: u => ({k:'tip', u:u.id}),
  pickImg: (u, w) => ({k:'pickimg', u:u.id, w, a:w[0], opts:shuf([w, ...others(u.w, w, 3)])}),
  pickPT: (u, w) => { const o = shuf([w, ...others(u.w, w, 2)]); return {k:'mcq', u:u.id, kind:'Palavra', title:'O que significa?', say:w[0], q:w[0], opts:o.map(x => x[1]), a:o.indexOf(w), ref:['w', u.id, u.w.indexOf(w)]}; },
  pickEN: (u, w) => { const o = shuf([w, ...others(u.w, w, 2)]); return {k:'mcq', u:u.id, kind:'Palavra', title:`Como se diz “${w[1]}”?`, opts:o.map(x => x[0]), a:o.indexOf(w), sayOpts:true, sayAns:w[0], ref:['w', u.id, u.w.indexOf(w)]}; },
  listenWord: (u, w) => { const o = shuf([w, ...others(u.w, w, 3)]); return {k:'mcq', u:u.id, kind:'Escuta', title:'Toque no que você ouvir', listen:w[0], opts:o.map(x => x[0]), a:o.indexOf(w), ref:['w', u.id, u.w.indexOf(w)]}; },
  match: (u, ws) => ({k:'match', u:u.id, pairs:(ws || shuf(u.w).slice(0, 5)).map(w => [w[0], w[1]])}),
  bank(u, f, dir) {
    const fi = u.f.indexOf(f);
    if (dir === 'en2pt') {
      const ans = tok(f[1]), have = new Set(ans.map(t => t.toLowerCase()));
      const pool = shuf(u.f.filter(x => x !== f).flatMap(x => tok(x[1]))).filter(t => !have.has(t.toLowerCase()));
      const extra = [...new Set(pool)].slice(0, Math.min(4, Math.max(2, 9 - ans.length)));
      return {k:'bank', u:u.id, dir, src:f[0], ans, tiles:shuf(ans.concat(extra)), say:f[0], ref:['f', u.id, fi]};
    }
    const ans = tok(f[0]), have = new Set(ans.map(t => t.toLowerCase()));
    const pool = shuf(u.f.filter(x => x !== f).flatMap(x => tok(x[0])).concat(u.w.map(w => w[0]).filter(w => !/\s/.test(w)))).filter(t => !have.has(t.toLowerCase()));
    const extra = [...new Set(pool)].slice(0, Math.min(4, Math.max(2, 9 - ans.length)));
    return {k:'bank', u:u.id, dir, src:f[1], ans, tiles:shuf(ans.concat(extra)), say:f[0], ref:['f', u.id, fi]};
  },
  fill(u, f) {
    const t = tok(f[0]); const words = u.w.map(w => w[0].toLowerCase());
    let i = t.findIndex(x => words.includes(x.toLowerCase()));
    if (i < 0) { let best = 0; t.forEach((x, j) => { if (x.length > t[best].length) best = j; }); i = best; }
    const raw = f[0].split(/\s+/); const a = t[i];
    const cand = [...new Set(u.f.flatMap(x => tok(x[0])).concat(u.w.map(w => w[0]).filter(w => !/\s/.test(w))))].filter(x => x.toLowerCase() !== a.toLowerCase() && x.length > 1);
    const opts = shuf([a, ...shuf(cand).slice(0, 3)]);
    const punct = (raw[i].match(/[.,!?;:]+$/) || [''])[0];
    return {k:'fill', u:u.id, before:raw.slice(0, i).join(' '), after:punct + (i < raw.length - 1 ? ' ' + raw.slice(i + 1).join(' ') : ''), a, opts, pt:f[1], say:f[0], ref:['f', u.id, u.f.indexOf(f)]};
  },
  type: (u, f) => tok(f[0]).length > 9 ? EX.bank(u, f, 'pt2en') : ({k:'type', u:u.id, pt:f[1], en:f[0], say:f[0], ref:['f', u.id, u.f.indexOf(f)]}),
  choose(u, f) { const o = shuf([f, ...others(u.f, f, 2)]); return {k:'mcq', u:u.id, kind:'Leitura', title:'Escolha a tradução correta', say:f[0], q:f[0], opts:o.map(x => x[1]), a:o.indexOf(f), ref:['f', u.id, u.f.indexOf(f)]}; },
  listen: (u, f) => S.set.listen ? EX.bank(u, f, 'listen') : EX.bank(u, f, 'en2pt')
};
function buildLesson(n) {
  const u = UNITS[n.u], W = u.w, F = u.f, it = [];
  if (n.k === 'l1') {
    W.forEach((w, i) => { it.push(EX.intro(u, w)); it.push(i % 3 === 2 ? EX.pickPT(u, w) : EX.pickImg(u, w)); if (i % 2 === 1) it.push(EX.match(u, W.slice(Math.max(0, i - 3), i + 1))); });
    it.push(EX.match(u));
    if (S.set.listen) { it.push(EX.listenWord(u, rnd(W))); it.push(EX.listenWord(u, rnd(W))); }
    it.push(EX.pickEN(u, rnd(W)));
    return it;
  }
  if (n.k === 'l2') {
    if (!S.guides[u.id]) it.push(EX.tip(u));
    it.push(EX.bank(u, F[0], 'en2pt'), EX.bank(u, F[1], 'en2pt'), EX.fill(u, F[2]), EX.bank(u, F[0], 'pt2en'), EX.choose(u, F[3]), EX.bank(u, F[3], 'en2pt'), EX.bank(u, F[2], 'pt2en'), EX.fill(u, F[4]), EX.bank(u, F[1], 'pt2en'), EX.bank(u, F[5], 'en2pt'), EX.choose(u, F[5]));
    return it;
  }
  if (n.k === 'l3') {
    it.push(EX.listen(u, F[4]), EX.bank(u, F[4], 'pt2en'), EX.type(u, F[0]), EX.listen(u, F[1]), EX.match(u), EX.fill(u, F[5]), EX.type(u, F[3]), EX.choose(u, F[1]), EX.bank(u, F[5], 'pt2en'), EX.listen(u, F[2]), EX.type(u, F[4]));
    return it;
  }
  // revisão: mistura da unidade + unidades anteriores próximas
  const gens = [() => EX.bank(u, rnd(F), 'en2pt'), () => EX.bank(u, rnd(F), 'pt2en'), () => EX.listen(u, rnd(F)), () => EX.fill(u, rnd(F)), () => EX.type(u, rnd(F)), () => EX.choose(u, rnd(F)), () => EX.pickEN(u, rnd(W))];
  for (let i = 0; i < 10; i++) it.push(gens[i % gens.length]());
  it.push(EX.match(u));
  const prev = UNITS.filter(v => v.id < u.id); if (prev.length) { const p = rnd(prev); it.push(EX.pickPT(p, rnd(p.w)), EX.bank(p, rnd(p.f), 'pt2en')); }
  return shuf(it);
}
function startNode(i) { const n = NODES[i], u = UNITS[n.u]; runLesson({items:buildLesson(n), key:n.key, s:u.s, xp:n.k === 'rv' ? 20 : 10, title:`${n.name} · ${u.t}`, unitEnd:n.k === 'rv'}); }

/* ---------- Motor de lição ---------- */
let L = null;
function showOverlay(html) { $('#overlay').innerHTML = html; $('#overlay').classList.add('show'); document.body.style.overflow = 'hidden'; }
function closeOverlay() { $('#overlay').classList.remove('show'); $('#overlay').innerHTML = ''; document.body.style.overflow = ''; L = null; render(); if (tab === 'learn') scrollToCurrent(); }
function runLesson(o) { L = Object.assign({queue:o.items.slice(), done:0, ok:0, bad:0, combo:0, start:Date.now(), graded:0}, o); L.sec = o.s != null ? o.s : 0; showEx(); }
const ungraded = k => k === 'intro' || k === 'tip' || k === 'story' || k === 'seqshow';
function showEx() {
  SAYS = [];
  const ex = L.queue[0]; L.ex = ex; L.ready = false; L.sel = null; L.placed = []; L.checked = false;
  const pct = L.done / (L.done + L.queue.length) * 100;
  const body = R[ex.k](ex);
  const foot = ungraded(ex.k) ? `<button class="btn" id="chk" onclick="next()">${ex.k === 'tip' ? 'Entendi!' : ex.k === 'story' ? 'Responder perguntas' : ex.k === 'seqshow' ? 'Já memorizei' : 'Continuar'}</button>` : ex.k === 'match' ? '' : `<button class="btn" id="chk" disabled onclick="check()">Verificar</button>`;
  showOverlay(`<div class="lhead"><button class="xbtn" onclick="askQuit()">✕</button><div class="lprog"><div style="width:${Math.max(4, pct)}%"></div></div><div class="combo">${L.combo >= 3 ? '⚡' + L.combo : ''}</div></div><div class="lbody" id="lbody">${body}</div><div class="lfoot" id="lfoot"><div class="inner">${foot}</div></div>`);
  if (S_AUTO[ex.k]) setTimeout(() => S_AUTO[ex.k](ex), 350);
}
const S_AUTO = {
  intro: ex => speak(ex.w[0]),
  mcq: ex => { if (ex.listen) speak(ex.listen); else if (ex.say) speak(ex.say); },
  bank: ex => { if (ex.dir !== 'pt2en') speak(ex.say); },
  pickimg: () => {}, fill: () => {}, type: () => {}
};
function setReady(v) { L.ready = v; const b = $('#chk'); if (b) b.disabled = !v; }
function speakerBubble(textHTML, say, mood = 'happy') { return `<div class="speaker">${mascot(mood)}<div class="bubble">${say ? sayBtn(say) : ''}<div class="words">${textHTML}</div></div></div>`; }
const kindTag = t => `<div class="qkind">${t}</div>`;

const R = {
  intro(ex) {
    const u = UNITS[ex.u], w = ex.w; const exs = u.f.filter(f => f[0].toLowerCase().includes(w[0].toLowerCase())).slice(0, 2);
    return `<div class="intro"><span class="badge">✨ Palavra nova</span><div class="bigemo">${w[2]}</div><div class="en">${esc(w[0])} ${sayBtn(w[0])}</div><div class="pt">${esc(w[1])}</div>${exs.length ? `<div class="exs">${exs.map(f => `<div class="ex-row">${sayBtn(f[0])}<div><b>${esc(f[0])}</b><small>${esc(f[1])}</small></div></div>`).join('')}</div>` : ''}</div>`;
  },
  tip: ex => guideHTML(UNITS[ex.u]),
  story(ex) { return `${kindTag('📚 Leitura · ' + ex.level)}<div class="qtitle">${esc(ex.title)}</div><div class="card"><div style="display:flex;gap:10px;margin-bottom:10px">${sayBtn(ex.story)}<button class="spk" style="background:#9b5de5;box-shadow:0 3px 0 #7a3fc4" onclick="speak(L.ex.story,true)">${SLOW}</button></div><div class="story words">${wordsHTML(ex.story)}</div></div><div class="vocab">${ex.vocab.map(v => `<span class="vtag">${esc(v[0])} = ${esc(v[1])}</span>`).join('')}</div><p style="color:var(--ink2);font-weight:700;font-size:14px">Toque em qualquer palavra para ouvir.</p>`; },
  seqshow: ex => `${kindTag('⚡ Atenção')}<div class="qtitle">Memorize esta sequência</div><div class="card"><div class="seq">${ex.seq.join('')}</div></div><p class="sub" style="text-align:center;color:var(--ink2);font-weight:700">Rodada ${ex.round} de 6 · ${ex.seq.length} símbolos</p>`,
  mcq(ex) {
    let top = '';
    if (ex.listen) top = `<div class="listen"><button class="big-spk" onclick="speak(L.ex.listen)">${SPK}</button><button class="big-spk slow" onclick="speak(L.ex.listen,true)">${SLOW}</button></div>`;
    else if (ex.say) top = speakerBubble(wordsHTML(ex.q), ex.say);
    else if (ex.q) top = `<div class="card" style="margin-bottom:20px;font-size:18px;font-weight:800;line-height:1.45">${esc(ex.q)}</div>`;
    return `${ex.kind ? kindTag(ex.kind) : ''}<div class="qtitle">${esc(ex.title)}</div>${top}<div class="opts">${ex.opts.map((o, i) => `<button class="opt" id="o${i}" onclick="pickOpt(${i})"><span class="k">${i + 1}</span><span>${esc(o)}</span></button>`).join('')}</div>`;
  },
  pickimg: ex => `${kindTag('Palavra nova')}<div class="qtitle">Qual destas é “${esc(ex.w[1])}”?</div><div class="img-opts">${ex.opts.map((o, i) => `<button class="img-opt" id="o${i}" onclick="pickImg(${i})"><span class="ie">${o[2]}</span><span>${esc(o[0])}</span></button>`).join('')}</div>`,
  match(ex) {
    L.m = {left:shuf(ex.pairs.map((p, i) => [p[0], i])), right:shuf(ex.pairs.map((p, i) => [p[1], i])), sel:null, ok:0, miss:0};
    return `${kindTag('Pares')}<div class="qtitle">Toque nos pares correspondentes</div><div class="match"><div class="col">${L.m.left.map(([t, i], j) => `<button class="mt" id="ml${j}" onclick="tapMatch('l',${j})">${esc(t)}</button>`).join('')}</div><div class="col">${L.m.right.map(([t, i], j) => `<button class="mt" id="mr${j}" onclick="tapMatch('r',${j})">${esc(t)}</button>`).join('')}</div></div>`;
  },
  bank(ex) {
    let top;
    if (ex.dir === 'en2pt') top = `${kindTag('Tradução')}<div class="qtitle">Traduza esta frase</div>${speakerBubble(wordsHTML(ex.src), ex.say)}`;
    else if (ex.dir === 'pt2en') top = `${kindTag('Inglês')}<div class="qtitle">Escreva em inglês</div>${speakerBubble(esc(ex.src), null, 'think')}`;
    else top = `${kindTag('Escuta')}<div class="qtitle">Monte o que você ouvir</div><div class="listen"><button class="big-spk" onclick="speak(L.ex.say)">${SPK}</button><button class="big-spk slow" onclick="speak(L.ex.say,true)">${SLOW}</button></div>`;
    return `${top}<div class="answer-zone" id="az"></div><div class="bank" id="bk">${ex.tiles.map((t, i) => `<button class="wt-tile" id="t${i}" onclick="tapTile(${i})">${esc(t)}</button>`).join('')}</div>${ex.dir === 'listen' ? `<button class="link cant" onclick="cantListen()">Não posso ouvir agora</button>` : ''}`;
  },
  fill: ex => `${kindTag('Complete')}<div class="qtitle">Complete a frase</div><div class="card" style="font-size:20px;font-weight:800;line-height:2">${esc(ex.before)} <span id="blank" style="display:inline-block;min-width:90px;border-bottom:3px solid var(--line);text-align:center;color:var(--blue)">&nbsp;</span>${esc(ex.after)}<div style="font-size:15px;color:var(--ink2);font-weight:700;line-height:1.4;margin-top:6px">💡 ${esc(ex.pt)}</div></div><div class="bank" style="margin-top:24px">${ex.opts.map((o, i) => `<button class="wt-tile" id="o${i}" onclick="pickFill(${i})">${esc(o)}</button>`).join('')}</div>`,
  type: ex => `${kindTag('Escrita')}<div class="qtitle">Escreva em inglês</div>${speakerBubble(esc(ex.pt), null, 'think')}<textarea class="type-area" id="ta" placeholder="Digite em inglês..." autocapitalize="sentences" autocomplete="off" spellcheck="false" oninput="setReady(this.value.trim().length>0)"></textarea><button class="link cant" onclick="toBank()">Prefiro usar o banco de palavras</button>`
};

/* interações */
function pickOpt(i) { if (L.checked) return; L.sel = i; document.querySelectorAll('.opt').forEach((b, j) => b.classList.toggle('sel', j === i)); if (L.ex.sayOpts) speak(L.ex.opts[i]); else SFX.tap(); setReady(true); }
function pickImg(i) { if (L.checked) return; L.sel = i; document.querySelectorAll('.img-opt').forEach((b, j) => b.classList.toggle('sel', j === i)); speak(L.ex.opts[i][0]); setReady(true); }
function pickFill(i) { if (L.checked) return; L.sel = i; document.querySelectorAll('.bank .wt-tile').forEach((b, j) => b.style.borderColor = j === i ? '#84d8ff' : ''); $('#blank').textContent = L.ex.opts[i]; SFX.tap(); setReady(true); }
function tapTile(i) {
  if (L.checked) return; const t = $('#t' + i); if (t.classList.contains('ghost')) return;
  t.classList.add('ghost'); L.placed.push(i); SFX.tap();
  if (L.ex.dir !== 'en2pt') speak(L.ex.tiles[i]);
  drawPlaced();
}
function untap(k) { if (L.checked) return; const i = L.placed[k]; L.placed.splice(k, 1); $('#t' + i).classList.remove('ghost'); SFX.tap(); drawPlaced(); }
function drawPlaced() { $('#az').innerHTML = L.placed.map((i, k) => `<button class="wt-tile" onclick="untap(${k})">${esc(L.ex.tiles[i])}</button>`).join(''); setReady(L.placed.length > 0); }
function tapMatch(side, j) {
  const m = L.m, el = $('#m' + side + j); if (el.classList.contains('gone')) return;
  if (side === 'l') speak(m.left[j][0]); else SFX.tap();
  if (!m.sel || m.sel[0] === side) { document.querySelectorAll('.mt.sel').forEach(e => e.classList.remove('sel')); el.classList.add('sel'); m.sel = [side, j]; return; }
  const l = side === 'l' ? j : m.sel[1], r = side === 'r' ? j : m.sel[1];
  const le = $('#ml' + l), re = $('#mr' + r); m.sel = null;
  document.querySelectorAll('.mt.sel').forEach(e => e.classList.remove('sel'));
  if (m.left[l][1] === m.right[r][1]) {
    SFX.pair(); [le, re].forEach(e => e.classList.add('ok')); setTimeout(() => [le, re].forEach(e => { e.classList.remove('ok'); e.classList.add('gone'); }), 450);
    if (++m.ok === m.left.length) setTimeout(() => finishCheck(true, m.miss ? 'Você errou ' + m.miss + ' par(es), mas acertou no fim. 👏' : ''), 550);
  } else { m.miss++; SFX.bad(); [le, re].forEach(e => { e.classList.add('bad'); setTimeout(() => e.classList.remove('bad'), 400); }); }
}
function cantListen() { const ex = L.ex; L.queue[0] = EX.bank(UNITS[ex.u], UNITS[ex.u].f[ex.ref[2]], 'en2pt'); showEx(); }
function toBank() { const ex = L.ex; L.queue[0] = EX.bank(UNITS[ex.u], UNITS[ex.u].f[ex.ref[2]], 'pt2en'); showEx(); }

/* verificação */
const PRAISE = ['Muito bem!', 'Excelente!', 'Perfeito!', 'Mandou bem!', 'Isso aí!', 'Incrível!', 'Show!'];
function check() {
  if (!L.ready || L.checked) return;
  const ex = L.ex; let ok = false, correct = '', note = '';
  if (ex.k === 'mcq') { ok = L.sel === ex.a; correct = ex.opts[ex.a]; document.getElementById('o' + ex.a).classList.add('right'); if (!ok) $('#o' + L.sel).classList.add('wrong'); }
  else if (ex.k === 'pickimg') { ok = ex.opts[L.sel] === ex.w; const ai = ex.opts.indexOf(ex.w); correct = ex.w[0]; $('#o' + ai).classList.add('right'); if (!ok) $('#o' + L.sel).classList.add('wrong'); }
  else if (ex.k === 'fill') { ok = ex.opts[L.sel].toLowerCase() === ex.a.toLowerCase(); correct = ex.say; }
  else if (ex.k === 'bank') { const got = L.placed.map(i => ex.tiles[i]).join(' '); ok = norm(got) === norm(ex.ans.join(' ')); correct = ex.dir === 'en2pt' ? UNITS[ex.u].f[ex.ref[2]][1] : ex.say; }
  else if (ex.k === 'type') {
    const got = norm($('#ta').value), want = norm(ex.en); correct = ex.en;
    if (got === want) ok = true; else if (lev(got, want) <= Math.max(1, Math.floor(want.length / 14))) { ok = true; note = `Quase perfeito! Atenção à escrita: <b>${esc(ex.en)}</b>`; }
  }
  finishCheck(ok, note, correct);
}
function finishCheck(ok, note = '', correct = '') {
  const ex = L.ex; L.checked = true; L.graded++; S.ans++;
  if (ok) { L.ok++; S.ok++; L.combo++; SFX.ok(); } else { L.bad++; L.combo = 0; SFX.bad(); }
  if (!ok) { L.queue.push(Object.assign({}, ex, {retry:true})); if (ex.ref && !S.mist.some(m => m.join() === ex.ref.join())) { S.mist.push(ex.ref); if (S.mist.length > 60) S.mist.shift(); } }
  else if (ex.retry && ex.ref) S.mist = S.mist.filter(m => m.join() !== ex.ref.join());
  save();
  const say = ex.say || (ex.k === 'pickimg' ? ex.w[0] : ex.sayAns);
  if (say) setTimeout(() => speak(say), ok ? 250 : 350);
  const foot = $('#lfoot'); foot.className = 'lfoot ' + (ok ? 'ok' : 'bad');
  let msg = '';
  if (ok) msg = note || (ex.k === 'bank' && ex.dir === 'listen' ? 'Significado: ' + esc(UNITS[ex.u].f[ex.ref[2]][1]) : ex.k === 'type' || ex.k === 'fill' ? esc(ex.say) : '');
  else msg = `Resposta correta:<br><b>${esc(correct)}</b>`;
  if (ex.why) msg += `<div class="why">${esc(ex.why)}</div>`;
  if (!ok && !ex.retry && ex.k !== 'match') msg += `<div class="why">Tudo bem errar! Ela volta no fim para você fixar. 💪</div>`;
  foot.innerHTML = `<div class="inner"><div class="fb"><div class="fi">${ok ? '✅' : '💡'}</div><div><h3>${ok ? rnd(PRAISE) : 'Quase lá!'}</h3><p>${msg}</p></div></div><button class="btn ${ok ? '' : 'red'}" onclick="next()">Continuar</button></div>`;
  const pb = document.querySelector('.lprog div'); if (pb && ok) pb.style.width = Math.max(4, (L.done + 1) / (L.done + L.queue.length) * 100) + '%';
  const cb = document.querySelector('.combo'); if (cb) cb.textContent = L.combo >= 3 ? '⚡' + L.combo : '';
}
function next() { L.queue.shift(); L.done++; if (!L.queue.length) return finishLesson(); showEx(); }
function askQuit() { sheet(`${mascot('sad')}<h3>Espera! Quer mesmo sair?</h3><p>Se sair agora, o progresso desta lição será perdido.</p><button class="btn blue" onclick="closeSheet()">Continuar estudando</button><button class="link" style="color:var(--red)" onclick="closeSheet();closeOverlay()">Sair da lição</button>`); }
function finishLesson() {
  const secs = Math.round((Date.now() - L.start) / 1000), acc = L.graded ? Math.round(L.ok / L.graded * 100) : 100;
  const first = L.key && !S.done[L.key]; let xp = L.xp || 10; if (L.bad === 0 && L.graded) xp += 5; if (!first && L.key) xp = Math.round(xp / 2);
  if (L.key) S.done[L.key] = true;
  S.xp += xp; S.lessons++; S.time += secs; if (L.onDone) L.onDone(); save();
  SFX.win(); confetti();
  const mood = acc >= 80 ? 'happy' : 'wow';
  const title = L.unitEnd && first ? 'Unidade concluída! 🏆' : acc === 100 ? 'Lição perfeita! ✨' : 'Lição concluída!';
  const phrase = acc === 100 ? 'Você não errou nada. Que orgulho!' : acc >= 80 ? 'Ótimo trabalho! Você está evoluindo muito.' : 'Cada erro é aprendizado. Continue assim!';
  showOverlay(`<div class="done-screen">${mascot(mood)}<h1>${title}</h1><p>${phrase}</p><div class="res"><div style="--rc:#ffb020"><small>XP ganho</small><b>⚡ ${xp}</b></div><div style="--rc:#58b800"><small>Precisão</small><b>🎯 ${acc}%</b></div><div style="--rc:#2c9cf2"><small>Tempo</small><b>⏱ ${Math.floor(secs / 60)}:${String(secs % 60).padStart(2, '0')}</b></div></div></div><div class="lfoot"><div class="inner"><button class="btn" onclick="closeOverlay()">Continuar</button></div></div>`);
  L = null;
}

/* ---------- Praticar ---------- */
function practiceHTML() {
  const lw = learnedWords().length, lu = learnedUnits(), sentU = UNITS.filter(u => S.done[u.id + 'l2']);
  const t = (ic, bg, title, sub, fn, dis) => `<button class="ptile" style="${dis ? 'opacity:.55' : ''}" onclick="${dis ? `toast('${dis}')` : fn}"><div class="em" style="background:${bg}">${ic}</div><div><strong>${title}</strong><small>${sub}</small></div><span class="chev">›</span></button>`;
  return `${topbar()}<div class="page"><h1>Praticar</h1><p class="sub">Revise o que já aprendeu, sem pressa e sem limites.</p><div class="tile-list">
  ${t('🩹', '#ffe7e8', 'Revisar meus erros', S.mist.length ? `${S.mist.length} item(ns) para reforçar` : 'Nenhum erro guardado. Parabéns!', 'practiceMistakes()', S.mist.length ? '' : 'Você não tem erros para revisar 🎉')}
  ${t('🔤', '#e3f8ee', 'Palavras aprendidas', `${lw} palavras para treinar`, 'practiceWords()', lw >= 4 ? '' : 'Complete a primeira lição de Palavras para liberar')}
  ${t('🎧', '#e2f1fd', 'Treino de escuta', 'Ouça e monte frases em inglês', 'practiceListen()', sentU.length ? '' : 'Complete uma lição de Frases para liberar')}
  ${t('✍️', '#fff1df', 'Treino de escrita', 'Escreva frases em inglês', 'practiceWrite()', sentU.length ? '' : 'Complete uma lição de Frases para liberar')}
  </div><div class="grp-title">Leituras</div><div class="tile-list">${STORIES.map((s, i) => t('📖', '#f2eafd', s.title, `${s.level} · texto + 3 perguntas${S.done['st' + i] ? ' · ✔️ feito' : ''}`, `startStory(${i})`)).join('')}</div>
  <div class="grp-title">Jogos da mente</div><div class="tile-list">
  ${t('🧠', '#e3f8ee', 'Memória', `Encontre os pares${S.best ? ' · recorde: ' + S.best + ' tentativas' : ''}`, 'startMemory()')}
  ${t('🧩', '#fff1df', 'Raciocínio lógico', `${PUZZLES.length} desafios de lógica`, 'startLogic()')}
  ${t('⚡', '#e2f1fd', 'Atenção', 'Memorize a sequência de símbolos', 'startSeq()')}
  </div></div>`;
}
function practiceMistakes() {
  const it = shuf(S.mist).slice(0, 10).map(([t, ui, i]) => { const u = UNITS[ui]; if (t === 'w') return rnd([EX.pickPT, EX.pickEN, EX.pickImg])(u, u.w[i]); const f = u.f[i]; return rnd([() => EX.bank(u, f, 'en2pt'), () => EX.bank(u, f, 'pt2en'), () => EX.fill(u, f)])(); });
  runLesson({items:it, title:'Revisar erros', xp:10});
}
function practiceWords() { const lw = shuf(learnedWords()).slice(0, 10); const it = lw.map(({w, u}, i) => [EX.pickPT, EX.pickEN, EX.pickImg, EX.listenWord][i % (S.set.listen ? 4 : 3)](u, w)); it.push(EX.match(lw[0].u, shuf(lw).slice(0, 5).map(x => x.w))); runLesson({items:shuf(it), title:'Palavras', xp:10}); }
function practiceListen() { const us = UNITS.filter(u => S.done[u.id + 'l2']); const it = []; for (let i = 0; i < 8; i++) { const u = rnd(us); it.push(EX.bank(u, rnd(u.f), S.set.listen ? 'listen' : 'en2pt')); } runLesson({items:it, title:'Escuta', xp:10}); }
function practiceWrite() { const us = UNITS.filter(u => S.done[u.id + 'l2']); const it = []; for (let i = 0; i < 8; i++) { const u = rnd(us); it.push(i % 2 ? EX.type(u, rnd(u.f)) : EX.fill(u, rnd(u.f))); } runLesson({items:it, title:'Escrita', xp:10}); }
function startStory(i) { const s = STORIES[i]; const it = [Object.assign({k:'story'}, s)].concat(s.q.map(q => ({k:'mcq', kind:'Interpretação', title:q[0], opts:q[1], a:q[2], why:q[3], sayOpts:true}))); runLesson({items:it, key:'st' + i, title:s.title, xp:10}); }
function startLogic() { const it = shuf(PUZZLES).slice(0, 6).map(p => ({k:'mcq', kind:'🧩 Lógica', title:'Desafio', q:p.q, opts:p.opts, a:p.a, why:p.why})); runLesson({items:it, title:'Lógica', xp:10}); }
function startSeq() {
  const sym = ['🔵', '🟡', '🟣', '🟢', '🔴', '🟠'], it = [];
  for (let r = 1; r <= 6; r++) {
    const n = 2 + r, seq = Array.from({length:n}, () => rnd(sym)), opts = [seq.join('')];
    while (opts.length < 3) { const v = seq.slice(); const a = Math.random() * n | 0; let b = Math.random() * n | 0; if (Math.random() < .5 && a !== b) [v[a], v[b]] = [v[b], v[a]]; else v[a] = rnd(sym.filter(x => x !== v[a])); const j = v.join(''); if (!opts.includes(j)) opts.push(j); }
    const o = shuf(opts);
    it.push({k:'seqshow', seq, round:r}, {k:'mcq', kind:'⚡ Atenção', title:'Qual era a sequência?', opts:o, a:o.indexOf(seq.join(''))});
  }
  runLesson({items:it, title:'Atenção', xp:10});
}
/* memória (tela própria) */
let MEM = null;
function startMemory() { const ic = shuf(['🌙', '⭐', '🌿', '🔥', '💎', '🚀', '🎈', '🍀', '🐱', '🎵']).slice(0, 8); MEM = {grid:shuf(ic.concat(ic)), open:[], ok:[], moves:0, lock:false}; L = null; drawMemory(); }
function drawMemory() {
  const done = MEM.ok.length === MEM.grid.length;
  showOverlay(`<div class="lhead"><button class="xbtn" onclick="closeOverlay()">✕</button><div class="lprog"><div style="width:${Math.max(4, MEM.ok.length / MEM.grid.length * 100)}%"></div></div><div class="combo">${MEM.moves}</div></div><div class="lbody">${kindTag('🧠 Memória')}<div class="qtitle">${done ? 'Você conseguiu! 🎉' : 'Encontre todos os pares'}</div><div class="mem-grid">${MEM.grid.map((v, i) => { const o = MEM.open.includes(i) || MEM.ok.includes(i); return `<button class="mem ${o ? 'open' : ''} ${MEM.ok.includes(i) ? 'ok' : ''}" onclick="flipMem(${i})"><span>${o ? v : '?'}</span></button>`; }).join('')}</div><p style="text-align:center;color:var(--ink2);font-weight:800;margin-top:18px">Tentativas: ${MEM.moves}${S.best ? ' · Recorde: ' + S.best : ''}</p></div><div class="lfoot"><div class="inner">${done ? `<button class="btn" onclick="startMemory()">Jogar de novo</button>` : `<button class="btn ghost" onclick="startMemory()">Reiniciar</button>`}</div></div>`);
}
function flipMem(i) {
  if (MEM.lock || MEM.open.includes(i) || MEM.ok.includes(i)) return;
  MEM.open.push(i); SFX.tap();
  if (MEM.open.length === 2) {
    MEM.moves++; const [a, b] = MEM.open;
    if (MEM.grid[a] === MEM.grid[b]) { MEM.ok.push(a, b); MEM.open = []; SFX.pair(); if (MEM.ok.length === MEM.grid.length) { if (!S.best || MEM.moves < S.best) S.best = MEM.moves; S.xp += 5; save(); SFX.win(); confetti(); } }
    else { MEM.lock = true; setTimeout(() => { MEM.open = []; MEM.lock = false; drawMemory(); }, 800); }
  }
  drawMemory();
}

/* ---------- Palavras ---------- */
let wq = '';
function wordsPageHTML() {
  const lu = learnedUnits();
  if (!lu.length) return `${topbar()}<div class="page"><h1>Suas palavras</h1><div class="empty">${mascot('think').replace('class="mas"', 'class="mas" style="width:120px"')}<br>Ainda não tem palavras aqui.<br>Faça a primeira lição de <b>Palavras</b> e elas aparecem nesta lista, com áudio!</div></div>`;
  return `${topbar()}<div class="page"><h1>Suas palavras</h1><p class="sub">${learnedWords().length} palavras e expressões aprendidas. Toque para ouvir.</p><input class="search" placeholder="🔍 Buscar em inglês ou português" value="${esc(wq)}" oninput="wq=this.value;drawWordList()"><div id="wl">${wordListHTML()}</div></div>`;
}
function wordListHTML() {
  const q = wq.trim().toLowerCase(); let h = '';
  learnedUnits().forEach(u => { const ws = u.w.filter(w => !q || w[0].toLowerCase().includes(q) || w[1].toLowerCase().includes(q)); if (!ws.length) return; h += `<div class="grp-title">Unidade ${u.id + 1} · ${u.t}</div>` + ws.map(w => `<div class="wrow"><span class="we">${w[2]}</span><div class="wt"><b>${esc(w[0])}</b><small>${esc(w[1])}</small></div>${sayBtn(w[0])}</div>`).join(''); });
  return h || '<div class="empty">Nada encontrado.</div>';
}
function drawWordList() { $('#wl').innerHTML = wordListHTML(); }

/* ---------- Perfil ---------- */
function profileHTML() {
  const doneN = NODES.filter(n => S.done[n.key]).length;
  let lvl = 0; SECTIONS.forEach((s, i) => { if (NODES.some(n => UNITS[n.u].s === i && S.done[n.key]) || S.jump >= secStart(i) && i > 0) lvl = i; });
  const acc = S.ans ? Math.round(S.ok / S.ans * 100) : 0;
  const sw = (k, label, sub) => `<div class="toggle"><div>${label}${sub ? `<br><small style="color:var(--ink2);font-weight:700">${sub}</small>` : ''}</div><button class="sw ${S.set[k] ? 'on' : ''}" onclick="S.set['${k}']=!S.set['${k}'];save();render()"></button></div>`;
  return `${topbar()}<div class="page"><div class="card" style="display:flex;gap:14px;align-items:center;background:${SECTIONS[lvl].l};border-color:transparent">${mascot('happy').replace('class="mas"', 'class="mas" style="width:96px;flex-shrink:0"')}<div><small style="font-weight:900;color:${SECTIONS[lvl].d};letter-spacing:.8px;text-transform:uppercase;font-size:12px">Seu nível</small><h1 style="margin:2px 0">${SECTIONS[lvl].lvl} · ${SECTIONS[lvl].t}</h1><div style="color:var(--ink2);font-weight:700;font-size:14px">${doneN} de ${NODES.length} lições concluídas</div></div></div>
  <div class="grp-title">Estatísticas</div><div class="stats"><div class="stat"><span class="si">⚡</span><div><b>${S.xp}</b><small>XP total</small></div></div><div class="stat"><span class="si">📚</span><div><b>${learnedWords().length}</b><small>Palavras</small></div></div><div class="stat"><span class="si">✅</span><div><b>${S.lessons}</b><small>Lições feitas</small></div></div><div class="stat"><span class="si">🎯</span><div><b>${acc}%</b><small>Precisão</small></div></div></div>
  <div class="grp-title">Caminho até a fluência</div><div class="card">${SECTIONS.map((s, i) => { const ns = NODES.filter(n => UNITS[n.u].s === i), d = ns.filter(n => S.done[n.key]).length; return `<div class="sec-row" style="--c:${s.c}"><div class="r1">${s.lvl} · ${s.t}<span>${d}/${ns.length}</span></div><div class="pbar"><div style="width:${d / ns.length * 100}%"></div></div></div>`; }).join('')}</div>
  <div class="grp-title">Configurações</div><div class="card" style="padding:4px 16px">${sw('sfx', 'Efeitos sonoros')}${sw('audio', 'Voz em inglês', 'Pronúncia das palavras e frases')}${sw('listen', 'Exercícios de escuta', 'Desative se não puder usar som')}<div class="toggle"><div>Velocidade da voz</div><div class="seg">${[['Lenta', .7], ['Normal', .9], ['Rápida', 1.1]].map(([n, v]) => `<button class="${S.set.rate === v ? 'on' : ''}" onclick="S.set.rate=${v};save();render();speak('Hello! How are you today?')">${n}</button>`).join('')}</div></div></div>
  <div style="display:grid;gap:12px;margin-top:18px"><button class="btn ghost" onclick="speak('Hello! Welcome to Mente Plus. Let\\'s learn English together!')">🔊 Testar a voz</button><button class="btn ghost" onclick="S.onboard=false;wStep=1;save();render()">Mudar meu nível</button><button class="link" style="color:var(--red)" onclick="askReset()">Apagar todo o progresso</button></div>
  <p style="text-align:center;color:#b0b0bd;font-weight:700;font-size:13px;margin-top:20px">Mente+ · 100% grátis · funciona offline</p></div>`;
}
function askReset() { sheet(`${mascot('sad')}<h3>Apagar todo o progresso?</h3><p>Isso apaga lições, XP e palavras salvas neste aparelho. Não dá para desfazer.</p><button class="btn red" onclick="const s=S.set;S=JSON.parse(JSON.stringify(DEF));S.set=s;S.migrated=true;save();closeSheet();wStep=0;render()">Sim, apagar</button><button class="link" onclick="closeSheet()">Cancelar</button>`); }

/* ---------- Botão voltar do Android ---------- */
window.handleBack = function () {
  if (closeSheet()) return true;
  if ($('#overlay').classList.contains('show')) { if (L) askQuit(); else closeOverlay(); return true; }
  if (!S.onboard && wStep === 1) { wStep = 0; render(); return true; }
  if (tab !== 'learn') { go('learn'); return true; }
  return false;
};
document.addEventListener('keydown', e => {
  if (!L || !$('#overlay').classList.contains('show')) return;
  if (e.key === 'Enter' && e.target.tagName !== 'TEXTAREA') { const b = $('#lfoot .btn'); if (b && !b.disabled) b.click(); }
  if (e.key === 'Enter' && e.target.tagName === 'TEXTAREA') { e.preventDefault(); const b = $('#lfoot .btn'); if (b && !b.disabled) b.click(); }
  if (/^[1-4]$/.test(e.key) && L.ex && L.ex.k === 'mcq' && e.target.tagName !== 'TEXTAREA') { const i = +e.key - 1; if (i < L.ex.opts.length) pickOpt(i); }
});
document.addEventListener('click', () => document.querySelectorAll('.gloss').forEach(g => g.remove()));

render();
if (S.onboard) scrollToCurrent();
