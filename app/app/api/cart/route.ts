import { NextResponse } from "next/server";

import { addToCart, getCartView } from "@/lib/cart";

export function GET() {
  return NextResponse.json(getCartView());
}

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

  const result = addToCart(listingId);
  if (!result.ok) {
    if (result.code === "not_found") {
      return NextResponse.json({ error: "Listing not found." }, { status: 404 });
    }
    return NextResponse.json({ error: "This item is no longer available." }, { status: 409 });
  }

  return NextResponse.json({ itemCount: result.itemCount }, { status: 201 });
}
