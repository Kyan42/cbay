import { notFound } from "next/navigation";

import { AddToCartButton } from "@/components/AddToCartButton";
import { BuyItNowButton } from "@/components/BuyItNowButton";
import { WatchlistToggle } from "@/components/WatchlistToggle";
import { formatPrice, getListing } from "@/lib/catalog";
import { isWatched } from "@/lib/store";

export default async function ListingPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const listing = getListing(id);
  if (!listing) {
    notFound();
  }

  return (
    <article className="listing-detail">
      <div className="listing-photo" aria-hidden>
        {listing.emoji}
      </div>
      <div className="listing-info">
        <h1 data-testid="listing-title">{listing.title}</h1>
        <p className="listing-price" data-testid="listing-price">
          {formatPrice(listing.priceCents)}
        </p>
        <dl className="listing-meta">
          <div>
            <dt>Seller</dt>
            <dd data-testid="listing-seller">{listing.seller}</dd>
          </div>
          <div>
            <dt>Condition</dt>
            <dd data-testid="listing-condition">{listing.condition}</dd>
          </div>
          <div>
            <dt>Availability</dt>
            <dd data-testid="listing-stock">{listing.soldOut ? "Sold out" : "In stock"}</dd>
          </div>
        </dl>
        <div className="listing-actions">
          <BuyItNowButton listingId={listing.id} soldOut={listing.soldOut} />
          <AddToCartButton listingId={listing.id} />
          <WatchlistToggle listingId={listing.id} watched={isWatched(listing.id)} />
        </div>
      </div>
    </article>
  );
}
