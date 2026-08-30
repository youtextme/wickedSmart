#!/usr/bin/env node
/** Regenerate PWA icons from apps/pwa/public/favicon.svg (sharp + sharp-ico). */
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';
import ico from 'sharp-ico';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const PUBLIC = join(ROOT, 'apps/pwa/public');
const svg = readFileSync(join(PUBLIC, 'favicon.svg'));

async function png(size, out) {
  await sharp(svg).resize(size, size).png().toFile(out);
}

const png16 = await sharp(svg).resize(16, 16).png().toBuffer();
const png32 = await sharp(svg).resize(32, 32).png().toBuffer();
writeFileSync(join(PUBLIC, 'favicon.ico'), await ico.encode([png16, png32]));

await png(180, join(PUBLIC, 'apple-touch-icon.png'));
await png(192, join(PUBLIC, 'icon-192.png'));
await png(512, join(PUBLIC, 'icon-512.png'));

console.log('OK: favicon.ico, apple-touch-icon.png, icon-192.png, icon-512.png');
