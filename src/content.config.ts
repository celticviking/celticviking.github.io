// Content collections: folders of Markdown files that Astro reads and checks.
//
// THE LOGBOOK lives in src/content/log/. One .md file per entry. The file name
// becomes the web address: src/content/log/forge-day.md -> /log/forge-day/
//
// Front matter (the block between the --- lines at the top of each file):
//   title:     "Forge Day"              required
//   date:      2026-11-15               required; add a time (2026-11-15 23:17) to order same-day entries
//   room:      shop                     required: house, shop, lab, press, studio or about
//   houseRoom: library                  optional, for room: house. The file name of a room in src/content/house/
//   tags:      [knives, damascus]       optional
//   summary:   "One line for cards."    optional; otherwise the first sentences are used
//   cover:     ./forge-day.jpg          optional photo, next to the .md file (run it through Myndar first)
//   coverAlt:  "A billet on the anvil"  describe the photo for people who can't see it
//   poem:      true                     optional; keeps every line break as typed (blank line = new stanza)
//   draft:     true                     optional; shows while previewing locally, never published
//
// THE HOUSE lives in src/content/house/. One .md file per room; see library.md for
// every field, with comments. Photos go in a folder named after the room
// (src/content/house/library/...). The text under the settings is "What I Was Going For".

import { defineCollection, reference } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
import { roomIds } from './data/site';

// A date, with an optional time to order entries posted on the same day:
//   date: 2026-11-15          or          date: 2026-11-15 23:17
// The time is read as written (your local clock) and is only used for ordering.
// Stored as if it were UTC, so the date shown never shifts by time zone.
const entryDate = z.union([z.date(), z.string()]).transform((v, ctx) => {
  if (v instanceof Date) return v; // YAML already read it (plain date, or date with seconds)
  const m = v.trim().match(/^(\d{4})-(\d\d)-(\d\d)(?:[ T](\d\d?):(\d\d))?$/);
  if (!m) {
    ctx.addIssue({ code: 'custom', message: `Use 2026-11-15 or 2026-11-15 23:17, not "${v}"` });
    return z.NEVER;
  }
  const [, y, mo, d, h = '0', mi = '0'] = m;
  return new Date(Date.UTC(+y, +mo - 1, +d, +h, +mi));
});

const log = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/log' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      date: entryDate,
      room: z.enum(roomIds),
      houseRoom: reference('house').optional(),
      tags: z.array(z.string()).default([]),
      summary: z.string().optional(),
      cover: image().optional(),
      coverAlt: z.string().optional(),
      poem: z.boolean().default(false),
      draft: z.boolean().default(false),
    }),
});

const house = defineCollection({
  // Only the .md files directly in src/content/house/; subfolders hold each room's photos.
  loader: glob({ pattern: '*.md', base: './src/content/house' }),
  schema: ({ image }) => {
    // A photo slot: until `photo` is filled in, the page shows a hatched box with `label`.
    const slot = z.object({
      photo: image().optional(),
      alt: z.string().optional(),
      label: z.string().default('Photo'),
      caption: z.string().optional(),
    });
    return z.object({
      title: z.string(),
      order: z.number(),
      status: z.enum(['finished', 'in-progress', 'planned']),
      statusText: z.string().optional(),
      tagline: z.string().optional(),
      palette: z.string().optional(),
      facts: z.array(z.object({ label: z.string(), value: z.string() })).default([]),
      swatches: z.array(z.object({ name: z.string(), where: z.string(), hex: z.string() })).default([]),
      swatchNote: z.string().optional(),
      wide: slot.optional(),
      before: slot.optional(),
      after: slot.optional(),
      made: z.array(z.object({ piece: z.string(), what: z.string() })).default([]),
      found: z.string().optional(),
      details: z.array(slot).default([]),
    });
  },
});

export const collections = { log, house };
