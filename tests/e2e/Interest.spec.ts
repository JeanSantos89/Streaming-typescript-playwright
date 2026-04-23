import { test } from '@playwright/test';
import { InterestPage } from '../../src/pages/InterestPage';

test.describe('Lista de Interesses', () => {
  test('CT03 - Adicionar e remover item da watchlist', async ({ page }) => {
    const interestPage = new InterestPage(page);
    await interestPage.goto();
    await interestPage.expectLoaded();
    await interestPage.manageWatchlist();
  });
});
