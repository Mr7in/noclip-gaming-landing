/**
 * Captures real screens from the Fullcourt demo for the landing page.
 *
 *   bun scripts/capture-fullcourt.ts            # phone set + desktop court shots
 *   bun scripts/capture-fullcourt.ts phone      # phone set only
 *   bun scripts/capture-fullcourt.ts desktop    # desktop court shots and clip only
 *
 * Every capture comes from a fresh session on demo funds. Nothing is edited:
 * the script only taps through the game the way a player would.
 *
 * Output: PNG masters in design/captures/ (not deployed). Run
 * `bun scripts/export-captures.ts` afterwards to write the WebP files in public/fc/.
 * Needs Google Chrome installed (Playwright's "chrome" channel).
 */
import { chromium, type Browser, type Page } from "playwright";
import { mkdirSync } from "node:fs";

const DEMO = "https://fullcourt-demo.noclipgaming.space/";
const OUT = "design/captures";
mkdirSync(`${OUT}/burst`, { recursive: true });

const proxy = process.env.HTTPS_PROXY ? { server: process.env.HTTPS_PROXY } : undefined;
const launch = () =>
  chromium.launch({
    channel: "chrome",
    proxy,
    args: ["--use-angle=swiftshader", "--enable-unsafe-swiftshader", "--ignore-gpu-blocklist"],
  });

const log = (...a: unknown[]) => console.log("·", ...a);

async function phonePage(browser: Browser, dpr = 3) {
  const ctx = await browser.newContext({
    viewport: { width: 390, height: 844 },
    deviceScaleFactor: dpr,
    isMobile: true,
    hasTouch: true,
    serviceWorkers: "block", // so request routing (the slow-network loading shot) applies
  });
  return ctx.newPage();
}

/** Click the nth visible button or link whose text contains `sub` (case-insensitive). */
async function tap(
  page: Page,
  sub: string,
  opts: { nth?: number; last?: boolean; wait?: number } = {},
) {
  const ok = await page.evaluate(
    ([s, nth, last]) => {
      const q = (s as string).toLowerCase();
      const els = [...document.querySelectorAll<HTMLElement>("button,[role=button],a")].filter(
        (e) => {
          const r = e.getBoundingClientRect();
          const text = (e.innerText || e.getAttribute("aria-label") || "")
            .toLowerCase()
            .replace(/\s+/g, " ");
          return (
            r.width > 0 &&
            r.height > 0 &&
            getComputedStyle(e).visibility !== "hidden" &&
            text.includes(q)
          );
        },
      );
      const el = last ? els[els.length - 1 - (nth as number)] : els[nth as number];
      if (!el) return false;
      el.scrollIntoView({ block: "center" });
      el.click();
      return true;
    },
    [sub, opts.nth ?? 0, opts.last ?? false] as const,
  );
  if (!ok) throw new Error(`No button containing "${sub}"`);
  await page.waitForTimeout(opts.wait ?? 1200);
}

const bodyText = (page: Page) => page.evaluate(() => document.body.innerText.toLowerCase());

async function waitForText(page: Page, needles: string[], timeoutMs = 240_000) {
  const end = Date.now() + timeoutMs;
  while (Date.now() < end) {
    const t = await bodyText(page);
    const hit = needles.find((n) => t.includes(n));
    if (hit) return hit;
    await page.waitForTimeout(400);
  }
  throw new Error(`Timed out waiting for ${needles.join(" / ")}`);
}

const shot = (page: Page, name: string) => {
  log(name);
  return page.screenshot({ path: `${OUT}/${name}.png` });
};

/** Scroll the game's sheet so the element containing `text` sits at `block`. */
async function scrollTo(page: Page, text: string, block: ScrollLogicalPosition = "start") {
  await page.evaluate(
    ([t, b]) => {
      const els = [...document.querySelectorAll<HTMLElement>("#panel *, #modal *")];
      const el = els.find(
        (e) => e.children.length === 0 && e.innerText?.toLowerCase().includes(t as string),
      );
      el?.scrollIntoView({ block: b as ScrollLogicalPosition });
    },
    [text.toLowerCase(), block] as const,
  );
  await page.waitForTimeout(600);
}

