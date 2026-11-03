import { getCollection } from 'astro:content';
import { validateCatalog } from './validation';
import type { Destination, Territory } from './schemas';
let cached: ReturnType<typeof load> | undefined;
async function load() {
 const [t,d,s] = await Promise.all([getCollection('territories'),getCollection('destinations'),getCollection('sources')]);
 const territories = t.map(x => x.data); const allDestinations = d.map(x => x.data); const sources = s.map(x => x.data);
 validateCatalog(territories,allDestinations,sources);
 const regions = territories.filter(x => ['provincia','comarca'].includes(x.kind)).sort((a,b) => a.name.localeCompare(b.name,'es'));
 return { territories, regions, destinations: allDestinations.filter(x => x.status === 'publicado'), sources };
}
export function getCatalog() { return cached ??= load(); }
export function belongsToRegion(destination: Destination, regionId: string, territories: Territory[]) {
 const lookup = new Map(territories.map(t => [t.id,t]));
 return destination.regions.some(id => { let t = lookup.get(id); while (t) { if (t.id === regionId) return true; t = t.parentId ? lookup.get(t.parentId) : undefined; } return false; });
}
