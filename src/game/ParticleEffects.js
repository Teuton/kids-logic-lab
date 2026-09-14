const SPARK_TEXTURE = 'math-king-spark';

function ensureSparkTexture(scene) {
  if (scene.textures.exists(SPARK_TEXTURE)) return;
  const graphics = scene.add.graphics();
  graphics.fillStyle(0xffd84d, 1);
  graphics.fillCircle(5, 5, 5);
  graphics.fillStyle(0xffffff, 0.95);
  graphics.fillCircle(4, 3, 2);
  graphics.generateTexture(SPARK_TEXTURE, 10, 10);
  graphics.destroy();
}

export function sparkleBurst(scene, x, y, reducedMotion = false) {
  if (!scene || reducedMotion) return null;
  ensureSparkTexture(scene);
  const emitter = scene.add.particles(x, y, SPARK_TEXTURE, {
    speed: { min: 70, max: 210 },
    angle: { min: 200, max: 340 },
    lifespan: { min: 420, max: 760 },
    gravityY: 260,
    scale: { start: 1, end: 0 },
    alpha: { start: 1, end: 0 },
    quantity: 1,
    emitting: false,
  });
  emitter.explode(18, x, y);
  scene.time.delayedCall(850, () => emitter.destroy());
  return emitter;
}
