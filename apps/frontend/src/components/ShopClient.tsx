"use client";

import { useState, useMemo, ChangeEvent } from "react";
import { ChevronLeft } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import type { Product } from "@khalifa/types";
import ListProductItem from "@/components/ListProductItem";

const CATEGORY_OPTIONS = [
  "Belts",
  "Wallets",
  "Bags",
  "Clothes",
  "Watch Straps",
  "Umbrellas",
];

type SortKey = "name" | "price-low" | "price-high";

interface ShopClientProps {
  products: Product[];
}

export default function ShopClient({ products }: ShopClientProps) {
  const [showFilter, setShowFilter] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<SortKey>("name");

  const toggleCategory = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSelectedCategories((prev) =>
      prev.includes(value) ? prev.filter((c) => c !== value) : [...prev, value]
    );
  };

  const filtered = useMemo(() => {
    let result = [...products];

    if (selectedCategories.length > 0) {
      result = result.filter((p) => {
        const catName =
          typeof p.category === "string" ? p.category : p.category?.name;
        return catName && selectedCategories.includes(catName);
      });
    }

    switch (sortBy) {
      case "price-low":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        result.sort((a, b) => b.price - a.price);
        break;
      default:
        result.sort((a, b) => a.name.localeCompare(b.name));
    }

    return result;
  }, [products, selectedCategories, sortBy]);

  return (
    <div className="flex flex-col gap-1 pt-10 sm:flex-row sm:gap-10 container mx-auto px-4 border-b pb-8 border-amber-600">
      {/* Filters */}
      <div className="min-w-60">
        <p
          onClick={() => setShowFilter((v) => !v)}
          className="flex items-center gap-2 my-2 text-xl cursor-pointer"
        >
          FILTERS
          <ChevronLeft
            className={`h-6 w-6 sm:hidden transition-transform ${showFilter ? "-rotate-90" : ""}`}
          />
        </p>

        <div
          className={`border border-gray-300 pl-5 py-3 mt-6 ${showFilter ? "" : "hidden"} sm:block`}
        >
          <p className="mb-3 text-sm font-medium">CATEGORIES</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            {CATEGORY_OPTIONS.map((cat) => (
              <label key={cat} className="flex gap-2 cursor-pointer">
                <input
                  className="w-3"
                  type="checkbox"
                  value={cat}
                  onChange={toggleCategory}
                  checked={selectedCategories.includes(cat)}
                />
                {cat}
              </label>
            ))}
          </div>
        </div>

        <button
          className={`px-4 py-2 mt-1 text-white bg-black rounded hover:bg-gray-900 ${showFilter ? "block" : "hidden"} sm:block`}
          onClick={() => setSelectedCategories([])}
        >
          Clear Filters
        </button>
      </div>

      {/* Product grid */}
      <div className="flex-1">
        <div className="flex justify-between mb-4 text-base sm:text-2xl">
          <h1 className="text-3xl font-bold text-amber-900 font-neoteric">
            Products
            {filtered.length !== products.length && (
              <span className="text-base font-normal text-gray-500 ml-2">
                ({filtered.length} of {products.length})
              </span>
            )}
          </h1>
          <Select
            value={sortBy}
            onValueChange={(v) => setSortBy(v as SortKey)}
          >
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="name">Name A–Z</SelectItem>
              <SelectItem value="price-low">Price: Low to High</SelectItem>
              <SelectItem value="price-high">Price: High to Low</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {filtered.length === 0 ? (
          <p className="text-gray-500 py-12 text-center">
            No products match the selected filters.
          </p>
        ) : (
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 gap-y-6">
            {filtered.map((product) => (
              <Card
                key={product._id}
                className="overflow-hidden hover:shadow-lg rounded-none py-0 transition-shadow duration-300 border-amber-600"
              >
                <ListProductItem item={product} />
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
