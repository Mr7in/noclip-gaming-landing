import { createFileRoute, redirect } from "@tanstack/react-router";

// The playable build is hosted outside this site now. These URLs used to serve
// it directly and are already shared in old emails and previews, so they forward
// instead of 404ing.
export const DEMO_APP_URL = "https://backcourt-demo.noclipgaming.space/";

// Nothing lives under /play any more, so the whole tree forwards.
function isGamePath(pathname: string) {
  return pathname === "/play" || pathname.startsWith("/play/");
}

export function redirectToGame(pathname: string) {
  if (!isGamePath(pathname)) return;
  throw redirect({ href: DEMO_APP_URL, statusCode: 301 });
}

// The handler answers the request directly during SSR, so the redirect is a real
// HTTP 301 before any HTML renders. beforeLoad covers client-side navigations.
// beforeLoad runs during SSR, producing an HTTP redirect before rendering.
export const Route = createFileRoute("/play")({
  server: {
    handlers: {
      GET: ({ request }) => {
        const pathname = new URL(request.url).pathname;
        if (!isGamePath(pathname)) {
          return new Response("Not found", { status: 404 });
        }
        return new Response(null, {
          status: 301,
          headers: { Location: DEMO_APP_URL },
        });
      },
    },
  },
  beforeLoad: ({ location }) => redirectToGame(location.pathname),
});
