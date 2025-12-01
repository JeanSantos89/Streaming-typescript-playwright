import { test } from '@playwright/test';
import { HomePage } from '../../src/pages/HomePage';

test('E2E - Pesquisa sem resultados', async ({ page }) => { //CT10
  const home = new HomePage(page);
  await home.goto();
  await home.expectLoaded();
  await home.searchFail();
});

test('E2E - Pesquisa com escrita parcial', async ({ page }) => { //CT11
  const home = new HomePage(page);
  await home.goto();
  await home.expectLoaded();
  await home.searchHalf();
});
