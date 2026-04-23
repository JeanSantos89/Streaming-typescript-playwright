import { test } from '@playwright/test';
import { HomePage } from '../../src/pages/HomePage';

test.describe('Pesquisa de Filmes', () => {
  test('CT10 - Pesquisa sem resultados', async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.goto();
    await homePage.expectLoaded();
    await homePage.searchFail();
  });

  test('CT11 - Pesquisa com termo parcial', async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.goto();
    await homePage.expectLoaded();
    await homePage.searchPartial();
  });
});
