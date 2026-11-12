import { describe, expect, it } from "vitest";
import { GAMES, BOOKING_URL } from "@/lib/studio";
describe("Studio business rules", () => {
  it("uses the supplied Backcourt demo", () => {
    expect(GAMES.backcourt.demo).toBe("https://backcourt-demo.noclipgaming.space/");
  });
  it("uses the supplied Backcheck demo", () => {
    expect(GAMES.backcheck.demo).toBe("https://backcheck-demo.noclipgaming.space/");
  });
  it("has 32 fictional Backcheck clubs", () => {
    expect(GAMES.backcheck.clubs).toBe(32);
  });
  it("has 288 fictional Backcheck players", () => {
    expect(GAMES.backcheck.players).toBe(288);
  });
  it("preserves the existing sole booking destination", () => {
    expect(BOOKING_URL).toBe(
      "https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ3A7rvaqZ-fVO2oaZ9vKrMJ2l95s8OJRrVpG70i7G2ethCc_MwxlA0vo976-ABKIEil0Oylvsg7",
    );
  });
});
