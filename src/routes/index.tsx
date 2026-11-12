import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef } from "react";
import studioHtml from "@/content/studio.html?raw";
import studioCss from "@/content/studio.css?raw";
import { GAMES } from "@/lib/studio";
import barlow800 from "@fontsource/barlow-condensed/files/barlow-condensed-latin-800-normal.woff2?url";
import barlow800i from "@fontsource/barlow-condensed/files/barlow-condensed-latin-800-italic.woff2?url";
import barlow900 from "@fontsource/barlow-condensed/files/barlow-condensed-latin-900-normal.woff2?url";
import barlow900i from "@fontsource/barlow-condensed/files/barlow-condensed-latin-900-italic.woff2?url";
import rubik400 from "@fontsource/rubik/files/rubik-latin-400-normal.woff2?url";
import rubik500 from "@fontsource/rubik/files/rubik-latin-500-normal.woff2?url";
import rubik700 from "@fontsource/rubik/files/rubik-latin-700-normal.woff2?url";

// Self-hosted fonts (SIL OFL), declared inline so no extra stylesheet blocks the first paint.
const face = (family: string, url: string, weight: number, style = "normal") =>
  `@font-face{font-family:"${family}";font-style:${style};font-weight:${weight};font-display:${family === "Rubik" ? "optional" : "swap"};src:url(${url}) format("woff2");unicode-range:U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+0304,U+0308,U+0329,U+2000-206F,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD}`;
const FONTS = [
  face("Barlow Condensed", barlow800, 800),
  face("Barlow Condensed", barlow800i, 800, "italic"),
  face("Barlow Condensed", barlow900, 900),
  face("Barlow Condensed", barlow900i, 900, "italic"),
  face("Rubik", rubik400, 400),
  face("Rubik", rubik500, 500),
  face("Rubik", rubik700, 700),
].join("");

const TITLE = "Fullcourt | 3D basketball manager with live betting, for casinos | noclip gaming";
const DESCRIPTION =
  "Fullcourt is a 3D basketball manager with live betting at every break, built for casinos and sportsbooks. A look-alike league, matches in minutes and daily, weekly and season loops that bring sportsbook players back.";
const SITE = "https://noclipgaming.space";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { name: "theme-color", content: "#07080c" },
      { property: "og:title", content: "Fullcourt by noclip gaming" },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { property: "og:url", content: `${SITE}/` },
      { property: "og:image", content: `${SITE}/og-image.jpg` },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:image:alt", content: "A Fullcourt match in a 3D arena" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Fullcourt by noclip gaming" },
      { name: "twitter:description", content: DESCRIPTION },
      { name: "twitter:image", content: `${SITE}/og-image.jpg` },
    ],
    links: [
      { rel: "canonical", href: `${SITE}/` },
      { rel: "preload", as: "font", type: "font/woff2", href: barlow900, crossOrigin: "anonymous" },
      { rel: "preload", as: "font", type: "font/woff2", href: rubik400, crossOrigin: "anonymous" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "VideoGame",
          name: "Fullcourt",
          description: DESCRIPTION,
          url: `${SITE}/`,
          image: `${SITE}/og-image.jpg`,
          genre: ["Sports", "Management"],
          publisher: { "@type": "Organization", name: "noclip gaming", url: SITE },
        }),
      },
    ],
  }),
  component: Index,
});

const REVEAL =
  ".sectionhead, .sidehead, .plate, .flagship, .others, .recognise, .steps > li, .slip, .favs, .tiles, .losing, .wlgrid, .depth, .proofs, .valuelist, .pilotcols, .fit, .rec, .demo, .trust, .flow";

