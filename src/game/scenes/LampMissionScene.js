import Phaser from 'phaser';
import { lampSpacingState } from '../../math/gameplay.js';
import { createSnapSlider } from '../../interactions/Slider.js';
import { celebrateScene } from '../RewardSystem.js';
import { wrongCamera } from '../CameraEffects.js';

const SIDES = [120, 168, 192];
const DISTANCES = [6, 8, 12, 16, 24, 32, 48];
const ANSWER = 24;

export class LampMissionScene extends Phaser.Scene {
  constructor(options = {}) {
    super({ key: 'LampMissionV2' });
    this.options = options;
    this.lamps = [];
    this.success = false;
  }

  create() {
    this.reducedMotion = Boolean(this.options.reducedMotion);
    this.points = [
      new Phaser.Math.Vector2(125, 105),
      new Phaser.Math.Vector2(596, 132),
      new Phaser.Math.Vector2(342, 455),
    ];

    this.add.rectangle(360, 300, 720, 620, 0xdff5ff);
    this.add.rectangle(360, 380, 720, 480, 0xbce98f);
    this.drawCloud(112, 65, 0.75);
    this.drawCloud(560, 62, 0.9);
    this.drawPark();
    this.createLampTexture();

    this.statusText = this.add.text(360, 502, '拖動距離尺，看看三條路會發生什麼。', {
      fontFamily: 'system-ui, sans-serif',
      fontSize: '22px',
      fontStyle: 'bold',
      color: '#24465b',
      align: 'center',
      wordWrap: { width: 620 },
    }).setOrigin(0.5);

    this.slider = createSnapSlider(this, {
      x: 360,
      y: 554,
      width: 520,
      values: DISTANCES,
      initial: 12,
      labelFormatter: (value) => `${value}m`,
      onChange: (value) => this.setSpacing(value, true),
    });

    this.setSpacing(12, false);
    this.options.onReady?.(this);
  }

  drawCloud(x, y, scale) {
    const cloud = this.add.container(x, y).setScale(scale);
    [
      [-30, 2, 24], [0, -10, 31], [31, 3, 22], [3, 9, 40],
    ].forEach(([cx, cy, radius]) => cloud.add(this.add.circle(cx, cy, radius, 0xffffff, 0.86)));
    if (!this.reducedMotion) {
      this.tweens.add({ targets: cloud, x: x + 36, duration: 7000, yoyo: true, repeat: -1, ease: 'Sine.easeInOut' });
    }
  }

  drawPark() {
    const road = this.add.graphics();
    road.lineStyle(40, 0xc8b99d, 1);
    road.strokeTriangle(
      this.points[0].x, this.points[0].y,
      this.points[1].x, this.points[1].y,
      this.points[2].x, this.points[2].y,
    );
    road.lineStyle(4, 0xffffff, 0.7);
    road.strokeTriangle(
      this.points[0].x, this.points[0].y,
      this.points[1].x, this.points[1].y,
      this.points[2].x, this.points[2].y,
    );

    this.remainderGraphics = this.add.graphics();
    this.add.text(354, 76, '120 m', this.labelStyle()).setOrigin(0.5);
    this.add.text(525, 306, '168 m', this.labelStyle()).setOrigin(0.5).setRotation(-0.9);
    this.add.text(206, 300, '192 m', this.labelStyle()).setOrigin(0.5).setRotation(0.93);

    [
      [270, 205], [375, 220], [322, 325], [408, 345], [255, 365], [463, 246],
    ].forEach(([x, y], index) => this.drawTree(x, y, 0.75 + (index % 2) * 0.1));

    this.drawWorker(346, 285);
    this.add.text(360, 407, '公園路燈工程', {
      fontFamily: 'system-ui, sans-serif', fontSize: '25px', fontStyle: 'bold', color: '#315b2e',
    }).setOrigin(0.5);
  }

  labelStyle() {
    return {
      fontFamily: 'system-ui, sans-serif', fontSize: '20px', fontStyle: 'bold',
      color: '#27475a', backgroundColor: '#ffffffdd', padding: { x: 8, y: 4 },
    };
  }

  drawTree(x, y, scale = 1) {
    this.add.rectangle(x, y + 18 * scale, 10 * scale, 28 * scale, 0x8b5a35);
    this.add.circle(x, y, 22 * scale, 0x4fae5a);
    this.add.circle(x - 13 * scale, y + 5 * scale, 15 * scale, 0x69c56b);
    this.add.circle(x + 13 * scale, y + 5 * scale, 15 * scale, 0x58b65c);
  }

