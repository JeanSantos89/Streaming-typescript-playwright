import { Page, Locator, expect } from '@playwright/test';

export class BasePage {
  protected readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async expectLoaded() {
    await expect(this.page.locator('nav')).toBeVisible();
  }

  protected async navigateTo(url: string) {
    await this.page.goto(url);
    await this.page.waitForLoadState('load');
  }

  protected async clickAndWait(
    locator: Locator,
    loadState: 'load' | 'networkidle' = 'load',
  ) {
    await locator.click();
    await this.page.waitForLoadState(loadState);
  }

  protected async fillAndSubmit(locator: Locator, text: string) {
    await locator.fill(text);
    await locator.press('Enter');
    await this.page.waitForLoadState('load');
  }

  protected async expectVisible(locator: Locator) {
    await expect(locator).toBeVisible();
  }
}
