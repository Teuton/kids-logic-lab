export class TimelineController {
  constructor(scene, {
    max = 24,
    value = 0,
    delay = 520,
    onChange = () => {},
    onComplete = () => {},
  } = {}) {
    this.scene = scene;
    this.max = max;
    this.value = value;
    this.delay = delay;
    this.speed = 1;
    this.onChange = onChange;
    this.onComplete = onComplete;
    this.timer = scene.time.addEvent({
      delay,
      loop: true,
      paused: true,
      callback: () => this.advance(),
    });
  }

  emit() {
    this.onChange(this.value);
    if (this.value >= this.max) {
      this.pause();
      this.onComplete(this.value);
    }
  }

  advance(amount = 1) {
    if (this.value >= this.max) return;
    this.value = Math.min(this.max, this.value + amount);
    this.emit();
  }

  play() {
    if (this.value >= this.max) this.replay();
    this.timer.paused = false;
  }

  pause() {
    this.timer.paused = true;
  }

  step() {
    this.pause();
    this.advance(1);
  }

  replay() {
    this.pause();
    this.value = 0;
    this.emit();
  }

  setSpeed(speed) {
    this.speed = Math.max(0.25, Number(speed) || 1);
    this.timer.timeScale = this.speed;
    return this.speed;
  }

  destroy() {
    this.timer?.destroy();
  }
}
