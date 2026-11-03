import { test, expect, vi, afterEach } from 'vitest';

afterEach(() => {
  vi.unstubAllEnvs();
  vi.resetModules();
});

test('sin base, las rutas internas no cambian', async () => {
  const { withBase, withoutBase } = await import('../../src/lib/paths');
  expect(withBase('/')).toBe('/');
  expect(withBase('/destinos/coiba/')).toBe('/destinos/coiba/');
  expect(withoutBase('/explorar/')).toBe('/explorar/');
});

test('con base de GitHub Pages, prefija y retira la ruta', async () => {
  vi.stubEnv('BASE_URL', '/blue-panama-turismo/');
  const { withBase, withoutBase } = await import('../../src/lib/paths');
  expect(withBase('/')).toBe('/blue-panama-turismo/');
  expect(withBase('/explorar/?region=colon')).toBe('/blue-panama-turismo/explorar/?region=colon');
  expect(withoutBase('/blue-panama-turismo/')).toBe('/');
  expect(withoutBase('/blue-panama-turismo/mapa/')).toBe('/mapa/');
  expect(() => withBase('destinos/')).toThrow();
});
