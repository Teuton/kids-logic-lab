import Phaser from 'phaser';
import { busSyncState } from '../../math/gameplay.js';
import { TimelineController } from '../../interactions/Timeline.js';
import { celebrateScene } from '../RewardSystem.js';

const INTERVALS = [6, 8];
const TARGET = 24;

export class BusSyncScene extends Phaser.Scene {
  constructor(options = {}) {
    super({ key: 'BusSyncV2' });
    this.options = options;
    this.completed = false;
  }

  create() {
    this.reducedMotion = Boolean(this.options.reducedMotion);
    this.syncState = busSyncState(INTERVALS, TARGET);
    this.add.rectangle(360, 310, 720, 620, 0xdff3ff);
    this.add.rectangle(360, 422, 720, 250, 0x79bd68);
    this.drawSkyline();
    this.drawRoad();
    this.drawStation();
    this.drawTimeline();

    this.redBus = this.createBus(302, 315, 0xe74c3c, '紅 6');
    this.blueBus = this.createBus(425, 358, 0x388ee8, '藍 8');
    this.clockText = this.add.text(360, 74, '00:00', {
      fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
      fontSize: '46px', fontStyle: 'bold', color: '#173a52',
      backgroundColor: '#ffffffdd', padding: { x: 18, y: 9 },
    }).setOrigin(0.5);
    this.statusText = this.add.text(360, 131, '兩台公車現在一起離站。', {
      fontFamily: 'system-ui, sans-serif', fontSize: '21px', fontStyle: 'bold', color: '#24465b',
    }).setOrigin(0.5);

    this.timeline = new TimelineController(this, {
      max: TARGET,
      delay: this.reducedMotion ? 650 : 470,
      onChange: (minute) => this.updateMinute(minute),
      onComplete: () => this.finishSync(),
    });
    this.updateMinute(0);
    this.options.onReady?.(this);
  }

  drawSkyline() {
    [
      [65, 184, 80, 112, 0xf4d35e],
      [150, 205, 70, 70, 0x7fd1b9],
      [560, 190, 96, 100, 0xffa8a8],
      [650, 215, 74, 62, 0xa7b5ff],
    ].forEach(([x, y, w, h, color]) => {
      this.add.rectangle(x, y, w, h, color).setStrokeStyle(3, 0xffffff, 0.8);
      this.add.rectangle(x, y - h / 2 - 8, w * 0.7, 16, 0xffffff, 0.6);
    });
    const cloud = this.add.container(105, 72);
    cloud.add([this.add.circle(-20, 0, 22, 0xffffff, 0.82), this.add.circle(7, -7, 29, 0xffffff, 0.82), this.add.circle(37, 2, 19, 0xffffff, 0.82)]);
    if (!this.reducedMotion) this.tweens.add({ targets: cloud, x: 160, duration: 7000, yoyo: true, repeat: -1, ease: 'Sine.easeInOut' });
  }

  drawRoad() {
    this.add.rectangle(360, 337, 720, 150, 0x545d66);
    this.add.rectangle(360, 337, 720, 6, 0xf7df78);
    for (let x = 25; x < 720; x += 82) this.add.rectangle(x, 300, 43, 5, 0xffffff, 0.78);
    for (let x = 25; x < 720; x += 82) this.add.rectangle(x, 374, 43, 5, 0xffffff, 0.78);
  }

  drawStation() {
    this.add.rectangle(360, 225, 170, 85, 0xffffff, 0.95).setStrokeStyle(4, 0x46718c, 1);
    this.add.rectangle(360, 177, 194, 16, 0x4e83a4);
    this.add.text(360, 210, '數學王公車站', {
      fontFamily: 'system-ui, sans-serif', fontSize: '21px', fontStyle: 'bold', color: '#31556d',
    }).setOrigin(0.5);
    this.add.circle(293, 238, 8, 0x4fae5a);
    this.add.circle(427, 238, 8, 0xffc857);
  }

