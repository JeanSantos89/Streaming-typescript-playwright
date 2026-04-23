import { expect, Locator } from '@playwright/test';

export const customExpect = {
  async toHaveMinCount(locator: Locator, min: number) {
    const count = await locator.count();
    expect(count).toBeGreaterThanOrEqual(min);
  },
};
