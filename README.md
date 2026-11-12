# noclip gaming landing

The operator site for noclip gaming at https://noclipgaming.space. It sells the studio's sports manager games (basketball and hockey, with live betting built in) to casinos and sportsbooks.

## Stack

TanStack Start (React 19), Vite, Tailwind v4, Vitest, Bun. Every route is prerendered to static HTML at build time and served by GitHub Pages.

| Route | Source |
|---|---|
| `/` | `src/routes/index.tsx` renders `src/content/studio.html` + `studio.css` |
| `/backcourt` | `src/content/landing.html` + `landing.css` |
| `/backcheck` | `src/content/backcheck.html` + `backcheck.css` |
| `/404` | copied to `404.html` after the build |
| `/play` | static redirect page in `public/play/index.html` |

Page copy lives in the HTML files under `src/content`, not in components.

## Work on it

```sh
bun install
bun dev            # local dev server
bun run lint
bun run test
bun run build      # static site in dist/client
bun run preview    # serve the build locally
```

## Deploy

Pushing to `main` runs `.github/workflows/deploy.yml`: install, lint, test, build, then publish `dist/client` to GitHub Pages. Pull requests run the same checks without deploying (`.github/workflows/ci.yml`). The custom domain comes from `public/CNAME`.

## Screenshots

Game screens are real captures from the demos, never mockups:

- `public/fc/`: Fullcourt (https://fullcourt-demo.noclipgaming.space). Re-capture after a game update:
  ```sh
  bun scripts/capture-fullcourt.ts          # PNG masters in design/captures/ (not committed)
  bun scripts/export-captures.ts            # WebP files in public/fc/ and og-image.jpg
  ```
  The capture script plays fresh demo-funds sessions in Chrome at 390 x 844 (scale 3) and 1440 x 900. The hero frame is picked by eye from `design/captures/burst/desk-*.png` and copied to `design/captures/court-hero.png`. A smooth hero video needs a machine with a real GPU; headless software rendering plays in slow motion.
- `public/bc/`: Backcourt, used on `/backcourt`
- `public/bh/`: Backcheck (https://backcheck-demo.noclipgaming.space)

QR codes for the demos are static SVGs in `public/qr/`, made with `bun scripts/make-qr.ts`. Logo files in `public/brand/` come from the Fullcourt game (`apps/clutch/public/brand/`); never recolour them.
