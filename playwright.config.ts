import { defineConfig } from '@playwright/test';
import dotenv from 'dotenv';
dotenv.config();

export default defineConfig({
  globalSetup: require.resolve('./src/globalSetup'),
  testDir: './tests',
  timeout: 120_000,
  retries: 2,
  expect: { timeout: 10_000 },

  use: {
    baseURL: 'https://www.themoviedb.org',
    headless: true,
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    userAgent:
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
  },

  outputDir: 'evidence/test-results',

  reporter: [
    ['html', { open: 'never', outputFolder: 'evidence/report' }],
    ['list'],
  ],

  projects: [
    {
      name: 'chromium',
      use: { browserName: 'chromium' },
    },
  ],
});
