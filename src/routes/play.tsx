import { createFileRoute, redirect } from "@tanstack/react-router";

export function redirectToGame() {
  throw redirect({ href: "/play/index.html", statusCode: 301 });
}

// Exact route: both trailing-slash variants match, but index.html does not.
// beforeLoad runs during SSR, producing an HTTP redirect before rendering.
export const Route = createFileRoute("/play")({
  beforeLoad: redirectToGame,
});