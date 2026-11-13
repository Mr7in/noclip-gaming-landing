# Notes for agents

- The site is static. Every route must prerender; no server functions or API routes. Redirects and headers go in `vercel.json`.
- Pages are raw HTML and CSS under `src/content`, rendered through `?raw` imports in their routes. Edit copy there.
- Game demos are external. Shared links live in `src/lib/studio.ts`.
- Game visuals are real captures only. No mockups, AI images or stock.
- Copy rules: plain short sentences, British spelling, no em dashes, no real league or team names, never "certified" (say "certification-ready"). Keep the 18+ and responsible gaming notice.
- Navigation uses native `details`/`summary`; keep its dismissal handling separate from the FAQ.
