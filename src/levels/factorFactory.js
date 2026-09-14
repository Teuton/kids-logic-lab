import { mountGameScene } from '../game/GameHost.js';
import { FactorLogisticsScene } from '../game/scenes/FactorLogisticsScene.js';
import { v2LevelById } from '../data/levelV2.js';
import { renderV2LevelShell, lifeApplicationCards } from './v2Common.js';
import { renderFormulaList } from '../ui/mathReveal.js';
import { completeLevel } from './common.js';
import { pulseReward } from '../effects/RewardEffects.js';

const BOX_OPTIONS = [1, 3, 4, 5, 7, 9, 15, 45];

export function renderFactorFactory(root, ctx) {
  const meta = v2LevelById('factor-factory');
  let scene = null;
  let hints = 0;
  let wrong = 0;
  let interacted = false;
  let discoveryShown = false;

  const ui = renderV2LevelShell(root, ctx, meta, {
    ariaLabel: '45 顆橘子的超市物流平均裝箱遊戲',
    intro: '物流中心來了 45 顆橘子。每箱一定要一樣多，而且輸送帶上不能留下任何一顆。你來決定要用幾箱！',
    controlsHtml: `
      <div class="control-block">
        <div class="control-title"><b>箱子數量</b><span>拖動畫面黃色滑鈕，或用下面的大按鈕</span></div>
        <div class="accessible-choice-row">${BOX_OPTIONS.map((count) => `<button class="btn btn-secondary" data-boxes="${count}" aria-label="使用 ${count} 個箱子">${count} 箱</button>`).join('')}</div>
        <div class="found-strip"><b>成功裝箱：</b><span data-found>還沒找到</span><em data-found-count>0 / 6</em></div>
      </div>
      <div class="hint-row v2-hint-row"><span data-hint-panel>先看輸送帶：有剩下橘子，就代表這個箱數不行。</span><button class="btn btn-hint" data-hint aria-label="取得物流裝箱提示">提示</button></div>
    `,
  });

  const cleanupGame = mountGameScene(ui.host, FactorLogisticsScene, {
    state: ctx.state,
    height: 620,
    sceneData: { ariaLabel: '45 顆橘子自動分配到不同箱數，剩餘橘子會留在輸送帶' },
    onReady: (readyScene) => {
      scene = readyScene;
      ui.focus(ui.host);
    },
    onEvent: handleSceneEvent,
  });

  ui.controls.querySelectorAll('[data-boxes]').forEach((button) => {
    button.addEventListener('click', () => {
      const count = Number(button.dataset.boxes);
      scene?.slider?.setValue(count, true);
      ui.controls.querySelectorAll('[data-boxes]').forEach((node) => node.classList.toggle('selected', node === button));
    });
  });

  ui.controls.querySelector('[data-hint]').addEventListener('click', () => {
    hints += 1;
    const hintText = [
      '不用先算。把箱數一個一個試，輸送帶會直接告訴你有沒有剩。',
      '同一個箱數如果能讓 45 顆全部進箱，就先把它記下來。',
      '你要找齊 1、3、5、9、15、45 這六種「完全分完」的方式。',
    ][Math.min(hints - 1, 2)];
    ui.controls.querySelector('[data-hint-panel]').textContent = hintText;
    ui.npc.say(hintText, 'thinking');
  });

  function advanceAfterFirstAction() {
    if (interacted) return;
    interacted = true;
    ui.tutorial.next();
    ui.focus(ui.host);
  }

  function handleSceneEvent(event) {
    if (event.type === 'invalid-group') {
      advanceAfterFirstAction();
      wrong += 1;
      ui.npc.say(`還剩 ${event.result.remainder} 顆！不用看紅色「答錯」，直接看輸送帶上的橘子就知道哪裡出了問題。`, 'wrong');
      if (ui.tutorial.index === 1) ui.tutorial.next();
      return;
    }

    if (event.type === 'valid-group') {
      advanceAfterFirstAction();
      const found = event.found;
      ui.controls.querySelector('[data-found]').textContent = found.join('、');
      ui.controls.querySelector('[data-found-count]').textContent = `${found.length} / 6`;
      ui.npc.say(`${event.boxes} 箱成功，每箱 ${event.result.perBox} 顆！把這個箱數記下來，再試別的。`, 'happy');
      if (found.length >= 2 && ui.tutorial.index < 3) ui.tutorial.goTo(3);
      return;
    }

    if (event.type === 'success' && !discoveryShown) {
      discoveryShown = true;
      ui.tutorial.goTo(meta.steps.length);
      ui.clearFocus();
      ui.npc.say('六種都找到了！你不是背答案，是親手把每一種「剛好分完」的方式試出來了。', 'celebrate');
      showDiscovery(event.factors);
    }
  }

  function showDiscovery(factors) {
    const panel = ui.showDiscovery(`
      <div class="discovery-kicker">從橘子箱裡長出來的數學</div>
      <h2>哪些箱數能讓 45 顆剛好分完？</h2>
      <div class="factor-found-grid">${factors.map((factor) => `<span>${factor}</span>`).join('')}</div>
      <div class="math-formulas" data-formulas></div>
      <div class="concept-reveal"><small>能把 45 完整分組的數，在數學上叫</small><strong>45 的因數</strong><b>1、3、5、9、15、45</b></div>
      ${lifeApplicationCards(meta)}
      <div class="mini-apply-challenge">
        <h3>小挑戰：36 顆蘋果</h3>
        <p>如果每箱一樣多、一顆都不能剩，下面哪個箱數一定可以？</p>
        <div class="accessible-choice-row">${[5, 6, 7, 8].map((value) => `<button class="btn btn-secondary" data-apply="${value}">${value} 箱</button>`).join('')}</div>
        <p class="challenge-feedback" data-apply-feedback>想像 36 顆真的飛進箱子。</p>
      </div>
    `);
    renderFormulaList(panel.querySelector('[data-formulas]'), [
      '1\\times45=45',
      '3\\times15=45',
      '5\\times9=45',
    ]);
    pulseReward(panel.querySelector('.concept-reveal'), ctx.state.settings.reducedMotion);
    panel.querySelectorAll('[data-apply]').forEach((button) => {
      button.addEventListener('click', () => {
        const answer = Number(button.dataset.apply);
        if (answer !== 6) {
          wrong += 1;
          panel.querySelector('[data-apply-feedback]').textContent = `36 顆分成 ${answer} 箱會有剩下，再試一個能完全分完的箱數。`;
          return;
        }
        panel.querySelector('[data-apply-feedback]').textContent = '答對！36÷6=6，每箱 6 顆，沒有任何剩餘。';
        panel.querySelectorAll('[data-apply]').forEach((node) => { node.disabled = true; });
        completeLevel({
          state: ctx.state,
          levelId: 'factor-factory',
          accuracy: Math.max(0.6, 1 - wrong * 0.06),
          hintsUsed: hints,
          anchor: button,
          navigate: ctx.navigate,
        });
      });
    });
  }

  return () => cleanupGame();
}
