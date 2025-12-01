import { test, Browser, chromium } from '@playwright/test';
import { PaginationPage } from '../../src/pages/PaginationPage';
import { AuthPage } from '../../src/pages/AuthPage';


test('E2E - Logado, realizar Scroll e paginação dos filmes (3 listas)', async ({ page }) => { //CT012
  const home = new PaginationPage(page);
  await home.goto();
  await home.expectLoaded();
  await home.Auth();
  await home.Pagination();
});

test('E2E - Deslogado, realizar Scroll e paginação dos filmes (3 listas)', async ({ page }) => { //CT013
  const home = new PaginationPage(page);
  await home.goto();
  await home.expectLoaded();
  await home.Pagination();
});
