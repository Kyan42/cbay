# cBay

A deliberately small, deterministic eBay-style marketplace used as a Groundtruth target app.
Buyers can search seeded listings, view a listing, buy it now, and watchlist items.

The app is built to be verified by browser agents, so determinism is a hard requirement:

- All catalog data is seeded and fixed. No randomness, no clocks, no relative timestamps
  anywhere near rendered output.
- Mutable state (orders, watchlist) lives in `app/data/state.json`, written by the seed
  script and read/written by API routes. `npm run seed -- --reset` restores a pristine state.
- Order ids are deterministic (`order-1`, `order-2`, ...).
- Prices are integer cents formatted with a pinned `en-US` locale.

## Setup

Requires Node.js 22 or newer.

```powershell
cd app
npm install
npm run seed -- --reset
npm run dev
```

The app serves on port 3000. Health check: `GET /api/health`.

## Test-id contract

Every element a Groundtruth mission may assert on carries a stable `data-testid`. These names
are a frozen API: renaming one is a breaking change to the test contract, not a markup tweak.

| Test id | Where | Meaning |
| --- | --- | --- |
| `header-logo` | Header | cBay wordmark, links home |
| `watchlist-count` | Header | Number of watchlisted items |
| `search-input` | Home | Search text input |
| `search-submit` | Home | Search submit button |
| `listing-card-<id>` | Home | One listing card (link to detail) |
| `listing-card-title` | Home | Title inside a card |
| `listing-card-price` | Home | Price inside a card |
| `listing-title` | Listing detail | Listing title |
| `listing-price` | Listing detail | Listing price |
| `listing-seller` | Listing detail | Seller handle |
| `listing-condition` | Listing detail | Condition line |
| `listing-stock` | Listing detail | `In stock` or `Sold out` |
| `buy-it-now` | Listing detail | Buy It Now button (disabled when sold out) |
| `buy-error` | Listing detail | Inline error when a purchase is rejected |
| `watchlist-toggle` | Listing detail | Watch / unwatch button |
| `order-confirmation` | Order page | Confirmation banner |
| `order-title` | Order page | Purchased listing title |
| `order-total` | Order page | Order total |
| `cart-link` | Header | Link to the cart page |
| `cart-badge` | Header | Total quantity of items in the cart |
| `add-to-cart` | Listing detail | Add to cart button (always enabled) |
| `add-error` | Listing detail | Inline error when adding to cart is rejected |
| `cart-empty` | Cart page | Empty-cart note |
| `cart-line-<id>` | Cart page | One cart line |
| `cart-line-title` | Cart page | Title inside a cart line |
| `qty` | Cart page | Quantity inside a cart line |
| `subtotal` | Cart page | Cart subtotal |

## Seeded catalog

Eight listings with fixed ids, prices, and sellers. `l6` is seeded sold out.

| id | Title | Price | Seller | Stock |
| --- | --- | --- | --- | --- |
| l1 | Vintage Brass Diving Helmet | $249.99 | deep-sea-dan | in stock |
| l2 | Ship in a Bottle (Genuine Bottle) | $34.50 | bottledwonders | in stock |
| l3 | Kraken Plush, Six Feet | $89.00 | plushiepirate | in stock |
| l4 | Antique Sextant | $120.00 | navigator-nell | in stock |
| l5 | Message in a Bottle (Unread) | $15.00 | bottledwonders | in stock |
| l6 | Pirate Chest (Key Lost) | $75.25 | plunder-pete | sold out |
| l7 | Taxidermy Swordfish | $310.00 | captain-quint | in stock |
| l8 | Lighthouse Lamp Lens | $199.99 | keeper-kate | in stock |

## API surface

| Method | Path | Behavior |
| --- | --- | --- |
| GET | /api/health | `{ ok: true }` liveness probe |
| POST | /api/orders | Buy It Now. 201 with `orderId`; 404 unknown listing; 409 sold out |
| POST | /api/watchlist | Toggle watch state. 200 with `{ watched, count }`; 404 unknown listing |
| POST | /api/cart | Add one unit to the cart. 201 with `itemCount`; 404 unknown listing; 409 sold out |
| GET | /api/cart | Current cart lines, item count, and subtotal |
