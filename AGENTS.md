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

- The playable demo is hosted externally at https://noclip-gaming.vercel.app/ — no game bundle lives in this repo; every "Play the demo" link opens that URL in a new tab, and the `/play` TanStack route exists only to 301 old game links there.
- Keep the supplied landing page as raw HTML/CSS, with the demo panel using a two-column grid; this preserves the imported page while preventing desktop wrapping.
