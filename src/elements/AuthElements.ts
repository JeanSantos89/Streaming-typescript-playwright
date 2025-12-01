// src/elements/auth/AuthElements.ts

import { Locator, Page } from '@playwright/test';

export class AuthElements {
  readonly loginButton: Locator;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly submitButton: Locator;
  readonly perfil: Locator;
  readonly logout: Locator;
  readonly logoutCheck: Locator;

  constructor(page: Page) {
    this.loginButton = page.locator('a[href="/login"][aria-label="Login"]');
    this.usernameInput = page.locator('#username');
    this.passwordInput = page.locator('#password');
    this.submitButton = page.locator('#login_button');

    this.perfil = page.locator('a[href^="/u/"][data-role="tooltip"]');
    this.logout = page.locator('.settings_content a[href="/logout"]');
    this.logoutCheck = page.locator('section.flash >> .content_wrapper');
  }
}
