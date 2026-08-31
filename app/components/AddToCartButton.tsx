"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export function AddToCartButton({ listingId }: { listingId: string }) {
  const router = useRouter();
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function addToCart() {
    setPending(true);
    setError(null);
    try {
      const response = await fetch("/api/cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ listingId }),
      });
      const body = await response.json();
      if (!response.ok) {
        setError(typeof body.error === "string" ? body.error : "Could not add to cart.");
        return;
      }
      router.refresh();
    } catch {
      setError("Could not add to cart.");
    } finally {
      setPending(false);
    }
  }

  return (
    <div className="add-block">
      <button
        type="button"
        className="add-button"
        data-testid="add-to-cart"
        disabled={pending}
        onClick={addToCart}
      >
        Add to cart
      </button>
      {error ? (
        <p className="inline-error" data-testid="add-error">
          {error}
        </p>
      ) : null}
    </div>
  );
}
