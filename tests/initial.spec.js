import { test, expect } from '@playwright/test';
const URL = 'http://localhost:8080/'

test('has label', async ({ page }) => {
  await page.goto(URL);
  await expect(page.locator('label')).toHaveText('What level do you want to play?');

});

test('choose level 5', async ({ page }) => {
  await page.goto(URL);
  await page.locator('input').fill('5');
  await page.locator('button').click();
  await expect(page.locator('.game'), {
    timeout: 5000
  }).toBeVisible();
});

test('Can see lines for 5 attempts', async ({ page }) => {
  await page.goto(URL);
  await page.locator('input').fill('5');
  await page.locator('button').click();
  const rows = page.locator('.line');
  await expect(rows).toHaveCount(5);
});

test('Can see tiles for 5 letters', async ({ page }) => {
  await page.goto(URL);
  await page.locator('input').fill('5');
  await page.locator('button').click();
  const tiles = page.locator('.tile-solution');
  await expect(tiles).toHaveCount(5);
});

test('shows result message on game finish', async ({ page }) => {
  await page.goto(URL);
  await page.locator('input').fill('5');
  await page.locator('button').click();

  // Simulate filling the board to finish the game
  for (let i = 0; i < 5; i++) {
    for (let j = 0; j < 5; j++) {
      await page.keyboard.press('A'); // Press any key to fill letters
    }
    await page.keyboard.press('Enter'); // Submit the row
  }

  await expect(page.locator('.result-container')).toBeVisible();
});

test('can restart the game', async ({ page }) => {
  await page.goto(URL);
  await page.locator('input').fill('5');
  await page.locator('button').click();

  // Simulate filling the board to finish the game
  for (let i = 0; i < 5; i++) {
    for (let j = 0; j < 5; j++) {
      await page.keyboard.press('A'); // Press any key to fill letters
    }
    await page.keyboard.press('Enter'); // Submit the row
  }

  await page.locator('.btn-restart').click();
});
