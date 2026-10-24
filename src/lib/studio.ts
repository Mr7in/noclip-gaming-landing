export const BOOKING_URL = 'https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ3A7rvaqZ-fVO2oaZ9vKrMJ2l95s8OJRrVpG70i7G2ethCc_MwxlA0vo976-ABKIEil0Oylvsg7';
export const GAMES = {
  backcourt: { name: 'Backcourt', demo: 'https://basketball-demo.backcourt.fyi/' },
  backcheck: { name: 'Backcheck', demo: 'https://noclip-gaming.vercel.app/backcheck/', clubs: 32, players: 288 },
} as const;
export function pageHead(path: string, title: string, description: string) {
  return {
    meta: [{ title }, { name: 'description', content: description }, { property: 'og:title', content: title }, { property: 'og:description', content: description }, { property: 'og:type', content: 'website' }, { property: 'og:url', content: `https://backcourt.fyi${path}` }, { name: 'twitter:card', content: 'summary_large_image' }, { name: 'twitter:title', content: title }, { name: 'twitter:description', content: description }],
    links: [{ rel: 'canonical', href: `https://backcourt.fyi${path}` }, { rel: 'preconnect', href: 'https://fonts.googleapis.com' }, { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossOrigin: 'anonymous' as const }, { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Archivo:wght@400;500;600;700&family=Big+Shoulders+Display:wght@600;700;800;900&family=Bungee&family=Rubik:wght@400;500;700;800&display=swap' }],
  };
}
