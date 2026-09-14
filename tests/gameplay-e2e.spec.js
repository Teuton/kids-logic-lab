import { test, expect } from '@playwright/test';

async function collectPageErrors(page) {
  const errors = [];
  page.on('pageerror', (error) => errors.push(error.message));
  return errors;
}

test('三個 V2 關卡可以從操作一路玩到數學概念揭曉', async ({ page }) => {
  const pageErrors = await collectPageErrors(page);
  await page.setViewportSize({ width: 390, height: 844 });

  await page.goto('#level/lamp-mission');
  await expect(page.locator('.phaser-stage canvas')).toBeVisible();
  await page.locator('[data-distance="24"]').click();
  await expect(page.locator('.discovery-panel')).toBeVisible();
  await expect(page.locator('.concept-reveal')).toContainText('最大公因數');
  await expect(page.locator('.concept-reveal')).toContainText('GCD = 24');

  await page.goto('#level/factor-factory');
  for (const boxes of [1, 3, 5, 9, 15, 45]) {
    await page.locator(`[data-boxes="${boxes}"]`).click();
  }
  await expect(page.locator('.discovery-panel')).toBeVisible();
  await expect(page.locator('.concept-reveal')).toContainText('45 的因數');
  await expect(page.locator('.factor-found-grid')).toContainText('45');

  await page.goto('#level/lcm-race');
  for (let minute = 0; minute < 24; minute += 1) {
    await page.locator('[data-step]').click();
  }
  await expect(page.locator('.discovery-panel')).toBeVisible();
  await expect(page.locator('.concept-reveal')).toContainText('最小公倍數');
  await expect(page.locator('.concept-reveal')).toContainText('LCM = 24');

  expect(pageErrors).toEqual([]);
});

test('reduced motion 開啟後 V2 關卡仍可完成', async ({ page }) => {
  const pageErrors = await collectPageErrors(page);
  await page.addInitScript(() => {
    const key = 'kidsLogicLab.progress.v1';
    const current = JSON.parse(localStorage.getItem(key) || '{}');
    current.settings = {
      sound: false,
      music: false,
      reducedMotion: true,
      ...(current.settings || {}),
      reducedMotion: true,
      sound: false,
      music: false,
    };
    localStorage.setItem(key, JSON.stringify(current));
  });
  await page.setViewportSize({ width: 430, height: 932 });
  await page.goto('#level/lamp-mission');
  await page.locator('[data-distance="24"]').click();
  await expect(page.locator('.concept-reveal')).toContainText('GCD = 24');
  await expect(page.locator('html')).toHaveAttribute('data-motion', 'reduced');
  expect(pageErrors).toEqual([]);
});

test('原有主要模式路由仍可開啟', async ({ page }) => {
  const pageErrors = await collectPageErrors(page);
  await page.setViewportSize({ width: 390, height: 844 });
  for (const route of ['practice', 'duel', 'mistakes', 'achievements', 'report', 'settings']) {
    await page.goto(`#${route}`);
    await expect(page.locator('.screen')).toBeVisible();
  }
  expect(pageErrors).toEqual([]);
});
