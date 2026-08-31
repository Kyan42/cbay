export interface Listing {
  id: string;
  title: string;
  priceCents: number;
  seller: string;
  condition: string;
  emoji: string;
  soldOut: boolean;
}

export const CATALOG: Listing[] = [
  {
    id: "l1",
    title: "Vintage Brass Diving Helmet",
    priceCents: 24999,
    seller: "deep-sea-dan",
    condition: "Used — Good",
    emoji: "🤿",
    soldOut: false,
  },
  {
    id: "l2",
    title: "Ship in a Bottle (Genuine Bottle)",
    priceCents: 3450,
    seller: "bottledwonders",
    condition: "New",
    emoji: "⛵",
    soldOut: false,
  },
  {
    id: "l3",
    title: "Kraken Plush, Six Feet",
    priceCents: 8900,
    seller: "plushiepirate",
    condition: "New with tags",
    emoji: "🐙",
    soldOut: false,
  },
  {
    id: "l4",
    title: "Antique Sextant",
    priceCents: 12000,
    seller: "navigator-nell",
    condition: "Used — Fair",
    emoji: "🧭",
    soldOut: false,
  },
  {
    id: "l5",
    title: "Message in a Bottle (Unread)",
    priceCents: 1500,
    seller: "bottledwonders",
    condition: "Sealed",
    emoji: "📜",
    soldOut: false,
  },
  {
    id: "l6",
    title: "Pirate Chest (Key Lost)",
    priceCents: 7525,
    seller: "plunder-pete",
    condition: "Used — Locked",
    emoji: "🏴‍☠️",
    soldOut: true,
  },
  {
    id: "l7",
    title: "Taxidermy Swordfish",
    priceCents: 31000,
    seller: "captain-quint",
    condition: "Used — Dramatic",
    emoji: "🐟",
    soldOut: false,
  },
  {
    id: "l8",
    title: "Lighthouse Lamp Lens",
    priceCents: 19999,
    seller: "keeper-kate",
    condition: "Used — Still Bright",
    emoji: "💡",
    soldOut: false,
  },
];

export function getListing(id: string): Listing | undefined {
  return CATALOG.find((listing) => listing.id === id);
}

export function formatPrice(cents: number): string {
  const dollars = cents / 100;
  return `$${dollars.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}
