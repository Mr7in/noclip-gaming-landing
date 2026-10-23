import { createFileRoute } from "@tanstack/react-router";

import { DEMO_APP_URL } from "@/routes/play";

// The old static game URL has to be matched by name: unmatched children fall
// straight to the not-found page, so the /play parent never gets to forward them.
export const Route = createFileRoute("/play/index.html")({
  server: {
    handlers: {
      GET: () =>
        new Response(null, {
          status: 301,
          headers: { Location: DEMO_APP_URL },
        }),
    },
  },
});
