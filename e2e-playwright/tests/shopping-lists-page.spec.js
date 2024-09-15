import { test, expect } from '@playwright/test';


test.describe('Shopping Lists Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/lists');
  });

  test('Render the page layout correctly.', async ({ page }) => {
    const title = await page.locator('h1');
    await expect(title).toHaveText('Shopping lists'); 

    const mainPageLink = await page.locator('nav a');
    await expect(mainPageLink).toHaveAttribute('href', '/');
    await expect(mainPageLink).toHaveText('Main page');

    const nameInput = await page.locator('input[name="name"]');
    await expect(nameInput).toBeVisible();

    const submitButton = await page.locator('input[type="submit"]');
    await expect(submitButton).toHaveValue('Add list');
  });

  test('Allow adding a new shopping list.', async ({ page }) => {
    const nameInput = await page.locator('input[name="name"]');
    const submitButton = await page.locator('input[type="submit"]');
    const testName = `Name${Math.random()}`;

    await nameInput.fill(testName);
    await submitButton.click();

    const newList = await page.locator('ol li a', { hasText: testName });
    await expect(newList).toBeVisible();
  });

  test('Allow deactivating a shopping list.', async ({ page }) => {
    const firstListItem = await page.locator('ol li').first();
    const listName = await firstListItem.locator('a').textContent();

    const deactivateButton = await page.locator('form[action^="/lists/"] input[type="submit"]', 
      { hasText: 'Deactivate' });
    await deactivateButton.first().click();

    await page.waitForLoadState('networkidle');

    const remainingListItems = await page.locator('ol li a', { hasText: listName });
    await expect(remainingListItems).toHaveCount(0);
  });

  test('Navigate to the individual shopping list page', async ({ page }) => {
    // Add new list for testing
    const nameInput = await page.locator('input[name="name"]');
    const submitButton = await page.locator('input[type="submit"]');
    const testName = `Name${Math.random()}`;

    await nameInput.fill(testName);
    await submitButton.click();

    // Testing navigation
    const listItems = await page.locator('ol li a');
    const listLink = listItems.first();
    const listText = await listLink.textContent(); 

    await listLink.click();

    await expect(page).toHaveURL(new RegExp('/lists/\\d+'));

    await expect(page.locator('h1')).toHaveText(listText || '');
  });

  test('Redirect to the correct URL after clicking "Lists" link.', async ({ page }) => {
    await page.click('nav a:has-text("Main page")');
    await page.waitForURL('/');
    
    expect(page.url()).toBe('http://localhost:7777/');
  });
});