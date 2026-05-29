# JMS Garage Door Man

Marketing website for **JMS Garage Door Man** — a garage door installation, repair,
and maintenance business owned and operated by Marlon, serving the Houston, TX area
(and traveling far for larger jobs). Residential, commercial — you name it, he does it all.

🔗 **Live preview:** run locally (see below) — the production build is fully static and
can be hosted anywhere.

---

## Features

- **Bilingual (English / Spanish)** — a language toggle swaps all on-page copy, the quote
  planner labels, and the pre-filled text message. The choice is saved to `localStorage`
  and Spanish-preferring browsers are auto-detected on first visit.
- **Interactive Quote Planner** — visitors pick a service category and specifics, enter
  their details, and the site builds a ready-to-send SMS (with iOS/Android-correct
  formatting) or a one-tap call to Marlon. Calling is presented as the fastest option.
- **Project Gallery + lightbox** — a responsive masonry grid of real jobs with a
  keyboard-accessible, full-screen image viewer (arrow keys / swipe / Esc).
- **Before & After showcase** — side-by-side comparison cards.
- **Optimized images** — all photos are auto-oriented, resized, and served as WebP,
  keeping the build small and fast on mobile.
- **No framework** — plain HTML, CSS, and vanilla JavaScript, bundled by [Vite](https://vitejs.dev/).

## Tech stack

| | |
|---|---|
| Build tool | Vite 5 |
| Languages | HTML, CSS, vanilla JS (ES modules) |
| Image pipeline | [`sharp`](https://sharp.pixelplumbing.com/) → WebP |
| i18n | Custom `data-i18n` dictionary (no dependency) |

## Getting started

```bash
npm install        # install dependencies
npm run dev        # start the dev server (http://localhost:5173)
```

### Build & preview the production site

```bash
npm run build      # outputs the static site to dist/
npm run preview    # serve the built site (http://localhost:4173)
```

The contents of `dist/` are static and can be deployed to any host
(Netlify, GitHub Pages, Cloudflare Pages, S3, etc.).

## Working with images

The site ships optimized **`.webp`** files. The original full-resolution photos are kept
locally as masters but are **not committed** to the repo (they're git-ignored).

To regenerate the WebP copies after adding or changing photos:

```bash
npm run optimize:images
```

This script ([`scripts/optimize-images.mjs`](scripts/optimize-images.mjs)) auto-orients each
photo (baking in EXIF rotation), resizes the longest edge (2000px for the hero/before/after,
1600px otherwise), and writes a quality-80 `.webp` beside it. Originals are left untouched.

**Adding a new gallery photo:** drop the original in `assets/`, run `npm run optimize:images`,
then add an `<img src="assets/<name>.webp">` `<figure class="work-item">` block in `index.html`
(copy an existing one) with a `data-i18n` caption key, and add that key to both the `en` and `es`
dictionaries in `scripts.js`.

## Editing copy / translations

All user-facing text lives in the `I18N` dictionary in
[`scripts.js`](scripts.js) under `en` and `es`. Markup references a string with
`data-i18n="key"` (text), `data-i18n-html` (rich text), `data-i18n-placeholder`,
`data-i18n-alt`, or `data-i18n-aria`. Keep the `en` and `es` objects at the same keys so
both languages stay complete.

## Project structure

```
.
├── index.html              # all page markup (data-i18n attributes drive translation)
├── styles.css              # design system + component styles
├── scripts.js              # i18n, quote planner, gallery lightbox, nav
├── scripts/
│   └── optimize-images.mjs # WebP optimization script
├── assets/                 # images (.webp committed; original .jpg/.jpeg masters git-ignored)
└── package.json
```

## Contact

Call or text Marlon: **409-934-2301** — available 24/7 for emergencies.
