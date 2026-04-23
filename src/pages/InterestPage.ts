import { Page, expect } from '@playwright/test';
import { AuthPage } from './AuthPage';
import { InterestElements } from '../elements/InterestElements';

export class InterestPage extends AuthPage {
  protected readonly interestEl: InterestElements;

  constructor(page: Page) {
    super(page);
    this.interestEl = new InterestElements(page);
  }

  async manageWatchlist() {
    await this.login();
    await this.openFirstContentDetails();
    await this.addToWatchlist();
    await this.navigateToWatchlist();
    await this.removeFromWatchlist();
  }

  private async openFirstContentDetails() {
    await this.clickAndWait(this.interestEl.logoHome);
    await expect(this.interestEl.firstContentCard).toBeVisible({ timeout: 15000 });
    await this.interestEl.firstContentCard.click({ force: true });
    await this.page.waitForLoadState('load');
  }

  private async addToWatchlist() {
    await this.interestEl.watchlistBtn.click();
  }

  private async navigateToWatchlist() {
    await this.clickAndWait(this.interestEl.profileLink);
    await this.clickAndWait(this.interestEl.watchlistPageLink);
  }

  private async removeFromWatchlist() {
    await expect(this.interestEl.positiveCountLink).toBeVisible({ timeout: 15000 });
    await this.interestEl.positiveCountLink.click({ force: true });
    await this.page.waitForLoadState('load');

    await this.interestEl.removeFromWatchlistBtn.click();
    await this.page.waitForLoadState('load');

    await expect(this.interestEl.successNotification).toBeVisible({ timeout: 10000 });
  }
}
