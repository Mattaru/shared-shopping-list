import { test, expect } from "@playwright/test";
import * as fixturesService from "../services/fixturesService.js";


const commonData = {
  testList: {},
  randomName: `Item${Math.random()}`,
};

test.describe('Individual Shopping List Page', async() => {

  test('DB create test List.', async () => {
    commonData.testList = (await fixturesService.addList(`List${Math.random()}`)).rows[0];
  });

  test.beforeEach(async ({ page }) => {
    await page.goto(`/lists/${commonData.testList.id}`);
  });

  test('Render the page layout correctly.', async ({ page }) => {
    const title = await page.locator('h1');
    await expect(title).toHaveText(commonData.testList.name);

    await expect(page.locator('nav a')).toHaveText('Shopping lists');

    await expect(page.locator('form[action^="/lists/"][method="POST"]')).toBeVisible();
  });

  test('Add a new item to the shopping list.', async ({ page }) => {
    const nameInput = await page.locator('input[name="name"]');
    const submitButton = await page.locator('input[type="submit"][value="Add item"]');

    await nameInput.fill(commonData.randomName);
    await submitButton.click();

    const newItem = await page.locator(`ol li:has-text("${commonData.randomName}")`);
    await expect(newItem).toBeVisible();
  });

  test('Mark an item as collected.', async ({ page }) => {
    const itemToCollect = page.locator(`ol li:has-text("${commonData.randomName}")`);
    
    await expect(itemToCollect).toBeVisible();

    await itemToCollect.locator('form[action*="/collect"] input[type="submit"]').click();

    const collectedItem = await page.locator(`ol li:has-text("${commonData.randomName}") del`);
    await expect(collectedItem).toBeVisible();

    await fixturesService.deleteItemByName(commonData.randomName);
  });

  test('Redirect to the correct URL after clicking "Shopping lists" link.', async ({ page }) => {
    await page.click('nav a:has-text("Shopping lists")');
    await page.waitForURL('http://host.docker.internal:7777/lists');
    
    expect(page.url()).toBe('http://host.docker.internal:7777/lists');
  });

  test('Delited the test List from db.', async () => {
    await fixturesService.deletListById(commonData.testList.id);
  });
});