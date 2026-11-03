import { test, expect } from 'vitest';
import { createSearchIndex, readFilters, search, serializeFilters, type Filters } from '../../src/lib/search';
import { destinationSchema, territorySchema } from '../../src/lib/schemas';
import destinationsJson from '../../src/content/destinations.json';
import territoriesJson from '../../src/content/territories.json';
import { safeJson } from '../../src/lib/json';
const ds=destinationsJson.map(x=>destinationSchema.parse(x));
const ts=territoriesJson.map(x=>territorySchema.parse(x));
const items=createSearchIndex(ds,ts);
const base:Filters={q:'',region:'',categoria:'',actividad:'',acceso:''};
test('name and region match accents, case and multiple words',()=>{
 expect(search(items,{...base,q:'ANTON COCLE'}).map(x=>x.id)).toEqual(['el-valle-de-anton']);
 expect(search(items,{...base,q:'  BOQUETE  '})).toHaveLength(1);
 expect(search(items,{...base,q:'zzz'})).toEqual([]);
});
test('combined filters use intersection and unknown cost never means free',()=>{
 expect(search(items,{...base,region:'cocle',categoria:'naturaleza',actividad:'senderismo'})).toHaveLength(1);
 expect(search(items,{...base,region:'colon',categoria:'montanas'})).toHaveLength(0);
 expect(search(items,{...base,acceso:'gratuito'})).toHaveLength(0);
 const confirmed=[{...items[0]!,cost:'gratuito' as const},{...items[1]!,cost:'pago' as const}];
 expect(search(confirmed,{...base,acceso:'pago'}).map(x=>x.id)).toEqual([items[1]!.id]);
});
test('drafts excluded and comarca ancestors searchable',()=>{
 const draft={...ds[0]!,status:'borrador' as const};
 expect(createSearchIndex([draft],ts)).toEqual([]);
 const comarca={...ds[0]!,regions:['guna-de-madugandi']};
 const index=createSearchIndex([comarca],ts);
 expect(index[0]?.regions).toEqual(['guna-de-madugandi','panama']);
 expect(search(index,{...base,q:'Panama'})).toHaveLength(1);
});
test('URL filters normalize unknown parameters and roundtrip',()=>{
 const params=new URLSearchParams('region=no-existe&categoria=no-existe&acceso=free&q=Cocl%C3%A9');
 const filters=readFilters(params,['cocle']);
 expect(filters).toEqual({...base,q:'Coclé'});
 expect(readFilters(new URLSearchParams(serializeFilters(filters)),['cocle'])).toEqual(filters);
 expect(readFilters(new URLSearchParams({q:'a'.repeat(1000)}),[]).q.length).toBe(160);
});
test('inline data cannot terminate a script element',()=>{
 const input={name:'</script><img src=x onerror=alert(1)>'};
 const out=safeJson(input);
 expect(out).not.toContain('<');
 expect(JSON.parse(out)).toEqual(input);
});
