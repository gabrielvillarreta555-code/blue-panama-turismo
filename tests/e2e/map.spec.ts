import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
const png = Buffer.from(
  'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+jO9sAAAAASUVORK5CYII=',
  'base64',
);
test('map is opt-in, has attribution and accessible markers', async ({ page }) => {
  let requests = 0;
  await page.route('https://tile.openstreetmap.org/**', (route) => {
    requests++;
    return route.fulfill({ contentType: 'image/png', body: png });
  });
  await page.goto('/mapa/');
  expect(requests).toBe(0);
  await page.getByRole('button', { name: 'Cargar mapa', exact: true }).click();
  await expect(page.locator('#map-status')).toContainText('Mapa cargado');
  expect(requests).toBeGreaterThan(0);
  await expect(page.locator('.leaflet-control-attribution')).toContainText('OpenStreetMap');
  await expect(page.locator('.map-marker')).toHaveCount(1);
  await page.locator('.map-marker').focus();
  await page.keyboard.press('Enter');
  await expect(page.locator('.leaflet-popup')).toContainText('no es una entrada');
  const results = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
    .analyze();
  expect(results.violations).toEqual([]);
  await page.getByRole('link', { name: 'Consultar ficha', exact: true }).click();
  await expect(page).toHaveURL(/destinos\/coiba/);
});
test('failed tiles preserve list and retry recovers', async ({ page }) => {
  let fail = true;
  await page.route('https://tile.openstreetmap.org/**', (route) =>
    fail ? route.abort() : route.fulfill({ contentType: 'image/png', body: png }),
  );
  await page.goto('/mapa/');
  await page.getByRole('button', { name: 'Cargar mapa', exact: true }).click();
  await expect(page.locator('#map-status')).toContainText('No se pudo cargar');
  await expect(page.locator('#lista-mapa').getByRole('link').first()).toBeVisible();
  fail = false;
  await page.getByRole('button', { name: 'Reintentar mapa', exact: true }).click();
  await expect(page.locator('#map-status')).toContainText('Mapa cargado');
});
test('offline and restored connection have explicit states', async ({ page, context }) => {
  await page.goto('/mapa/');
  await context.setOffline(true);
  await expect(page.locator('#map-status')).toContainText('Sin conexión');
  await expect(page.locator('#lista-mapa')).toBeVisible();
  await context.setOffline(false);
  await expect(page.locator('#map-status')).toContainText('Conexión recuperada');
});
test('module failure gives a useful fallback', async ({ page }) => {
  await page.route('**/_astro/*', (route) =>
    route.request().url().includes('leaflet') && route.request().resourceType() === 'script'
      ? route.abort()
      : route.continue(),
  );
  await page.goto('/mapa/');
  await page.getByRole('button', { name: 'Cargar mapa', exact: true }).click();
  await expect(page.locator('#map-status')).toContainText('No se pudo iniciar');
  await expect(page.getByRole('button', { name: 'Reintentar mapa', exact: true })).toBeVisible();
});
test('slow tiles time out instead of leaving indefinite loading', async ({ page }) => {
  await page.clock.install();
  await page.route('https://tile.openstreetmap.org/**', () => {});
  await page.goto('/mapa/');
  await page.getByRole('button', { name: 'Cargar mapa', exact: true }).click();
  await expect(page.locator('.map-marker')).toHaveCount(1);
  await page.clock.fastForward(13000);
  await expect(page.getByRole('button', { name: 'Reintentar mapa', exact: true })).toBeVisible();
  await expect(page.locator('#map-status')).toContainText('No se pudo completar');
});
