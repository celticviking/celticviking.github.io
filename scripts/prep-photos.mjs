// npm run prep-photos
//
// Gets photos ready for the site, in place:
//   - shrinks anything bigger than 2400px on its long side down to 2400px
//     (the largest size the site ever shows, in the full-screen viewer)
//   - turns it the right way up, then removes every bit of hidden data
//     (camera details, location, titles, tags, comments)
//   - keeps the file name and type, so the .md files don't need changing
// Photos that are already small enough and carry no hidden data are left alone,
// so it is safe to run again after adding new photos.
//
// Scans src/content by default, or the folders you name:
//   npm run prep-photos -- src/content/house/library
//
// Keep your originals somewhere else: the files in the site folder are replaced.

import { readdir, readFile, writeFile } from 'node:fs/promises';
import { join, extname } from 'node:path';
import sharp from 'sharp';

// Read each photo into memory first, so Windows never sees it as busy while it's replaced.
sharp.cache(false);

const MAX = 2400;
const TYPES = new Set(['.jpg', '.jpeg', '.png', '.webp']);
const roots = process.argv.slice(2).length ? process.argv.slice(2) : ['src/content'];

async function* walk(dir) {
  for (const e of await readdir(dir, { withFileTypes: true })) {
    const p = join(dir, e.name);
    if (e.isDirectory()) yield* walk(p);
    else if (TYPES.has(extname(e.name).toLowerCase())) yield p;
  }
}

const kb = (n) => `${Math.round(n / 1024).toLocaleString()} KB`;
let changed = 0, kept = 0, before = 0, after = 0;

for (const root of roots) {
  for await (const file of walk(root)) {
    const input = await readFile(file);
    const size = input.length;
    const meta = await sharp(input).metadata();
    // True when the photo was stored sideways and will be turned upright.
    const turned = (meta.orientation ?? 1) >= 5;
    const long = Math.max(meta.width ?? 0, meta.height ?? 0);
    const hidden = !!(meta.exif || meta.xmp || meta.iptc || (meta.comments && meta.comments.length) || (meta.orientation ?? 1) !== 1);
    if (long <= MAX && !hidden) { kept++; continue; }

    const ext = extname(file).toLowerCase();
    let img = sharp(input).rotate().resize({ width: MAX, height: MAX, fit: 'inside', withoutEnlargement: true });
    if (ext === '.png') img = img.png({ compressionLevel: 9 });
    else if (ext === '.webp') img = img.webp({ quality: 82 });
    else img = img.jpeg({ quality: 82, mozjpeg: true });

    const { data, info } = await img.toBuffer({ resolveWithObject: true });
    await writeFile(file, data);
    changed++; before += size; after += info.size;
    console.log(`DONE  ${file}  ${kb(size)} -> ${kb(info.size)}  (${info.width}x${info.height}${turned ? ', turned upright' : ''})`);
    if (ext === '.png' && info.size > 1.5 * 1024 * 1024) console.log(`      Tip: this PNG is still big. Photos are much smaller as JPG: save it as .jpg and change its name in the .md file.`);
  }
}

console.log(`\n${changed} photo(s) prepared${changed ? `, ${kb(before)} -> ${kb(after)}` : ''}; ${kept} already fine.`);
