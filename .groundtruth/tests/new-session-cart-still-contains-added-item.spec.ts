/**
 * @groundtruth
 * title:   New session: cart still contains added item
 * claims:  The cart still contains the previously added item
 * pages:   /listings/l2, /cart
 * from:    Kyan42/cbay#2 "Add a shopping cart" at 067a040, approved by @Kyan42, 2026-09-26
 * data:    resets the app's data first
 *
 * Compiled from a verified Groundtruth run. Checks are soft (a failed check is recorded and the journey
 * continues); actions are hard (if one can't be done, the rest of the journey isn't reached).
 */
import { check, expect, test } from "../support/groundtruth";

// Each journey after the first starts from the data the one before it leaves, so they run in order.
test.describe.serial("New session: cart still contains added item", () => {
  test("Add item to cart for persistence check", async ({ page, resetApp }) => {
    await resetApp();
    await page.goto("/listings/l2");
    await page.getByTestId("add-to-cart").click();
    await check(page, "k12 · c5 · contains text \"1\"", page.getByTestId("cart-link"),
      () => expect.soft(page.getByTestId("cart-link"), "c5: contains text \"1\"").toContainText("1"));
  });

  test("New session: cart still contains added item", async ({ page }) => {
    await page.goto("/cart");
    await check(page, "k13 · c5 · contains text \"Ship in a Bottle (Genuine Bottle)\"", page.getByTestId("cart-line-l2"),
      () => expect.soft(page.getByTestId("cart-line-l2"), "c5: contains text \"Ship in a Bottle (Genuine Bottle)\"").toContainText("Ship in a Bottle (Genuine Bottle)"));
    await check(page, "k14 · c5 · contains text \"1\"", page.getByTestId("cart-link"),
      () => expect.soft(page.getByTestId("cart-link"), "c5: contains text \"1\"").toContainText("1"));
  });
});
