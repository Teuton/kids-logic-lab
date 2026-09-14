import { gsap } from 'gsap';

export function pulseReward(element, reducedMotion = false) {
  if (!element) return null;
  if (reducedMotion) {
    element.classList.add('reward-highlight');
    setTimeout(() => element.classList.remove('reward-highlight'), 240);
    return null;
  }
  return gsap.fromTo(element,
    { scale: 0.82, opacity: 0.7 },
    { scale: 1, opacity: 1, duration: 0.36, ease: 'back.out(1.7)', clearProps: 'transform,opacity' },
  );
}

export function flyReward(anchor, label, reducedMotion = false) {
  if (!anchor) return;
  const rect = anchor.getBoundingClientRect();
  const node = document.createElement('span');
  node.className = 'hud-fly-reward';
  node.textContent = label;
  node.style.left = `${rect.left + rect.width / 2}px`;
  node.style.top = `${rect.top + rect.height / 2}px`;
  document.body.append(node);
  if (reducedMotion) {
    setTimeout(() => node.remove(), 320);
    return;
  }
  gsap.to(node, {
    y: -84,
    opacity: 0,
    scale: 1.2,
    duration: 0.8,
    ease: 'power2.out',
    onComplete: () => node.remove(),
  });
}
