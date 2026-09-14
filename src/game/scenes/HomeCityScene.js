import Phaser from 'phaser';

export class HomeCityScene extends Phaser.Scene {
  constructor(options = {}) {
    super({ key: 'HomeCityV2' });
    this.options = options;
  }

  create() {
    this.reducedMotion = Boolean(this.options.reducedMotion);
    this.add.rectangle(360, 180, 720, 360, 0x9edcff);
    this.add.rectangle(360, 285, 720, 150, 0x91d873);
    this.drawCloud(112, 62, 0.75, 42);
    this.drawCloud(570, 78, 0.9, -34);
    this.drawTower();
    this.drawDistricts();
    this.drawRoad();
    this.drawVehicles();
    this.drawWalkers();
    this.options.onReady?.(this);
  }

  drawCloud(x, y, scale, drift) {
    const cloud = this.add.container(x, y).setScale(scale);
    cloud.add([
      this.add.circle(-25, 5, 22, 0xffffff, 0.85),
      this.add.circle(0, -7, 30, 0xffffff, 0.88),
      this.add.circle(31, 5, 20, 0xffffff, 0.85),
      this.add.rectangle(3, 8, 78, 24, 0xffffff, 0.85),
    ]);
    if (!this.reducedMotion) {
      this.tweens.add({ targets: cloud, x: x + drift, duration: 7200, yoyo: true, repeat: -1, ease: 'Sine.easeInOut' });
    }
  }

  drawTower() {
    const tower = this.add.container(360, 92);
    tower.add(this.add.rectangle(0, 34, 64, 102, 0xdad5ff).setStrokeStyle(4, 0x756db5, 1));
    tower.add(this.add.triangle(0, -30, -40, 20, 40, 20, 0, -25, 0x8b80d8));
    tower.add(this.add.circle(0, 22, 19, 0xffffff, 0.95).setStrokeStyle(3, 0x756db5));
    tower.add(this.add.text(0, 22, 'π', { fontFamily: 'Georgia, serif', fontSize: '25px', fontStyle: 'bold', color: '#5b54a3' }).setOrigin(0.5));
    tower.add(this.add.rectangle(-20, 68, 12, 28, 0x756db5));
    tower.add(this.add.rectangle(20, 68, 12, 28, 0x756db5));
    this.add.text(360, 160, '數學塔', { fontFamily: 'system-ui', fontSize: '15px', fontStyle: 'bold', color: '#514c85' }).setOrigin(0.5);
  }

  drawDistricts() {
    this.drawBuilding(92, 218, 118, 82, 0xffcc67, '超級市場', 0x57a85b);
    this.drawBuilding(226, 234, 104, 64, 0x9fd7ff, '公車站', 0x4e83a4);
    this.drawPark(493, 237);
    this.drawBuilding(630, 230, 106, 72, 0xf3a98f, '工地', 0xd47a56);
  }

  drawBuilding(x, y, width, height, color, label, roofColor) {
    this.add.rectangle(x, y, width, height, color).setStrokeStyle(3, 0xffffff, 0.75);
    this.add.triangle(x, y - height / 2 - 16, x - width / 2 - 7, 16, x + width / 2 + 7, 16, x, -12, roofColor);
    this.add.rectangle(x, y + height / 2 - 16, 22, 32, 0xffffff, 0.68);
    for (let wx = -width / 2 + 22; wx < width / 2 - 12; wx += 33) this.add.rectangle(x + wx, y - 4, 18, 16, 0xeefaff, 0.9);
    this.add.text(x, y + height / 2 + 8, label, { fontFamily: 'system-ui', fontSize: '14px', fontStyle: 'bold', color: '#28495c' }).setOrigin(0.5, 0);
  }

  drawPark(x, y) {
    this.add.ellipse(x, y + 10, 140, 76, 0x70c86d, 1).setStrokeStyle(4, 0xffffff, 0.7);
    [-42, -5, 34].forEach((offset, index) => {
      this.add.rectangle(x + offset, y + 9, 6, 24, 0x8a613e);
      this.add.circle(x + offset, y - 4, 15 + index * 2, 0x3eaa5e);
    });
    this.add.rectangle(x + 48, y + 19, 34, 8, 0x8b6a48);
    this.add.text(x, y + 54, '公園', { fontFamily: 'system-ui', fontSize: '14px', fontStyle: 'bold', color: '#2f6b3d' }).setOrigin(0.5);
  }

  drawRoad() {
    this.add.rectangle(360, 317, 720, 74, 0x56616b);
    for (let x = 18; x < 720; x += 76) this.add.rectangle(x, 317, 38, 4, 0xf8e485, 0.9);
    this.add.rectangle(360, 281, 720, 6, 0xffffff, 0.55);
    this.add.rectangle(360, 353, 720, 6, 0xffffff, 0.55);
  }

  createVehicle(x, y, color, width = 82) {
    const vehicle = this.add.container(x, y);
    vehicle.add(this.add.rectangle(0, 0, width, 30, color).setStrokeStyle(2, 0xffffff, 0.9));
    vehicle.add(this.add.rectangle(-16, -5, 22, 12, 0xdff7ff, 0.95));
    vehicle.add(this.add.rectangle(13, -5, 22, 12, 0xdff7ff, 0.95));
    vehicle.add(this.add.circle(-width * 0.28, 17, 7, 0x273139));
    vehicle.add(this.add.circle(width * 0.28, 17, 7, 0x273139));
    return vehicle;
  }

  drawVehicles() {
    const bus = this.createVehicle(-80, 304, 0xe85b50, 104);
    const car = this.createVehicle(790, 337, 0x4d92e8, 65).setScale(0.84);
    if (!this.reducedMotion) {
      this.tweens.add({ targets: bus, x: 800, duration: 6200, repeat: -1, ease: 'Linear', repeatDelay: 700 });
      this.tweens.add({ targets: car, x: -80, duration: 5200, repeat: -1, ease: 'Linear', repeatDelay: 1200 });
    } else {
      bus.x = 210;
      car.x = 530;
    }
  }

  drawWalkers() {
    const colors = [0x6756a8, 0xe06c75, 0x40916c];
    [180, 420, 575].forEach((x, index) => {
      const walker = this.add.container(x, 267);
      walker.add(this.add.circle(0, -12, 6, 0xf4c6a1));
      walker.add(this.add.rectangle(0, 1, 11, 18, colors[index]));
      walker.add(this.add.rectangle(-4, 14, 4, 14, 0x3b4d59));
      walker.add(this.add.rectangle(4, 14, 4, 14, 0x3b4d59));
      if (!this.reducedMotion) {
        this.tweens.add({ targets: walker, x: x + (index % 2 ? -55 : 55), duration: 3400 + index * 400, yoyo: true, repeat: -1, ease: 'Sine.easeInOut' });
      }
    });
  }
}
