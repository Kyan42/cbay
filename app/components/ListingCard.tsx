import Link from "next/link";

import { formatPrice, type Listing } from "@/lib/catalog";

export function ListingCard({ listing }: { listing: Listing }) {
  return (
    <Link
      href={`/listings/${listing.id}`}
      className="listing-card"
      data-testid={`listing-card-${listing.id}`}
    >
      <div className="listing-card-photo" aria-hidden>
        {listing.emoji}
      </div>
      <div className="listing-card-body">
        <span className="listing-card-title" data-testid="listing-card-title">
          {listing.title}
        </span>
        <span className="listing-card-price" data-testid="listing-card-price">
          {formatPrice(listing.priceCents)}
        </span>
        {listing.soldOut ? <span className="sold-out-badge">Sold out</span> : null}
      </div>
    </Link>
  );
}
