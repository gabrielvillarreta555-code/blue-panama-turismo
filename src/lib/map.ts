import type { Destination } from './schemas';
export interface MapPoint {
  id: string;
  name: string;
  slug: string;
  lat: number;
  lng: number;
  kind: 'referencia' | 'entrada';
  note: string;
}
export function createMapPoints(destinations: Destination[]): MapPoint[] {
  return destinations.flatMap((d) =>
    d.status === 'publicado' && d.coordinates.status === 'confirmado'
      ? [{ id: d.id, name: d.name, slug: d.slug, ...d.coordinates.value }]
      : [],
  );
}
