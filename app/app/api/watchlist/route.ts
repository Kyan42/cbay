import { NextResponse } from "next/server";

import { getListing } from "@/lib/catalog";
import { toggleWatchlist } from "@/lib/store";

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

  if (!getListing(listingId)) {
    return NextResponse.json({ error: "Listing not found." }, { status: 404 });
  }

  return NextResponse.json(toggleWatchlist(listingId));
}
