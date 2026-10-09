import { Locator, Page } from '@playwright/test';
import { CommonElements } from './CommonElements';

export class PaginationElements extends CommonElements {
  readonly movieCards: Locator;
  readonly activeLoadMore: Locator;

  constructor(page: Page) {
    super(page);
    this.movieCards = page.locator('#page_1 [data-object-id]:has(h2)');
    this.activeLoadMore = page.locator('.pagination.infinite:not(.hide) a.load_more');
  }
}
