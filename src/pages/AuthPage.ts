import { Page, expect } from '@playwright/test';
import { BasePage } from './BasePage';
import { AuthElements } from '../elements/AuthElements';
import { cookieSelectors } from '../fixtures/testData';

export class AuthPage extends BasePage {
  protected readonly el: AuthElements;

  constructor(page: Page) {
    super(page);
    this.el = new AuthElements(page);
  }

  async goto() {
    await this.navigateTo('/');
    await this.dismissCookieBanner();
  }

  async login() {
    await this.el.loginButton.click();
    await this.page.waitForLoadState('load');
    await this.el.usernameInput.fill(process.env.TMDB_USERNAME ?? '');
    await this.el.passwordInput.fill(process.env.TMDB_PASSWORD ?? '');
    await this.el.submitButton.click();
    await this.page.waitForSelector('a.logged_in[href^="/u/"]');
  }

  async loginAndLogout() {
    await this.login();
    await this.el.profileLink.click();
    await this.el.logoutLink.last().click();
    await expect(this.el.logoutConfirmation).toBeVisible();
  }

  private async dismissCookieBanner() {
    for (const selector of cookieSelectors) {
      const btn = this.page.locator(selector);
      if ((await btn.count()) > 0 && (await btn.isVisible())) {
        await btn.click();
        return;
      }
    }
  }
}
