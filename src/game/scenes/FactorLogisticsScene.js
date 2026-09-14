import Phaser from 'phaser';
import { groupingState, validGroupCounts } from '../../math/gameplay.js';
import { createSnapSlider } from '../../interactions/Slider.js';
import { celebrateScene } from '../RewardSystem.js';
import { wrongCamera } from '../CameraEffects.js';

const TOTAL = 45;
const BOX_OPTIONS = [1, 3, 4, 5, 7, 9, 15, 45];

export class FactorLogisticsScene extends Phaser.Scene {
  constructor(options = {}) {
    super({ key: 'FactorLogisticsV2' });
    this.options = options;
    this.found = new Set();
    this.oranges = [];
    this.boxes = [];
    this.completed = false;
  }

  create() {
    this.reducedMotion = Boolean(this.options.reducedMotion);
    this.validCounts = validGroupCounts(TOTAL);
    this.add.rectangle(360, 310, 720, 620, 0xfff5dc);
    this.drawWarehouse();
    this.createOrangeTexture();

    this.statusText = this.add.text(360, 92, '45 顆橘子，要每箱一樣多，而且一顆也不能剩。', {
      fontFamily: 'system-ui, sans-serif', fontSize: '21px', fontStyle: 'bold', color: '#5d452b',
      align: 'center', wordWrap: { width: 620 },
    }).setOrigin(0.5);
    this.beacon = this.add.circle(655, 91, 13, 0x6fcf72).setStrokeStyle(4, 0xffffff, 1);

    this.slider = createSnapSlider(this, {
      x: 360,
      y: 560,
      width: 530,
      values: BOX_OPTIONS,
      initial: 4,
      labelFormatter: (value) => `${value}箱`,
      onChange: (value) => this.setBoxes(value, true),
    });

    this.setBoxes(4, false);
    this.options.onReady?.(this);
  }

  drawWarehouse() {
    this.add.rectangle(360, 330, 650, 390, 0xf7f0df).setStrokeStyle(5, 0xd0b789, 1);
    this.add.rectangle(360, 139, 650, 14, 0xd0b789);
    this.add.text(88, 151, 'MATH KING LOGISTICS', {
      fontFamily: 'system-ui, sans-serif', fontSize: '16px', fontStyle: 'bold', color: '#8a6a3f',
    });
    this.add.rectangle(360, 455, 620, 66, 0x56646e);
    for (let x = 72; x <= 648; x += 48) {
      this.add.circle(x, 455, 14, 0x2e383f);
      this.add.circle(x, 455, 7, 0x87949d);
    }
    this.add.text(360, 455, '輸送帶', {
      fontFamily: 'system-ui', fontSize: '18px', fontStyle: 'bold', color: '#ffffff',
    }).setOrigin(0.5);
  }

  createOrangeTexture() {
    if (this.textures.exists('mk-orange')) return;
    const g = this.add.graphics();
    g.fillStyle(0xff8f24, 1).fillCircle(9, 10, 8);
    g.fillStyle(0xffb04a, 1).fillCircle(6, 7, 3);
    g.fillStyle(0x4f9a4a, 1).fillEllipse(13, 2, 8, 4);
    g.generateTexture('mk-orange', 20, 20);
    g.destroy();
  }

  clearDistribution() {
    this.oranges.forEach((orange) => orange.destroy());
    this.boxes.forEach((box) => box.destroy());
    this.oranges = [];
    this.boxes = [];
    this.tweens.killTweensOf(this.oranges);
  }

  boxLayout(count) {
    const columns = Math.min(count, 9);
    const rows = Math.ceil(count / columns);
    const areaWidth = 570;
    const areaHeight = 225;
    const cellWidth = areaWidth / columns;
    const cellHeight = areaHeight / rows;
    return Array.from({ length: count }, (_, index) => {
      const col = index % columns;
      const row = Math.floor(index / columns);
      return {
        x: 75 + cellWidth * (col + 0.5),
        y: 185 + cellHeight * (row + 0.5),
        width: Math.max(18, cellWidth - 8),
        height: Math.max(18, cellHeight - 8),
      };
    });
  }

