import fs from "node:fs";
import path from "node:path";

const statePath = path.join(process.cwd(), "data", "state.json");
const reset = process.argv.includes("--reset");

const initialState = { watchlist: [], orders: [], nextOrderNumber: 1 };

if (reset || !fs.existsSync(statePath)) {
  fs.mkdirSync(path.dirname(statePath), { recursive: true });
  fs.writeFileSync(statePath, `${JSON.stringify(initialState, null, 2)}\n`, "utf8");
  console.log(`Seeded pristine state at ${statePath}`);
} else {
  console.log(`State already exists at ${statePath}; pass --reset to overwrite.`);
}
