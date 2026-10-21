import { QueryClient } from "@tanstack/react-query";
import { createRouter, rootRouteId } from "@tanstack/react-router";
import { describe, expect, it } from "vitest";

import { routeTree } from "@/routeTree.gen";
import { redirectToGame } from "@/routes/play";

// Match routes without running loaders or rendering: loaders may need a server or
// network the test run lacks, and jsdom never loads the stylesheets React waits on.
describe("App routing", () => {
  it("matches a page for / instead of falling back to not found", () => {
    const router = createRouter({ routeTree, context: { queryClient: new QueryClient() } });

    const matches = router.matchRoutes("/");

    expect(matches.at(-1)?.routeId).not.toBe(rootRouteId);
  });

  it.each(["/play", "/play/"])("matches the exact game redirect for %s", (path) => {
    const router = createRouter({ routeTree, context: { queryClient: new QueryClient() } });
    expect(router.matchRoutes(path).at(-1)?.routeId).toBe("/play");
  });

  it("does not redirect the static /play/index.html URL", () => {
    expect(redirectToGame("/play/index.html")).toBeUndefined();
  });

  it("redirects to the explicit static game URL with HTTP 301", () => {
    expect.assertions(3);
    try {
      redirectToGame("/play");
    } catch (error) {
      expect(error).toBeInstanceOf(Response);
      expect((error as Response).status).toBe(301);
      expect((error as Response).headers.get("Location")).toBe("/play/index.html");
    }
  });
});
