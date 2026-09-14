import { chapter, levels, levelById } from './data/chapters.js';
import { worldForLevel, v2LevelById } from './data/levelV2.js';
import { levelRenderers } from './levels/index.js';
import {
  loadProgress,
  saveProgress,
  getPlayerSummary,
  resetProgress,
  setSetting,
  addPlaySeconds,
  markMistakeMastered,
} from './game/progress.js';
import { mountGameScene } from './game/GameHost.js';
import { HomeCityScene } from './game/scenes/HomeCityScene.js';
import { renderShell } from './ui/shell.js';
import { starsText, toast } from './ui/components.js';
import { renderPractice } from './modes/practice.js';
import { renderDuel } from './modes/duel.js';
import { navigate, currentRoute } from './router.js';

const root = document.querySelector('#app');
let state = loadProgress();
let cleanup = null;
let activityStarted = Date.now();
const ctx = () => ({ state, navigate });

const worldNames = {
  supermarket: '超級市場',
  'bus-stop': '公車站',
  park: '公園',
  factory: '工廠',
  construction: '建築工地',
  stadium: '運動場',
  amusement: '遊樂園',
};

function rerender() {
  cleanup?.();
  cleanup = null;
  state = loadProgress();
  document.documentElement.dataset.motion = state.settings.reducedMotion ? 'reduced' : 'full';
  const route = currentRoute();
  if (route.name === 'home') cleanup = home() || null;
  else if (route.name === 'map') map();
  else if (route.name === 'level') level(route.param);
  else if (route.name === 'practice') cleanup = renderPractice(root, ctx()) || null;
  else if (route.name === 'duel') cleanup = renderDuel(root, ctx()) || null;
  else if (route.name === 'mistakes') mistakes();
  else if (route.name === 'achievements') achievements();
  else if (route.name === 'report') report();
  else if (route.name === 'settings') settings();
  else navigate('#home');
}

function home() {
  const summary = getPlayerSummary(state);
  const next = levels.find((item) => !state.completedLevels.includes(item.id)) || levels.at(-1);
  const screen = renderShell(root, state, {
    title: '數學王 Math King',
    content: `
      <section class="math-king-home">
        <div class="home-city-card">
          <div class="home-city-stage" data-home-city></div>
          <div class="home-title-panel">
            <span class="eyebrow">PLAY → SEE → THINK → DISCOVER</span>
            <h1>數學王 <small>Math King</small></h1>
            <p>把數學放進生活裡，用遊戲自己發現答案</p>
            <div class="home-cta-row">
              <button class="btn btn-primary btn-big" data-start aria-label="開始數學王城市冒險">開始冒險</button>
              <button class="btn btn-secondary btn-big" data-continue aria-label="繼續上一個未完成關卡">繼續：${next.title}</button>
            </div>
          </div>
        </div>

        <section class="home-progress-card" aria-label="冒險進度">
          <div><span>等級</span><b>Lv.${summary.level}</b></div>
          <div><span>經驗值</span><b>${summary.xp} XP</b></div>
          <div><span>星星</span><b>${summary.stars}</b></div>
          <div><span>完成</span><b>${summary.completed}/${levels.length}</b></div>
        </section>

        <section class="home-mode-grid" aria-label="其他遊戲模式">
          ${[
            ['duel', 'VS', '雙人對戰', '同裝置一起比反應'],
            ['practice', '01', '自由練習', '挑想練的概念'],
            ['mistakes', '!', '錯題本', '把卡住的地方玩懂'],
            ['achievements', '★', '成就', '看看解鎖的里程碑'],
            ['report', '↗', '今日報告', '看今天學了多少'],
            ['settings', '≡', '設定', '音效與減少動畫'],
          ].map(([route, mark, title, subtitle]) => `
            <button class="home-mode-card" data-go="${route}" aria-label="${title}：${subtitle}">
              <span class="mode-mark" aria-hidden="true">${mark}</span>
              <span><b>${title}</b><small>${subtitle}</small></span>
            </button>
          `).join('')}
        </section>
      </section>
    `,
  });

  const cleanupCity = mountGameScene(screen.querySelector('[data-home-city]'), HomeCityScene, {
    state,
    height: 360,
    backgroundColor: '#9edcff',
    sceneData: { ariaLabel: '數學王城市，有超市、公車站、公園、工地與遠方數學塔' },
  });

  screen.querySelector('[data-start]').addEventListener('click', () => {
    state.hasStarted = true;
    saveProgress(state);
    navigate('#map');
  });
  screen.querySelector('[data-continue]').addEventListener('click', () => navigate(`#level/${next.id}`));
  screen.querySelectorAll('[data-go]').forEach((button) => {
    button.addEventListener('click', () => navigate(`#${button.dataset.go}`));
  });

  return cleanupCity;
}

