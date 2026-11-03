import type { Map as LeafletMap } from 'leaflet';
import type { MapPoint } from '../lib/map';
const button = document.querySelector<HTMLButtonElement>('#load-map');
const container = document.querySelector<HTMLElement>('#map');
const status = document.querySelector<HTMLElement>('#map-status');
const raw = document.querySelector('#map-data');
if (button && container && status && raw) {
  const points: MapPoint[] = JSON.parse(raw.textContent ?? '[]');
  const selected = points.find((p) => p.id === new URLSearchParams(location.search).get('destino'));
  let map: LeafletMap | undefined;
  let attempt = 0;
  let timeout: ReturnType<typeof setTimeout> | undefined;
  const say = (message: string, error = false) => {
    status.textContent = message;
    button.disabled = false;
    button.textContent = error ? 'Reintentar mapa' : 'Cargar mapa';
    button.hidden = !error && !!map;
    container.setAttribute('aria-busy', 'false');
  };
  const offline = () => {
    attempt++;
    clearTimeout(timeout);
    say(
      'Sin conexión. El mapa necesita internet; las fichas y la lista de esta página siguen disponibles.',
      true,
    );
  };
  const start = async () => {
    if (!navigator.onLine) {
      offline();
      return;
    }
    const current = ++attempt;
    let failed = false;
    let errors = 0;
    clearTimeout(timeout);
    map?.remove();
    map = undefined;
    button.disabled = true;
    button.textContent = 'Cargando mapa…';
    status.textContent = 'Cargando mapa…';
    container.hidden = false;
    container.setAttribute('aria-busy', 'true');
    const fail = (message: string) => {
      if (current !== attempt) return;
      failed = true;
      clearTimeout(timeout);
      say(message, true);
    };
    timeout = setTimeout(
      () =>
        fail(
          'El mapa está tardando demasiado. Puedes reintentar o consultar la lista de destinos.',
        ),
      12000,
    );
    try {
      const [L] = await Promise.all([import('leaflet'), import('leaflet/dist/leaflet.css')]);
      if (current !== attempt || failed) return;
      const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
      map = L.map(container, {
        scrollWheelZoom: false,
        zoomControl: false,
        zoomAnimation: !reduced,
        fadeAnimation: !reduced,
        markerZoomAnimation: !reduced,
      }).setView(selected ? [selected.lat, selected.lng] : [8.6, -80.2], selected ? 9 : 7);
      L.control.zoom({ zoomInTitle: 'Acercar', zoomOutTitle: 'Alejar' }).addTo(map);
      const layer = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 18,
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        updateWhenIdle: true,
        keepBuffer: 1,
      });
      layer.on('loading', () => {
        if (current !== attempt || failed) return;
        errors = 0;
        status.textContent = 'Cargando cartografía…';
        container.setAttribute('aria-busy', 'true');
        clearTimeout(timeout);
        timeout = setTimeout(
          () =>
            fail(
              'No se pudo completar la carga de cartografía. Reintenta o usa la lista de destinos.',
            ),
          12000,
        );
      });
      layer.on('tileerror', () => {
        errors++;
        fail(
          navigator.onLine
            ? 'No se pudo cargar parte de la cartografía. Los destinos siguen disponibles en la lista.'
            : 'Sin conexión. Consulta la lista de destinos o reintenta al recuperar internet.',
        );
      });
      layer.on('load', () => {
        if (current !== attempt) return;
        clearTimeout(timeout);
        if (!errors && !failed)
          say('Mapa cargado. Usa los marcadores o la lista para abrir una ficha.');
      });
      layer.addTo(map);
      for (const point of points) {
        const content = document.createElement('div');
        const title = document.createElement('strong');
        title.textContent = point.name;
        const note = document.createElement('p');
        note.textContent =
          point.kind === 'referencia'
            ? 'Referencia geográfica; no es una entrada.'
            : 'Punto de acceso verificado.';
        const link = document.createElement('a');
        link.href = `/destinos/${point.slug}/`;
        link.textContent = 'Consultar ficha';
        content.append(title, note, link);
        const marker = L.marker([point.lat, point.lng], {
          icon: L.divIcon({ className: 'map-marker', iconSize: [24, 24], iconAnchor: [12, 12] }),
          title: point.name,
          keyboard: true,
        })
          .addTo(map)
          .bindPopup(content);
        marker.getElement()?.setAttribute('aria-label', point.name);
        if (point.id === selected?.id) marker.openPopup();
      }
      requestAnimationFrame(() => map?.invalidateSize());
    } catch {
      fail('No se pudo iniciar el mapa. Reintenta la carga o consulta los destinos en la lista.');
    }
  };
  if (points.length) {
    button.hidden = false;
    button.addEventListener('click', start);
  }
  if (!navigator.onLine) offline();
  addEventListener('offline', offline);
  addEventListener('online', () => {
    if (!map || !button.hidden)
      say('Conexión recuperada. Pulsa Reintentar mapa para cargar la cartografía.', true);
  });
}
