import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { readFileSync } from 'node:fs';
import { destinationSchema, sourceSchema, territorySchema } from './src/lib/schemas.ts';
import { validateCatalog } from './src/lib/validation.ts';

// Validate raw arrays before Astro's file loader can collapse duplicate IDs.
const readRecords = (name) =>
  JSON.parse(readFileSync(new URL(`./src/content/${name}.json`, import.meta.url), 'utf8'));
validateCatalog(
  readRecords('territories').map((record) => territorySchema.parse(record)),
  readRecords('destinations').map((record) => destinationSchema.parse(record)),
  readRecords('sources').map((record) => sourceSchema.parse(record)),
);
const site = process.env.SITE_URL?.trim();
const indexable = process.env.SITE_INDEXABLE === 'true';
if (indexable && !site) throw new Error('SITE_INDEXABLE requiere SITE_URL real.');
if (site) {
  const parsed = new URL(site);
  if (
    parsed.protocol !== 'https:' ||
    parsed.pathname !== '/' ||
    parsed.search ||
    parsed.hash ||
    parsed.username ||
    parsed.password
  )
    throw new Error('SITE_URL debe ser un origen HTTPS sin ruta ni credenciales.');
}
export default defineConfig({
  output: 'static',
  trailingSlash: 'always',
  site,
  integrations: site && indexable ? [sitemap({ filter: (page) => !page.endsWith('/404/') })] : [],
});
