# vagabondcelticviking.com

Source for [www.vagabondcelticviking.com](https://www.vagabondcelticviking.com), built with [Astro](https://astro.build).

## Working on it locally

Needs Node.js 22 or newer.

```bash
npm install        # first time only
npm run dev        # preview at http://localhost:4321, reloads as files change
npm run build      # makes the finished site in dist/
npm run preview    # serves dist/ locally, exactly as it would go live
npm run check-photos   # scans every image for GPS/EXIF before committing
```

All npm scripts run Astro through `scripts/astro.mjs`, which switches off Astro's anonymous usage reporting.

## Writing a logbook entry

1. Copy `templates/log-entry.md` into `src/content/log/` and rename it. The file name becomes the address: `forge-day.md` is published at `/log/forge-day/`.
2. Edit the settings at the top (title, date, room) and write the entry below them. Any Markdown editor works.
3. For a photo, put it next to the `.md` file (run it through Myndar first) and fill in `cover` and `coverAlt`.
4. While `npm run dev` is running, the entry appears on Home under "Lately on the Bench", on `/log/`, and on its room's page. Entries marked `draft: true` show only on your own machine.

The three newest entries appear on Home.

## Where things are

- `src/pages/` — one file per page; the file path is the web address.
- `src/content/log/` — the logbook. One Markdown file per entry; see `src/content.config.ts` for the fields.
- `src/content/house/` — The House. One Markdown file per room (`library.md` explains every field). Photos go in a folder named after the room, e.g. `src/content/house/library/`. Rooms with `status: planned` appear under "Still to Come" and get a page once they're in progress or finished. Before and After can each hold several shots, one per angle (arrows, swipe, arrow keys); every photo on a room page opens full-screen when clicked (`src/components/BeforeAfter.astro`, `Lightbox.astro`).
- `src/data/site.ts` — site name, footer links, and the rooms on the floor plan.
- `src/styles/global.css` — colour tokens for light and dark mode.
- `src/styles/palettes.css` — each room's own colours, light and dark.
- `src/components/` — shared pieces (header, footer, theme toggle, floor plan, logbook card).
- `public/` — files served as-is (favicon, the hand-drawn mark, `CNAME`).
