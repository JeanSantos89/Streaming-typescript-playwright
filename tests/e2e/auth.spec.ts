import { test } from '@playwright/test';
import { AuthPage } from '../../src/pages/AuthPage';

test.describe('Autenticação', () => {
  test('CT01 - Login com credenciais válidas', async ({ page }) => {
    const authPage = new AuthPage(page);
    await authPage.goto();
    await authPage.expectLoaded();
    await authPage.login();
  });

  test('CT02 - Login seguido de logout', async ({ browser }) => {
    const context = await browser.newContext({ viewport: { width: 1920, height: 1080 } });
    try {
      const page = await context.newPage();
      const authPage = new AuthPage(page);
      await authPage.goto();
      await authPage.expectLoaded();
      await authPage.loginAndLogout();
    } finally {
      await context.close();
    }
  });
});
