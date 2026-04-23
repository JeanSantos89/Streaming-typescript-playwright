import { test } from '@playwright/test';
import { PaginationPage } from '../../src/pages/PaginationPage';

test.describe('Paginação de Filmes', () => {
  test('CT06 - Scroll e paginação como usuário logado', async ({ page }) => {
    const paginationPage = new PaginationPage(page);
    await paginationPage.goto();
    await paginationPage.expectLoaded();
    await paginationPage.login();
    await paginationPage.navigateToMovies();
    await paginationPage.loadMoviePages();
  });

  test('CT07 - Scroll e paginação como visitante', async ({ page }) => {
    const paginationPage = new PaginationPage(page);
    await paginationPage.goto();
    await paginationPage.expectLoaded();
    await paginationPage.navigateToMovies();
    await paginationPage.loadMoviePages();
  });
});
