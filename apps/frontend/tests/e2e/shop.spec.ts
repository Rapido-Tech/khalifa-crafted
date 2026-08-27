import { test, expect } from "@playwright/test";

test.describe("Shop", () => {
  test("loads products from API", async ({ page }) => {
    await page.goto("/shop");
    await expect(page.locator(".product-item").first()).toBeVisible({ timeout: 15_000 });
    await expect(page.locator(".product-item")).toHaveCount(2);
  });

  test("each product card has a name, price, and Add to Cart button", async ({ page }) => {
    await page.goto("/shop");
    const firstCard = page.locator(".product-item").first();
    await expect(firstCard).toBeVisible({ timeout: 15_000 });

    await expect(firstCard.locator("h3")).toContainText("Leather Belt");
    await expect(firstCard.getByRole("button", { name: /add to cart/i })).toBeVisible();
  });

  test("clicking a product navigates to its detail page", async ({ page }) => {
    await page.goto("/shop");
    const firstCard = page.locator(".product-item").first();
    await expect(firstCard).toBeVisible({ timeout: 15_000 });

    await firstCard.locator("h3").click();
    await expect(page).toHaveURL(/\/product\//);
    await expect(page.getByRole("link", { name: /back to shop/i })).toBeVisible();
  });

  test("category filter narrows results", async ({ page }) => {
    await page.goto("/shop");
    await expect(page.locator(".product-item").first()).toBeVisible({ timeout: 15_000 });

    await expect(page.locator(".product-item")).toHaveCount(2);

    await page.getByLabel("Belts").check();
    await expect(page.locator(".product-item")).toHaveCount(1);
    await expect(page.locator(".product-item").first().locator("h3")).toContainText("Leather Belt");
  });
});
