"use client";

import Link from "next/link";
import Image from "next/image";
import type { Product } from "@khalifa/types";
import { MessageCircle, ShoppingCart } from "lucide-react";
import { Button } from "./ui/button";
import { useDispatch } from "react-redux";
import { addItem } from "@/lib/features/cartSlice";
import { formatCurrency } from "@/utils/formatCurrency";
import { CardContent } from "./ui/card";

const WHATSAPP_NUMBER =
  process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "254123456789";

const ListProductItem = ({
  item,
  priority = false,
}: {
  item: Product;
  priority?: boolean;
}) => {
  const dispatch = useDispatch();

  const handleWhatsAppOrder = () => {
    const message = `Hi! I'm interested in ordering the ${item.name} for ${formatCurrency(item.price)}. Can you provide more details?`;
    window.open(
      `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`,
      "_blank"
    );
  };

  const imageUrl = item.thumbnail?.url ?? item.images[0]?.url ?? "";

  return (
    <div className="product-item">
      <div className="relative group h-48 bg-muted">
        <Link href={`/product/${item._id}`} className="relative block h-full w-full">
          <Image
            fill
            src={imageUrl}
            alt={item.name}
            priority={priority}
            className="object-cover group-hover:scale-105 transition-transform duration-300 cursor-pointer"
            sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />
        </Link>
        <button
          onClick={handleWhatsAppOrder}
          className="absolute top-2 right-2 bg-green-600 hover:bg-green-700 text-white p-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          title="Order via WhatsApp"
        >
          <MessageCircle className="h-4 w-4" />
        </button>
      </div>
      <CardContent className="p-4">
        <Link href={`/product/${item._id}`}>
          <h3 className="font-marcellus text-base mb-2 text-foreground hover:text-brand cursor-pointer line-clamp-2">
            {item.name}
          </h3>
        </Link>
        <p className="text-lg font-semibold text-foreground mb-3">
          {formatCurrency(item.price)}
        </p>
        <div className="flex flex-col gap-2">
          <Button className="w-full" onClick={() => dispatch(addItem(item))}>
            <ShoppingCart className="mr-2 h-4 w-4" />
            Add to Cart
          </Button>
          <Button
            variant="outline"
            className="w-full border-green-600 text-green-700 hover:bg-green-50"
            onClick={handleWhatsAppOrder}
          >
            <MessageCircle className="mr-2 h-4 w-4" />
            WhatsApp
          </Button>
        </div>
      </CardContent>
    </div>
  );
};

export default ListProductItem;