function map() {
  const screen = renderShell(root, state, {
    title: '數學王城市',
    back: () => navigate('#home'),
    content: `
      <section class="city-map-header">
        <div>
          <span class="eyebrow">${chapter.title}</span>
          <h1>今天要去哪裡解任務？</h1>
          <p>先遇到生活問題，再用操作找到規律。數學名稱最後才出現。</p>
        </div>
        <div class="city-map-legend"><span></span> V2 可玩場景</div>
      </section>
      <section class="city-map" aria-label="數學王生活城市關卡地圖">
        <div class="city-road-line" aria-hidden="true"></div>
        ${levels.map((item, index) => {
          const unlocked = index === 0 || state.completedLevels.includes(levels[index - 1].id) || state.completedLevels.includes(item.id);
          const completed = state.completedLevels.includes(item.id);
          const world = worldForLevel(item);
          const v2 = Boolean(v2LevelById(item.id));
          return `
            <button class="city-level ${unlocked ? '' : 'locked'} ${completed ? 'completed' : ''} ${v2 ? 'v2-standard' : ''} world-${world}" data-level="${item.id}" aria-label="${worldNames[world] || '城市'}，第 ${item.order} 關，${item.title}${unlocked ? '' : '，尚未解鎖'}">
              <span class="building-visual" aria-hidden="true"><i></i><i></i><i></i></span>
              <span class="city-level-copy">
                <small>${worldNames[world] || '城市'} · LEVEL ${item.order}</small>
                <b>${v2 ? v2LevelById(item.id).title : item.title}</b>
                <em>${v2 ? v2LevelById(item.id).objective : item.subtitle}</em>
                ${v2 ? '<strong class="v2-badge">V2 GAME</strong>' : ''}
              </span>
              <span class="city-level-state">${unlocked ? starsText(state.levelStars[item.id] || 0) : '施工中'}</span>
            </button>
          `;
        }).join('')}
      </section>
    `,
  });

  screen.querySelectorAll('[data-level]').forEach((button) => {
    button.addEventListener('click', () => {
      if (button.classList.contains('locked')) toast('先完成前一關，這個區域才會開放！', 'info');
      else navigate(`#level/${button.dataset.level}`);
    });
  });
}

function level(id) {
  if (!levelById(id) || !levelRenderers[id]) return navigate('#map');
  cleanup = levelRenderers[id](root, ctx()) || null;
}

