import { test, expect } from "@playwright/test";


test.describe('Main Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });    

  test("Render the page layout correctly.", async ({ page }) => {
    await expect(page.locator('h1')).toHaveText('Shared shopping lists');

    const navLink = page.locator('nav a');

    await expect(navLink).toHaveText('Lists');
    await expect(navLink).toHaveAttribute('href', '/lists');
  });

  test("On main page exist statistic by lists and list items or message if not.", async ({ page }) => {
    const noListsMessage = page.locator('p', { hasText: 'No shopping lists yet.' });
    const listsCountText = page.locator('p', { hasText: 'Shopping lists:' });
    const itemsCountText = page.locator('p', { hasText: 'Shopping list items:' });

    if (await noListsMessage.isVisible()) {
      console.log('No shopping lists are present.');
      await expect(noListsMessage).toBeVisible();
    } else {
      console.log('Statistics are present.');
      await expect(listsCountText).toBeVisible();
      await expect(itemsCountText).toBeVisible();
    }
  });

  test('Redirect to the correct URL after clicking "Lists" link.', async ({ page }) => {
    await page.click('nav a:has-text("Lists")');
    await page.waitForURL('http://host.docker.internal:7777/lists');
    
    expect(page.url()).toBe('http://host.docker.internal:7777/lists');
  });
});