async function onboard(page: Page, draftShotAt = -1) {
  await page.goto(DEMO);
  await waitForText(page, ["start the draft"]);
  await page.waitForTimeout(1500);
  await tap(page, "start the draft", { wait: 1500 });
  for (let i = 0; i < 5; i++) {
    if (i === draftShotAt) await shot(page, "02-draft");
    // Take the highest-rated card on offer, like a player would.
    await page.evaluate(() => {
      // Card text starts with the shirt number, then the rating.
      const cards = [...document.querySelectorAll<HTMLElement>("#panel button")];
      const rating = (b: HTMLElement) => Number(b.innerText.trim().split(/\s+/)[1]) || 0;
      const best = [...cards].sort((a, b) => rating(b) - rating(a))[0];
      best?.click();
    });
    await page.waitForTimeout(1400);
  }
  await tap(page, "enter the arena", { wait: 4000 });
}

async function loadingScreen(browser: Browser) {
  // Hold the game script back so the boot screen shows on its own, as it does on a slow connection.
  const page = await phonePage(browser);
  await page.route("**/*.js", async (route) => {
    await new Promise((r) => setTimeout(r, 6000));
    await route.continue();
  });
  await page.goto(DEMO, { waitUntil: "commit" });
  await page.waitForTimeout(2500);
  await shot(page, "01-loading");
  await page.context().close();
}

async function metaScreens(browser: Browser) {
  // Packs first: the welcome pack is only there in a fresh session.
  // Try a few fresh sessions for an Epic or Legendary walkout; keep the best real one.
  let bestTier = -1;
  for (let attempt = 0; attempt < 6 && bestTier < 3; attempt++) {
    const page = await phonePage(browser);
    await onboard(page, attempt === 0 ? 2 : -1);
    if (attempt === 0) {
      await tap(page, "daily reward", { wait: 1800 });
      await shot(page, "12-daily-streak");
      await page.keyboard.press("Escape");
      await page.mouse.click(195, 60);
      await page.waitForTimeout(800);
      await tap(page, "squad", { last: true, wait: 1800 });
      await shot(page, "03-squad-chemistry");
      await tap(page, "store", { last: true, wait: 1800 });
      await tap(page, "style", { wait: 1800 });
      await shot(page, "13-store-kits-arenas");
      await page.mouse.wheel(0, 600);
      await page.waitForTimeout(800);
      await shot(page, "13b-store-kits-arenas-more");
    }
    await tap(page, "packs", { last: true, wait: 1800 });
    await tap(page, "open", { wait: 1800 });
    // Tear the pack: swipe across the top.
    await page.mouse.move(60, 230);
    await page.mouse.down();
    await page.mouse.move(330, 230, { steps: 12 });
    await page.mouse.up();
    await page.waitForTimeout(2200);
    await page.mouse.click(195, 420);
    await page.waitForTimeout(4000);
    const t = await bodyText(page);
    const tier = t.includes("legendary!") ? 3 : t.includes("epic!") ? 2 : 1;
    log(`pack attempt ${attempt + 1}: tier ${tier}`);
    if (tier > bestTier) {
      bestTier = tier;
      await shot(page, "11-pack-best-card");
    }
    if (attempt === 0) {
      await tap(page, "skip", { wait: 2000 }).catch(() => {});
      await tap(page, "place stickers", { wait: 3000 });
      await shot(page, "14-collection-album");
    }
    await page.context().close();
  }
}

async function matchScreens(browser: Browser) {
  const page = await phonePage(browser);
  await onboard(page);
  await tap(page, "rating play", { wait: 2500 });
  await tap(page, "price the match", { wait: 4500 });
  await shot(page, "16-play-without-betting");

  await tap(page, "plan", { wait: 1500 });
  await scrollTo(page, "your game plan");
  await tap(page, "pace and space", { wait: 2500 });
  await scrollTo(page, "your game plan");
  await shot(page, "04-game-plan");

  await tap(page, "bets", { wait: 1500 });
  await tap(page, "1.", { wait: 1000 }); // match winner, home side
  await tap(page, "over ", { wait: 1000 }); // captain over
  await shot(page, "05-bet-slip");
  await tap(page, "win + over", { wait: 1200 });
  await scrollTo(page, "bet builder", "center");
  await shot(page, "09-bet-builder");

  await tap(page, "tip off", { last: true, wait: 1200 });
  for (let i = 0; i < 40; i++) {
    await page.screenshot({ path: `${OUT}/burst/live-${String(i).padStart(2, "0")}.png` });
    await page.waitForTimeout(220);
  }
  await shot(page, "07-live-bet-tracker");
  await tap(page, "speed", { wait: 400 });
  await tap(page, "speed", { wait: 1500 });
  await shot(page, "15-speed-4x");

  await waitForText(page, ["end of q1"]);
  await page.waitForTimeout(1800);
  await shot(page, "08-quarter-break-cash-out");
  await tap(page, "markets", { wait: 1500 });
  await shot(page, "08b-quarter-break-markets");

  await page.context().close();
}

