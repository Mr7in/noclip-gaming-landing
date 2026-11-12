import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";

// Static build for GitHub Pages: every route is prerendered to plain HTML
// in dist/client, which the Pages workflow uploads as the site.
export default defineConfig({
  plugins: [
    tailwindcss(),
    tanstackStart({
      prerender: { enabled: true, crawlLinks: true, failOnError: true },
      pages: [{ path: "/" }, { path: "/backcourt" }, { path: "/backcheck" }, { path: "/404" }],
    }),
    viteReact(),
  ],
  resolve: { tsconfigPaths: true, dedupe: ["react", "react-dom", "@tanstack/react-router"] },
});
