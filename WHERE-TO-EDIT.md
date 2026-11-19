# Where to edit what

Every word on the site lives in a file below. Paths start from this folder (`E:\Websites\vagabondcelticviking`). The `.md` files open in MarkText; the few `.ts` files open in Notepad (change only the words between the quote marks).

## Every page

| What you see | File |
|---|---|
| The menu names at the top (The House, The Shop, The Lab, VCV Press, About) | `src/data/site.ts`, each room's `menu:` |
| The footer line next to the small mark | `src/content/pages/footer.md` |
| The footer links (Instagram, cyberspace.online, GitHub) and "American Midwest" | `src/data/site.ts` (`elsewhere` and `region`) |

## Home (`/`)

| What you see | File |
|---|---|
| The small line above the headline, the headline, and the two paragraphs | `src/content/pages/home.md` |
| The signature under them ("— Vahn") | `src/data/site.ts` (`signature`) |
| The captions under the maker's mark | `src/pages/index.astro` (near the top) |
| The rooms on the floor plan: names, descriptions, "Enter →", open or closed | `src/data/site.ts` (`rooms`) |
| "Lately on the Bench" | the three newest logbook entries (see Logbook) |

## The House (`/house/`)

| What you see | File |
|---|---|
| The title and the paragraphs at the top | `src/content/pages/house.md` |
| "4 rooms done · 3 to go" | counted automatically from the room files |
| Everything on one room's page, and its card | `src/content/house/<room>.md` (for example `library.md`) |
| That room's photos | the folder `src/content/house/<room>/` |
| Room colours | `src/styles/palettes.css` (ask Claude) |

## The Lab (`/lab/`)

| What you see | File |
|---|---|
| The small line, title and paragraphs at the top | `src/content/pages/lab.md` |
| A category's card (name, one-line description, order) and the paragraph at the top of its page | `src/content/lab/<category>.md` (`apps.md`, `cyberdecks.md`, `prints.md`, `games.md`) |
| One project: its card, its row in the terminal, and its page | `src/content/lab/<category>/<project>.md` (for example `apps/sectortray.md`) |
| That project's photos or screenshots | the folder `src/content/lab/<category>/<project>/` |
| The terminal ("recently updated") | automatic: the three projects with the newest `updated:` date (or newest logbook entry tagged to them) |

Useful project settings: `status:` (planned, in-progress, prototype, released, finished), `page: true` (gives it its own page), `updated:` (puts it in the terminal), `version:` (shown instead of "Released").

To add a project, copy any project file in the same category folder, rename it (lowercase, hyphens, no spaces), and change the words. To add a category, copy a category file and make a folder with the same name.

## Logbook (`/log/`)

| What you see | File |
|---|---|
| The small line, title and paragraph at the top | `src/content/pages/log.md` |
| Each entry | one file per entry in `src/content/log/` (start from `templates/log-entry.md`) |

An entry shows on a room or project page when it has `houseRoom: library` or `labProject: apps/sectortray` in its settings.

## Pages still being built

| What you see | File |
|---|---|
| The Shop, VCV Press and About placeholder pages | the room's `blurb:` in `src/data/site.ts` |
| The "no room here" page (404) | `src/pages/404.astro` |

## Reminders

- Text in [square brackets] shows faded on the page: it's a prompt for your own words. Replace the whole thing, brackets included.
- In settings blocks, a line starting with `# ` is a note or a ready-made line. To use one, delete just the `#` and the one space after it, and leave the spaces in front alone: indenting matters.
- `alt:` describes a picture for people who can't see it (never shown). `caption:` is shown under it.
- Run every photo through Myndar before it goes in a folder, then `npm run check-photos`.
- If a change doesn't show up, stop the preview (Ctrl+C) and start it again with `npm run dev`.
