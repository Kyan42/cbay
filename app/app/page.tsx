import { CATALOG } from "@/lib/catalog";
import { ListingCard } from "@/components/ListingCard";

export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;
  const query = (q ?? "").trim().toLowerCase();
  const listings = query
    ? CATALOG.filter((listing) => listing.title.toLowerCase().includes(query))
    : CATALOG;

  return (
    <>
      <form className="search-bar" action="/" method="get">
        <input
          type="text"
          name="q"
          placeholder="Search for treasure…"
          defaultValue={q ?? ""}
          data-testid="search-input"
        />
        <button type="submit" data-testid="search-submit">
          Search
        </button>
      </form>
      {listings.length === 0 ? (
        <p className="empty-note" data-testid="search-empty">
          No treasures match “{q}”.
        </p>
      ) : (
        <div className="listing-grid">
          {listings.map((listing) => (
            <ListingCard key={listing.id} listing={listing} />
          ))}
        </div>
      )}
    </>
  );
}
