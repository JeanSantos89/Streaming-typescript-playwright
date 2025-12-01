import { Locator, Page } from '@playwright/test';

export class RankingElements {
  // --- Locators do fluxo de Interesse ---
  readonly logoHome: Locator;
  readonly moviesBar: Locator;
  readonly popular: Locator;

  constructor(page: Page) {
    this.logoHome = page.locator('a.logo'); // Logo que redireciona para a página inicial
    this.moviesBar = page.locator('ul.dropdown_menu.navigation li').first();
    this.popular = page.locator('ul.k-menu-group.k-menu-group-md > li').first();
  }
}