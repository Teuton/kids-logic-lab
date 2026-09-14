import { mountGameScene } from '../game/GameHost.js';
import { LampMissionScene } from '../game/scenes/LampMissionScene.js';
import { v2LevelById } from '../data/levelV2.js';
import { renderV2LevelShell, lifeApplicationCards } from './v2Common.js';
import { renderFormulaList } from '../ui/mathReveal.js';
import { completeLevel } from './common.js';
import { pulseReward } from '../effects/RewardEffects.js';

const DISTANCES = [6, 8, 12, 16, 24, 32, 48];

export function renderLampMission(root, ctx) {
  const meta = v2LevelById('lamp-mission');
  let scene = null;
  let wrong = 0;
  let hints = 0;
  let interacted = false;
  let sawValid = false;
  let discoveryShown = false;

  const ui = renderV2LevelShell(root, ctx, meta, {
    ariaLabel: '公園三角形道路與可拖動路燈距離尺',
    intro: '數學王！公園要裝新路燈。三個轉角都要有燈，而且每盞距離要完全一樣。預算有限，燈越少越好！',
    controlsHtml: `
      <div class="control-block" data-distance-controls>
        <div class="control-title"><b>距離尺</b><span>可直接拖動畫面上的黃色滑鈕</span></div>
        <div class="accessible-choice-row">${DISTANCES.map((distance) => `<button class="btn btn-secondary" data-distance="${distance}" aria-label="路燈間距 ${distance} 公尺">${distance}m</button>`).join('')}</div>
      </div>
      <div class="hint-row v2-hint-row"><span data-hint-panel>先用眼睛看「最後一段」發生什麼事。</span><button class="btn btn-hint" data-hint aria-label="取得路燈工程提示">提示</button></div>
    `,
  });

  const cleanupGame = mountGameScene(ui.host, LampMissionScene, {
    state: ctx.state,
    height: 620,
    sceneData: { ariaLabel: '三角形公園路燈工程，可拖動距離尺改變路燈排列' },
    onReady: (readyScene) => {
      scene = readyScene;
      ui.focus(ui.host);
    },
    onEvent: handleSceneEvent,
  });

  ui.controls.querySelectorAll('[data-distance]').forEach((button) => {
    button.addEventListener('click', () => {
      const distance = Number(button.dataset.distance);
      scene?.slider?.setValue(distance, true);
      ui.controls.querySelectorAll('[data-distance]').forEach((node) => node.classList.toggle('selected', node === button));
    });
  });

  ui.controls.querySelector('[data-hint]').addEventListener('click', () => {
    hints += 1;
    const hintsText = [
      '先找「三條路都沒有剩下一段」的距離。',
      '能排完還不夠：預算有限，所以合法距離要盡量大。',
      '把 12m 和 24m 比一比：哪一個會用更少的燈？',
    ];
    ui.controls.querySelector('[data-hint-panel]').textContent = hintsText[Math.min(hints - 1, hintsText.length - 1)];
    ui.npc.say(hintsText[Math.min(hints - 1, hintsText.length - 1)], 'thinking');
  });

  function handleSceneEvent(event) {
    if (!interacted && ['invalid-spacing', 'valid-spacing', 'success'].includes(event.type)) {
      interacted = true;
      ui.tutorial.next();
      ui.focus(ui.host);
    }

    if (event.type === 'invalid-spacing') {
      wrong += 1;
      ui.npc.say('你看，最後一段沒有剛好接上。先別急著算，看看紅色剩餘路段。', 'wrong');
      if (ui.tutorial.index === 1) ui.tutorial.next();
      return;
    }

    if (event.type === 'valid-spacing') {
      sawValid = true;
      ui.npc.say(`${event.spacing}m 真的排得完！可是用了 ${event.result.totalLamps} 盞。能不能把間距再拉大？`, 'happy');
      if (ui.tutorial.index < 3) ui.tutorial.goTo(3);
      return;
    }

    if (event.type === 'success' && !discoveryShown) {
      discoveryShown = true;
      ui.tutorial.goTo(meta.steps.length);
      ui.clearFocus();
      ui.npc.say('成功！三條路都剛剛好，而且沒有更大的合法間距。你剛才其實發現了一個很重要的數學工具！', 'celebrate');
      showDiscovery(event);
    }
  }

  function showDiscovery(event) {
    const panel = ui.showDiscovery(`
      <div class="discovery-kicker">你自己發現的規律</div>
      <h2>先看剛才的路燈，再幫方法取名字</h2>
      <p>24m 讓三條路都完整分段，而且再拉大就會有路段剩下。</p>
      <div class="math-formulas" data-formulas></div>
      <div class="concept-reveal"><small>這個方法在數學上叫</small><strong>最大公因數</strong><b>GCD = 24</b></div>
      ${lifeApplicationCards(meta)}
      <div class="mini-apply-challenge">
        <h3>小挑戰：換一座公園</h3>
        <p>兩條路是 48m 和 72m，一樣希望「等距、排完、燈最少」。你會選哪個間距？</p>
        <div class="accessible-choice-row">
          ${[12, 18, 24, 30].map((value) => `<button class="btn btn-secondary" data-apply="${value}">${value}m</button>`).join('')}
        </div>
        <p class="challenge-feedback" data-apply-feedback>用剛才的世界規則想一想。</p>
      </div>
    `);
    renderFormulaList(panel.querySelector('[data-formulas]'), [
      '120 \\div 24 = 5',
      '168 \\div 24 = 7',
      '192 \\div 24 = 8',
      '\\operatorname{GCD}(120,168,192)=24',
    ]);
    pulseReward(panel.querySelector('.concept-reveal'), ctx.state.settings.reducedMotion);
    panel.querySelectorAll('[data-apply]').forEach((button) => {
      button.addEventListener('click', () => {
        const value = Number(button.dataset.apply);
        if (value !== 24) {
          wrong += 1;
          panel.querySelector('[data-apply-feedback]').textContent = value === 12
            ? '12m 可以排完，但還能把距離拉更大，燈可以更少。'
            : '試著確認 48m 和 72m 都能不能被這個距離完整分完。';
          return;
        }
        panel.querySelector('[data-apply-feedback]').textContent = '答對！48÷24=2、72÷24=3，而且 24 已經是最大的共同間距。';
        panel.querySelectorAll('[data-apply]').forEach((node) => { node.disabled = true; });
        completeLevel({
          state: ctx.state,
          levelId: 'lamp-mission',
          accuracy: Math.max(0.6, 1 - wrong * 0.06),
          hintsUsed: hints,
          anchor: button,
          navigate: ctx.navigate,
        });
      });
    });
  }

  if (!sawValid) ui.focus(ui.host);
  return () => cleanupGame();
}
