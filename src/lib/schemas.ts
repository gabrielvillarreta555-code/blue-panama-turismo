import { z } from 'zod';
const id = z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/);
const text = z.string().trim().min(1);
const url = z.url().refine(v => v.startsWith('https://'), 'Se requiere HTTPS');
export const reviewDate = z.string().regex(/^\d{4}-\d{2}-\d{2}$/).refine(v => {
 const date = new Date(v + 'T00:00:00Z');
 return Number.isFinite(date.getTime()) && date.toISOString().slice(0,10) === v && v <= new Date().toISOString().slice(0,10);
}, 'Fecha inválida o futura');
const evidence = z.array(id).min(1);
export const fact = <T extends z.ZodType>(value: T) => z.discriminatedUnion('status', [
 z.object({ status: z.literal('confirmado'), value, sources: evidence }).strict(),
 z.object({ status: z.literal('desconocido') }).strict(),
 z.object({ status: z.literal('no_aplica'), reason: text }).strict(),
]);
export const sourceSchema = z.object({ id, title: text, publisher: text, url, consulted: reviewDate, supports: text });
export const territorySchema = z.object({
 id, name: text, kind: z.enum(['provincia','comarca','distrito','corregimiento']),
 administrativeLevel: z.enum(['provincia','distrito','corregimiento']),
 parentId: id.optional(), description: text, note: text.optional(),
 photo: z.enum(['coiba','panama','boquete','portobelo','valle']).optional(),
 sources: evidence, verified: reviewDate,
});
export const destinationSchema = z.object({
 id, slug: id, name: text, status: z.enum(['borrador','publicado']),
 regions: z.array(id).min(1), district: fact(id), corregimiento: fact(id),
 categories: z.array(z.enum(['playas','cascadas','montanas','aventura','naturaleza','cultura','gastronomia','pueblos'])).min(1),
 activities: z.array(z.enum(['observacion','paseo','senderismo'])),
 description: text, summary: text.max(220), photo: z.enum(['coiba','panama','boquete','portobelo','valle']).optional(),
 coordinates: fact(z.object({ lat: z.number().min(-90).max(90), lng: z.number().min(-180).max(180), kind: z.enum(['referencia','entrada']), note: text })),
 access: fact(text), cost: fact(z.object({ type: z.enum(['gratuito','pago']), detail: text })),
 hours: fact(text), services: fact(z.array(text).min(1)),
 safety: z.array(text).min(1), sources: evidence, verified: reviewDate,
 featured: z.boolean().default(false),
});
export type Destination = z.infer<typeof destinationSchema>;
export type Territory = z.infer<typeof territorySchema>;
export type Source = z.infer<typeof sourceSchema>;
export type TextFact = z.infer<ReturnType<typeof fact<z.ZodString>>>;
export function factText(value: TextFact): string {
 return value.status === 'confirmado' ? value.value : value.status === 'no_aplica' ? `No aplica: ${value.reason}` : 'Sin confirmar';
}
