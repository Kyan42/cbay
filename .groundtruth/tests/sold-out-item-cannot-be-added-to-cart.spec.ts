/**
 * @groundtruth
 * title:   Sold-out item cannot be added to cart
 * claims:  An inline "no longer available" message is shown on the listing page · The sold-out item is not present in the cart
 * pages:   /listings/l6, /cart
 * from:    Kyan42/cbay#2 "Add a shopping cart" at 067a040, approved by @Kyan42, 2026-09-26
 * data:    resets the app's data first
 *
 * Compiled from a verified Groundtruth run. Checks are soft (a failed check is recorded and the journey
 * continues); actions are hard (if one can't be done, the rest of the journey isn't reached).
 */
import { check, expect, test } from "../support/groundtruth";

test("Sold-out item cannot be added to cart", async ({ page, resetApp }) => {
  await resetApp();
  await page.goto("/listings/l6");
  await page.getByTestId("add-to-cart").click();
  await check(page, "k9 · c3 · visible", page.getByText("This item is no longer available."),
    () => expect.soft(page.getByText("This item is no longer available."), "c3: visible").toBeVisible());
  await page.goto("/cart");
  await check(page, "k10 · c4 · hidden", page.getByText("Pirate Chest (Key Lost)"),
    () => expect.soft(page.getByText("Pirate Chest (Key Lost)"), "c4: hidden").toBeHidden());
  await check(page, "k11 · c4 · visible", page.getByText("Your cart is empty"),
    () => expect.soft(page.getByText("Your cart is empty"), "c4: visible").toBeVisible());
});
