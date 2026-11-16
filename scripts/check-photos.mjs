// Backstop for Myndar: scans every photo in src/ and public/ for location data
// and other camera metadata before anything is committed.
//
//   npm run check-photos
//
// GPS coordinates  -> ERROR (exit code 1). Never commit these.
// Other EXIF data  -> warning. Camera model, dates, etc. Safe-ish, but better stripped.
// No dependencies: reads JPEG/PNG/WebP metadata blocks directly.

import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join, extname, relative } from 'node:path';

// Folders to scan: the site's own by default, or any folders given on the command line.
const ROOTS = process.argv.length > 2 ? process.argv.slice(2) : ['src', 'public'];
const EXTS = new Set(['.jpg', '.jpeg', '.png', '.webp', '.tif', '.tiff', '.avif', '.heic']);

function* walk(dir) {
  let names = [];
  try { names = readdirSync(dir); } catch { return; }
  for (const name of names) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) yield* walk(p);
    else if (EXTS.has(extname(name).toLowerCase())) yield p;
  }
}

/** Parse a TIFF/EXIF block; return { gps: number of GPS tags with data, tags: total IFD0 tags }. */
function readTiff(buf) {
  if (buf.length < 8) return null;
  const le = buf.toString('latin1', 0, 2) === 'II';
  const u16 = (o) => (le ? buf.readUInt16LE(o) : buf.readUInt16BE(o));
  const u32 = (o) => (le ? buf.readUInt32LE(o) : buf.readUInt32BE(o));
  try {
    const ifd0 = u32(4);
    const n = u16(ifd0);
    let gps = 0;
    for (let i = 0; i < n; i++) {
      const e = ifd0 + 2 + i * 12;
      if (u16(e) === 0x8825) {
        const gpsIfd = u32(e + 8);
        const gn = u16(gpsIfd);
        // Only latitude/longitude count as location (2, 4, and destination 0x14, 0x16).
        // Phones often leave an empty GPS block with just a version or compass tag.
        for (let j = 0; j < gn; j++) if ([2, 4, 0x14, 0x16].includes(u16(gpsIfd + 2 + j * 12))) gps++;
      }
    }
    return { gps, tags: n };
  } catch {
    return { gps: 0, tags: -1 };
  }
}

function inspect(file) {
  const buf = readFileSync(file);
  const found = [];
  // JPEG: APP1 "Exif\0\0" segment
  if (buf[0] === 0xff && buf[1] === 0xd8) {
    let o = 2;
    while (o + 4 < buf.length && buf[o] === 0xff) {
      const marker = buf[o + 1];
      const len = buf.readUInt16BE(o + 2);
      if (marker === 0xe1 && buf.toString('latin1', o + 4, o + 10) === 'Exif\0\0') {
        found.push(readTiff(buf.subarray(o + 10, o + 2 + len)));
      }
      if (marker === 0xda) break; // start of image data
      o += 2 + len;
    }
  }
  // PNG: eXIf chunk
  if (buf.toString('latin1', 1, 4) === 'PNG') {
    let o = 8;
    while (o + 8 < buf.length) {
      const len = buf.readUInt32BE(o);
      const type = buf.toString('latin1', o + 4, o + 8);
      if (type === 'eXIf') found.push(readTiff(buf.subarray(o + 8, o + 8 + len)));
      o += 12 + len;
    }
  }
  // WebP: EXIF chunk
  if (buf.toString('latin1', 0, 4) === 'RIFF' && buf.toString('latin1', 8, 12) === 'WEBP') {
    let o = 12;
    while (o + 8 < buf.length) {
      const type = buf.toString('latin1', o, o + 4);
      const len = buf.readUInt32LE(o + 4);
      if (type === 'EXIF') {
        let b = buf.subarray(o + 8, o + 8 + len);
        if (b.toString('latin1', 0, 6) === 'Exif\0\0') b = b.subarray(6);
        found.push(readTiff(b));
      }
      o += 8 + len + (len % 2);
    }
  }
  return found.filter(Boolean);
}

let errors = 0, warnings = 0, checked = 0;
for (const root of ROOTS) {
  for (const file of walk(root)) {
    checked++;
    const blocks = inspect(file);
    const rel = relative('.', file);
    if (blocks.some((b) => b.gps > 0)) {
      errors++;
      console.log(`GPS     ${rel}  <- contains location data. Strip it with Myndar before committing.`);
    } else if (blocks.length) {
      warnings++;
      console.log(`EXIF    ${rel}  (no location, but camera metadata is present)`);
    }
  }
}
console.log(`\nChecked ${checked} image(s): ${errors} with GPS, ${warnings} with other metadata.`);
process.exit(errors ? 1 : 0);
