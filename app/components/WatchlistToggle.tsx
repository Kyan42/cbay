"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export function WatchlistToggle({ listingId, watched }: { listingId: string; watched: boolean }) {
  const router = useRouter();
  const [pending, setPending] = useState(false);

  async function toggle() {
    setPending(true);
    try {
      const response = await fetch("/api/watchlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ listingId }),
      });
      if (response.ok) {
        router.refresh();
      }
    } finally {
      setPending(false);
    }
  }

  return (
    <button
      type="button"
      className={watched ? "watch-button watched" : "watch-button"}
      data-testid="watchlist-toggle"
      disabled={pending}
      onClick={toggle}
    >
      {watched ? "♥ Watching" : "♡ Watch"}
    </button>
  );
}
