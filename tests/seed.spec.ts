import { test } from '@playwright/test';
import { HomePage } from '../src/pages/HomePage';

test.describe('Sanidade', () => {
  test('Verificar carregamento da home', async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.goto();
    await homePage.expectLoaded();
  });
});
