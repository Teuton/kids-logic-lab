import { playTone } from '../ui/components.js';

const cueMap = {
  tap: 'tap',
  drag: 'tap',
  drop: 'tap',
  snap: 'correct',
  correct: 'correct',
  wrong: 'wrong',
  coin: 'coin',
  star: 'level',
  level: 'level',
  npc: 'tap',
};

export class AudioManager {
  constructor(state) {
    this.state = state;
  }

  cue(name = 'tap') {
    playTone(cueMap[name] || 'tap', Boolean(this.state?.settings?.sound));
  }
}
