import { escapeHtml } from '../ui/components.js';

function robotSvg(mood = 'idle') {
  const eye = mood === 'happy' || mood === 'celebrate' ? 'M18 24 q4 5 8 0 M38 24 q4 5 8 0' : 'M18 25 h8 M38 25 h8';
  const mouth = mood === 'thinking' ? 'M27 39 q5 -4 10 0' : mood === 'wrong' ? 'M27 41 q5 -5 10 0' : 'M27 37 q5 6 10 0';
  return `<svg viewBox="0 0 64 64" aria-hidden="true"><path d="M32 8v7" stroke="currentColor" stroke-width="4" stroke-linecap="round"/><circle cx="32" cy="7" r="4" fill="currentColor"/><rect x="10" y="15" width="44" height="39" rx="14" fill="#fff" stroke="currentColor" stroke-width="4"/><path d="${eye}" fill="none" stroke="currentColor" stroke-width="4" stroke-linecap="round"/><path d="${mouth}" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"/></svg>`;
}

export function createNpcDialogue(container, {
  name = '小數',
  text = '準備好了嗎？我們先玩，再一起找規律。',
  mood = 'idle',
} = {}) {
  const root = document.createElement('section');
  root.className = 'npc-dialogue';
  root.setAttribute('role', 'status');
  root.innerHTML = `<div class="math-guide" data-guide>${robotSvg(mood)}</div><div class="npc-copy"><small>${escapeHtml(name)}・數學王助手</small><p data-npc-text>${escapeHtml(text)}</p></div>`;
  container.append(root);

  return {
    root,
    say(nextText, nextMood = 'talk') {
      root.querySelector('[data-guide]').innerHTML = robotSvg(nextMood);
      root.querySelector('[data-npc-text]').textContent = nextText;
      root.dataset.mood = nextMood;
    },
    destroy() { root.remove(); },
  };
}
