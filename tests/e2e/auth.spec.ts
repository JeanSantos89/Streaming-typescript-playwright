import { test, Browser, chromium } from '@playwright/test';
import { AuthPage } from '../../src/pages/AuthPage';

test('E2E - Autenticação - Login', async ({ page }) => { //CT01
  const home = new AuthPage(page);
  await home.goto();
  await home.expectLoaded();
  await home.Auth();
});

test('E2E - Autenticado, realizar logout', async ({ browser }) => { //CT02
    const context = await browser.newContext({
    viewport: { width: 1920, height: 1080 } // Full HD
  });
  const page = await context.newPage();
  const home = new AuthPage(page);
  await home.goto();
  await home.expectLoaded();
  await home.AuthLogout();
});