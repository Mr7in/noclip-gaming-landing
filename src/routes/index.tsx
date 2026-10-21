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
          "Backcourt Manager: a real-money basketball manager game with live quarter-by-quarter betting for casinos and sportsbooks.",
      },
      { property: "og:title", content: "Backcourt for operators" },
      {
        property: "og:description",
        content: "A basketball manager game where every quarter is a new market. Live quarter betting for licensed casinos and sportsbooks.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://backcourt.fyi/" },
      { property: "og:image", content: "https://backcourt.fyi/og-image.jpg" },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Backcourt for operators" },
      { name: "twitter:description", content: "A basketball manager game where every quarter is a new market. Live quarter betting for licensed casinos and sportsbooks." },
      { name: "twitter:image", content: "https://backcourt.fyi/og-image.jpg" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "VideoGame",
          name: "Backcourt Manager",
          description: "Real-money basketball management game with live quarter-by-quarter betting for licensed casinos and sportsbooks.",
          url: "https://backcourt.fyi/",
          image: "https://backcourt.fyi/og-image.jpg",
          genre: ["Sports", "Management"],
        }),
      },
    ],
    links: [
      { rel: "canonical", href: "https://backcourt.fyi/" },
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
