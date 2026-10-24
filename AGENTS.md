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

- Game demos remain external; shared studio links use src/lib/studio.ts while the unchanged legacy /play redirects target Backcourt, so no game bundle is shipped.
- Keep the supplied landing page as raw HTML/CSS, with the demo panel using a two-column grid; this preserves the imported page while preventing desktop wrapping.

- All three pages (/, /backcourt, /backcheck) are raw HTML/CSS content files under src/content rendered via ?raw imports in their routes; they share the same .bc visual system, with backcheck.css adding an ice-palette override. This keeps the imported pages byte-stable and free of React rewrite drift.
