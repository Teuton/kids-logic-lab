import Phaser from 'phaser';

const DEFAULT_WIDTH = 720;
const DEFAULT_HEIGHT = 620;

export function mountGameScene(host, SceneClass, {
  state,
  height = DEFAULT_HEIGHT,
  backgroundColor = '#dff4ff',
  sceneData = {},
  onReady,
  onEvent,
} = {}) {
  if (!host) throw new Error('GameHost requires a DOM host element.');

  host.innerHTML = '';
  host.classList.add('phaser-game-host');
  host.setAttribute('role', 'img');
  host.setAttribute('aria-label', sceneData.ariaLabel || '互動數學遊戲場景');

  const options = {
    state,
    reducedMotion: Boolean(state?.settings?.reducedMotion),
    sceneData,
    onReady,
    onEvent,
  };
  const scene = new SceneClass(options);
  const game = new Phaser.Game({
    type: Phaser.AUTO,
    parent: host,
    width: DEFAULT_WIDTH,
    height,
    backgroundColor,
    antialias: true,
    transparent: false,
    render: { roundPixels: false },
    scale: {
      mode: Phaser.Scale.FIT,
      autoCenter: Phaser.Scale.CENTER_BOTH,
      width: DEFAULT_WIDTH,
      height,
    },
    physics: {
      default: 'arcade',
      arcade: { gravity: { x: 0, y: 0 }, debug: false },
    },
    scene: [scene],
  });

  let destroyed = false;
  return () => {
    if (destroyed) return;
    destroyed = true;
    game.destroy(true);
    host.innerHTML = '';
    host.classList.remove('phaser-game-host');
  };
}

export function sceneOptions(key, options = {}) {
  return {
    key,
    active: false,
    visible: true,
    ...options,
  };
}
