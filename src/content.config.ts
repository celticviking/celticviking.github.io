// Content collections: folders of Markdown files that Astro reads and checks.
//
// The logbook lives in src/content/log/. One .md file per entry. The file name
// becomes the web address: src/content/log/forge-day.md -> /log/forge-day/
//
// Front matter (the block between the --- lines at the top of each file):
//   title:    "Forge Day"              required
//   date:     2026-11-15               required
//   room:     shop                     required: house, shop, lab, press, studio or about
//   tags:     [knives, damascus]       optional
//   summary:  "One line for cards."    optional; otherwise the first sentences are used
//   cover:    ./forge-day.jpg          optional photo, next to the .md file (run it through Myndar first)
//   coverAlt: "A billet on the anvil"  describe the photo for people who can't see it
//   draft:    true                     optional; shows while previewing locally, never published

import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
import { roomIds } from './data/site';

const log = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/log' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      date: z.coerce.date(),
      room: z.enum(roomIds),
      tags: z.array(z.string()).default([]),
      summary: z.string().optional(),
      cover: image().optional(),
      coverAlt: z.string().optional(),
      draft: z.boolean().default(false),
    }),
});

export const collections = { log };
