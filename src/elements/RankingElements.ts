import { Page } from '@playwright/test';
import { CommonElements } from './CommonElements';

export class RankingElements extends CommonElements {
  constructor(page: Page) {
    super(page);
  }
}
