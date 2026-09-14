import { AudioManager } from './AudioManager.js';
import { successCamera } from './CameraEffects.js';
import { sparkleBurst } from './ParticleEffects.js';

export function celebrateScene(scene, {
  state,
  x = 360,
  y = 260,
  reducedMotion = Boolean(state?.settings?.reducedMotion),
} = {}) {
  successCamera(scene, reducedMotion);
  sparkleBurst(scene, x, y, reducedMotion);
  new AudioManager(state).cue('level');
}
