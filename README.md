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

## Where things are

- `src/pages/` — one file per page; the file path is the web address.
- `src/content/log/` — the logbook. One Markdown file per entry; see `src/content.config.ts` for the fields.
- `src/data/site.ts` — site name, footer links, and the rooms on the floor plan.
- `src/styles/global.css` — colour tokens for light and dark mode.
- `src/components/` — shared pieces (header, footer, theme toggle, floor plan, logbook card).
- `public/` — files served as-is (favicon, the hand-drawn mark, `CNAME`).
