import { mkdtempSync, rmSync } from 'node:fs';
import { join } from 'node:path';
import { execFileSync } from 'node:child_process';
const output = mkdtempSync(join(process.cwd(), '.seo-check-'));
try {
  execFileSync(
    process.execPath,
    ['node_modules/astro/bin/astro.mjs', 'build', '--outDir', output],
    {
      stdio: 'inherit',
      env: { ...process.env, SITE_URL: 'https://example.test', SITE_INDEXABLE: 'true' },
    },
  );
  execFileSync('python3', ['scripts/check_seo.py', output], { stdio: 'inherit' });
} finally {
  rmSync(output, { recursive: true, force: true });
}