function mistakes() {
  const active = state.mistakes.filter((item) => !item.mastered);
  const screen = renderShell(root, state, {
    title: '我的錯題',
    back: () => navigate('#home'),
    content: `
      <section class="hero-card"><div class="npc">?</div><div><h1>錯題不是扣分，是線索</h1><p>找出卡住的概念，再答一次。</p></div></section>
      <section class="mistake-list">
        ${active.length ? active.map((item, index) => `
          <article class="mistake-card" data-i="${index}">
            <b>${item.concept}</b><h3>${item.question || item.questionId}</h3>
            <p>你的答案：${item.playerAnswer}　正確答案：${item.correctAnswer}</p><p>${item.hint || ''}</p>
            <button class="btn btn-primary" data-retry>再次挑戰</button>
          </article>
        `).join('') : '<div class="empty-state"><h2>目前沒有待複習錯題！</h2><p>繼續去城市裡玩任務吧。</p></div>'}
      </section>
    `,
  });

  screen.querySelectorAll('[data-retry]').forEach((button) => {
    button.addEventListener('click', () => {
      const card = button.closest('.mistake-card');
      const item = active[Number(card.dataset.i)];
      button.outerHTML = '<div class="retry-inline"><input data-answer aria-label="重新作答"><button class="btn btn-primary" data-check>檢查</button><span data-feedback></span></div>';
      card.querySelector('[data-check]').addEventListener('click', () => {
        if (card.querySelector('[data-answer]').value.trim() === String(item.correctAnswer)) {
          markMistakeMastered(state, item.questionId);
          card.querySelector('[data-feedback]').textContent = '你已經學會了！';
          setTimeout(rerender, 650);
        } else card.querySelector('[data-feedback]').textContent = '再想一下，看看提示。';
      });
    });
  });
}

function achievements() {
  const badges = [
    ['prime-forest', '質數偵探'],
    ['factor-factory', '物流分組高手'],
    ['coprime-gate', '互質高手'],
    ['gcd-mine', '公因數礦工'],
    ['lcm-race', '公車同步高手'],
    ['lamp-mission', '路燈工程師'],
    ['number-balance', '數字平衡大師'],
  ];
  renderShell(root, state, {
    title: '我的成就',
    back: () => navigate('#home'),
    content: `<section class="badge-grid">${badges.map(([id, name]) => `<div class="badge ${state.completedLevels.includes(id) ? 'earned' : 'locked-badge'}"><span class="badge-medal" aria-hidden="true">★</span><b>${name}</b></div>`).join('')}</section>`,
  });
}

function report() {
  const total = state.daily.questions;
  const correct = state.daily.correct;
  const accuracy = total ? Math.round((correct / total) * 100) : 0;
  renderShell(root, state, {
    title: '今日學習報告',
    back: () => navigate('#home'),
    content: `
      <section class="report-hero"><h1>今天的數學冒險</h1><p>重點不是做幾題，而是你有沒有真的看懂世界為什麼成功或失敗。</p></section>
      <section class="report-cards">
        <div class="report-card"><span>時間</span><b>${Math.round(state.daily.seconds / 60)} 分鐘</b></div>
        <div class="report-card"><span>作答</span><b>${total} 題</b></div>
        <div class="report-card"><span>正確率</span><b>${accuracy}%</b></div>
      </section>
      <section class="parent-note"><p>完成關卡：${state.completedLevels.length}/${levels.length}</p><p>錯題待複習：${state.mistakes.filter((item) => !item.mastered).length}</p></section>
    `,
  });
}

function settings() {
  const screen = renderShell(root, state, {
    title: '設定',
    back: () => navigate('#home'),
    content: `
      <section class="settings-card"><h1>遊戲設定</h1>
        ${[
          ['sound', '音效'],
          ['music', '音樂'],
          ['reducedMotion', '減少動畫'],
        ].map(([key, title]) => `<label class="toggle-row"><span>${title}</span><input type="checkbox" data-setting="${key}" ${state.settings[key] ? 'checked' : ''}></label>`).join('')}
        <p class="setting-note">開啟「減少動畫」後，會降低鏡頭晃動、粒子、快速縮放與背景移動，但關卡功能完全相同。</p>
        <button class="btn btn-danger" data-reset>重新開始所有進度</button>
      </section>
    `,
  });
  screen.querySelectorAll('[data-setting]').forEach((input) => {
    input.addEventListener('change', () => {
      setSetting(state, input.dataset.setting, input.checked);
      rerender();
    });
  });
  screen.querySelector('[data-reset]').addEventListener('click', () => {
    if (confirm('確定要清除進度嗎？')) {
      state = resetProgress();
      navigate('#home');
    }
  });
}

window.addEventListener('hashchange', rerender);
window.addEventListener('beforeunload', () => addPlaySeconds(state, (Date.now() - activityStarted) / 1000));
if (!location.hash) location.hash = '#home';
else rerender();
