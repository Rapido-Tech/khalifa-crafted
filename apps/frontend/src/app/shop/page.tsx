import type { Metadata } from "next";
import { getProducts } from "@/lib/api";
import ShopClient from "@/components/ShopClient";

export const metadata: Metadata = {
  title: "Shop",
  description:
    "Browse our full collection of handcrafted leather goods — belts, wallets, bags, watch straps, and more.",
};

export default async function ShopPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const products = await getProducts();
  const { category } = await searchParams;

  return <ShopClient products={products} initialCategory={category} />;
}
