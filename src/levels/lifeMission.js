import { renderShell } from '../ui/shell.js';
import { escapeHtml, playTone, toast } from '../ui/components.js';
import { completeLevel } from './common.js';

function sameSet(a, b) {
  return a.length === b.length && [...a].sort().every((value, index) => value === [...b].sort()[index]);
}

function normalizedText(value) {
  return String(value).trim().replace(/\s+/g, '').replace(/，/g, ',');
}

function stageMarkup(mission) {
  return mission.stages.map((stage, index) => `<li data-stage="${index}"><span>${index + 1}</span><b>${escapeHtml(stage.label)}</b></li>`).join('');
}

function challengeMarkup(challenge) {
  if (challenge.type === 'choice' || challenge.type === 'multi') {
    return `<div class="answer-grid">${challenge.options.map((option) => `<button class="btn btn-secondary" data-choice="${escapeHtml(option.value)}" aria-pressed="false">${escapeHtml(option.label)}</button>`).join('')}</div>${challenge.type === 'multi' ? '<button class="btn btn-primary" data-check>檢查選擇</button>' : ''}`;
  }
  if (challenge.type === 'counters') {
    return `<div class="counter-grid">${challenge.items.map((item) => `<div class="counter-card" data-counter="${item.key}"><b>${escapeHtml(item.label)}</b><small>${item.price} 元</small><div class="answer-row"><button class="btn btn-secondary" data-minus="${item.key}" aria-label="減少${escapeHtml(item.label)}">−</button><strong data-count="${item.key}">0</strong><button class="btn btn-secondary" data-plus="${item.key}" aria-label="增加${escapeHtml(item.label)}">＋</button></div></div>`).join('')}</div><p class="mission-total">目前總價：<b data-total>0</b> / ${challenge.target} 元</p><button class="btn btn-primary" data-check>確認結帳</button>`;
  }
  if (challenge.type === 'recipe') {
    const rows = [
      ['yogurt', '優格', 0.5, '杯'],
      ['oats', '燕麥', 1, '杯'],
      ['berries', '莓果', 1, '匙'],
    ];
    return `<div class="counter-grid">${rows.map(([key, label, step, unit]) => `<div class="counter-card"><b>${label}</b><small>每次 ${step}${unit}</small><div class="answer-row"><button class="btn btn-secondary" data-recipe-minus="${key}">−</button><strong data-recipe-value="${key}">0</strong><button class="btn btn-secondary" data-recipe-plus="${key}">＋</button></div></div>`).join('')}</div><button class="btn btn-primary" data-check>完成 6 人份</button>`;
  }
  const inputMode = challenge.type === 'number' ? 'decimal' : 'text';
  const type = challenge.type === 'number' ? 'number' : 'text';
  return `<div class="answer-row"><input type="${type}" inputmode="${inputMode}" data-answer aria-label="${escapeHtml(challenge.prompt)}"><span>${escapeHtml(challenge.suffix || '')}</span><button class="btn btn-primary" data-check>確認</button></div>`;
}

