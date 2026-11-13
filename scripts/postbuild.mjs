// Static hosts (Vercel) serve 404.html for unknown paths. Copy the prerendered /404 page there.
import { copyFileSync, existsSync } from "node:fs";

const out = "dist/client";
const src = [`${out}/404/index.html`, `${out}/404.html`].find((p) => existsSync(p));
if (!src) throw new Error("Prerendered /404 page not found in dist/client");
if (src !== `${out}/404.html`) copyFileSync(src, `${out}/404.html`);
console.log(`404.html ready (from ${src})`);