  drawTimeline() {
    this.add.text(360, 458, '時間軸', {
      fontFamily: 'system-ui, sans-serif', fontSize: '18px', fontStyle: 'bold', color: '#24465b',
    }).setOrigin(0.5);
    const startX = 72;
    const width = 576;
    this.add.rectangle(360, 514, width, 7, 0x7390a2, 0.7);
    this.timelineDots = [];
    for (let minute = 0; minute <= TARGET; minute += 1) {
      const x = startX + (minute / TARGET) * width;
      const major = minute % 2 === 0;
      this.add.rectangle(x, 514, major ? 3 : 2, major ? 18 : 10, 0x3f6379, 0.8);
      if (minute % 4 === 0) this.add.text(x, 531, String(minute), { fontFamily: 'system-ui', fontSize: '15px', color: '#31556d' }).setOrigin(0.5, 0);
      const dot = this.add.circle(x, 487, 5, 0xc3d7e3, 0.35);
      this.timelineDots.push(dot);
    }
    this.redMarks = this.syncState.arrivals[6].filter((m) => m > 0).map((minute) => this.add.circle(startX + (minute / TARGET) * width, 476, 6, 0xe74c3c, 0.18));
    this.blueMarks = this.syncState.arrivals[8].filter((m) => m > 0).map((minute) => this.add.circle(startX + (minute / TARGET) * width, 498, 6, 0x388ee8, 0.18));
  }

  createBus(x, y, color, label) {
    const bus = this.add.container(x, y).setDepth(8);
    const body = this.add.rectangle(0, 0, 116, 47, color).setStrokeStyle(3, 0xffffff, 0.85);
    const window1 = this.add.rectangle(-31, -6, 26, 18, 0xdff7ff, 0.95);
    const window2 = this.add.rectangle(1, -6, 26, 18, 0xdff7ff, 0.95);
    const door = this.add.rectangle(36, 1, 22, 30, 0xffffff, 0.7);
    const wheel1 = this.add.circle(-36, 25, 10, 0x29343b);
    const wheel2 = this.add.circle(36, 25, 10, 0x29343b);
    const text = this.add.text(-50, 8, label, { fontFamily: 'system-ui', fontSize: '14px', fontStyle: 'bold', color: '#ffffff' });
    bus.add([body, window1, window2, door, wheel1, wheel2, text]);
    return bus;
  }

  updateMinute(minute) {
    this.clockText?.setText(`00:${String(minute).padStart(2, '0')}`);
    this.timelineDots?.forEach((dot, index) => dot.setFillStyle(index <= minute ? 0x4e83a4 : 0xc3d7e3, index <= minute ? 0.9 : 0.35));

    const redArrives = minute > 0 && minute % 6 === 0;
    const blueArrives = minute > 0 && minute % 8 === 0;
    this.redMarks?.forEach((mark, index) => mark.setAlpha(this.syncState.arrivals[6][index + 1] <= minute ? 1 : 0.18));
    this.blueMarks?.forEach((mark, index) => mark.setAlpha(this.syncState.arrivals[8][index + 1] <= minute ? 1 : 0.18));

    if (minute === 0) {
      this.statusText?.setText('兩台公車現在一起離站。');
      return;
    }
    if (redArrives) this.animateArrival(this.redBus, 'left', minute);
    if (blueArrives) this.animateArrival(this.blueBus, 'right', minute);

    if (redArrives && blueArrives) this.statusText?.setText(`${minute} 分鐘：兩台同時回站！`);
    else if (redArrives) this.statusText?.setText(`${minute} 分鐘：紅色公車回站。`);
    else if (blueArrives) this.statusText?.setText(`${minute} 分鐘：藍色公車回站。`);
    else this.statusText?.setText(`${minute} 分鐘：繼續觀察…`);

    this.options.onEvent?.({ type: 'minute', minute, redArrives, blueArrives });
  }

  animateArrival(bus, side, minute) {
    if (!bus) return;
    const fromX = side === 'left' ? -90 : 810;
    const stationX = side === 'left' ? 295 : 425;
    if (this.reducedMotion) {
      bus.x = stationX;
      return;
    }
    bus.x = fromX;
    this.tweens.killTweensOf(bus);
    this.tweens.timeline({
      targets: bus,
      tweens: [
        { x: stationX, duration: 260, ease: 'Sine.easeOut' },
        { x: stationX, duration: 150 },
        { x: side === 'left' ? 810 : -90, duration: 290, ease: 'Sine.easeIn', delay: minute === TARGET ? 420 : 120 },
      ],
    });
  }

  finishSync() {
    if (this.completed) return;
    this.completed = true;
    celebrateScene(this, { state: this.options.state, x: 360, y: 242, reducedMotion: this.reducedMotion });
    this.options.onEvent?.({ type: 'success', minute: TARGET, syncState: this.syncState });
  }

  play() { this.timeline.play(); }
  pause() { this.timeline.pause(); }
  step() { this.timeline.step(); }
  replay() {
    this.completed = false;
    this.timeline.replay();
    this.redBus.x = 302;
    this.blueBus.x = 425;
  }
  setSpeed(speed) { return this.timeline.setSpeed(speed); }
}
