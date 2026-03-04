import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';
dotenv.config();

export default defineConfig({
  globalSetup: require.resolve('./src/globalSetup'),

  projects: [
    {
      name: 'chromium',
      use: { browserName: 'chromium' },
    },
  ],

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

    // 🔹 Ou, se quiser focar só em falha (já está assim hoje):
    //screenshot: 'only-on-failure',
    //trace: 'on-first-retry',
    //video: 'retain-on-failure',

    userAgent:
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleW...bKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
  },

  // 🔹 Onde vão ficar os artefatos de teste (screens, vídeos, trace)
  outputDir: 'evidence/test-results',

  reporter: [
    ['html', { open: 'never', outputFolder: 'evidence/report' }],
    ['list'],
  ],
});
