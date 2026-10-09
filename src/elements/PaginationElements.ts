import { Locator, Page } from '@playwright/test';
import { CommonElements } from './CommonElements';

export class PaginationElements extends CommonElements {
  readonly movieCards: Locator;
  readonly activeLoadMore: Locator;

  constructor(page: Page) {
    super(page);
    // Cada "carregar mais" soma uma nova página (#page_2, #page_3, ...) como
    // irmã de #page_1 dentro de #media-list — nunca dentro de #page_1 em si.
    // Por isso o escopo tem que ser #media-list, não #page_1.
    this.movieCards = page.locator('#media-list [data-object-id]:has(h2)');
    this.activeLoadMore = page.locator('.pagination.infinite:not(.hide) a.load_more');
  }
}
