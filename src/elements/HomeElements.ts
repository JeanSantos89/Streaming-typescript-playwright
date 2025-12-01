import { Locator, Page } from '@playwright/test';

export class HomeElements {
  readonly searchInput: Locator;
  readonly firstSearch: Locator;
  readonly movieCards: Locator;
  readonly movies: Locator;
  readonly movieHomeOption: Locator;
  readonly firstMovieCard: Locator;

  // Detalhes do filme
  readonly movieTitle: Locator;
  readonly movieRelease: Locator;
  readonly movieRuntime: Locator;
  readonly movieGenres: Locator;
  readonly movieOverview: Locator;
  readonly movieHomeOptionFirst: Locator;

  constructor(page: Page) {
    this.searchInput = page.locator('#inner_search_v4');
    this.movies = page.locator('a#movie');

    this.firstSearch = page
      .locator('.search_results.movie .results .card')
      .first()
      .locator('a.result')
      .first();

    this.movieCards = page.locator('.search_results.movie .results .card');

    this.movieHomeOption = page.locator(
      'li.k-menu-item[aria-haspopup="true"] > a.k-menu-link[href="/movie"]'
    );

    this.movieHomeOptionFirst = page.locator(
      'ul.k-menu-group li.k-menu-item.k-first > a.k-menu-link'
    );

    this.firstMovieCard = page.locator('#page_1 .card.style_1').first();

    // --- locators da página de detalhes ---
    this.movieTitle = page.locator('.title h2 a');
    this.movieRelease = page.locator('.facts .release');
    this.movieRuntime = page.locator('.facts .runtime');
    this.movieGenres = page.locator('.facts .genres a');
    this.movieOverview = page.locator('.overview p');
  }
}