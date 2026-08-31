import Link from "next/link";

import { getWatchlistCount } from "@/lib/store";

export function Header() {
  const watchlistCount = getWatchlistCount();
  return (
    <header className="site-header">
      <div className="container site-header-inner">
        <Link href="/" className="logo" data-testid="header-logo">
          <span className="logo-c">c</span>
          <span className="logo-b">B</span>
          <span className="logo-a">a</span>
          <span className="logo-y">y</span>
        </Link>
        <div className="watchlist-pill" title="Watchlisted items">
          <span aria-hidden>♥</span>
          <span data-testid="watchlist-count">{watchlistCount}</span>
        </div>
      </div>
    </header>
  );
}
