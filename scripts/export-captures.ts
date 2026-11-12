/**
 * Turns the PNG masters from capture-fullcourt.ts into the WebP files the page uses.
 *   bun scripts/export-captures.ts
 */
import sharp from "sharp";
import { mkdirSync } from "node:fs";

const SRC = "design/captures";
const OUT = "public/fc";
mkdirSync(OUT, { recursive: true });

// master file -> page file. Phone screens are 1170 x 2532 masters, exported at 640 wide.
const phone: Record<string, string> = {
  "01-loading": "loading",
  "02-draft": "draft",
  "03-squad-chemistry": "squad-chemistry",
  "04-game-plan": "game-plan",
  "05-bet-slip": "bet-slip",
  "06-live-3d-match": "live-match",
  "07-live-bet-tracker": "live-bet-tracker",
  "08-quarter-break-cash-out": "break-cash-out",
  "08b-quarter-break-markets": "break-markets",
  "09-bet-builder": "bet-builder",
  "10-final-result": "final-result",
  "10d-final-defeat": "final-defeat",
  "11-pack-best-card": "pack-legendary",
  "12-daily-streak": "daily-streak",
  "13-store-kits-arenas": "store-kits",
  "13b-store-kits-arenas-more": "store-arenas",
  "14-collection-album": "club-albums",
  "15-speed-4x": "speed-4x",
  "16-play-without-betting": "play-without-betting",
};

for (const [src, name] of Object.entries(phone)) {
  await sharp(`${SRC}/${src}.png`)
    .resize({ width: 640 })
    .webp({ quality: 80 })
    .toFile(`${OUT}/${name}.webp`);
  console.log(`${OUT}/${name}.webp`);
}

// Desktop court shot: the hero at two widths, and the 1200 x 630 social card.
const court = `${SRC}/court-hero.png`; // picked from burst/desk-*.png
for (const w of [1440, 960, 640]) {
  await sharp(court).resize({ width: w }).webp({ quality: 80 }).toFile(`${OUT}/court-${w}.webp`);
}
await sharp(court)
  .resize(1200, 630, { fit: "cover", position: "centre" })
  .jpeg({ quality: 82 })
  .toFile("public/og-image.jpg");
console.log("court-*.webp, og-image.jpg");
