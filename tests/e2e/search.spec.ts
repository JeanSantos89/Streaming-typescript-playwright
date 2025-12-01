import { test } from '@playwright/test';
import { HomePage } from '../../src/pages/HomePage';

test('E2E - Pesquisa sem resultados', async ({ page }) => { //CT01
  const home = new HomePage(page);
  await home.goto();
  await home.expectLoaded();
  await home.searchFail();
});

test('E2E - Pesquisa com escrita parcial', async ({ page }) => { //CT02
  const home = new HomePage(page);
  await home.goto();
  await home.expectLoaded();
  await home.searchHalf();
});
