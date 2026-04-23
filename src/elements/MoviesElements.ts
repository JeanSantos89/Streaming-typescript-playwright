import { Locator, Page } from '@playwright/test';
import { CommonElements } from './CommonElements';

export class MoviesElements extends CommonElements {
  readonly firstRangeFilter: Locator;
  readonly adventureGenre: Locator;
  readonly actionGenre: Locator;
  readonly ageRangeFilter: Locator;
  readonly languageFilter: Locator;
  readonly filterBtn: Locator;

  constructor(page: Page) {
    super(page);
    this.firstRangeFilter = page.locator('#release_date_gte');
    this.adventureGenre = page.locator('#with_genres li[data-value="12"]');
    this.actionGenre = page.locator('#with_genres li[data-value="28"]');
    this.ageRangeFilter = page.locator('#certification li[data-value="18"]');
    this.languageFilter = page.locator('.k-input-value-text').nth(3);
    this.filterBtn = page.locator('p.load_more a.load_more').first();
  }
}
