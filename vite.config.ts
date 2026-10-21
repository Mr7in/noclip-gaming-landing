// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - TanStack devtools (dev-only, first), tanstackStart, viteReact, tailwindcss, tsConfigPaths,
//     nitro (build-only using cloudflare as a default target), VITE_* env injection, @ path alias,
//     React/TanStack dedupe, error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

// Dev-only: rewrite /play and /play/ to the static file in public/play/index.html so
// TanStack Router never intercepts the game URL. In production, Cloudflare static
// assets serve the directory index natively.
const servePlayIndex = () => ({
  name: "serve-play-index",
  configureServer(server: import("vite").ViteDevServer) {
    server.middlewares.use((req, _res, next) => {
      const url = (req.url || "").split("?")[0];
      if (url === "/play" || url === "/play/") {
        req.url = "/play/index.html";
      }
      next();
    });
  },
});

export default defineConfig({
  tanstackStart: {
    // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
    // nitro/vite builds from this
    server: { entry: "server" },
  },
  vite: {
    plugins: [servePlayIndex()],
  },
});