  drawWorker(x, y) {
    const worker = this.add.container(x, y);
    worker.add(this.add.circle(0, -17, 12, 0xf6c89f));
    worker.add(this.add.rectangle(0, 2, 24, 30, 0x3f7dcf));
    worker.add(this.add.rectangle(0, -27, 26, 7, 0xffc857));
    worker.add(this.add.circle(-4, -18, 2, 0x263b4a));
    worker.add(this.add.circle(4, -18, 2, 0x263b4a));
    if (!this.reducedMotion) {
      this.tweens.add({ targets: worker, y: y - 4, duration: 900, yoyo: true, repeat: -1, ease: 'Sine.easeInOut' });
    }
  }

  createLampTexture() {
    if (this.textures.exists('mk-lamp')) return;
    const g = this.add.graphics();
    g.fillStyle(0x5f6f79, 1).fillRect(8, 12, 4, 22);
    g.fillStyle(0xffec82, 1).fillCircle(10, 9, 7);
    g.lineStyle(2, 0xffffff, 0.9).strokeCircle(10, 9, 7);
    g.generateTexture('mk-lamp', 20, 36);
    g.destroy();
  }

  clearLamps() {
    this.lamps.forEach((lamp) => lamp.destroy());
    this.lamps = [];
    this.remainderGraphics.clear();
  }

  drawLampAt(x, y, invalid = false) {
    const lamp = this.add.image(x, y, 'mk-lamp').setScale(0.62).setDepth(5);
    if (invalid) lamp.setTint(0xff6b6b).setAngle(18);
    this.lamps.push(lamp);
    return lamp;
  }

  renderSpacing(spacing) {
    this.clearLamps();
    const result = lampSpacingState(SIDES, spacing);

    SIDES.forEach((sideLength, edgeIndex) => {
      const start = this.points[edgeIndex];
      const end = this.points[(edgeIndex + 1) % this.points.length];
      const edge = result.edges[edgeIndex];
      const maxFull = edge.segments;

      for (let segmentIndex = 0; segmentIndex <= maxFull; segmentIndex += 1) {
        const logicalDistance = Math.min(segmentIndex * spacing, sideLength);
        const t = logicalDistance / sideLength;
        this.drawLampAt(
          Phaser.Math.Linear(start.x, end.x, t),
          Phaser.Math.Linear(start.y, end.y, t),
          false,
        );
      }

      if (edge.remainder > 0) {
        const remainderStartT = (edge.segments * spacing) / sideLength;
        const rx = Phaser.Math.Linear(start.x, end.x, remainderStartT);
        const ry = Phaser.Math.Linear(start.y, end.y, remainderStartT);
        this.remainderGraphics.lineStyle(11, 0xff6961, 0.9);
        this.remainderGraphics.lineBetween(rx, ry, end.x, end.y);
        this.drawLampAt(rx, ry, true);
        const midX = Phaser.Math.Linear(rx, end.x, 0.5);
        const midY = Phaser.Math.Linear(ry, end.y, 0.5);
        const label = this.add.text(midX, midY, `剩 ${edge.remainder}m`, {
          fontFamily: 'system-ui, sans-serif', fontSize: '17px', fontStyle: 'bold',
          color: '#8d2222', backgroundColor: '#fff5f5ee', padding: { x: 6, y: 3 },
        }).setOrigin(0.5).setDepth(8);
        this.lamps.push(label);
      }
    });

    return result;
  }

  setSpacing(spacing, userInitiated = true) {
    if (!this.scene?.isActive?.() && this.sys?.settings?.status < 2) return;
    const result = this.renderSpacing(Number(spacing));
    const remainderText = result.edges.filter((edge) => edge.remainder > 0)
      .map((edge) => `${edge.length}m 還剩 ${edge.remainder}m`)
      .join('、');

    if (!result.valid) {
      this.statusText?.setText(`有路段排不完：${remainderText}`);
      if (userInitiated) wrongCamera(this, this.reducedMotion);
      this.options.onEvent?.({ type: 'invalid-spacing', spacing, result });
      return;
    }

    if (spacing < ANSWER) {
      this.statusText?.setText(`${spacing}m 可以排完！但一共要 ${result.totalLamps} 盞，能不能再少一點？`);
      this.options.onEvent?.({ type: 'valid-spacing', spacing, result });
      return;
    }

    if (spacing === ANSWER) {
      this.statusText?.setText('三條路都剛剛好，而且路燈最少！');
      this.lamps.forEach((lamp) => lamp.setTint?.(0xc9ff9b));
      if (!this.success) {
        this.success = true;
        celebrateScene(this, { state: this.options.state, x: 360, y: 250, reducedMotion: this.reducedMotion });
        this.options.onEvent?.({ type: 'success', spacing, result });
      }
    }
  }
}
