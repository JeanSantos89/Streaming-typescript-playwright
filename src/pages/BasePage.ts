import { Page, TestInfo, Locator, expect } from '@playwright/test';

export class BasePage {
  protected readonly page: Page;
  protected readonly testInfo: TestInfo;

  constructor(page: Page, testInfo: TestInfo) {
    this.page = page;
    this.testInfo = testInfo;
  }

  //egistra um passo com screenshot de evidência.
  protected async step(name: string, action: () => Promise<void>) {
    await action();

    await this.testInfo.attach(name, {
      body: await this.page.screenshot({ fullPage: true }),
      contentType: 'image/png',
    });
  }

  //Navega para uma URL relativa e espera carregar.
  protected async navigateTo(url: string, stepName = 'Navega para URL') {
    await this.step(stepName, async () => {
      await this.page.goto(url);
      await this.page.waitForLoadState('load');
    });
  }

  //Clique + espera carregar (muito comum).
  protected async clickAndWait(
    locator: Locator,
    stepName: string,
    loadState: 'load' | 'networkidle' = 'load',
  ) {
    await this.step(stepName, async () => {
      await locator.click();
      await this.page.waitForLoadState(loadState);
    });
  }

  //Preenche campo e aperta Enter.
   
  protected async fillAndSubmit(
    locator: Locator,
    text: string,
    stepName: string,
  ) {
    await this.step(stepName, async () => {
      await locator.click();
      await locator.fill(text);
      await locator.press('Enter');
      await this.page.waitForLoadState('load');
    });
  }

  //Valida visibilidade de um locator.
  protected async expectVisible(
    locator: Locator,
    stepName: string,
  ) {
    await this.step(stepName, async () => {
      await expect(locator).toBeVisible();
    });
  }

  //Valida contagem de locators.
  protected async expectCount(
    locator: Locator,
    count: number,
    stepName: string,
  ) {
    await this.step(stepName, async () => {
      await expect(locator).toHaveCount(count);
    });
  }
}