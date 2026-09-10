"use client";

import { useState, useMemo } from "react";
import { ChevronLeft } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
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
  initialCategory?: string;
}

export default function ShopClient({ products, initialCategory }: ShopClientProps) {
  const [showFilter, setShowFilter] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    initialCategory && CATEGORY_OPTIONS.includes(initialCategory) ? [initialCategory] : []
  );
  const [sortBy, setSortBy] = useState<SortKey>("name");

  const toggleCategory = (cat: string) => {
    setSelectedCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
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
    <div className="flex flex-col gap-1 pt-10 pb-20 sm:flex-row sm:gap-10 container mx-auto px-4">
      {/* Filters */}
      <div className="min-w-60">
        <p
          onClick={() => setShowFilter((v) => !v)}
          className="flex items-center gap-2 my-2 text-sm uppercase tracking-[0.15em] cursor-pointer sm:cursor-default"
        >
          Filters
          <ChevronLeft
            className={`h-4 w-4 sm:hidden transition-transform ${showFilter ? "-rotate-90" : ""}`}
          />
        </p>

        <div
          className={`border border-border pl-5 pr-4 py-4 mt-6 ${showFilter ? "" : "hidden"} sm:block`}
        >
          <p className="mb-3 text-sm font-medium text-foreground">Categories</p>
          <div className="flex flex-col gap-3 text-sm text-foreground/80">
            {CATEGORY_OPTIONS.map((cat) => (
              <label key={cat} className="flex items-center gap-2 cursor-pointer">
                <Checkbox
                  checked={selectedCategories.includes(cat)}
                  onCheckedChange={() => toggleCategory(cat)}
                />
                {cat}
              </label>
            ))}
          </div>
        </div>

        <Button
          variant="outline"
          size="sm"
          className={`mt-3 ${showFilter ? "block" : "hidden"} sm:inline-flex`}
          onClick={() => setSelectedCategories([])}
        >
          Clear Filters
        </Button>
      </div>

      {/* Product grid */}
      <div className="flex-1">
        <div className="flex justify-between items-baseline mb-8">
          <h1 className="font-marcellus text-2xl md:text-3xl text-foreground">
            Products
            {filtered.length !== products.length && (
              <span className="text-sm font-normal text-muted-foreground ml-2">
                ({filtered.length} of {products.length})
              </span>
            )}
          </h1>
          <Select value={sortBy} onValueChange={(v) => setSortBy(v as SortKey)}>
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
          <p className="text-muted-foreground py-12 text-center">
            No products match the selected filters.
          </p>
        ) : (
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 gap-y-6">
            {filtered.map((product, index) => (
              <Card
                key={product._id}
                className="overflow-hidden hover:shadow-lg py-0 transition-shadow duration-300"
              >
                <ListProductItem item={product} priority={index < 4} />
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