export function renderLifeMission(root, ctx, mission) {
  let stageIndex = 0;
  let hintsUsed = 0;
  let mistakes = 0;
  let finished = false;
  const selected = new Set();
  const counters = Object.fromEntries((mission.challenge.items || []).map((item) => [item.key, 0]));
  const recipe = { yogurt: 0, oats: 0, berries: 0 };

  const screen = renderShell(root, ctx.state, {
    title: `第 ${mission.order} 關｜${mission.title}`,
    back: () => ctx.navigate('#map'),
    content: `
      <section class="hero-card life-mission-hero">
        <div class="npc">${escapeHtml(mission.icon)}</div>
        <div><span class="eyebrow">LEVEL ${mission.order} · ${escapeHtml(mission.concept)}</span><h1>${escapeHtml(mission.title)}</h1><p>${escapeHtml(mission.story)}</p><p><b>任務：</b>${escapeHtml(mission.objective)}</p></div>
      </section>
      <section class="play-card life-mission-card">
        <ol class="mission-steps">${stageMarkup(mission)}</ol>
        <div class="mission-world" data-world role="status" aria-live="polite"><b>先玩：</b>按下第一個操作，讓畫面一步一步產生變化。</div>
        <button class="btn btn-primary btn-big" data-stage-next>${escapeHtml(mission.stages[0]?.label || '開始')}</button>
      </section>
      <section class="play-card" data-challenge hidden>
        <span class="eyebrow">THINK → DISCOVER</span>
        <h2>${escapeHtml(mission.challenge.prompt)}</h2>
        ${challengeMarkup(mission.challenge)}
        <div class="hint-row"><span data-hint-panel>需要時再按提示。</span><button class="btn btn-hint" data-hint>💡 提示</button></div>
      </section>
      ${mission.sourceNote ? `<p class="setting-note">資料註記：${escapeHtml(mission.sourceNote)}</p>` : ''}
    `,
  });

  const stageButton = screen.querySelector('[data-stage-next]');
  const world = screen.querySelector('[data-world]');
  const challengePanel = screen.querySelector('[data-challenge]');

  function revealChallenge() {
    stageButton.hidden = true;
    challengePanel.hidden = false;
    challengePanel.scrollIntoView?.({ behavior: ctx.state.settings.reducedMotion ? 'auto' : 'smooth', block: 'nearest' });
  }

  stageButton?.addEventListener('click', () => {
    const stage = mission.stages[stageIndex];
    if (!stage) return revealChallenge();
    world.innerHTML = `<b>${escapeHtml(stage.label)}：</b>${escapeHtml(stage.result)}`;
    screen.querySelector(`[data-stage="${stageIndex}"]`)?.classList.add('completed');
    playTone('tap', ctx.state.settings.sound);
    stageIndex += 1;
    if (stageIndex >= mission.stages.length) revealChallenge();
    else stageButton.textContent = mission.stages[stageIndex].label;
  });

  const hintButton = screen.querySelector('[data-hint]');
  hintButton?.addEventListener('click', () => {
    const hints = mission.hints || [];
    const text = hints[Math.min(hintsUsed, hints.length - 1)] || '再觀察剛才的操作結果。';
    hintsUsed += 1;
    screen.querySelector('[data-hint-panel]').textContent = text;
  });

  function succeed(anchor) {
    if (finished) return;
    finished = true;
    playTone('correct', ctx.state.settings.sound);
    completeLevel({
      state: ctx.state,
      levelId: mission.id,
      accuracy: Math.max(0.6, 1 - mistakes * 0.08),
      hintsUsed,
      anchor,
      navigate: ctx.navigate,
    });
  }

  function fail(message = '再看一次剛才的變化，調整後再試。') {
    mistakes += 1;
    playTone('wrong', ctx.state.settings.sound);
    toast(message, 'error');
  }

  const challenge = mission.challenge;

  if (challenge.type === 'choice') {
    screen.querySelectorAll('[data-choice]').forEach((button) => {
      button.addEventListener('click', () => {
        if (button.dataset.choice === String(challenge.answer)) succeed(button);
        else fail('這個選項和剛才看到的結果不一致。');
      });
    });
  } else if (challenge.type === 'multi') {
    screen.querySelectorAll('[data-choice]').forEach((button) => {
      button.addEventListener('click', () => {
        const value = button.dataset.choice;
        if (selected.has(value)) selected.delete(value); else selected.add(value);
        button.setAttribute('aria-pressed', selected.has(value) ? 'true' : 'false');
        button.classList.toggle('selected', selected.has(value));
      });
    });
    screen.querySelector('[data-check]')?.addEventListener('click', (event) => {
      if (sameSet([...selected], challenge.answers.map(String))) succeed(event.currentTarget);
      else fail('有些尺寸會留下空隙，再檢查一次。');
    });
  } else if (challenge.type === 'counters') {
    function updateCounters() {
      challenge.items.forEach((item) => { screen.querySelector(`[data-count="${item.key}"]`).textContent = counters[item.key]; });
      const total = challenge.items.reduce((sum, item) => sum + counters[item.key] * item.price, 0);
      screen.querySelector('[data-total]').textContent = total;
      return total;
    }
    screen.querySelectorAll('[data-plus]').forEach((button) => button.addEventListener('click', () => { counters[button.dataset.plus] += 1; updateCounters(); }));
    screen.querySelectorAll('[data-minus]').forEach((button) => button.addEventListener('click', () => { counters[button.dataset.minus] = Math.max(0, counters[button.dataset.minus] - 1); updateCounters(); }));
    screen.querySelector('[data-check]')?.addEventListener('click', (event) => {
      if (updateCounters() === challenge.target) succeed(event.currentTarget);
      else fail('總價還不是 100 元，繼續調整商品數量。');
    });
  } else if (challenge.type === 'recipe') {
    const steps = { yogurt: 0.5, oats: 1, berries: 1 };
    function updateRecipe(key) { screen.querySelector(`[data-recipe-value="${key}"]`).textContent = recipe[key]; }
    screen.querySelectorAll('[data-recipe-plus]').forEach((button) => button.addEventListener('click', () => { const key = button.dataset.recipePlus; recipe[key] = Number((recipe[key] + steps[key]).toFixed(1)); updateRecipe(key); }));
    screen.querySelectorAll('[data-recipe-minus]').forEach((button) => button.addEventListener('click', () => { const key = button.dataset.recipeMinus; recipe[key] = Math.max(0, Number((recipe[key] - steps[key]).toFixed(1))); updateRecipe(key); }));
    screen.querySelector('[data-check]')?.addEventListener('click', (event) => {
      const ok = Object.entries(challenge.target).every(([key, value]) => recipe[key] === value);
      if (ok) succeed(event.currentTarget);
      else fail('三種材料都要依 1.5 倍調整；優格要用到半杯刻度。');
    });
  } else {
    screen.querySelector('[data-check]')?.addEventListener('click', (event) => {
      const input = screen.querySelector('[data-answer]');
      const value = challenge.type === 'number' ? Number(input.value) : normalizedText(input.value);
      const expected = challenge.type === 'number' ? Number(challenge.answer) : normalizedText(challenge.answer);
      if (value === expected) succeed(event.currentTarget);
      else fail();
    });
  }

  return null;
}

export function makeLifeMissionRenderer(mission) {
  return (root, ctx) => renderLifeMission(root, ctx, mission);
}
