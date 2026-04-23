import { test } from '@playwright/test';
import { MoviesPage } from '../../src/pages/MoviesPage';

test.describe('Filtro de Filmes', () => {
  test('CT05 - Aplicar filtros como visitante e verificar resultados', async ({ page }) => {
    const moviesPage = new MoviesPage(page);
    await moviesPage.goto();
    await moviesPage.expectLoaded();
    await moviesPage.applyFilters();
  });
});