  orangeTarget(box, slot, perBox) {
    const columns = Math.max(1, Math.ceil(Math.sqrt(perBox)));
    const rows = Math.max(1, Math.ceil(perBox / columns));
    const usableW = Math.max(8, box.width - 12);
    const usableH = Math.max(8, box.height - 12);
    const col = slot % columns;
    const row = Math.floor(slot / columns);
    return {
      x: box.x - usableW / 2 + usableW * ((col + 0.5) / columns),
      y: box.y - usableH / 2 + usableH * ((row + 0.5) / rows),
      scale: Phaser.Math.Clamp(Math.min(usableW / columns / 22, usableH / rows / 22), 0.24, 0.72),
    };
  }

  renderDistribution(boxCount, result, animate = true) {
    this.clearDistribution();
    const layout = this.boxLayout(boxCount);
    layout.forEach((box, index) => {
      const rect = this.add.rectangle(box.x, box.y, box.width, box.height, 0xc9975d, 0.36)
        .setStrokeStyle(3, result.valid ? 0x609c4c : 0x9c7651, 0.9);
      this.boxes.push(rect);
      if (boxCount <= 15) {
        const label = this.add.text(box.x, box.y - box.height / 2 + 3, `${index + 1}`, {
          fontFamily: 'system-ui', fontSize: '12px', fontStyle: 'bold', color: '#6b4a2d',
        }).setOrigin(0.5, 0);
        this.boxes.push(label);
      }
    });

    const distributed = result.perBox * boxCount;
    for (let index = 0; index < TOTAL; index += 1) {
      const startX = 86 + (index % 15) * 38;
      const startY = 437 + Math.floor(index / 15) * 10;
      const orange = this.add.image(startX, startY, 'mk-orange').setDepth(8);
      this.oranges.push(orange);

      if (index < distributed) {
        const boxIndex = index % boxCount;
        const slot = Math.floor(index / boxCount);
        const target = this.orangeTarget(layout[boxIndex], slot, result.perBox);
        orange.setScale(target.scale);
        if (animate && !this.reducedMotion) {
          orange.setScale(0.62);
          this.tweens.add({
            targets: orange,
            x: target.x,
            y: target.y,
            scale: target.scale,
            duration: 310,
            delay: Math.min(index * 12, 380),
            ease: 'Quad.easeOut',
          });
        } else {
          orange.setPosition(target.x, target.y).setScale(target.scale);
        }
      } else {
        orange.setPosition(330 + (index - distributed) * 28, 455).setScale(0.85).setTint(0xff6b4d);
        if (!this.reducedMotion) this.tweens.add({ targets: orange, y: 446, duration: 240, yoyo: true, repeat: -1, ease: 'Sine.easeInOut' });
      }
    }
  }

  setBoxes(boxCount, userInitiated = true) {
    const count = Number(boxCount);
    const result = groupingState(TOTAL, count);
    this.renderDistribution(count, result, userInitiated);

    if (result.valid) {
      this.beacon?.setFillStyle(0x62c66c);
      this.statusText?.setText(`${count} 箱剛剛好！每箱 ${result.perBox} 顆。`);
      if (userInitiated) {
        this.found.add(count);
        this.options.onEvent?.({ type: 'valid-group', boxes: count, result, found: [...this.found].sort((a, b) => a - b) });
      }
      if (this.found.size === this.validCounts.length && !this.completed) {
        this.completed = true;
        celebrateScene(this, { state: this.options.state, x: 360, y: 265, reducedMotion: this.reducedMotion });
        this.options.onEvent?.({ type: 'success', factors: [...this.found].sort((a, b) => a - b) });
      }
      return;
    }

    this.beacon?.setFillStyle(0xe95f55);
    this.statusText?.setText(`${count} 箱分不完：每箱 ${result.perBox} 顆，輸送帶還剩 ${result.remainder} 顆！`);
    if (userInitiated) {
      wrongCamera(this, this.reducedMotion);
      this.options.onEvent?.({ type: 'invalid-group', boxes: count, result });
    }
  }
}
