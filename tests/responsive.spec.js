import { test, expect } from '@playwright/test';

const requiredViewports = [
  { name: 'phone-390', width: 390, height: 844 },
  { name: 'phone-430', width: 430, height: 932 },
  { name: 'tablet-768', width: 768, height: 1024 },
  { name: 'desktop-1440', width: 1440, height: 900 },
];

async function expectNoHorizontalOverflow(page) {
  const overflow = await page.evaluate(() => ({
    innerWidth: window.innerWidth,
    scrollWidth: document.documentElement.scrollWidth,
  }));
  expect(overflow.scrollWidth).toBeLessThanOrEqual(overflow.innerWidth + 1);
}

async function expectTouchTargets(page) {
  const sizes = await page.locator('.v2-controls button').evaluateAll((buttons) => buttons.map((button) => {
    const rect = button.getBoundingClientRect();
    return { width: rect.width, height: rect.height, label: button.textContent?.trim() };
  }));
  expect(sizes.length).toBeGreaterThan(0);
  for (const size of sizes) {
    expect(size.height, `${size.label} should be at least 44px high`).toBeGreaterThanOrEqual(44);
  }
}

for (const viewport of requiredViewports) {
  test(`${viewport.width}x${viewport.height} home, city and V2 levels render`, async ({ page }) => {
    const pageErrors = [];
    page.on('pageerror', (error) => pageErrors.push(error.message));
    await page.setViewportSize({ width: viewport.width, height: viewport.height });

    await page.goto('#home');
    await expect(page.getByRole('heading', { name: /數學王/ })).toBeVisible();
    await expect(page.locator('[data-home-city] canvas')).toBeVisible();
    await expectNoHorizontalOverflow(page);

    await page.locator('[data-start]').click();
    await expect(page.locator('.city-level')).toHaveCount(14);
    await expectNoHorizontalOverflow(page);

    for (const levelId of ['factor-factory', 'lcm-race', 'lamp-mission']) {
      await page.goto(`#level/${levelId}`);
      await expect(page.locator('.phaser-stage canvas')).toBeVisible();
      await expect(page.locator('.npc-dialogue')).toBeVisible();
      await expect(page.locator('.tutorial-step')).toBeVisible();
      await expectTouchTargets(page);
      await expectNoHorizontalOverflow(page);
      await page.waitForTimeout(120);
    }

    expect(pageErrors, `browser runtime errors at ${viewport.width}x${viewport.height}`).toEqual([]);
  });
}
