<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- The playable demo is hosted outside this repo (URL in `src/routes/play.tsx`) — never copy a game bundle back in; every "Play the demo" link opens that hosted app in a new tab, and old `/play` addresses only ever redirect there (the `/play` route serves the pretty URLs, the `src/server.ts` worker entry serves the old static file path).
- Keep the supplied landing page as raw HTML/CSS, with the demo panel using a two-column grid; this preserves the imported page while preventing desktop wrapping.
