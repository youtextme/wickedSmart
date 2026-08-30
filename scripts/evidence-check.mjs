#!/usr/bin/env node
/** POS evidence-check — slice 1. Exit 0 = proven | Exit 2 = killed */
import { execSync } from 'node:child_process';
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';

const ROOT = new URL('..', import.meta.url).pathname;

function walk(dir) {
  const out = [];
  for (const e of readdirSync(dir)) {
    const p = join(dir, e);
    if (statSync(p).isDirectory()) out.push(...walk(p));
    else if (/\.(ts|tsx|js|mjs|json)$/.test(e)) out.push(p);
  }
  return out;
}

function fail(msg) {
  console.error(`FAIL: ${msg}`);
  process.exit(2);
}

function ok(msg) {
  console.log(`OK: ${msg}`);
}

for (const f of ['pos/need.md', 'pos/context.md', 'pos/hypothesis.md']) {
  if (!existsSync(join(ROOT, f))) fail(`missing ${f}`);
}
ok('three POS program cards');

if (existsSync(join(ROOT, 'store.ts')) || existsSync(join(ROOT, 'src/store.ts'))) {
  fail('shared root store.ts');
}
ok('no shared root store.ts');

const rules = [
  { pkg: 'packages/proof/src', forbidden: ['@wickedsmark/plays', 'packages/plays/src', '/plays/src/catalog', "from 'idb'"] },
  { pkg: 'packages/clock/src', forbidden: ['@wickedsmark/plays', '@wickedsmark/proof', 'packages/plays', 'packages/proof', 'date-fns'] },
  { pkg: 'packages/plays/src', forbidden: ['@wickedsmark/proof', 'packages/proof/src', "from 'idb'"] },
];

for (const { pkg, forbidden } of rules) {
  const dir = join(ROOT, pkg);
  if (!existsSync(dir)) fail(`missing ${pkg}`);
  for (const file of walk(dir)) {
    if (!/\.(ts|tsx)$/.test(file)) continue;
    const content = readFileSync(file, 'utf8');
    for (const f of forbidden) {
      if (content.includes(f)) fail(`${relative(ROOT, file)} forbidden: ${f}`);
    }
  }
}
ok('cross-import contract');

const playsStore = readFileSync(join(ROOT, 'packages/plays/src/store.ts'), 'utf8');
const proofStore = readFileSync(join(ROOT, 'packages/proof/src/store.ts'), 'utf8');
if (!playsStore.includes('wickedsmark-plays') || !playsStore.includes('dexie')) {
  fail('plays must use Dexie wickedsmark-plays-v1');
}
if (!proofStore.includes('wickedsmark-proof') || !proofStore.includes('dexie')) {
  fail('proof must use Dexie wickedsmark-proof-v1');
}
ok('Dexie per package (separate DB names)');

const banned = ['serwist', 'googleapis', 'google-auth-library', 'gapi-script', 'localforage', 'recordrtc', 'idb-file-storage', 'day-boundary', '@pwabuilder/pwainstall', 'pwacompat'];
for (const file of walk(join(ROOT, 'packages')).concat(walk(join(ROOT, 'apps')))) {
  if (!file.endsWith('package.json')) continue;
  const content = readFileSync(file, 'utf8').toLowerCase();
  for (const b of banned) {
    if (content.includes(`"${b}"`)) fail(`banned dep ${b} in ${relative(ROOT, file)}`);
  }
}
ok('no banned deps in package.json');

for (const pkg of ['packages/plays/src/ui', 'packages/proof/src/ui', 'apps/pwa/src']) {
  const dir = join(ROOT, pkg);
  if (!existsSync(dir)) continue;
  for (const file of walk(dir)) {
    if (!/\.(ts|tsx)$/.test(file)) continue;
    if (/\bexercise\b/i.test(readFileSync(file, 'utf8'))) {
      fail(`"exercise" in ${relative(ROOT, file)}`);
    }
  }
}
ok('no "exercise" in kid UI');

const kidPath = readFileSync(join(ROOT, 'apps/pwa/src/kid/KidPath.tsx'), 'utf8');
if (!kidPath.includes('playsForDay')) fail('KidPath must sync-bind catalog via playsForDay');
ok('KidPath sync catalog binding');

const catalogSrc = readFileSync(join(ROOT, 'packages/plays/src/catalog.ts'), 'utf8');
if (!catalogSrc.includes('Gate Scanner')) fail('catalog missing Gate Scanner (day 0 room 1)');
ok('day-0 catalog has Gate Scanner');

console.log('Running npm run build…');
execSync('npm run build', { cwd: ROOT, stdio: 'inherit' });
ok('npm run build exit 0');

console.log('\nEVIDENCE-CHECK: exit 0 — H0 live (in-process ports, Dexie isolation)');
process.exit(0);
