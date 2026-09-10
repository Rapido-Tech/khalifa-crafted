"use client";

import React from "react";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { useAppSelector } from "@/lib/store";
import { useRouter } from "next/navigation";
import { updateQuantity, removeItem } from "@/lib/features/cartSlice";
import Title from "@/components/Title";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/utils/formatCurrency";
import { FaTrash } from "react-icons/fa";
import CartTotal from "@/components/CartTotal";

const Cart = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const cartItems = useAppSelector((state) => state.cart.items);

  return (
    <div className="container mx-auto px-4 pt-14 pb-20">
      <div className="mb-8">
        <Title text1="Your" text2="Cart" />
      </div>

      {cartItems.length === 0 ? (
        <p className="text-muted-foreground py-12 text-center">
          Your cart is empty.
        </p>
      ) : (
        <div>
          {cartItems.map((item) => {
            const imageUrl = item.thumbnail?.url ?? "";

            return (
              <div
                key={item._id}
                className="grid py-4 border-t border-border grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4 last:border-b"
              >
                <div className="flex items-start gap-6">
                  {imageUrl && (
                    <div className="relative w-16 h-16 sm:w-20 sm:h-20 shrink-0 bg-muted">
                      <Image
                        src={imageUrl}
                        alt={item.name}
                        fill
                        className="object-cover"
                        sizes="80px"
                      />
                    </div>
                  )}
                  <div>
                    <p className="text-sm font-medium sm:text-base text-foreground">
                      {item.name}
                    </p>
                    <p className="mt-2 text-muted-foreground">
                      {formatCurrency(item.price)}
                    </p>
                  </div>
                </div>

                <Input
                  className="max-w-10 sm:max-w-20 text-center"
                  type="number"
                  min={1}
                  defaultValue={item.quantity}
                  onChange={(e) => {
                    const val = Number(e.target.value);
                    if (val >= 1) dispatch(updateQuantity({ id: item._id, quantity: val }));
                  }}
                />

                <button
                  type="button"
                  aria-label={`Remove ${item.name} from cart`}
                  className="w-4 mr-4 cursor-pointer sm:w-5 text-foreground/50 hover:text-destructive transition-colors"
                  onClick={() => dispatch(removeItem(item._id))}
                >
                  <FaTrash />
                </button>
              </div>
            );
          })}
        </div>
      )}

      <div className="flex justify-end my-20">
        <div className="w-full sm:w-112.5">
          <CartTotal />
          <div className="w-full text-end">
            <Button
              size="lg"
              className="my-8"
              onClick={() => router.push("/place-order")}
              disabled={cartItems.length === 0}
            >
              Proceed to Checkout
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
