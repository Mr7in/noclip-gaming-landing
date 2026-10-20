import { createFileRoute } from "@tanstack/react-router";
import landingHtml from "@/content/landing.html?raw";
import landingCss from "@/content/landing.css?raw";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Backcourt for operators — Every quarter is a new market" },
      {
        name: "description",
        content:
          "Backcourt Manager: a real-money basketball manager game with live quarter-by-quarter betting for casinos and sportsbooks, distributed through Hub88.",
      },
      { property: "og:title", content: "Backcourt for operators" },
      {
        property: "og:description",
        content: "A basketball manager game where every quarter is a new market. For licensed operators via Hub88.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Bungee&family=DM+Mono:wght@400;500&family=Rubik:wght@400;500;700;800&display=swap",
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: landingCss }} />
      <div
        dangerouslySetInnerHTML={{ __html: landingHtml }}
        onSubmit={(e) => e.preventDefault()}
      />
    </>
  );
}
