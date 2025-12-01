import { test } from '@playwright/test';
import { HomePage } from '../../src/pages/HomePage';

test('Smoke - Home Page é carregada', async ({ page }) => { //CT04
  const home = new HomePage(page);
  await home.goto();
  await home.expectLoaded();
});

test('Smoke - Pesquisa Básica é carregada', async ({ page }) => { //CT03
  const home = new HomePage(page);
  await home.goto();
  await home.expectLoaded();
  await home.searchSucess();
});

test('Smoke - Exibir detalhes de conteúdos', async ({ page }) => { //CT05
  const home = new HomePage(page);
  await home.goto();
  await home.expectLoaded();
  await home.moviesCategory();
});



