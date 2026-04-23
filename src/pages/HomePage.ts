import { Page, expect } from '@playwright/test';
import { BasePage } from './BasePage';
import { HomeElements } from '../elements/HomeElements';
import { validMovie, invalidMovie, partialMovie } from '../fixtures/testData';

export class HomePage extends BasePage {
  protected readonly el: HomeElements;

  constructor(page: Page) {
    super(page);
    this.el = new HomeElements(page);
  }

  async goto() {
    await this.navigateTo('/');
  }

  async searchSuccess() {
    await this.fillAndSubmit(this.el.searchInput, validMovie);
    await this.clickAndWait(this.el.firstSearchResult);
  }

  async searchFail() {
    await this.fillAndSubmit(this.el.searchInput, invalidMovie);
    await expect(this.el.searchMovieCards).toHaveCount(0);
  }

  async searchPartial() {
    await this.fillAndSubmit(this.el.searchInput, partialMovie);
    await this.clickAndWait(this.el.movieFilterLink);

    await expect(this.el.searchMovieCards.nth(2)).toBeVisible();

    for (let i = 0; i < 3; i++) {
      const title = (
        await this.el.searchMovieCards.nth(i).locator('.title h2').innerText()
      ).toLowerCase();
      expect(title).toContain('for');
    }
  }

  async navigateToMoviesCategory() {
    await this.el.movieMenuOption.click();
    await expect(this.el.movieMenuFirstOption.first()).toBeVisible();
    await this.clickAndWait(this.el.movieMenuFirstOption.first());
    await this.clickAndWait(this.el.firstMovieCard);
    await this.expectMovieDetails();
  }

  async expectMovieDetails() {
    await expect(this.el.movieTitle).toBeVisible();
    await expect(this.el.movieRelease).toBeVisible();
    await expect(this.el.movieRuntime).toBeVisible();
    await expect(this.el.movieGenres.first()).toBeVisible();
    await expect(this.el.movieOverview).toBeVisible();
  }
}
