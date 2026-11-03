import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
test('home has accessible navigation and functional search submission', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/Blue Panamá/);
  await page.getByRole('searchbox').fill('Coclé');
  await page.getByRole('button', { name: 'Explorar' }).click();
  await expect(page).toHaveURL(/q=Cocl/);
  await expect(page.getByRole('searchbox')).toHaveValue('Coclé');
});
test('mobile menu closes with Escape', async ({ page, isMobile }) => {
  test.skip(!isMobile);
  await page.goto('/');
  const menu = page.getByRole('button', { name: 'Menú' });
  await menu.click();
  await expect(menu).toHaveAttribute('aria-expanded', 'true');
  await page.keyboard.press('Escape');
  await expect(menu).toHaveAttribute('aria-expanded', 'false');
  await expect(menu).toBeFocused();
});
test('home has no automated WCAG A/AA violations or horizontal overflow', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  const results = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
    .analyze();
  expect(results.violations).toEqual([]);
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
});
