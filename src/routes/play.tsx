import { createFileRoute, redirect } from "@tanstack/react-router";

export function redirectToGame(pathname: string) {
  // TanStack can fuzzy-match this route for unknown children. Never redirect those.
  if (pathname !== "/play" && pathname !== "/play/") return;
  throw redirect({ href: "/play/index.html", statusCode: 301 });
}

// Only the pretty URLs redirect; the static index.html is left untouched.
// beforeLoad runs during SSR, producing an HTTP redirect before rendering.
export const Route = createFileRoute("/play")({
  server: {
    handlers: {
      GET: ({ request }) => {
        const pathname = new URL(request.url).pathname;
        if (pathname !== "/play" && pathname !== "/play/") {
          return new Response("Not found", { status: 404 });
        }
        return new Response(null, {
          status: 301,
          headers: { Location: "/play/index.html" },
        });
      },
    },
  },
  beforeLoad: ({ location }) => redirectToGame(location.pathname),
});