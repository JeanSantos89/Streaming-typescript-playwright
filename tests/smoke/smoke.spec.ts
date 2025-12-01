import { test } from '@playwright/test';
import { HomePage } from '../../src/pages/HomePage';

test('Smoke - Home Page é carregada', async ({ page }) => { //CT12
  const home = new HomePage(page);
  await home.goto();
  await home.expectLoaded();
});

test('Smoke - Pesquisa Básica é carregada', async ({ page }) => { //CT13
  const home = new HomePage(page);
  await home.goto();
  await home.expectLoaded();
  await home.searchSucess();
});

test('Smoke - Exibir detalhes de conteúdos', async ({ page }) => { //CT14
  const home = new HomePage(page);
  await home.goto();
  await home.expectLoaded();
  await home.moviesCategory();
});



