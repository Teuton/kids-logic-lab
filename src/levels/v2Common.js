import { renderShell } from '../ui/shell.js';
import { createNpcDialogue } from '../tutorial/NpcDialogue.js';
import { StepController, coachMark } from '../tutorial/StepController.js';

export function renderV2LevelShell(root, ctx, meta, {
  controlsHtml = '',
  ariaLabel = '互動數學遊戲',
  intro = meta.story?.[0] || meta.objective,
} = {}) {
  const screen = renderShell(root, ctx.state, {
    title: meta.title,
    back: () => ctx.navigate('#map'),
    content: `
      <section class="mission-card v2-mission-card">
        <div class="mission-kicker">生活任務</div>
        <h1>${meta.title}</h1>
        <p>${meta.objective}</p>
        <div class="skill-chips">${(meta.skills || []).map((skill) => `<span>${skill}</span>`).join('')}</div>
      </section>
      <section class="v2-play-shell" aria-label="${ariaLabel}">
        <div data-npc-slot></div>
        <div class="tutorial-step" data-tutorial>
          <span data-step-number>STEP 1 / ${meta.steps.length}</span>
          <p data-step-text>${meta.steps[0]}</p>
          <div class="finger-hint" aria-hidden="true"><span></span></div>
        </div>
        <div class="phaser-stage" data-game-host></div>
        <div class="v2-controls" data-controls>${controlsHtml}</div>
        <section class="discovery-panel" data-discovery hidden aria-live="polite"></section>
      </section>
    `,
  });

  const npc = createNpcDialogue(screen.querySelector('[data-npc-slot]'), { text: intro, mood: 'talk' });
  const tutorialRoot = screen.querySelector('[data-tutorial]');
  const stepNumber = screen.querySelector('[data-step-number]');
  const stepText = screen.querySelector('[data-step-text]');
  const tutorial = new StepController(meta.steps, (snapshot) => {
    if (snapshot.complete) {
      tutorialRoot.classList.add('tutorial-complete');
      stepNumber.textContent = 'DISCOVER';
      stepText.textContent = '你已經操作出規律了，現在來幫它取名字。';
      return;
    }
    tutorialRoot.classList.remove('tutorial-complete');
    stepNumber.textContent = `STEP ${snapshot.number} / ${snapshot.total}`;
    stepText.textContent = snapshot.text;
  });
  tutorial.start();

  return {
    screen,
    host: screen.querySelector('[data-game-host]'),
    controls: screen.querySelector('[data-controls]'),
    discovery: screen.querySelector('[data-discovery]'),
    tutorial,
    npc,
    focus(element) {
      screen.querySelectorAll('.coach-focus').forEach((node) => coachMark(node, false));
      coachMark(element, true);
    },
    clearFocus() {
      screen.querySelectorAll('.coach-focus').forEach((node) => coachMark(node, false));
    },
    showDiscovery(html) {
      const panel = screen.querySelector('[data-discovery]');
      panel.hidden = false;
      panel.innerHTML = html;
      panel.scrollIntoView({ block: 'nearest', behavior: ctx.state.settings.reducedMotion ? 'auto' : 'smooth' });
      return panel;
    },
  };
}

export function lifeApplicationCards(meta) {
  return `<div class="life-application"><h3>原來這個數學可以用在哪裡？</h3><div class="life-card-grid">${meta.lifeApplications.map((item) => `<div class="life-card"><span class="life-dot" aria-hidden="true"></span><b>${item}</b></div>`).join('')}</div></div>`;
}
