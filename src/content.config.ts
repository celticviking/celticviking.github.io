// Content collections: folders of Markdown files that Astro reads and checks.
//
// The logbook lives in src/content/log/. One .md file per entry. The file name
// becomes the web address: src/content/log/forge-day.md -> /log/forge-day/
//
// Front matter (the block between the --- lines at the top of each file):
//   title:    "Forge Day"              required
//   date:     2026-11-15               required; add a time (2026-11-15 23:17) to order same-day entries
//   room:     shop                     required: house, shop, lab, press, studio or about
//   tags:     [knives, damascus]       optional
//   summary:  "One line for cards."    optional; otherwise the first sentences are used
//   cover:    ./forge-day.jpg          optional photo, next to the .md file (run it through Myndar first)
//   coverAlt: "A billet on the anvil"  describe the photo for people who can't see it
//   poem:     true                     optional; keeps every line break as typed (blank line = new stanza)
//   draft:    true                     optional; shows while previewing locally, never published

import { defineCollection } from 'astro:content';
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
      tags: z.array(z.string()).default([]),
      summary: z.string().optional(),
      cover: image().optional(),
      coverAlt: z.string().optional(),
      poem: z.boolean().default(false),
      draft: z.boolean().default(false),
    }),
});

export const collections = { log };
