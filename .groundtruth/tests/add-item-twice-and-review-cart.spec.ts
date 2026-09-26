/**
 * @groundtruth
 * title:   Add item twice and review cart
 * claims:  The header cart count badge updates immediately to reflect the added item · The item appears as a single line with quantity 2, not two separate lines · A subtotal for the cart is shown · The cart page loads at /cart
 * pages:   /listings/l1, /cart
 * from:    Kyan42/cbay#2 "Add a shopping cart" at 067a040, approved by @Kyan42, 2026-09-26
 * data:    resets the app's data first
 *
 * Compiled from a verified Groundtruth run. Checks are soft (a failed check is recorded and the journey
 * continues); actions are hard (if one can't be done, the rest of the journey isn't reached).
 */
import { check, expect, test } from "../support/groundtruth";

test("Add item twice and review cart", async ({ page, resetApp }) => {
  await resetApp();
  await page.goto("/listings/l1");
  await check(page, "k2 · c1 · contains text \"0\"", page.getByTestId("cart-link"),
    () => expect.soft(page.getByTestId("cart-link"), "c1: contains text \"0\"").toContainText("0"));
  await page.getByTestId("add-to-cart").click();
  await check(page, "k3 · c1 · contains text \"1\"", page.getByTestId("cart-link"),
    () => expect.soft(page.getByTestId("cart-link"), "c1: contains text \"1\"").toContainText("1"));
  await page.getByTestId("add-to-cart").click();
  await page.goto("/cart");
  await check(page, "k4 · c2 · count \"1\"", page.getByRole("list").getByRole("listitem"),
    () => expect.soft(page.getByRole("list").getByRole("listitem"), "c2: count \"1\"").toHaveCount(1));
  await check(page, "k5 · c2 · contains text \"Qty 2\"", page.getByTestId("cart-line-l1"),
    () => expect.soft(page.getByTestId("cart-line-l1"), "c2: contains text \"Qty 2\"").toContainText("Qty 2"));
  await check(page, "k6 · c6 · contains text \"Subtotal: $499.98\"", page.getByText("Subtotal: $"),
    () => expect.soft(page.getByText("Subtotal: $"), "c6: contains text \"Subtotal: $499.98\"").toContainText("Subtotal: $499.98"));
  await check(page, "k7 · c7 · url \"/cart\"", null,
    () => expect.soft(page, "c7: url \"/cart\"").toHaveURL((u) => u.pathname + u.search === "/cart"));
  await check(page, "k8 · c7 · visible", page.getByRole("heading", { name: "Your cart" }),
    () => expect.soft(page.getByRole("heading", { name: "Your cart" }), "c7: visible").toBeVisible());
});
