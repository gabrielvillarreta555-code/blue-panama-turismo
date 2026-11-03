import { test, expect } from '@playwright/test';
test('region navigation and editorial empty state', async ({ page }) => {
 await page.goto('/');
 await page.locator('#regiones').getByRole('link', { name: 'Guna Yala', exact: false }).click();
 await expect(page.getByRole('heading', {level:1})).toHaveText('Guna Yala');
 await expect(page.getByText('Todavía no hay fichas publicadas')).toBeVisible();
 await page.goto('/regiones/cocle/');
 await expect(page.locator('[data-destination="el-valle-de-anton"]')).toBeVisible();
});
