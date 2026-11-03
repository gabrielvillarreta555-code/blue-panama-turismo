import type { Destination } from './schemas';
export function canonicalUrl(site: string | undefined, path: string): string | undefined {
  if (!site) return undefined;
  return new URL(path, site).href;
}
export function destinationStructuredData(destination: Destination, url: string) {
  const d = destination;
  return {
    '@context': 'https://schema.org',
    '@type': 'TouristAttraction',
    name: d.name,
    description: d.description,
    url,
    ...(d.coordinates.status === 'confirmado'
      ? {
          geo: {
            '@type': 'GeoCoordinates',
            latitude: d.coordinates.value.lat,
            longitude: d.coordinates.value.lng,
          },
        }
      : {}),
  };
}
