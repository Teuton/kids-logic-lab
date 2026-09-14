export function createSnapSlider(scene, {
  x = 360,
  y = 560,
  width = 520,
  values = [],
  initial = values[0],
  onChange = () => {},
  labelFormatter = (value) => String(value),
} = {}) {
  if (!values.length) throw new Error('Snap slider requires at least one value.');

  const startX = x - width / 2;
  const stepWidth = values.length === 1 ? 0 : width / (values.length - 1);
  const track = scene.add.rectangle(x, y, width, 12, 0x8ba9bf, 0.7).setOrigin(0.5);
  const hitArea = scene.add.rectangle(x, y, width + 42, 64, 0xffffff, 0.001).setInteractive({ useHandCursor: true });
  const ticks = values.map((value, index) => {
    const tx = startX + index * stepWidth;
    scene.add.rectangle(tx, y, 4, 22, 0x557287, 0.8);
    return scene.add.text(tx, y + 28, labelFormatter(value), {
      fontFamily: 'system-ui, sans-serif', fontSize: '18px', color: '#24465b', fontStyle: 'bold',
    }).setOrigin(0.5, 0);
  });
  const knob = scene.add.circle(x, y, 22, 0xffc857, 1)
    .setStrokeStyle(5, 0xffffff, 1)
    .setInteractive({ useHandCursor: true, draggable: true });
  scene.input.setDraggable(knob);

  let currentIndex = Math.max(0, values.indexOf(initial));

  function xForIndex(index) {
    return startX + index * stepWidth;
  }

  function nearestIndex(pointerX) {
    if (values.length === 1) return 0;
    return Math.max(0, Math.min(values.length - 1, Math.round((pointerX - startX) / stepWidth)));
  }

  function applyIndex(index, notify = true) {
    const next = Math.max(0, Math.min(values.length - 1, index));
    currentIndex = next;
    scene.tweens.add({
      targets: knob,
      x: xForIndex(next),
      duration: 90,
      ease: 'Sine.easeOut',
    });
    ticks.forEach((label, labelIndex) => label.setAlpha(labelIndex === next ? 1 : 0.68));
    if (notify) onChange(values[next], next);
  }

  function dragTo(pointerX) {
    const clampedX = Math.max(startX, Math.min(startX + width, pointerX));
    knob.x = clampedX;
    const next = nearestIndex(clampedX);
    if (next !== currentIndex) {
      currentIndex = next;
      ticks.forEach((label, labelIndex) => label.setAlpha(labelIndex === next ? 1 : 0.68));
      onChange(values[next], next);
    }
  }

  knob.on('drag', (pointer, dragX) => dragTo(dragX ?? pointer.worldX));
  knob.on('dragend', () => applyIndex(currentIndex, false));
  hitArea.on('pointerdown', (pointer) => applyIndex(nearestIndex(pointer.worldX)));

  applyIndex(currentIndex, false);

  return {
    track,
    knob,
    hitArea,
    value: () => values[currentIndex],
    setValue(value, notify = true) {
      const index = values.indexOf(value);
      if (index >= 0) applyIndex(index, notify);
    },
  };
}
