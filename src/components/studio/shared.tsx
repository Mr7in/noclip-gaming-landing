import { Link } from '@tanstack/react-router';
import { ArrowUpRight, Play, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { BOOKING_URL, GAMES } from '@/lib/studio';

export function StudioLogo({ compact = false }: { compact?: boolean }) {
  return <Link to="/" className="studio-logo" aria-label="Noclip Gaming home"><svg viewBox="0 0 40 40" aria-hidden="true"><path d="M6 8h19v24H6z" className="phase-wall"/><path d="M16 14h18v12H16z" className="phase-through"/><path d="M25 8v24" className="phase-edge"/></svg><span>noclip<span className={compact ? 'wordmark-inline' : ''}>gaming</span></span></Link>;
}
export function GameLogo({ game }: { game: 'backcourt' | 'backcheck' }) {
  return <span className={`game-logo ${game}`}><svg viewBox="0 0 100 100" aria-hidden="true">{game === 'backcourt' ? <><rect width="100" height="100" rx="22" className="brand-fill"/><circle cx="50" cy="40" r="18" className="brand-cut"/><path d="M41 48H59L71 100H29Z" className="brand-cut"/></> : <><path d="M12 8h76v49c0 19-38 37-38 37S12 76 12 57Z" className="brand-fill"/><path d="m27 42 17 17 30-31" className="shield-check"/></>}</svg>{GAMES[game].name}</span>;
}
export function BookingButton() { return <Button asChild className="action action-primary"><a href={BOOKING_URL} target="_blank" rel="noopener">Book a demo <ArrowUpRight /></a></Button>; }
export function DemoButton({ game, label = 'Play the demo' }: { game: 'backcourt' | 'backcheck'; label?: string }) { return <Button asChild variant="outline" className="action action-demo"><a href={GAMES[game].demo} target="_blank" rel="noopener"><Play />{label}<ArrowUpRight /></a></Button>; }
export function SiteNav({ game }: { game?: 'backcheck' }) {
  return <header className="studio-nav"><div className="studio-wrap nav-inner">{game ? <div className="product-brand"><Link to="/backcheck"><GameLogo game="backcheck" /></Link><Link to="/" className="by-studio">by Noclip Gaming</Link></div> : <StudioLogo />}<nav aria-label="Main navigation">{(game ? [['The game','game'],['Retention','retention'],['Integration','integration'],['Trust','trust']] as const : [['Games','games'],['Why retention','retention'],['Integration','integration'],['Trust','trust']] as const).map(([label,id]) => <Link key={id} to={game ? '/backcheck' : '/'} hash={id} className="nav-section">{label}</Link>)}<BookingButton /></nav></div></header>;
}
export function Footer({ game }: { game?: 'backcheck' }) {
  return <footer className="studio-footer"><div className="studio-wrap"><div className="footer-top">{game ? <div><GameLogo game={game}/><Link to="/" className="by-studio">by Noclip Gaming</Link></div> : <StudioLogo compact />}<nav aria-label="Game pages"><Link to="/backcourt">Backcourt <ArrowUpRight /></Link><Link to="/backcheck">Backcheck <ArrowUpRight /></Link></nav></div><div className="footer-bottom"><span>© 2026 noclip OÜ{game ? ' · Noclip Gaming' : ''}</span><span>18+ · Play responsibly. Real-money games for licensed operators.</span></div></div></footer>;
}
export function CrossGame({ game }: { game: 'backcourt' | 'backcheck' }) {
  return <div className={`cross-game ${game}`}><div><span className="section-kicker">Also from Noclip Gaming</span><Link to={game === 'backcourt' ? '/backcourt' : '/backcheck'}><GameLogo game={game}/><ArrowRight /></Link></div><DemoButton game={game}/></div>;
}
export function TrustPanels() {
  return <div className="trust-grid"><article><span className="section-kicker">The maths</span><h3>Strength changes the odds.<br/>Not the house edge.</h3><p>Prices come from simulations of the exact matchup, including the teams and game plan. Odds re-price at every break, with clear margins per market.</p><ul><li>Transparent pricing and published pack odds</li><li>Cash out at match breaks</li><li>An engine built for independent lab certification</li></ul></article><article><span className="section-kicker">The player</span><h3>Progress is earned.<br/>Betting is optional.</h3><p>Every match is playable and rewarding without a stake. Rewards are never tied to wagering by default, and leaderboards rank results, never money.</p><ul><li>No player-to-player trading or item cash out</li><li>Published drop rates and pity timers</li><li>Operator controls for paid features and limits</li></ul></article></div>;
}
export function Integration() {
  return <section id="integration" className="studio-section studio-wrap"><div className="section-heading"><span className="section-kicker">Integration</span><h2>Your lobby.<br/>Your players. Their balance.</h2><p>Launch with the existing player session and casino balance. No new account, no new wallet and no sports data feeds. Fictional leagues keep the game independent of real fixtures.</p></div><div className="integration-flow">{[['Launch','Open from your lobby with the player’s existing session.'],['Play','Build the team, set the plan and choose whether to bet.'],['Settle','Stakes and winnings use the casino balance.'],['Return','Collection and season progress stay with the player.']].map(([title,text]) => <div key={title}><ArrowRight/><h3>{title}</h3><p>{text}</p></div>)}</div><p className="integration-note">Free-play demo mode is available for your lobby and affiliates.</p></section>;
}
