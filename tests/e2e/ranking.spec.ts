import { test } from '@playwright/test';
import { RankingPage } from '../../src/pages/RankingPage';

test.describe('Ranking de Filmes', () => {
  test('CT08 - Visualizar ranking como usuário logado', async ({ page }) => {
    const rankingPage = new RankingPage(page);
    await rankingPage.goto();
    await rankingPage.expectLoaded();
    await rankingPage.viewRankingAsLoggedUser();
  });

  test('CT09 - Visualizar ranking como visitante', async ({ page }) => {
    const rankingPage = new RankingPage(page);
    await rankingPage.goto();
    await rankingPage.expectLoaded();
    await rankingPage.viewRankingAsGuest();
  });
});
