import { Page, expect } from '@playwright/test';
import { AuthPage } from './AuthPage';
import { PaginationElements } from '../elements/PaginationElements';

export class PaginationPage extends AuthPage {
  protected readonly paginationEl: PaginationElements;

  constructor(page: Page) {
    super(page);
    this.paginationEl = new PaginationElements(page);
  }

  async navigateToMovies() {
    await this.clickAndWait(this.paginationEl.logoHome);
    await this.paginationEl.moviesBar.hover();
    await this.clickAndWait(this.paginationEl.popular);
  }

  async loadMoviePages(maxLoads = 3) {
    for (let i = 1; i < maxLoads; i++) {
      const previousCount = await this.paginationEl.movieCards.count();
      const loadMore = this.paginationEl.activeLoadMore;

      if ((await loadMore.count()) === 0 || !(await loadMore.isVisible())) break;

      await loadMore.scrollIntoViewIfNeeded();
      await loadMore.click({ force: true });

      await expect
        .poll(() => this.paginationEl.movieCards.count(), { timeout: 15000 })
        .toBeGreaterThan(previousCount);
    }
  }
}
