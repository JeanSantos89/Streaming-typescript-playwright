import { test, Browser, chromium } from '@playwright/test';
import { AuthPage } from '../../src/pages/AuthPage';
import { InterestPage } from '../../src/pages/InterestPage';

test.only('E2E - Logado, adicionar a lista de interesses um filme ou série e remover', async ({ page }) => { //CT03
  const home = new InterestPage(page);
  await home.goto();
  await home.expectLoaded();
  await home.interestActions();
});

