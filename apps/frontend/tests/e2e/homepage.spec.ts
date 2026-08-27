import { test, expect } from "@playwright/test";

test.describe("Homepage", () => {
  test("loads with correct title", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveTitle(/Khalifa Crafted/);
  });

  test("shows static category tiles", async ({ page }) => {
    await page.goto("/");
    for (const name of ["Belts", "Wallets", "Bags"]) {
      await expect(page.getByText(name).first()).toBeVisible();
    }
  });

  test("featured products section renders product cards", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator(".product-item").first()).toBeVisible({ timeout: 15_000 });
  });

  test("nav links are present", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("link", { name: /shop/i }).first()).toBeVisible();
    await expect(page.getByRole("link", { name: /cart/i }).first()).toBeVisible();
  });
});
