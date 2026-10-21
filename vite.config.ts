// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - TanStack devtools (dev-only, first), tanstackStart, viteReact, tailwindcss, tsConfigPaths,
//     nitro (build-only using cloudflare as a default target), VITE_* env injection, @ path alias,
//     React/TanStack dedupe, error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

export default defineConfig({
  tanstackStart: {
    // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
    // nitro/vite builds from this
    server: { entry: "server" },
  },
  vite: {
    plugins: [{
      name: "verify-static-game-output",
      apply: "build",
      closeBundle() {
        if (this.environment.name !== "client") return;
        const asset = resolve(this.environment.config.build.outDir, "play/index.html");
        const original = readFileSync(resolve("public/play/index.html"));
        const emitted = readFileSync(asset);
        if (!original.equals(emitted)) {
          throw new Error("The emitted static game differs from public/play/index.html");
        }
        console.log(`[static game verified] ${asset} (${emitted.length} bytes, unmodified)`);
      },
    }],
  },
});
