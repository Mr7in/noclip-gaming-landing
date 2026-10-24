import { createFileRoute } from "@tanstack/react-router";
import backcheckHtml from "@/content/backcheck.html?raw";
import backcheckCss from "@/content/backcheck.css?raw";

export const Route = createFileRoute("/backcheck")({
  head: () => ({
    meta: [
      { title: "Backcheck | Hockey manager + live betting | Noclip Gaming" },
      {
        name: "description",
        content:
          "Backcheck is an ice hockey manager game with live betting built in. Players build their lines, set the game plan and bet before puck drop and at every intermission, in a fictional league of 32 clubs and 288 players.",
      },
      { property: "og:title", content: "Backcheck for operators" },
      {
        property: "og:description",
        content:
          "Backcheck is an ice hockey manager game with live betting built in. Players build their lines, set the game plan and bet before puck drop and at every intermission, in a fictional league of 32 clubs and 288 players.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://backcourt.fyi/backcheck" },
      { property: "og:image", content: "https://backcourt.fyi/og-image.jpg" },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Backcheck for operators" },
      { name: "twitter:description", content: "Backcheck is an ice hockey manager game with live betting built in. Players build their lines, set the game plan and bet before puck drop and at every intermission, in a fictional league of 32 clubs and 288 players." },
      { name: "twitter:image", content: "https://backcourt.fyi/og-image.jpg" },
    ],
    links: [
      { rel: "canonical", href: "https://backcourt.fyi/backcheck" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Bungee&family=DM+Mono:wght@400;500&family=Rubik:wght@400;500;700;800&display=swap",
      },
    ],
  }),
  component: Backcheck,
});

function Backcheck() {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: backcheckCss }} />
      <div
        dangerouslySetInnerHTML={{ __html: backcheckHtml }}
        onSubmit={(e) => e.preventDefault()}
      />
    </>
  );
}
