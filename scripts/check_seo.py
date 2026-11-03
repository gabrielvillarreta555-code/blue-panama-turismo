"""Validate a temporary public-mode build; never deploys or requests a domain."""
from html.parser import HTMLParser
from pathlib import Path
import json
import sys
import xml.etree.ElementTree as ET
root=Path(sys.argv[1])
origin='https://example.test/'
class Page(HTMLParser):
    def __init__(self):
        super().__init__();self.meta={};self.canonical=None;self.ld=[];self.inld=False
    def handle_starttag(self, tag, attrs):
        a=dict(attrs)
        if tag=='meta':self.meta[a.get('name',a.get('property'))]=a.get('content')
        if tag=='link' and a.get('rel')=='canonical':self.canonical=a['href']
        if tag=='script' and a.get('type')=='application/ld+json':self.inld=True
    def handle_data(self, data):
        if self.inld:self.ld.append(json.loads(data))
    def handle_endtag(self, tag):
        if tag=='script':self.inld=False
count=0
for file in root.rglob('*.html'):
    page=Page();page.feed(file.read_text());count+=1
    path=file.relative_to(root).as_posix().replace('index.html','')
    if file.name=='404.html':
        assert page.canonical is None
        assert page.meta['robots']=='noindex, nofollow'
    else:
        assert page.canonical==origin+path,(path,page.canonical)
        assert page.meta['robots']=='index, follow'
    if 'og:image' in page.meta:assert page.meta['og:image'].startswith(origin+'_astro/')
    if path.startswith('destinos/'):
        assert len(page.ld)==1
        assert page.ld[0]['@type']=='TouristAttraction'
        assert page.ld[0]['url']==origin+path
        if 'coiba' not in path:assert 'geo' not in page.ld[0]
urls=[e.text for e in ET.parse(root/'sitemap-0.xml').iter() if e.tag.endswith('loc')]
assert len(urls)==count-1,(len(urls),count)
assert not any('404' in url for url in urls)
assert 'Allow: /' in (root/'robots.txt').read_text()
print(f'SEO: {count} HTML pages; {len(urls)} sitemap URLs; valid metadata and JSON-LD. No deployment.')
