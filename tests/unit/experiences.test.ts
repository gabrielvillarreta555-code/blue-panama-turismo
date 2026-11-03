import { expect, test } from 'vitest';
import { experiences } from '../../src/lib/experiences';
test('experience URLs use unique stable slugs', () => {
 expect(new Set(experiences.map(x => x.id)).size).toBe(experiences.length);
 for (const x of experiences) expect(x.id).toMatch(/^[a-z-]+$/);
});
