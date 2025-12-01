import { Locator, Page } from '@playwright/test';

export class MoviesElements {
  readonly logoHome: Locator;
  readonly moviesBar: Locator;
  readonly popular: Locator;
  readonly unWatched: Locator;
  readonly FirstRangeFilter: Locator;
  readonly AdventureGenere: Locator;
  readonly ActionGenere: Locator;
  readonly AgeRangeFilter: Locator;
  readonly LanguageFilter: Locator;
  readonly FilterBtn: Locator;

  constructor(page: Page) {
    this.logoHome = page.locator('a.logo');
    this.moviesBar = page.locator('ul.dropdown_menu.navigation li').first();
    this.popular = page.locator('ul.k-menu-group.k-menu-group-md > li').first();
    this.unWatched = page.locator('.filter label.k-radio-label').nth(1);
    this.FirstRangeFilter = page.locator('#release_date_gte');
    this.AdventureGenere = page.locator('#with_genres li[data-value="12"]');
    this.ActionGenere = page.locator('#with_genres li[data-value="28"]');
    this.AgeRangeFilter = page.locator('#certification li[data-value="18"]');
    this.LanguageFilter = page.locator('.k-input-value-text').nth(3);
    this.FilterBtn = page.locator('p.load_more a.load_more').first();
  }
}