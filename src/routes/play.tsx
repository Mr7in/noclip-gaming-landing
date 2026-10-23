import { createFileRoute, redirect } from "@tanstack/react-router";

// The playable build is hosted outside this site now. These URLs used to serve
// it directly and are already shared in old emails and previews, so they forward
// instead of 404ing.
export const DEMO_APP_URL = "https://noclip-gaming.vercel.app/";

// Nothing lives under /play any more, so the whole tree forwards.
function isGamePath(pathname: string) {
  return pathname === "/play" || pathname.startsWith("/play/");
}

export function redirectToGame(pathname: string) {
  if (!isGamePath(pathname)) return;
  throw redirect({ href: DEMO_APP_URL, statusCode: 301 });
}

// Only the forwarded URLs redirect; anything else under /play is a real 404.
// beforeLoad runs during SSR, producing an HTTP redirect before rendering.
export const Route = createFileRoute("/play")({
  server: {
    handlers: {
      GET: ({ request }) => {
        const pathname = new URL(request.url).pathname;
        if (!GAME_PATHS.has(pathname)) {
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
