import { getListing } from "@/lib/catalog";
import { readState, writeState } from "@/lib/store";

export interface CartViewLine {
  listingId: string;
  title: string;
  unitPriceCents: number;
  quantity: number;
  lineTotalCents: number;
  addedAt?: string;
}

export interface CartView {
  lines: CartViewLine[];
  itemCount: number;
  subtotalCents: number;
}

export type AddToCartResult =
  | { ok: true; itemCount: number }
  | { ok: false; code: "not_found" | "sold_out" };

export function addToCart(listingId: string): AddToCartResult {
  const listing = getListing(listingId);
  if (!listing) {
    return { ok: false, code: "not_found" };
  }
  if (listing.soldOut) {
    return { ok: false, code: "sold_out" };
  }

  const state = readState();
  // Each add is recorded with its own time, so the cart can show when every item was added.
  state.cart.push({ listingId, quantity: 1, addedAt: new Date().toISOString() });
  writeState(state);
  return { ok: true, itemCount: cartItemCount() };
}

export function cartItemCount(): number {
  return readState().cart.reduce((count, line) => count + line.quantity, 0);
}

export function getCartView(): CartView {
  const state = readState();
  const lines: CartViewLine[] = [];
  for (const line of state.cart) {
    const listing = getListing(line.listingId);
    if (!listing) {
      continue;
    }
    lines.push({
      listingId: listing.id,
      title: listing.title,
      unitPriceCents: listing.priceCents,
      quantity: line.quantity,
      lineTotalCents: listing.priceCents * line.quantity,
      addedAt: line.addedAt,
    });
  }
  return {
    lines,
    itemCount: lines.reduce((count, line) => count + line.quantity, 0),
    subtotalCents: lines.reduce((total, line) => total + line.lineTotalCents, 0),
  };
}

// "just now", "5 minutes ago", "2 hours ago", "3 days ago".
export function formatAddedAgo(addedAt: string, now: Date = new Date()): string {
  const minutes = Math.floor((now.getTime() - new Date(addedAt).getTime()) / 60_000);
  if (minutes < 1) return "just now";
  if (minutes < 60) return `${minutes} minute${minutes === 1 ? "" : "s"} ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} hour${hours === 1 ? "" : "s"} ago`;
  const days = Math.floor(hours / 24);
  return `${days} day${days === 1 ? "" : "s"} ago`;
}
