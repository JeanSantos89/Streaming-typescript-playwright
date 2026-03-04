import { test, expect } from '@playwright/test';
import { HomePage } from '../src/pages/HomePage';

test.describe('Test group', () => {
  test('seed', async ({ page }) => {
    const home = new HomePage(page);
    await home.goto();
  });
});
