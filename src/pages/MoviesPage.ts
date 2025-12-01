import { Page, expect } from '@playwright/test';
import { AuthPage } from './AuthPage';
import { MoviesElements } from '../elements/MoviesElements';
import { dateInitial } from '../fixtures/testData';

export class MoviesPage extends AuthPage {
  readonly moviesEl: MoviesElements;
  constructor(page: Page) { 
    super(page);
    this.moviesEl = new MoviesElements(page);
  }

  async expectLoaded() {
    await expect(this.page.locator('nav')).toBeVisible();
  }

  async goto() {
    await this.page.goto('/');
    await this.page.waitForLoadState('load');
  }

  async RankingFilter() {
    await this.moviesEl.logoHome.click();
    await this.page.waitForLoadState('load');
    await this.page.waitForTimeout(1000);

    await this.moviesEl.moviesBar.hover();
    await this.moviesEl.popular.click();
    await this.page.waitForLoadState('load');
    await this.page.waitForTimeout(1000);

    await this.moviesEl.FirstRangeFilter.click();
    await this.moviesEl.FirstRangeFilter.fill(dateInitial);

    await this.moviesEl.AdventureGenere.click();
    await this.moviesEl.ActionGenere.click();
    await this.moviesEl.AgeRangeFilter.click();

    await this.moviesEl.LanguageFilter.click();
    await this.page.waitForTimeout(500);
    // Aguarda o dropdown estar visível
    await this.page.locator('#language_listbox li').nth(1).waitFor({ state: 'visible', timeout: 10000 });
    await this.page.locator('#language_listbox li').nth(1).click({ force: true });
    await this.page.waitForTimeout(300);
    await this.moviesEl.LanguageFilter.press('Enter');
    await this.page.waitForTimeout(500);

    await this.moviesEl.FilterBtn.click();
    await this.page.waitForLoadState('load');
    await this.page.waitForTimeout(1000);
  }
}
