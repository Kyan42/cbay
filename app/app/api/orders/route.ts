import { NextResponse } from "next/server";

import { getListing } from "@/lib/catalog";
import { createOrder } from "@/lib/store";

export async function POST(request: Request) {
  let listingId: unknown;
  try {
    ({ listingId } = await request.json());
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }
  if (typeof listingId !== "string") {
    return NextResponse.json({ error: "listingId is required." }, { status: 400 });
  }

  const listing = getListing(listingId);
  if (!listing) {
    return NextResponse.json({ error: "Listing not found." }, { status: 404 });
  }
  if (listing.soldOut) {
    return NextResponse.json({ error: "This item is no longer available." }, { status: 409 });
  }

  const order = createOrder(listing.id, listing.title, listing.priceCents);
  return NextResponse.json({ orderId: order.id }, { status: 201 });
}
