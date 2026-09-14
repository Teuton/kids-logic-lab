import { getPlayerSummary } from '../game/progress.js';
import { escapeHtml } from './components.js';

function icon(kind) {
  const paths = {
    crown: '<path d="M5 18 2 7l7 5 5-8 5 8 7-5-3 11H5Z"/><path d="M6 21h16"/>',
    star: '<path d="m14 3 3.2 6.5 7.2 1-5.2 5 1.2 7.1L14 19.2 7.6 22.6l1.2-7.1-5.2-5 7.2-1L14 3Z"/>',
    coin: '<circle cx="14" cy="14" r="10"/><path d="M10 11.5c0-1.6 1.5-2.8 4-2.8 2 0 3.5.7 4.4 1.7M18 16.2c0 1.8-1.6 3-4.2 3-2 0-3.8-.7-4.8-1.8M14 6.7v14.6"/>',
    bolt: '<path d="M15 2 6 15h7l-1 11 10-15h-7V2Z"/>',
    robot: '<path d="M14 3v4M11 3h6"/><rect x="5" y="7" width="18" height="16" rx="6"/><path d="M9 13h2M17 13h2M10 18c2 2 6 2 8 0"/>',
  };
  return `<svg class="hud-icon hud-icon-${kind}" viewBox="0 0 28 28" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">${paths[kind] || paths.star}</svg>`;
}

function xpProgress(summary) {
  const level = summary.level;
  const lower = Math.pow(level - 1, 2) * 100;
  const upper = Math.pow(level, 2) * 100;
  return Math.max(0, Math.min(100, Math.round(((summary.xp - lower) / Math.max(1, upper - lower)) * 100)));
}

export function renderShell(root, state, { title = '數學王 Math King', back = null, content = '' } = {}) {
  const summary = getPlayerSummary(state);
  const progress = xpProgress(summary);
  root.innerHTML = `
    <div class="app-shell math-king-shell">
      <header class="topbar math-king-topbar">
        <div class="topbar-left">
          ${back ? '<button class="icon-btn" data-back aria-label="返回上一頁">←</button>' : `<span class="mascot-mini" aria-label="數學王助手">${icon('robot')}</span>`}
          <strong>${escapeHtml(title)}</strong>
        </div>
        <div class="player-strip" aria-label="玩家狀態">
          <span class="level-pill" aria-label="等級 ${summary.level}">${icon('crown')}<b>Lv.${summary.level}</b></span>
          <span class="xp-pill" aria-label="經驗值 ${summary.xp}">${icon('bolt')}<b>${summary.xp}</b><i><em style="width:${progress}%"></em></i></span>
          <span aria-label="星星 ${summary.stars}">${icon('star')}<b>${summary.stars}</b></span>
          <span aria-label="金幣 ${summary.coins}">${icon('coin')}<b>${summary.coins}</b></span>
        </div>
      </header>
      <main class="screen">${content}</main>
    </div>
  `;
  if (back) root.querySelector('[data-back]').addEventListener('click', back);
  return root.querySelector('.screen');
}
