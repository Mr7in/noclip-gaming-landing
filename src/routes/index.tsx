import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef } from "react";
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
      { property: "og:url", content: "https://noclipgaming.space/" },
      { property: "og:image", content: "https://noclipgaming.space/og-image.jpg" },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Noclip Gaming | Retention gaming studio" },
      {
        name: "twitter:description",
        content:
          "Noclip Gaming is a retention gaming studio for casinos and sportsbooks. One engine for sports manager games with live betting built in: basketball and hockey are live, and every new sport is a skin, not a new integration.",
      },
      { name: "twitter:image", content: "https://noclipgaming.space/og-image.jpg" },
    ],
    links: [
      { rel: "canonical", href: "https://noclipgaming.space/" },
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
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const content = contentRef.current;
    if (!content) return;
    const disclosures = () =>
      Array.from(content.querySelectorAll<HTMLDetailsElement>(".mobilenav, .playdd"));
    const close = (restoreFocus = false) => {
      for (const disclosure of disclosures()) {
        if (!disclosure.open) continue;
        disclosure.open = false;
        if (restoreFocus) disclosure.querySelector("summary")?.focus();
      }
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") close(true);
    };
    const onClick = (event: MouseEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) return;
      const anchor = target.closest<HTMLAnchorElement>("a");
      if (anchor?.closest(".mobilenav, .playdd")) {
        close();
        if (anchor.hash) {
          const section = content.querySelector<HTMLElement>(anchor.hash);
          section?.setAttribute("tabindex", "-1");
          section?.focus({ preventScroll: true });
        }
      } else if (!target.closest(".mobilenav, .playdd")) {
        close();
      }
    };
    const onToggle = (event: Event) => {
      const opened = event.target;
      if (
        !(opened instanceof HTMLDetailsElement) ||
        !opened.open ||
        !opened.matches(".mobilenav, .playdd")
      )
        return;
      for (const disclosure of disclosures()) {
        if (disclosure !== opened) disclosure.open = false;
      }
    };
    const onResize = () => close();
    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("click", onClick);
    content.addEventListener("toggle", onToggle, true);
    window.addEventListener("resize", onResize);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("click", onClick);
      content.removeEventListener("toggle", onToggle, true);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: studioCss }} />
      <div
        ref={contentRef}
        dangerouslySetInnerHTML={{ __html: studioHtml }}
        onSubmit={(e) => e.preventDefault()}
      />
    </>
  );
}
