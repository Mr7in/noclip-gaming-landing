import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { BOOKING_URL, GAMES } from "@/lib/studio";

const page = readFileSync("src/content/studio.html", "utf8");
const text = page.replace(/<[^>]+>/g, " ");

describe("Studio business rules", () => {
  it("uses the supplied demo addresses", () => {
    expect(GAMES.fullcourt.demo).toBe("https://fullcourt-demo.noclipgaming.space/");
    expect(GAMES.backcheck.demo).toBe("https://backcheck-demo.noclipgaming.space/");
    expect(GAMES.backcourt.demo).toBe("https://backcourt-demo.noclipgaming.space/");
  });
  it("has 50 look-alike Fullcourt clubs and 500 players", () => {
    expect(GAMES.fullcourt.clubs).toBe(50);
    expect(GAMES.fullcourt.players).toBe(500);
  });
  it("has 32 fictional Backcheck clubs and 288 players", () => {
    expect(GAMES.backcheck.clubs).toBe(32);
    expect(GAMES.backcheck.players).toBe(288);
  });
  it("preserves the sole booking destination", () => {
    expect(BOOKING_URL).toBe(
      "https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ3A7rvaqZ-fVO2oaZ9vKrMJ2l95s8OJRrVpG70i7G2ethCc_MwxlA0vo976-ABKIEil0Oylvsg7",
    );
    expect(page).toContain(BOOKING_URL);
  });
});

describe("Landing copy rules", () => {
  it("never claims certification or names real leagues", () => {
    expect(text).not.toMatch(/\bcertified\b/i);
    expect(text).not.toMatch(/\bNBA\b|EuroLeague/i);
  });
  it("names no confidential operator detail", () => {
    expect(text).not.toMatch(/MBG|Playbook|Michael/i);
  });
  it("uses no em or en dashes", () => {
    expect(page).not.toMatch(/[–—]/);
  });
  it("keeps the 18+ responsible gaming notice", () => {
    expect(text).toMatch(/18\+/);
    expect(text).toMatch(/Play responsibly/i);
  });
  it("makes Fullcourt the first game a visitor is asked to play", () => {
    const firstDemo = page.match(/https:\/\/[a-z]+-demo\.noclipgaming\.space\//)?.[0];
    expect(firstDemo).toBe(GAMES.fullcourt.demo);
  });
  it("uses only real captures for game screens", () => {
    const images = [...page.matchAll(/src="([^"]+\.(?:webp|png|jpg))"/g)].map((m) => m[1]);
    for (const src of images) expect(src).toMatch(/^\/(fc|bh)\//);
  });
});
