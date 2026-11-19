---
# A LAB PROJECT. Its folder (apps/) is its category, and its file name is its address: /lab/apps/sectortray/
# Anything in [square brackets] shows as a muted prompt until you replace it with your own words.
# To use a line that starts with "# ", delete just the "# " and leave the spaces in front as they are.
# Photos go in the folder next to this file, named after it: src/content/lab/apps/sectortray/

title: "SectorTray"
status: released              # planned, in-progress, prototype, released or finished
version: "v0.6.0"             # for released software: shown instead of "Released"
platform: "Windows"           # e.g. Windows, Godot, STL, Raspberry Pi 5 (leave "" if unknown)
tagline: "Design 3D-printed Gridfinity drawer organizers offline, without CAD: measure a drawer, lay out bins and silverware trays, and send the parts to your slicer."
updated: 2026-11-07           # last time you worked on it: the newest show in the Lab terminal
page: true                    # true = its card opens its own page (once it has a photo or some words)
tags: ["3D printing"]         # small labels on its card, e.g. ["Halcyon Reach"]

facts:                        # the short list in the banner on its page
  - { label: "Runs on", value: "Windows 10 and 11" }
  - { label: "Licence", value: "GPL-3.0" }
  - { label: "Built with", value: "OpenSCAD, three.js" }
links:                        # buttons on its page
  - { label: "View on GitHub", url: "https://github.com/celticviking/sectortray" }
  - { label: "Download the latest release", url: "https://github.com/celticviking/sectortray/releases/latest" }

cover:                        # the main picture: its card, the top of its page, and the fanned cards on /lab/
  photo: ./sectortray/overview.webp
  alt: "Four SectorTray screens: a bin with its 3D preview, the drawer planner splitting the baseplate for the printer bed, bins laid out in a drawer, and the Print List"

gallery:                      # more pictures on its page, in rows of three; copy a block for more
  - photo: ./sectortray/planner.png
    alt: "The Planner tab fitting the Gridfinity grid to a drawer and splitting the baseplate into printable pieces"
    caption: "Planner: fits the grid to the drawer and splits the baseplate for your printer’s bed."
  - photo: ./sectortray/bins.png
    alt: "The Bins tab with a bin's settings and a live 3D preview"
    caption: "Bins: compartments, label tabs, scoops and magnet holes, with a live 3D preview."
  - photo: ./sectortray/layout.png
    alt: "The Layout tab with bins arranged on the drawer grid"
    caption: "Layout: drag bins onto the grid and turn them to face any way."
  - photo: ./sectortray/silverware.png
    alt: "A silverware tray with tapered slots for forks, knives and spoons"
    caption: "Silverware trays, measured from your own forks, knives and spoons."
  - photo: ./sectortray/print-list.png
    alt: "The Print List tab showing every part, its filament and an estimate in grams"
    caption: "Print List: every part, the filament it needs, and how many magnets to buy."
  - photo: ./sectortray/projects.png
    alt: "The list of saved drawers"
    caption: "Saved drawers, ready to share with someone else who has SectorTray."
---

Design 3D-printed Gridfinity organizers for your drawers, offline and without CAD. Measure a drawer with a tape measure (inches with fractions, or millimeters), and SectorTray fits the grid to it, splits the baseplate into pieces your 3D printer can handle, lets you lay out bins and trays, then sends the parts to your slicer.

It's offline: no account, nothing uploaded to any cloud, and no telemetry of any kind.

[Why you built it: the drawer that started it, and what you learned along the way.]
