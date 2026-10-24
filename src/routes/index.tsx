import { createFileRoute } from "@tanstack/react-router";
import studioHtml from "@/content/studio.html?raw";
import studioCss from "@/content/studio.css?raw";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Noclip Gaming | Retention gaming studio" },
      {
        name: "description",
        content:
          "Noclip Gaming is a retention gaming studio for casinos and sportsbooks. One engine for sports manager games with live betting built in: basketball and hockey are live, and every new sport is a skin, not a new integration.",
      },
      { property: "og:title", content: "Noclip Gaming | Retention gaming studio" },
      {
        property: "og:description",
        content:
          "Noclip Gaming is a retention gaming studio for casinos and sportsbooks. One engine for sports manager games with live betting built in: basketball and hockey are live, and every new sport is a skin, not a new integration.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://backcourt.fyi/" },
      { property: "og:image", content: "https://backcourt.fyi/og-image.jpg" },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Noclip Gaming | Retention gaming studio" },
      { name: "twitter:description", content: "Noclip Gaming is a retention gaming studio for casinos and sportsbooks. One engine for sports manager games with live betting built in: basketball and hockey are live, and every new sport is a skin, not a new integration." },
      { name: "twitter:image", content: "https://backcourt.fyi/og-image.jpg" },
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
      <style dangerouslySetInnerHTML={{ __html: studioCss }} />
      <div
        dangerouslySetInnerHTML={{ __html: studioHtml }}
        onSubmit={(e) => e.preventDefault()}
      />
    </>
  );
}
