import { defineCollection } from 'astro:content';
import { file } from 'astro/loaders';
import { destinationSchema, sourceSchema, territorySchema } from './lib/schemas';
export const collections = {
 territories: defineCollection({ loader: file('src/content/territories.json'), schema: territorySchema }),
 destinations: defineCollection({ loader: file('src/content/destinations.json'), schema: destinationSchema }),
 sources: defineCollection({ loader: file('src/content/sources.json'), schema: sourceSchema }),
};
