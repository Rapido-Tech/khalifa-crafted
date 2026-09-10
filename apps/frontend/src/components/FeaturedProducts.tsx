"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import type { Product } from "@khalifa/types";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { formatCurrency } from "@/utils/formatCurrency";
import {
  MessageCircle,
  ShoppingCart,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
} from "lucide-react";
import { addItem } from "@/lib/features/cartSlice";
import { useDispatch } from "react-redux";

const WHATSAPP_NUMBER =
  process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "254123456789";

export function FeaturedProducts({ products }: { products: Product[] }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();

  const scroll = (direction: "left" | "right") => {
    scrollRef.current?.scrollBy({
      left: direction === "left" ? -300 : 300,
      behavior: "smooth",
    });
  };

  const handleWhatsAppOrder = (product: Product) => {
    const message = `Hi! I'm interested in ordering the ${product.name} for ${formatCurrency(product.price)}. Can you provide more details?`;
    window.open(
      `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`,
      "_blank"
    );
  };

  const featured = products.slice(0, 7);

  return (
    <section className="py-16 md:py-24 bg-secondary/40">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-10">
          <div>
            <h2 className="font-marcellus text-3xl md:text-4xl text-foreground cursor-default">
              Featured Products
            </h2>
            <span className="mt-3 block w-12 h-px bg-brand" />
          </div>
          <Link href="/shop">
            <Button variant="outline" className="hidden sm:inline-flex">
              View All <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>

        <div className="relative">
          <Button
            variant="outline"
            size="icon"
            onClick={() => scroll("left")}
            className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-background shadow-md hover:bg-brand hover:text-brand-foreground"
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => scroll("right")}
            className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-background shadow-md hover:bg-brand hover:text-brand-foreground"
          >
            <ChevronRight className="h-5 w-5" />
          </Button>

          <div
            ref={scrollRef}
            className="flex space-x-6 overflow-x-auto pb-4"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {featured.map((product) => {
              const imageUrl =
                product.thumbnail?.url ?? product.images[0]?.url ?? "";

              return (
                <Card
                  key={product._id}
                  className="product-item shrink-0 w-72 overflow-hidden hover:shadow-lg transition-shadow duration-300 py-0"
                >
                  <div className="relative group h-56 bg-muted">
                    <Link
                      href={`/product/${product._id}`}
                      className="relative block h-full w-full"
                    >
                      <Image
                        src={imageUrl}
                        alt={product.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300 cursor-pointer"
                        sizes="288px"
                      />
                    </Link>
                    <button
                      onClick={() => handleWhatsAppOrder(product)}
                      className="absolute top-2 right-2 bg-green-600 hover:bg-green-700 text-white p-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      title="Order via WhatsApp"
                    >
                      <MessageCircle className="h-4 w-4" />
                    </button>
                  </div>
                  <CardContent className="p-5">
                    <Link href={`/product/${product._id}`}>
                      <h3 className="font-marcellus text-lg mb-2 text-foreground hover:text-brand cursor-pointer line-clamp-2">
                        {product.name}
                      </h3>
                    </Link>
                    <p className="text-lg font-semibold text-foreground mb-4">
                      {formatCurrency(product.price)}
                    </p>
                    <div className="flex flex-col gap-2">
                      <Button onClick={() => dispatch(addItem(product))}>
                        <ShoppingCart className="mr-2 h-4 w-4" />
                        Add to Cart
                      </Button>
                      <Button
                        variant="outline"
                        className="w-full border-green-600 text-green-700 hover:bg-green-50"
                        onClick={() => handleWhatsAppOrder(product)}
                      >
                        <MessageCircle className="mr-2 h-4 w-4" />
                        WhatsApp Order
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
