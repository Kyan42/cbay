import Link from "next/link";
import { notFound } from "next/navigation";

import { formatPrice } from "@/lib/catalog";
import { getOrder } from "@/lib/store";

export default async function OrderPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const order = getOrder(id);
  if (!order) {
    notFound();
  }

  return (
    <div className="order-page">
      <p className="order-banner" data-testid="order-confirmation">
        Order confirmed — the treasure is yours!
      </p>
      <dl className="order-details">
        <div>
          <dt>Item</dt>
          <dd data-testid="order-title">{order.title}</dd>
        </div>
        <div>
          <dt>Total</dt>
          <dd data-testid="order-total">{formatPrice(order.totalCents)}</dd>
        </div>
      </dl>
      <Link href="/" className="back-link">
        Back to the docks
      </Link>
    </div>
  );
}
