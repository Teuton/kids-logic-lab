export class StepController {
  constructor(steps = [], onChange = () => {}) {
    this.steps = [...steps];
    this.index = 0;
    this.onChange = onChange;
    this.started = false;
  }

  current() {
    return this.steps[this.index] || null;
  }

  snapshot() {
    return {
      index: this.index,
      number: this.steps.length ? this.index + 1 : 0,
      total: this.steps.length,
      text: this.current(),
      complete: this.index >= this.steps.length,
    };
  }

  start() {
    this.started = true;
    this.onChange(this.snapshot());
    return this.snapshot();
  }

  next() {
    if (!this.started) return this.start();
    if (this.index < this.steps.length) this.index += 1;
    this.onChange(this.snapshot());
    return this.snapshot();
  }

  goTo(index) {
    this.index = Math.max(0, Math.min(this.steps.length, Number(index) || 0));
    this.onChange(this.snapshot());
    return this.snapshot();
  }
}

export function coachMark(target, active = true) {
  if (!target) return;
  target.classList.toggle('coach-focus', active);
  target.setAttribute('aria-current', active ? 'step' : 'false');
}
