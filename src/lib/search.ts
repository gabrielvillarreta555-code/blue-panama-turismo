import type { Destination, Territory } from './schemas';
import { experiences, activities } from './experiences';
export interface SearchItem {
  id: string;
  name: string;
  regions: string[];
  regionNames: string[];
  categories: string[];
  activities: string[];
  cost: 'gratuito' | 'pago' | null;
}
export interface Filters {
  q: string;
  region: string;
  categoria: string;
  actividad: string;
  acceso: string;
}
export const normalize = (text: string) =>
  text
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLocaleLowerCase('es')
    .trim();
export function createSearchIndex(
  destinations: Destination[],
  territories: Territory[],
): SearchItem[] {
  const lookup = new Map(territories.map((t) => [t.id, t]));
  return destinations
    .filter((d) => d.status === 'publicado')
    .map((d) => {
      const regionIds = new Set<string>();
      for (const id of d.regions) {
        let t = lookup.get(id);
        while (t) {
          if (['provincia', 'comarca'].includes(t.kind)) regionIds.add(t.id);
          t = t.parentId ? lookup.get(t.parentId) : undefined;
        }
      }
      return {
        id: d.id,
        name: d.name,
        regions: [...regionIds],
        regionNames: [...regionIds].map((id) => lookup.get(id)!.name),
        categories: d.categories,
        activities: d.activities,
        cost: d.cost.status === 'confirmado' ? d.cost.value.type : null,
      };
    });
}
export function readFilters(params: URLSearchParams, regions: string[]): Filters {
  const accepted = (key: string, valid: readonly string[]) => {
    const value = params.get(key) ?? '';
    return valid.includes(value) ? value : '';
  };
  return {
    q: (params.get('q') ?? '').slice(0, 160).trim(),
    region: accepted('region', regions),
    categoria: accepted(
      'categoria',
      experiences.map((x) => x.id),
    ),
    actividad: accepted(
      'actividad',
      activities.map((x) => x.id),
    ),
    acceso: accepted('acceso', ['gratuito', 'pago']),
  };
}
export function search(items: SearchItem[], filters: Filters): SearchItem[] {
  const words = normalize(filters.q).split(/\s+/).filter(Boolean);
  return items.filter(
    (item) =>
      words.every((word) =>
        normalize(`${item.name} ${item.regionNames.join(' ')}`).includes(word),
      ) &&
      (!filters.region || item.regions.includes(filters.region)) &&
      (!filters.categoria || item.categories.includes(filters.categoria)) &&
      (!filters.actividad || item.activities.includes(filters.actividad)) &&
      (!filters.acceso || item.cost === filters.acceso),
  );
}
export function serializeFilters(filters: Filters): string {
  const params = new URLSearchParams();
  for (const [key, value] of Object.entries(filters)) if (value) params.set(key, value);
  return params.toString();
}
