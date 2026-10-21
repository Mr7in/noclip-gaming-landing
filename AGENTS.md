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

- Serve the unmodified game as the explicit public static asset `/play/index.html`; the exact `/play` TanStack route redirects during SSR so both pretty URL variants work without relying on directory-index hosting.
- Keep the supplied landing page as raw HTML/CSS, with the demo panel using a two-column grid; this preserves the imported page while preventing desktop wrapping.
- Verify the client build's emitted game asset against the original bytes in a build-only Vite plugin, and log its path and size; this prevents publishing a missing or altered game file.
