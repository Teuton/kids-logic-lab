import { mountGameScene } from '../game/GameHost.js';
import { BusSyncScene } from '../game/scenes/BusSyncScene.js';
import { v2LevelById } from '../data/levelV2.js';
import { renderV2LevelShell, lifeApplicationCards } from './v2Common.js';
import { renderFormulaList } from '../ui/mathReveal.js';
import { completeLevel } from './common.js';
import { pulseReward } from '../effects/RewardEffects.js';

export function renderLcmRace(root, ctx) {
  const meta = v2LevelById('lcm-race');
  let scene = null;
  let speedIndex = 1;
  const speeds = [0.5, 1, 2];
  let hints = 0;
  let wrong = 0;
  let started = false;
  let sawArrival = false;
  let discoveryShown = false;

  const ui = renderV2LevelShell(root, ctx, meta, {
    ariaLabel: '紅色與藍色公車的同步到站模擬器',
    intro: '紅車每 6 分鐘回站，藍車每 8 分鐘回站。它們現在一起離站，幫我找到下一次一起回來的時間！',
    controlsHtml: `
      <div class="timeline-controls" aria-label="公車時間控制">
        <button class="btn btn-primary" data-play aria-label="開始公車時間">開始</button>
        <button class="btn btn-secondary" data-pause aria-label="暫停公車時間">暫停</button>
        <button class="btn btn-secondary" data-step aria-label="時間前進一分鐘">一步 +1</button>
        <button class="btn btn-secondary" data-speed aria-label="切換播放速度">速度 1×</button>
        <button class="btn btn-secondary" data-replay aria-label="從零分鐘重播">重播</button>
      </div>
      <div class="hint-row v2-hint-row"><span data-hint-panel>先看車子真的什麼時候回到站牌。</span><button class="btn btn-hint" data-hint aria-label="取得公車同步提示">提示</button></div>
    `,
  });

  const cleanupGame = mountGameScene(ui.host, BusSyncScene, {
    state: ctx.state,
    height: 620,
    sceneData: { ariaLabel: '紅車每 6 分鐘、藍車每 8 分鐘的公車站時間模擬' },
    onReady: (readyScene) => {
      scene = readyScene;
      scene.setSpeed(speeds[speedIndex]);
      ui.focus(ui.controls.querySelector('[data-play]'));
    },
    onEvent: handleSceneEvent,
  });

  ui.controls.querySelector('[data-play]').addEventListener('click', () => {
    scene?.play();
    if (!started) {
      started = true;
      ui.tutorial.next();
      ui.focus(ui.host);
      ui.npc.say('很好，先不用算。看時間走，注意哪一台車真的進站。', 'talk');
    }
  });
  ui.controls.querySelector('[data-pause]').addEventListener('click', () => scene?.pause());
  ui.controls.querySelector('[data-step]').addEventListener('click', () => {
    scene?.step();
    if (!started) {
      started = true;
      ui.tutorial.next();
    }
  });
  ui.controls.querySelector('[data-replay]').addEventListener('click', () => {
    scene?.replay();
    ui.npc.say('重新從 0 分鐘出發。這次盯著兩條時間紀錄。', 'thinking');
  });
  ui.controls.querySelector('[data-speed]').addEventListener('click', (event) => {
    speedIndex = (speedIndex + 1) % speeds.length;
    const speed = speeds[speedIndex];
    scene?.setSpeed(speed);
    event.currentTarget.textContent = `速度 ${speed}×`;
  });
  ui.controls.querySelector('[data-hint]').addEventListener('click', () => {
    hints += 1;
    const hintText = [
      '紅車會在 6、12、18… 分鐘回站，先把真的看到的時間記起來。',
      '藍車會在 8、16… 分鐘回站。找兩條紀錄第一次重疊的地方。',
      '不用猜很大的數，從 0 分鐘慢慢往前播放就能看見。',
    ][Math.min(hints - 1, 2)];
    ui.controls.querySelector('[data-hint-panel]').textContent = hintText;
    ui.npc.say(hintText, 'thinking');
  });

  function handleSceneEvent(event) {
    if (event.type === 'minute' && (event.redArrives || event.blueArrives) && !sawArrival) {
      sawArrival = true;
      ui.tutorial.goTo(2);
      ui.npc.say('看到了嗎？車不是每分鐘都回來，它有自己的固定節奏。', 'happy');
    }
    if (event.type === 'minute' && event.minute >= 16 && ui.tutorial.index < 3) {
      ui.tutorial.goTo(3);
    }
    if (event.type === 'success' && !discoveryShown) {
      discoveryShown = true;
      ui.tutorial.goTo(meta.steps.length);
      ui.clearFocus();
      ui.npc.say('24 分鐘！兩台真的第一次一起進站。現在把剛才看見的時間排在一起，你就會看到規律。', 'celebrate');
      showDiscovery();
    }
  }

  function showDiscovery() {
    const panel = ui.showDiscovery(`
      <div class="discovery-kicker">你自己等到的答案</div>
      <h2>不是先背倍數，是先看到兩台車真的碰面</h2>
      <div class="arrival-ledger">
        <div><span class="bus-dot red"></span><b>紅車</b><p>6、12、18、<strong>24</strong></p></div>
        <div><span class="bus-dot blue"></span><b>藍車</b><p>8、16、<strong>24</strong></p></div>
      </div>
      <p>兩條週期第一次共同出現的正時間是 24 分鐘。</p>
      <div class="math-formulas" data-formulas></div>
      <div class="concept-reveal"><small>這個「第一次一起」在數學上叫</small><strong>最小公倍數</strong><b>LCM = 24</b></div>
      ${lifeApplicationCards(meta)}
      <div class="mini-apply-challenge">
        <h3>小挑戰：兩個鐘聲</h3>
        <p>A 鐘每 4 分鐘響一次，B 鐘每 6 分鐘響一次。現在一起響，下一次一起響是幾分鐘後？</p>
        <div class="accessible-choice-row">${[8, 10, 12, 24].map((value) => `<button class="btn btn-secondary" data-apply="${value}">${value} 分鐘</button>`).join('')}</div>
        <p class="challenge-feedback" data-apply-feedback>想像兩個節奏一起往前走。</p>
      </div>
    `);
    renderFormulaList(panel.querySelector('[data-formulas]'), [
      '6,12,18,\\mathbf{24}',
      '8,16,\\mathbf{24}',
      '\\operatorname{LCM}(6,8)=24',
    ]);
    pulseReward(panel.querySelector('.concept-reveal'), ctx.state.settings.reducedMotion);
    panel.querySelectorAll('[data-apply]').forEach((button) => {
      button.addEventListener('click', () => {
        const answer = Number(button.dataset.apply);
        if (answer !== 12) {
          wrong += 1;
          panel.querySelector('[data-apply-feedback]').textContent = '讓 4、8、12… 和 6、12… 兩條時間線在腦中一起跑。';
          return;
        }
        panel.querySelector('[data-apply-feedback]').textContent = '答對！4 的節奏和 6 的節奏第一次在 12 分鐘重疊。';
        panel.querySelectorAll('[data-apply]').forEach((node) => { node.disabled = true; });
        completeLevel({
          state: ctx.state,
          levelId: 'lcm-race',
          accuracy: Math.max(0.6, 1 - wrong * 0.08),
          hintsUsed: hints,
          anchor: button,
          navigate: ctx.navigate,
        });
      });
    });
  }

  return () => cleanupGame();
}
