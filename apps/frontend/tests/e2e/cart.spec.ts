import { test, expect } from "@playwright/test";

test.describe("Cart", () => {
  test("cart page renders with YOUR CART heading when empty", async ({ page }) => {
    await page.goto("/cart");
    await expect(page.getByText("YOUR").first()).toBeVisible();
    await expect(page.getByText("CART").first()).toBeVisible();
  });

  test("adding a product from shop appears in cart", async ({ page }) => {
    await page.goto("/shop");
    const firstCard = page.locator(".product-item").first();
    await expect(firstCard).toBeVisible({ timeout: 15_000 });

    await firstCard.getByRole("button", { name: /add to cart/i }).click();

    await page.goto("/cart");
    await expect(page.getByText("Leather Belt")).toBeVisible();
  });

  test("cart count in header increments after adding item", async ({ page }) => {
    await page.goto("/shop");
    const firstCard = page.locator(".product-item").first();
    await expect(firstCard).toBeVisible({ timeout: 15_000 });

    await firstCard.getByRole("button", { name: /add to cart/i }).click();

    const cartBadge = page.locator("header").getByText(/^\d+$/);
    await expect(cartBadge).toBeVisible();
    expect(Number(await cartBadge.innerText())).toBeGreaterThan(0);
  });

  test("removing an item from cart clears the list", async ({ page }) => {
    await page.goto("/shop");
    await expect(page.locator(".product-item").first()).toBeVisible({ timeout: 15_000 });
    await page.locator(".product-item").first().getByRole("button", { name: /add to cart/i }).click();

    await page.goto("/cart");
    await expect(page.getByText("Leather Belt")).toBeVisible();

    // Trash icon button — first button with an SVG child in the cart row
    await page.getByRole("button").filter({ has: page.locator("svg") }).first().click();
    await expect(page.getByText("Leather Belt")).not.toBeVisible({ timeout: 3_000 });
  });
});
