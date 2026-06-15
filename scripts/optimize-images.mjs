/* ==========================================================================
   Image optimizer for JMS Garage Door Men
   --------------------------------------------------------------------------
   Generates web-ready WebP copies of every photo in assets/.
   - Auto-orients (bakes EXIF rotation into pixels, so output is upright
     and no longer depends on the browser honoring EXIF).
   - Resizes the longest edge down (never enlarges).
   - Encodes WebP at quality 80.

   Originals are left untouched as high-res masters. Re-run after adding
   new photos:   npm run optimize:images
   ========================================================================== */

import { readdir, stat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ASSETS_DIR = path.resolve(__dirname, '..', 'assets');

// Hero + before/after are shown larger, so allow a bigger longest edge.
const LARGE = new Set(['IMG_6149', 'before', 'after']);
const MAX_LARGE = 2000;
const MAX_DEFAULT = 1600;
const QUALITY = 80;

const SOURCE_RE = /\.(jpe?g)$/i;

const fmtKB = (bytes) => `${(bytes / 1024).toFixed(0)} KB`;

async function run() {
  const entries = await readdir(ASSETS_DIR);
  const sources = entries.filter((name) => SOURCE_RE.test(name));

  if (sources.length === 0) {
    console.log('No .jpg/.jpeg source images found in assets/.');
    return;
  }

  let totalIn = 0;
  let totalOut = 0;
  let count = 0;

  for (const name of sources) {
    const base = name.replace(SOURCE_RE, '');
    const inputPath = path.join(ASSETS_DIR, name);
    const outputPath = path.join(ASSETS_DIR, `${base}.webp`);
    const maxEdge = LARGE.has(base) ? MAX_LARGE : MAX_DEFAULT;

    const inBytes = (await stat(inputPath)).size;

    await sharp(inputPath)
      .rotate() // auto-orient from EXIF, then strip the tag
      .resize({ width: maxEdge, height: maxEdge, fit: 'inside', withoutEnlargement: true })
      .webp({ quality: QUALITY })
      .toFile(outputPath);

    const outBytes = (await stat(outputPath)).size;
    totalIn += inBytes;
    totalOut += outBytes;
    count += 1;

    const pct = ((1 - outBytes / inBytes) * 100).toFixed(0);
    console.log(`${base.padEnd(36)} ${fmtKB(inBytes).padStart(9)} -> ${fmtKB(outBytes).padStart(8)}  (-${pct}%)`);
  }

  const totalPct = ((1 - totalOut / totalIn) * 100).toFixed(1);
  console.log('-'.repeat(72));
  console.log(`${count} images: ${fmtKB(totalIn)} -> ${fmtKB(totalOut)}  (-${totalPct}% overall)`);
}

run().catch((err) => {
  console.error('Image optimization failed:', err);
  process.exit(1);
});
