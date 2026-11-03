import { test, expect } from 'vitest';
import { createMapPoints } from '../../src/lib/map';
import { canonicalUrl, destinationStructuredData } from '../../src/lib/seo';
import { destinationSchema } from '../../src/lib/schemas';
import data from '../../src/content/destinations.json';
const destinations = data.map((x) => destinationSchema.parse(x));
test('map excludes unknown coordinates and drafts', () => {
  expect(createMapPoints(destinations).map((x) => x.id)).toEqual(['coiba']);
  const coiba = destinations.find((x) => x.id === 'coiba')!;
  expect(createMapPoints([{ ...coiba, status: 'borrador' }])).toEqual([]);
  expect(createMapPoints([])).toEqual([]);
});
test('canonicals only use configured origin', () => {
  expect(canonicalUrl(undefined, '/')).toBeUndefined();
  expect(canonicalUrl('https://example.test', '/destinos/coiba/')).toBe(
    'https://example.test/destinos/coiba/',
  );
});
test('structured data omits unverified practical details and coordinates', () => {
  const boquete = destinations.find((x) => x.id === 'boquete')!;
  const structured = destinationStructuredData(boquete, 'https://example.test/destinos/boquete/');
  expect(structured).not.toHaveProperty('geo');
  expect(structured).not.toHaveProperty('isAccessibleForFree');
  expect(structured).not.toHaveProperty('openingHours');
  expect(structured).not.toHaveProperty('aggregateRating');
});
