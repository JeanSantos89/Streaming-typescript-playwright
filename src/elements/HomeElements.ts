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
    this.searchInput = page.locator('#search_v4');
    this.movieFilterLink = page.locator('a#movie');

    this.searchMovieCards = page.locator('#movie_results [data-object-id]:has(h2)');

    this.firstSearchResult = this.searchMovieCards
      .first()
      .locator('a[data-media-type="movie"]')
      .first();

    this.movieMenuOption = page.locator('a.dropdown-menu-trigger[href="/movie"]');

    this.movieMenuFirstOption = page.locator(
      '.dropdown-menu-item:has(> a.dropdown-menu-trigger[href="/movie"]) .dropdown-menu-popup a',
    );

    this.firstMovieCard = page
      .locator('#page_1 [data-object-id]:has(h2)')
      .first()
      .locator('a[href^="/movie/"]')
      .first();

    this.movieTitle = page.locator('.title h2 a');
    this.movieRelease = page.locator('.facts .release');
    this.movieRuntime = page.locator('.facts .runtime');
    this.movieGenres = page.locator('.facts .genres a');
    this.movieOverview = page.locator('.overview p');
  }
}
