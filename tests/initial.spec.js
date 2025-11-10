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
