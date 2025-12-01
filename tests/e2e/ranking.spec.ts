import { test, Browser, chromium } from '@playwright/test';
import { RankingPage } from '../../src/pages/RankingPage';

test('E2E - Ranking de filmes logado', async ({ page }) => { //CT09
  const home = new RankingPage(page);
  await home.goto();
  await home.expectLoaded();
  await home.RankingActionsLogged();
});

test('E2E - Ranking de filmes deslogado', async ({ page }) => { //CT10
  const home = new RankingPage(page);
  await home.goto();
  await home.expectLoaded();
  await home.RankingActionsUnlogged();
});

