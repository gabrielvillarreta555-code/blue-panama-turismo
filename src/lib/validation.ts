import type { Destination, Source, Territory } from './schemas';
export function validateCatalog(territories: Territory[], destinations: Destination[], sources: Source[]): void {
 const checkUnique = (values: string[], label: string) => { if (new Set(values).size !== values.length) throw new Error(`Identificador duplicado: ${label}`); };
 checkUnique(territories.map(x => x.id), 'territorio'); checkUnique(destinations.map(x => x.id), 'destino'); checkUnique(destinations.map(x => x.slug), 'slug'); checkUnique(sources.map(x => x.id), 'fuente');
 const ts = new Map(territories.map(x => [x.id, x])); const ss = new Set(sources.map(x => x.id));
 const refs = (ids: string[]) => { for (const id of ids) if (!ss.has(id)) throw new Error(`Fuente desconocida: ${id}`); };
 for (const t of territories) {
  refs(t.sources);
  const seen = new Set([t.id]); let parent = t.parentId;
  while (parent) { if (seen.has(parent)) throw new Error(`Ciclo territorial: ${t.id}`); const p = ts.get(parent); if (!p) throw new Error(`Territorio padre desconocido: ${parent}`); seen.add(parent); parent = p.parentId; }
  if (t.kind === 'provincia' && (t.parentId || t.administrativeLevel !== 'provincia')) throw new Error(`Provincia inválida: ${t.id}`);
  if (t.kind === 'distrito' && (!t.parentId || t.administrativeLevel !== 'distrito' || ts.get(t.parentId)?.administrativeLevel !== 'provincia')) throw new Error(`Distrito inválido: ${t.id}`);
  if (t.kind === 'corregimiento' && (!t.parentId || t.administrativeLevel !== 'corregimiento' || ts.get(t.parentId)?.administrativeLevel !== 'distrito')) throw new Error(`Corregimiento inválido: ${t.id}`);
 }
 const ancestors = (id: string) => { const result = new Set<string>(); let t = ts.get(id); while (t) { result.add(t.id); t = t.parentId ? ts.get(t.parentId) : undefined; } return result; };
 for (const d of destinations) {
  refs(d.sources);
  for (const id of d.regions) { const t = ts.get(id); if (!t || !['provincia','comarca'].includes(t.kind)) throw new Error(`Región inválida: ${id}`); }
  for (const field of [d.district,d.corregimiento,d.coordinates,d.access,d.cost,d.hours,d.services]) {
   if (field.status === 'confirmado') { refs(field.sources); if (field.sources.some(s => !d.sources.includes(s))) throw new Error(`Evidencia ausente en ficha: ${d.id}`); }
  }
  if (d.district.status === 'confirmado') {
   const t = ts.get(d.district.value);
   if (!t || t.administrativeLevel !== 'distrito' || !d.regions.some(r => ancestors(t.id).has(r))) throw new Error(`Distrito incoherente: ${d.id}`);
  }
  if (d.corregimiento.status === 'confirmado') {
   const t = ts.get(d.corregimiento.value);
   if (!t || t.administrativeLevel !== 'corregimiento' || !d.regions.some(r => ancestors(t.id).has(r)) || (d.district.status === 'confirmado' && t.parentId !== d.district.value)) throw new Error(`Corregimiento incoherente: ${d.id}`);
  }
 }
}
