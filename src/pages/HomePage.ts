import { Page, expect } from '@playwright/test';
import { validMovie, invalidMovie, partialMovie } from '../fixtures/testData';
import { HomeElements } from '../elements/HomeElements';

export class HomePage {
  readonly el: HomeElements;

  constructor(private page: Page) {
    this.el = new HomeElements(page);
  }

  async goto() {
    // CT04
    await this.page.goto('/');
    await this.page.waitForLoadState('load');
  }

  async searchSucess() {
    // CT03
    await this.el.searchInput.click();
    await this.el.searchInput.fill(validMovie);
    await this.el.searchInput.press('Enter');

    await this.page.waitForLoadState('load');
    await this.el.firstSearch.click();
    await this.page.waitForLoadState('load');
  }

  async searchFail() {
    // CT01
    await this.el.searchInput.click();
    await this.el.searchInput.fill(invalidMovie);
    await this.el.searchInput.press('Enter');

    await this.page.waitForLoadState('load');
    await expect(this.el.movieCards).toHaveCount(0);
  }

  async searchHalf() {
    // CT02
    await this.el.searchInput.click();
    await this.el.searchInput.fill(partialMovie);
    await this.el.searchInput.press('Enter');

    await this.page.waitForLoadState('load');
    await this.el.movies.click();
    await this.page.waitForLoadState('load');

    await expect(this.el.movieCards.nth(2)).toBeVisible();

    for (let i = 0; i < 3; i++) {
      const titleLocator = this.el.movieCards.nth(i).locator('.title h2');
      const titleText = (await titleLocator.innerText()).toLowerCase();
      expect(titleText).toContain('for');
    }
  }

  async expectLoaded() {
    await expect(this.page.locator('nav')).toBeVisible();
  }

  async expectMovieDetailsBasicInfo() {
    // CT05
    await expect(this.el.movieTitle).toBeVisible(); // título
    await expect(this.el.movieRelease).toBeVisible(); // data
    await expect(this.el.movieRuntime).toBeVisible(); // duração
    await expect(this.el.movieGenres.first()).toBeVisible(); // pelo menos 1 gênero
    await expect(this.el.movieOverview).toBeVisible(); // sinopse
  }

  async moviesCategory() {
    // CT05
    await this.el.movieHomeOption.click(); // Apresenta dropdown do menu inicial: filmes
    // await this.page.waitForLoadState('load');
    await this.page.waitForTimeout(1000); // Espera 1 segundo para o menu dropdown carregar

    await this.el.movieHomeOptionFirst.first().click(); // Seleciona a primeira opção do menu dropdown: "Populares"
    await this.page.waitForLoadState('load'); // Aguarda carregamento do filtro

    await this.el.firstMovieCard.click();
    await this.page.waitForLoadState('load');

    await this.expectMovieDetailsBasicInfo();
  }
}
