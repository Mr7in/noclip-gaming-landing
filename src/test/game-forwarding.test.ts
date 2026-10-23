import { describe, expect, it } from "vitest";

import { DEMO_APP_URL } from "@/routes/play";
import { forwardedGameRequest } from "@/server";

// The worker entry sees every request that is not a static asset, so this is the
// only layer that can still answer the game's old file address.
describe("Old game URL forwarding", () => {
  it("301s the old static game address to the hosted demo app", () => {
    const response = forwardedGameRequest(new Request("https://backcourt.fyi/play/index.html"));

    expect(response?.status).toBe(301);
    expect(response?.headers.get("Location")).toBe(DEMO_APP_URL);
  });

  it("leaves every other path to the app", () => {
    expect(forwardedGameRequest(new Request("https://backcourt.fyi/"))).toBeUndefined();
    expect(forwardedGameRequest(new Request("https://backcourt.fyi/play"))).toBeUndefined();
    expect(forwardedGameRequest(new Request("https://backcourt.fyi/og-image.jpg"))).toBeUndefined();
  });
});
