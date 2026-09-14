export function successCamera(scene, reducedMotion = false) {
  const camera = scene?.cameras?.main;
  if (!camera) return;
  camera.flash(reducedMotion ? 90 : 180, 255, 244, 176, false);
  if (reducedMotion) return;
  camera.shake(180, 0.004);
  camera.zoomTo(1.035, 160, 'Sine.easeOut', true, (_camera, progress) => {
    if (progress === 1) camera.zoomTo(1, 220, 'Sine.easeInOut');
  });
}

export function wrongCamera(scene, reducedMotion = false) {
  const camera = scene?.cameras?.main;
  if (!camera || reducedMotion) return;
  camera.shake(120, 0.0025);
}
