import { describe, test, expect } from 'vitest';
import { destinationSchema, sourceSchema, territorySchema, fact, reviewDate } from '../../src/lib/schemas';
import { validateCatalog } from '../../src/lib/validation';
import destinationsJson from '../../src/content/destinations.json';
import territoriesJson from '../../src/content/territories.json';
import sourcesJson from '../../src/content/sources.json';
import { z } from 'zod';
const destinations = destinationsJson.map(x => destinationSchema.parse(x));
const territories = territoriesJson.map(x => territorySchema.parse(x));
const sources = sourcesJson.map(x => sourceSchema.parse(x));
describe('editorial model', () => {
 test('real catalog has valid references and 10 provinces / 6 comarcas', () => {
  expect(() => validateCatalog(territories,destinations,sources)).not.toThrow();
  expect(territories.filter(x => x.kind === 'provincia')).toHaveLength(10);
  expect(territories.filter(x => x.kind === 'comarca')).toHaveLength(6);
 });
 test('confirmed facts require evidence; unknown facts cannot carry invented values', () => {
  const schema = fact(z.string());
  expect(schema.safeParse({status:'confirmado',value:'gratis',sources:[]}).success).toBe(false);
  expect(schema.safeParse({status:'desconocido',value:'gratis'}).success).toBe(false);
  expect(schema.safeParse({status:'no_aplica',reason:'Localidad sin un horario único'}).success).toBe(true);
 });
 test('invalid and future review dates fail', () => {
  expect(reviewDate.safeParse('2026-02-30').success).toBe(false);
  expect(reviewDate.safeParse('2999-01-01').success).toBe(false);
 });
 test('dangling sources, duplicates and cycles fail validation', () => {
  expect(() => validateCatalog(territories,destinations,[])).toThrow(/Fuente/);
  expect(() => validateCatalog(territories,[...destinations,destinations[0]!],sources)).toThrow(/duplicado/);
  const changed = structuredClone(territories); changed[0]!.parentId = changed[0]!.id;
  expect(() => validateCatalog(changed,destinations,sources)).toThrow(/Ciclo/);
 });
 test('administrative relation must match destination region', () => {
  const changed = structuredClone(destinations); const valle = changed.find(x => x.id === 'el-valle-de-anton')!; valle.regions=['colon'];
  expect(() => validateCatalog(territories,changed,sources)).toThrow(/Distrito/);
 });
 test('Coiba reference converts UNESCO DMS without pretending to be an entrance', () => {
  const c=destinations.find(x => x.id === 'coiba')!.coordinates;
  if(c.status !== 'confirmado') throw new Error('Missing reference');
  expect(c.value.lat).toBeCloseTo(7+25/60+58.8/3600,6);
  expect(c.value.lng).toBeCloseTo(-(81+45/60+57.6/3600),6);
  expect(c.value.kind).toBe('referencia');
 });
});
