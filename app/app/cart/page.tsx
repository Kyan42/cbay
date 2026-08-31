import Link from "next/link";

import { getCartView } from "@/lib/cart";
import { formatPrice } from "@/lib/catalog";

export default async function CartPage() {
  const cart = getCartView();

  return (
    <div className="cart-page">
      <h1>Your cart</h1>
      {cart.lines.length === 0 ? (
        <p className="empty-note" data-testid="cart-empty">
          Your cart is empty. The sea is full of treasures.
        </p>
      ) : (
        <>
          <ul className="cart-lines">
            {cart.lines.map((line) => (
              <li
                key={line.listingId}
                className="cart-line"
                data-testid={`cart-line-${line.listingId}`}
              >
                <span className="cart-line-title" data-testid="cart-line-title">
                  {line.title}
                </span>
                <span className="cart-line-qty">
                  Qty <span data-testid="qty">{line.quantity}</span>
                </span>
                <span className="cart-line-total">{formatPrice(line.lineTotalCents)}</span>
              </li>
            ))}
          </ul>
          <p className="cart-subtotal">
            Subtotal: <span data-testid="subtotal">{formatPrice(cart.subtotalCents)}</span>
          </p>
        </>
      )}
      <Link href="/" className="back-link">
        Keep browsing
      </Link>
    </div>
  );
}
