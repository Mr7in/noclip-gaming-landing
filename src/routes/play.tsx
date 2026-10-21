import { createFileRoute, redirect } from "@tanstack/react-router";

export function redirectToGame(pathname: string) {
  // TanStack can fuzzy-match this route for unknown children. Never redirect those.
  if (pathname !== "/play" && pathname !== "/play/") return;
  throw redirect({ href: "/play/index.html", statusCode: 301 });
}

// Only the pretty URLs redirect; the static index.html is left untouched.
// beforeLoad runs during SSR, producing an HTTP redirect before rendering.
export const Route = createFileRoute("/play")({
  beforeLoad: ({ location }) => redirectToGame(location.pathname),
});