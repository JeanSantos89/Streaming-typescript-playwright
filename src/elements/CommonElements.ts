import { Locator, Page } from '@playwright/test';

export class CommonElements {
  readonly logoHome: Locator;
  readonly moviesBar: Locator;
  readonly popular: Locator;

  constructor(page: Page) {
    this.logoHome = page.locator('a.logo').first();
    this.moviesBar = page.locator('a.dropdown-menu-trigger[href="/movie"]');
    this.popular = page.locator(
      '.dropdown-menu-item:has(> a.dropdown-menu-trigger[href="/movie"]) .dropdown-menu-popup a',
    ).first();
  }
}
