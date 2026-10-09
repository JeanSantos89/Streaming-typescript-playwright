import { Locator, Page } from '@playwright/test';
import { CommonElements } from './CommonElements';

export class RankingElements extends CommonElements {
  readonly movieCards: Locator;

  constructor(page: Page) {
    super(page);
    this.movieCards = page.locator('#media-list [data-object-id]:has(h2)');
  }
}