/**
 * A full match to the final buzzer with one bet on, skipping to each break as a player can.
 * With `wantLoss`, plays the hardest fixture in fresh sessions until a real defeat comes up.
 */
async function finalScreens(browser: Browser, wantLoss = false): Promise<boolean> {
  const page = await phonePage(browser);
  await onboard(page);
  if (wantLoss) {
    await tap(page, "underdog", { wait: 2500 }).catch(() =>
      tap(page, "rating play", { nth: 2, wait: 2500 }),
    );
  } else {
    await tap(page, "rating play", { wait: 2500 });
  }
  await tap(page, "price the match", { wait: 4500 });
  await tap(page, "1.", { wait: 1000 });
  await tap(page, "tip off", { last: true, wait: 2500 });
  // Skip to each break, start the next quarter without new bets, until the final buzzer.
  for (let i = 0; i < 200; i++) {
    const t = await bodyText(page);
    if (/next match|full time|final buzzer|you won|you lost/.test(t) && !t.includes("skip")) break;
    if (t.includes("start q")) {
      const started = await tap(page, "start q", { wait: 2500 }).then(
        () => true,
        () => false,
      );
      if (!started) {
        const i0 = t.indexOf("start q");
        log(
          "start q text but no button:",
          t.slice(Math.max(0, i0 - 120), i0 + 60).replace(/\n/g, " | "),
        );
        await tap(page, "start", { last: true, wait: 2500 }).catch(() => {});
      }
      continue;
    }
    await tap(page, "skip", { wait: 1500 }).catch(() => page.waitForTimeout(1500));
  }
  await page.waitForTimeout(4000);
  if (wantLoss) {
    const lost = /defeat|you lost|loss/.test(await bodyText(page));
    if (lost) await shot(page, "10d-final-defeat");
    await page.context().close();
    return lost;
  }
  await shot(page, "10-final-result");
  await page.mouse.click(195, 300);
  await page.waitForTimeout(3000);
  await shot(page, "10b-final-result-after");
  await page.mouse.wheel(0, 500);
  await page.waitForTimeout(1000);
  await shot(page, "10c-final-result-scrolled");
  await page.context().close();
  return true;
}

async function desktopCourt(browser: Browser) {
  const ctx = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 1,
    recordVideo: { dir: `${OUT}/video`, size: { width: 1440, height: 900 } },
  });
  const page = await ctx.newPage();
  await onboard(page);
  await tap(page, "rating play", { wait: 2500 });
  await tap(page, "price the match", { wait: 4500 });
  await tap(page, "tip off", { last: true, wait: 1000 });
  // Let the match run while the context records video, then take stills.
  await page.waitForTimeout(16_000);
  // Pick the best frame by eye and copy it to design/captures/court-hero.png.
  for (let i = 0; i < 24; i++) {
    await page.screenshot({ path: `${OUT}/burst/desk-${String(i).padStart(2, "0")}.png` });
    await page.waitForTimeout(250);
  }
  await ctx.close(); // finalises the video file in design/captures/video/
}

const which = process.argv[2] ?? "all";
const browser = await launch();
try {
  if (which === "all" || which === "phone") {
    await loadingScreen(browser);
    await metaScreens(browser);
    await matchScreens(browser);
    await finalScreens(browser);
  }
  if (which === "all" || which === "desktop") await desktopCourt(browser);
  if (which === "loading") await loadingScreen(browser);
  if (which === "meta") await metaScreens(browser);
  if (which === "match") await matchScreens(browser);
  if (which === "final") await finalScreens(browser);
  if (which === "all" || which === "loss") {
    for (let i = 0; i < 6 && !(await finalScreens(browser, true)); i++)
      log(`no defeat in session ${i + 1}`);
  }
} finally {
  await browser.close();
}
