import { Locator, Page } from '@playwright/test';

export class AuthElements {
  readonly loginButton: Locator;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly submitButton: Locator;
  readonly profileLink: Locator;
  readonly logoutLink: Locator;
  readonly logoutConfirmation: Locator;

  constructor(page: Page) {
    this.loginButton = page.locator('a[href="/login"][aria-label="Login"]');
    this.usernameInput = page.locator('#username');
    this.passwordInput = page.locator('#password');
    this.submitButton = page.locator('#login_button');
    this.profileLink = page.locator('a[href^="/u/"][data-role="tooltip"]');
    this.logoutLink = page.locator('.settings_content a[href="/logout"]');
    this.logoutConfirmation = page.locator('section.flash >> .content_wrapper');
  }
}
