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

- `public/fc/`: Fullcourt (https://fullcourt-demo.noclipgaming.space), re-captured with `scripts/capture-fullcourt.ts`
- `public/bc/`: Backcourt, used on `/backcourt`
- `public/bh/`: Backcheck (https://backcheck-demo.noclipgaming.space)
