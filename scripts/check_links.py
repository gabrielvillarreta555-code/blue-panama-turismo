"""Check local links, fragments and referenced assets in the compiled site."""
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urlsplit, unquote
import posixpath
import sys
ROOT = Path('dist').resolve()
class Page(HTMLParser):
    def __init__(self):
        super().__init__(); self.ids=set(); self.links=[]
    def handle_starttag(self, tag, attrs):
        a=dict(attrs)
        if 'id' in a: self.ids.add(a['id'])
        for key in ['href','src']:
            if a.get(key): self.links.append(a[key])
        if a.get('srcset'):
            self.links += [part.strip().split()[0] for part in a['srcset'].split(',')]
pages={}
for file in ROOT.rglob('*.html'):
    page=Page();page.feed(file.read_text());pages[file]=page
errors=[];count=0
for file,page in pages.items():
    base='/' + file.relative_to(ROOT).as_posix()
    for href in page.links:
        url=urlsplit(href)
        if url.scheme or url.netloc:continue
        path=unquote(url.path)
        resolved=posixpath.normpath(path if path.startswith('/') else posixpath.join(posixpath.dirname(base),path)) if path else base
        target=ROOT/resolved.lstrip('/')
        if target.is_dir():target=target/'index.html'
        count+=1
        if not target.is_file():errors.append(f'{base}: missing {href}')
        elif url.fragment and target in pages and unquote(url.fragment) not in pages[target].ids:errors.append(f'{base}: missing fragment {href}')
for error in errors:print(error)
print(f'{len(pages)} HTML pages; {count} local references; {len(errors)} broken links/assets/fragments')
sys.exit(bool(errors))
