import { Page, expect } from '@playwright/test';
import { AuthPage } from './AuthPage';
import { MoviesElements } from '../elements/MoviesElements';
import { dateInitial } from '../fixtures/testData';

export class MoviesPage extends AuthPage {
  protected readonly moviesEl: MoviesElements;

  constructor(page: Page) {
    super(page);
    this.moviesEl = new MoviesElements(page);
  }

  async applyFilters() {
    await this.clickAndWait(this.moviesEl.logoHome);
    await this.moviesEl.moviesBar.hover();
    await expect(this.moviesEl.popular).toBeVisible();
    await this.clickAndWait(this.moviesEl.popular);

    await this.moviesEl.firstRangeFilter.click();
    await this.moviesEl.firstRangeFilter.fill(dateInitial);

    await this.moviesEl.adventureGenre.click();
    await this.moviesEl.actionGenre.click();
    await this.moviesEl.ageRangeFilter.click();

    await this.moviesEl.languageFilter.click();
    await this.page.locator('#language_listbox li').nth(1).waitFor({ state: 'visible' });
    await this.page.locator('#language_listbox li').nth(1).click({ force: true });
    await this.moviesEl.languageFilter.press('Enter');

    await this.clickAndWait(this.moviesEl.filterBtn);
  }
}
