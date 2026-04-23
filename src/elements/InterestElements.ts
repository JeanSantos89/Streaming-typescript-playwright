import { Locator, Page } from '@playwright/test';
import { CommonElements } from './CommonElements';

export class InterestElements extends CommonElements {
  readonly firstContentCard: Locator;
  readonly watchlistBtn: Locator;
  readonly profileLink: Locator;
  readonly watchlistPageLink: Locator;
  readonly positiveCountLink: Locator;
  readonly removeFromWatchlistBtn: Locator;
  readonly successNotification: Locator;

  constructor(page: Page) {
    super(page);

    this.firstContentCard = page
      .locator('.column_content')
      .first()
      .locator('.card.style_1:not(.loading):not(.spacer)')
      .first();

    this.watchlistBtn = page.locator('#watchlist');
    this.profileLink = page.locator('a.logged_in[href^="/u/"]');
    this.watchlistPageLink = page.locator('a[href$="watchlist?sort_by=upcoming"]').first();

    this.positiveCountLink = page.locator('h3', {
      has: page.locator('span.color.pink'),
      hasText: /[1-9]/,
    });

    this.removeFromWatchlistBtn = page.locator('a.account_list_action[data-list-type="watchlist"]');
    this.successNotification = page.locator('div.notification.success');
  }
}
