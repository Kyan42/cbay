import { getListing } from "@/lib/catalog";
import { readState, writeState } from "@/lib/store";

export interface CartViewLine {
  listingId: string;
  title: string;
  unitPriceCents: number;
  quantity: number;
  lineTotalCents: number;
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
  const existing = state.cart.find((line) => line.listingId === listingId);
  if (existing) {
    existing.quantity += 1;
  } else {
    state.cart.push({ listingId, quantity: 1 });
  }
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
    });
  }
  return {
    lines,
    itemCount: lines.reduce((count, line) => count + line.quantity, 0),
    subtotalCents: lines.reduce((total, line) => total + line.lineTotalCents, 0),
  };
}
