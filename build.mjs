import { readFile, writeFile, mkdir, cp, access } from 'node:fs/promises';
import { pages, renderPages } from './content.mjs';
const root = new URL('./', import.meta.url);
const template = await readFile(new URL('viewer.html', root), 'utf8');
const chapters = pages.map((page, i) => `<button class="chapter-link" data-page="${i}"><span>${String(i + 1).padStart(2, '0')}</span>${page.title}</button>`).join('\n');
const html = template.replace('{{PAGES}}', renderPages()).replace('{{CHAPTERS}}', chapters);
const references = [...html.matchAll(/(?:src|data-image)="(assets\/[^"]+)"/g)].map(match => match[1]);
await Promise.all([...new Set(references)].map(asset => access(new URL(asset, root))));
if (html.includes('{{')) throw new Error('Unresolved template token');
await mkdir(new URL('dist/', root), { recursive: true });
await writeFile(new URL('dist/index.html', root), html);
for (const file of ['styles.css', 'app.js', 'navigation.js', 'favicon.svg', '_headers']) {
  await cp(new URL(file, root), new URL(`dist/${file}`, root));
}
await cp(new URL('assets/', root), new URL('dist/assets/', root), { recursive: true });
console.log(`Built ${pages.length} A4 pages. ${new Set(references).size} image assets verified. Deploy dist/ to Netlify.`);
