"use client";

import { useState } from "react";
import { useDispatch } from "react-redux";
import { Button } from "@/components/ui/button";
import { ShoppingCart, MessageCircle, Minus, Plus } from "lucide-react";
import { addItem } from "@/lib/features/cartSlice";
import { formatCurrency } from "@/utils/formatCurrency";
import type { Product } from "@khalifa/types";

const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "254123456789";

export default function ProductActions({ product }: { product: Product }) {
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      dispatch(addItem(product));
    }
  };

  const handleWhatsAppOrder = () => {
    const message = `Hi! I'm interested in ordering ${quantity}x ${product.name} for ${formatCurrency(product.price * quantity)}. Can you provide more details?`;
    window.open(
      `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`,
      "_blank"
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <span className="text-sm uppercase tracking-wide text-foreground/70">
          Quantity
        </span>
        <div className="flex items-center border border-border">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            className="h-10 w-10"
          >
            <Minus className="h-4 w-4" />
          </Button>
          <span className="px-4 py-2 font-semibold w-12 text-center">
            {quantity}
          </span>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setQuantity((q) => q + 1)}
            className="h-10 w-10"
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="space-y-3">
        <Button className="w-full py-6 text-base" onClick={handleAddToCart}>
          <ShoppingCart className="mr-2 h-5 w-5" />
          Add to Cart — {formatCurrency(product.price * quantity)}
        </Button>
        <Button
          variant="outline"
          className="w-full py-6 text-base border-green-600 text-green-700 hover:bg-green-50"
          onClick={handleWhatsAppOrder}
        >
          <MessageCircle className="mr-2 h-5 w-5" />
          Order via WhatsApp
        </Button>
      </div>

      <div className="bg-brand-muted p-4">
        <h4 className="font-marcellus text-foreground mb-1">Free Shipping</h4>
        <p className="text-sm text-muted-foreground">
          Free shipping on orders over {formatCurrency(10000)}. Delivery within
          3–5 business days.
        </p>
      </div>
    </div>
  );
}
