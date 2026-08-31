import fs from "node:fs";
import path from "node:path";

export interface Order {
  id: string;
  listingId: string;
  title: string;
  totalCents: number;
}

export interface AppState {
  watchlist: string[];
  orders: Order[];
  nextOrderNumber: number;
}

const STATE_PATH = path.join(process.cwd(), "data", "state.json");

export function initialState(): AppState {
  return { watchlist: [], orders: [], nextOrderNumber: 1 };
}

export function readState(): AppState {
  if (!fs.existsSync(STATE_PATH)) {
    writeState(initialState());
  }
  return JSON.parse(fs.readFileSync(STATE_PATH, "utf8")) as AppState;
}

export function writeState(state: AppState): void {
  fs.mkdirSync(path.dirname(STATE_PATH), { recursive: true });
  fs.writeFileSync(STATE_PATH, `${JSON.stringify(state, null, 2)}\n`, "utf8");
}

export function getWatchlistCount(): number {
  return readState().watchlist.length;
}

export function isWatched(listingId: string): boolean {
  return readState().watchlist.includes(listingId);
}

export function toggleWatchlist(listingId: string): { watched: boolean; count: number } {
  const state = readState();
  const watched = state.watchlist.includes(listingId);
  state.watchlist = watched
    ? state.watchlist.filter((id) => id !== listingId)
    : [...state.watchlist, listingId];
  writeState(state);
  return { watched: !watched, count: state.watchlist.length };
}

export function createOrder(listingId: string, title: string, totalCents: number): Order {
  const state = readState();
  const order: Order = {
    id: `order-${state.nextOrderNumber}`,
    listingId,
    title,
    totalCents,
  };
  state.orders.push(order);
  state.nextOrderNumber += 1;
  writeState(state);
  return order;
}

export function getOrder(orderId: string): Order | undefined {
  return readState().orders.find((order) => order.id === orderId);
}
