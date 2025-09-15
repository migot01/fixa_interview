import { test as base, expect } from '@playwright/test';
import { TEST_DATA } from './test-data';

export interface AuthUser {
  email: string;
  password: string;
}

export const test = base.extend<{ authenticatedPage: any }>({
  authenticatedPage: async ({ browser }, use) => {
    // Create a new context and page for authentication
    const context = await browser.newContext();
    const page = await context.newPage();

    try {
      // Navigate to login page
      await page.goto('/login');
      await page.waitForLoadState('domcontentloaded');

      // Fill in login credentials
      await page.fill('input[type="text"], input[name="username"], input[placeholder*="Username"], input[placeholder*="username"]', TEST_DATA.credentials.email);
      await page.fill('input[type="password"], input[name="password"], input[placeholder*="Password"], input[placeholder*="password"]', TEST_DATA.credentials.password);

      // Click login button
      await page.click('button[type="submit"]');

      // Wait for successful login (dashboard should be visible)
      try {
        await expect(page.locator('text=Good Evening')).toBeVisible({ timeout: 20000 });
      } catch (error) {
        // If "Good Evening" not found, try alternative login success indicators
        await expect(page.locator('text=Dashboard, text=Employees, h1')).toBeVisible({ timeout: 10000 });
      }

      // Use the authenticated page
      await use(page);
    } finally {
      // Cleanup
      await context.close();
    }
  },
});

export { expect } from '@playwright/test';
