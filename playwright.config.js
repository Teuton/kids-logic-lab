import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  testMatch: 'responsive.spec.js',
  workers: 1,
  timeout: 60_000,
  expect: { timeout: 10_000 },
  use: {
    headless: true,
    baseURL: 'http://127.0.0.1:4173/kids-logic-lab/',
  },
  webServer: {
    command: 'npm run preview -- --host 127.0.0.1 --port 4173',
    url: 'http://127.0.0.1:4173/kids-logic-lab/',
    reuseExistingServer: false,
    timeout: 30_000,
  },
});
