import { readFilters, search, serializeFilters, type SearchItem } from '../lib/search';
const form = document.querySelector<HTMLFormElement>('#catalog-search');
const data = document.querySelector('#search-data');
if(form && data) {
 const items:SearchItem[]=JSON.parse(data.textContent ?? '[]');
 const regionSelect=form.querySelector<HTMLSelectElement>('[name="region"]')!;
 const regions=Array.from(regionSelect.options).map(x=>x.value).filter(Boolean);
 const cards=document.querySelectorAll<HTMLElement>('[data-destination]');
 const count=document.querySelector<HTMLElement>('#result-count')!;
 const empty=document.querySelector<HTMLElement>('#no-results')!;
 const read=() => readFilters(new URLSearchParams(Array.from(new FormData(form).entries()).map(([k,v])=>[k,String(v)])),regions);
 const render=()=>{ const matches=new Set(search(items,read()).map(x=>x.id)); cards.forEach(card=>card.hidden=!matches.has(card.dataset.destination!)); count.textContent=`${matches.size} ${matches.size === 1 ? 'destino encontrado' : 'destinos encontrados'}`; empty.hidden=matches.size>0; };
 const controls = form.querySelectorAll<HTMLInputElement|HTMLSelectElement>('input, select');
 const restore=()=>{ const filters=readFilters(new URLSearchParams(location.search),regions); controls.forEach(input=>input.value=filters[input.name as keyof typeof filters] ?? ''); render(); };
 const update=(push:boolean)=>{ const query=serializeFilters(read()); const url=location.pathname+(query ? `?${query}` : ''); if(url!==location.pathname+location.search) history[push ? 'pushState':'replaceState'](null,'',url); render(); };
 form.querySelectorAll<HTMLFieldSetElement>('fieldset').forEach(x=>x.disabled=false);
 document.querySelector('#search-enhancement-note')?.setAttribute('hidden','');
 restore(); update(false);
 let timer:ReturnType<typeof setTimeout>;
 form.addEventListener('submit',event=>{event.preventDefault();clearTimeout(timer);update(true);});
 form.addEventListener('change',()=>{clearTimeout(timer);update(true);});
 form.querySelector('input')?.addEventListener('input',()=>{clearTimeout(timer);timer=setTimeout(()=>update(false),150);});
 document.querySelector('#clear-filters')?.addEventListener('click',event=>{event.preventDefault();clearTimeout(timer);form.reset();update(true);form.querySelector('input')?.focus();});
 addEventListener('popstate',()=>{clearTimeout(timer);restore();});
}
