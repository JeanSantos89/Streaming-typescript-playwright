import { Locator, Page } from '@playwright/test';
import { CommonElements } from './CommonElements';

export class PaginationElements extends CommonElements {
  readonly movieCards: Locator;
  readonly activeLoadMore: Locator;

  constructor(page: Page) {
    super(page);
    this.movieCards = page.locator('.media_items .card.style_1');
    this.activeLoadMore = page.locator('.pagination.infinite:not(.hide) a.load_more');
  }
}
