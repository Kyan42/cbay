"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export function BuyItNowButton({ listingId, soldOut }: { listingId: string; soldOut: boolean }) {
  const router = useRouter();
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function buyItNow() {
    setPending(true);
    setError(null);
    try {
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ listingId }),
      });
      const body = await response.json();
      if (!response.ok) {
        setError(typeof body.error === "string" ? body.error : "Purchase failed.");
        return;
      }
      router.push(`/orders/${body.orderId}`);
    } catch {
      setError("Purchase failed.");
    } finally {
      setPending(false);
    }
  }

  return (
    <div className="buy-block">
      <button
        type="button"
        className="buy-button"
        data-testid="buy-it-now"
        disabled={soldOut || pending}
        onClick={buyItNow}
      >
        {soldOut ? "Sold out" : "Buy It Now"}
      </button>
      {error ? (
        <p className="inline-error" data-testid="buy-error">
          {error}
        </p>
      ) : null}
    </div>
  );
}
