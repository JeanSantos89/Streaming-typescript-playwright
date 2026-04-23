import { Locator, Page } from '@playwright/test';

export class HomeElements {
  readonly searchInput: Locator;
  readonly firstSearchResult: Locator;
  readonly searchMovieCards: Locator;
  readonly movieFilterLink: Locator;
  readonly movieMenuOption: Locator;
  readonly movieMenuFirstOption: Locator;
  readonly firstMovieCard: Locator;
  readonly movieTitle: Locator;
  readonly movieRelease: Locator;
  readonly movieRuntime: Locator;
  readonly movieGenres: Locator;
  readonly movieOverview: Locator;

  constructor(page: Page) {
    this.searchInput = page.locator('#inner_search_v4');
    this.movieFilterLink = page.locator('a#movie');

    this.firstSearchResult = page
      .locator('.search_results.movie .results .card')
      .first()
      .locator('a.result')
      .first();

    this.searchMovieCards = page.locator('.search_results.movie .results .card');

    this.movieMenuOption = page.locator(
      'li.k-menu-item[aria-haspopup="true"] > a.k-menu-link[href="/movie"]',
    );

    this.movieMenuFirstOption = page.locator(
      'ul.k-menu-group li.k-menu-item.k-first > a.k-menu-link',
    );

    this.firstMovieCard = page.locator('#page_1 .card.style_1').first();

    this.movieTitle = page.locator('.title h2 a');
    this.movieRelease = page.locator('.facts .release');
    this.movieRuntime = page.locator('.facts .runtime');
    this.movieGenres = page.locator('.facts .genres a');
    this.movieOverview = page.locator('.overview p');
  }
}