function Index() {
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const content = contentRef.current;
    const root = content?.querySelector<HTMLElement>(".ng");
    if (!content || !root) return;
    root.classList.add("js");
    const cleanups: Array<() => void> = [];

    // Section menu: close on Escape, outside click, link click or resize.
    const menus = () => Array.from(content.querySelectorAll<HTMLDetailsElement>(".mobilenav"));
    const close = (restoreFocus = false) => {
      for (const menu of menus()) {
        if (!menu.open) continue;
        menu.open = false;
        if (restoreFocus) menu.querySelector("summary")?.focus();
      }
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") close(true);
    };
    const onClick = (event: MouseEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) return;
      const anchor = target.closest<HTMLAnchorElement>("a");
      if (anchor?.closest(".mobilenav")) {
        close();
        if (anchor.hash) {
          const section = content.querySelector<HTMLElement>(anchor.hash);
          section?.setAttribute("tabindex", "-1");
          section?.focus({ preventScroll: true });
        }
      } else if (!target.closest(".mobilenav")) {
        close();
      }
    };
    const onResize = () => close();
    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("click", onClick);
    window.addEventListener("resize", onResize);
    cleanups.push(() => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("click", onClick);
      window.removeEventListener("resize", onResize);
    });

    // Live demo: on a wide screen the button loads the game into the phone frame.
    // On a phone (or without script) the link opens the demo full screen in a new tab.
    const demo = content.querySelector<HTMLElement>("[data-demo]");
    const start = demo?.querySelector<HTMLAnchorElement>("[data-demo-start]");
    const onStart = (event: MouseEvent) => {
      if (!demo || !start || !window.matchMedia("(min-width: 900px)").matches) return;
      event.preventDefault();
      const screen = demo.querySelector(".demoscreen");
      if (!screen || screen.querySelector("iframe")) return;
      const frame = document.createElement("iframe");
      frame.src = GAMES.fullcourt.demo;
      frame.title = "Fullcourt demo, playing on demo funds";
      frame.allow = "autoplay; fullscreen";
      frame.setAttribute("allowfullscreen", "");
      screen.querySelector(".demoposter")?.replaceWith(frame);
      demo.classList.add("is-live");
      frame.focus();
    };
    start?.addEventListener("click", onStart);
    cleanups.push(() => start?.removeEventListener("click", onStart));

    // Stake selector in the depth block.
    const stake = content.querySelector<HTMLElement>("[data-stake]");
    const note = stake?.querySelector<HTMLElement>(".stakenote");
    const chips = Array.from(stake?.querySelectorAll<HTMLButtonElement>("button") ?? []);
    const pick = (chip: HTMLButtonElement) => {
      for (const c of chips) c.setAttribute("aria-pressed", String(c === chip));
      if (note) note.textContent = chip.dataset.note ?? "";
      stake?.setAttribute("data-level", chips.indexOf(chip) >= 3 ? "high" : "low");
    };
    const onChip = (event: Event) => {
      const chip = (event.target as Element).closest<HTMLButtonElement>("button");
      if (chip) pick(chip);
    };
    stake?.addEventListener("click", onChip);
    cleanups.push(() => stake?.removeEventListener("click", onChip));

    // Entrances once per section, and the ribbons pause when off screen.
    if ("IntersectionObserver" in window) {
      const targets = Array.from(content.querySelectorAll<HTMLElement>(REVEAL));
      for (const t of targets) t.setAttribute("data-reveal", "");
      const io = new IntersectionObserver(
        (entries) => {
          for (const e of entries) {
            if (!e.isIntersecting) continue;
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        },
        { rootMargin: "0px 0px -10% 0px" },
      );
      for (const t of targets) io.observe(t);
      const ribbons = Array.from(content.querySelectorAll<HTMLElement>(".led, .clubs"));
      const ribbonIo = new IntersectionObserver((entries) => {
        for (const e of entries) e.target.classList.toggle("paused", !e.isIntersecting);
      });
      for (const r of ribbons) ribbonIo.observe(r);
      cleanups.push(() => {
        io.disconnect();
        ribbonIo.disconnect();
      });
    }

    return () => {
      for (const fn of cleanups) fn();
    };
  }, []);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: FONTS + studioCss }} />
      <div ref={contentRef} dangerouslySetInnerHTML={{ __html: studioHtml }} />
    </>
  );
}
