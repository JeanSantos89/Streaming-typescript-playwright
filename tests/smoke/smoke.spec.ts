import { test } from '@playwright/test';
import { HomePage } from '../../src/pages/HomePage';

test.describe('Smoke Tests', () => {
  test('CT12 - Home page carregada corretamente', async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.goto();
    await homePage.expectLoaded();
  });

  test('CT13 - Pesquisa básica funcional', async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.goto();
    await homePage.expectLoaded();
    await homePage.searchSuccess();
  });

  test('CT14 - Exibir detalhes de conteúdo', async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.goto();
    await homePage.expectLoaded();
    await homePage.navigateToMoviesCategory();
  });
});
