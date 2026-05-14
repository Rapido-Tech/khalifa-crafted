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
    <section>
      <div className="container mx-auto px-4 border-b pb-10 border-amber-600">
        <div className="flex items-center justify-between">
          <h2 className="text-xl md:text-4xl font-extrabold font-neoteric tracking-wider text-center py-8 cursor-default">
            Featured Products
          </h2>
          <Link href="/shop">
            <Button
              variant="outline"
              className="border-amber-600 font-bold bg-amber-500 border text-white rounded-none hover:border-amber-200 hover:bg-amber-600 cursor-pointer md:py-5! md:px-10!"
            >
              View All <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>

        <div className="relative">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => scroll("left")}
            className="hidden md:block absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-amber-500 shadow-lg hover:bg-amber-600 border text-white hover:text-white rounded-none"
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => scroll("right")}
            className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-amber-500 shadow-lg hover:bg-amber-600 border text-white hover:text-white rounded-none"
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
                  className="shrink-0 w-72 overflow-hidden hover:shadow-lg transition-shadow duration-300 border-amber-600 rounded-none py-0"
                >
                  <div className="relative group h-48">
                    <Link href={`/product/${product._id}`}>
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
                      className="absolute top-2 right-2 bg-green-500 hover:bg-green-600 text-white p-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      title="Order via WhatsApp"
                    >
                      <MessageCircle className="h-4 w-4" />
                    </button>
                  </div>
                  <CardContent className="p-4">
                    <Link href={`/product/${product._id}`}>
                      <h3 className="text-lg font-semibold mb-2 text-amber-900 hover:text-amber-700 cursor-pointer line-clamp-2 font-neoteric tracking-wider">
                        {product.name}
                      </h3>
                    </Link>
                    <p className="text-xl font-bold text-amber-800 mb-3">
                      {formatCurrency(product.price)}
                    </p>
                    <div className="flex flex-col gap-2">
                      <Button
                        className="border-amber-600 font-bold bg-amber-500 border text-white rounded-none hover:border-amber-200 hover:bg-amber-600 cursor-pointer py-5! px-10!"
                        onClick={() => dispatch(addItem(product))}
                      >
                        <ShoppingCart className="mr-2 h-4 w-4" />
                        Add to Cart
                      </Button>
                      <Button
                        variant="outline"
                        className="w-full border-green-500 text-green-600 hover:bg-green-50 bg-transparent rounded-none"
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
