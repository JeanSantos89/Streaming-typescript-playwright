import { test, Browser, chromium } from '@playwright/test';
import { MoviesPage } from '../../src/pages/MoviesPage';
import { AuthPage } from '../../src/pages/AuthPage';


test('E2E - Logado, usar o filtro completo e observar resultados', async ({ page }) => { //CT04
  const home = new MoviesPage(page);
  await home.goto();
  await home.expectLoaded();
  await home.Auth();
  await home.RankingFilter();
});

test('E2E - Deslogado, usar o filtro completo e observar resultados', async ({ page }) => { //CT05
  const home = new MoviesPage(page);
  await home.goto();
  await home.expectLoaded();
  await home.RankingFilter();
});
