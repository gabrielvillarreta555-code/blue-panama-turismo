import { test, expect } from '@playwright/test';
test('search and combined filters, reset and shared URL', async ({ page }) => {
  await page.goto('/explorar/?q=ANTON&region=cocle&categoria=naturaleza&actividad=senderismo');
  await expect(page.locator('[data-destination]:visible')).toHaveCount(1);
  await expect(page.getByRole('heading', { name: 'El Valle de Antón' })).toBeVisible();
  await page.getByLabel('Acceso confirmado').selectOption('gratuito');
  await expect(page.locator('#no-results')).toBeVisible();
  await expect(page.locator('[data-destination]:visible')).toHaveCount(0);
  await page.reload();
  await expect(page.getByLabel('Acceso confirmado')).toHaveValue('gratuito');
  await page.getByRole('link', { name: 'Limpiar filtros' }).click();
  await expect(page.locator('[data-destination]:visible')).toHaveCount(4);
  await expect(page).toHaveURL(/\/explorar\/$/);
});
test('filter history, no-match query and safe text', async ({ page }) => {
  await page.goto('/explorar/');
  await page.getByLabel('Provincia o comarca').selectOption('colon');
  await expect(page.locator('[data-destination]:visible')).toHaveCount(1);
  await page.getByLabel('Provincia o comarca').selectOption('cocle');
  await page.goBack();
  await expect(page.getByLabel('Provincia o comarca')).toHaveValue('colon');
  await page.getByRole('searchbox').fill('<script>alert(1)</script>');
  await expect(page.locator('#no-results')).toBeVisible();
});
test('detail has factual limits, source links and region link', async ({ page }) => {
  await page.goto('/destinos/el-valle-de-anton/');
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('El Valle de Antón');
  await expect(
    page.getByText('Coordenadas pendientes de verificación.', { exact: false }),
  ).toBeVisible();
  await expect(page.locator('#fuente-atp-valle')).toBeAttached();
  await page.locator('.facts').getByRole('link', { name: 'Coclé', exact: true }).click();
  await expect(page).toHaveURL(/regiones\/cocle/);
});
test('catalog and destination remain usable without JavaScript', async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto('http://127.0.0.1:4321/explorar/');
  await expect(page.locator('[data-destination]')).toHaveCount(4);
  await expect(
    page.getByText('Activa JavaScript para buscar y filtrar.', { exact: false }),
  ).toBeVisible();
  await page.getByRole('heading', { name: 'Boquete', exact: true }).getByRole('link').click();
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Boquete');
  await context.close();
});
