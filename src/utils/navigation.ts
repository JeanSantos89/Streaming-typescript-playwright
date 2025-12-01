import { Page } from '@playwright/test';

export async function navigateTo(page: Page, path: string) {
  await page.goto(path);
  await page.waitForLoadState('load');
}