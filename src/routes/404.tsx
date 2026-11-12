import { createFileRoute } from "@tanstack/react-router";
import { NotFoundComponent } from "./__root";

// Prerendered to /404 and copied to 404.html, which GitHub Pages serves for unknown paths.
export const Route = createFileRoute("/404")({
  head: () => ({
    meta: [{ title: "Page not found | noclip gaming" }, { name: "robots", content: "noindex" }],
  }),
  component: NotFoundComponent,
});
