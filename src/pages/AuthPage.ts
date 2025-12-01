import { Page, expect } from '@playwright/test';
import { AuthElements } from '../elements/AuthElements';

export class AuthPage {
  readonly el: AuthElements;

  constructor(protected page: Page) {
    this.el = new AuthElements(page);
  }

  async expectLoaded() {
    await expect(this.page.locator('nav')).toBeVisible();
  }

  async goto() {
    await this.page.goto('/');
    await this.page.waitForLoadState('load');
  }

  async Auth() {
    await this.el.loginButton.click();
    await this.page.waitForLoadState('load');

    await this.el.usernameInput.fill(process.env.TMDB_USERNAME as string);
    await this.el.passwordInput.fill(process.env.TMDB_PASSWORD as string);
    await this.el.submitButton.click();

    await this.page.waitForSelector('a.logged_in[href^="/u/"]');
  }

  async AuthLogout() {
    await this.Auth();
    await this.el.perfil.click();
    await this.el.logout.last().click();
    await expect(this.el.logoutCheck).toBeVisible();
  }
}
