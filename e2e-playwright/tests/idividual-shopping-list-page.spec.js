import { test, expect } from '@playwright/test';

test.describe('Individual Shopping List Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/lists/1');
  });

  test('Render the page layout correctly.', async ({ page }) => {
    const title = await page.locator('h1').textContent();
    // expect(title).toBe('Shopping List Name');

    await expect(page.locator('nav a')).toHaveText('Shopping lists');

    await expect(page.locator('form[action^="/lists/"][method="POST"]')).toBeVisible();
  });

  test('Add a new item to the shopping list.', async ({ page }) => {
    await page.fill('form[action^="/lists/"][method="POST"] input[name="name"]', 'New Item');
    await page.click('form[action^="/lists/"][method="POST"] input[type="submit"]');

    await expect(page.locator('ol li:has-text("New Item")')).toBeVisible();
  });

  test('Mark an item as collected.', async ({ page }) => {
    const itemToCollect = page.locator('ol li:has-text("New Item")');
    
    await expect(itemToCollect).toBeVisible();

    await itemToCollect.locator('form[action*="/collect"] input[type="submit"]').click();

    await expect(page.locator('ol li p:has-text("New Item")')).toHaveText(/<del>Item to Mark<\/del>/);
  });
});