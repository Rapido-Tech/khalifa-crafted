"use client";

import React from "react";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { useAppSelector } from "@/lib/store";
import { useRouter } from "next/navigation";
import { updateQuantity, removeItem } from "@/lib/features/cartSlice";
import Title from "@/components/Title";
import { formatCurrency } from "@/utils/formatCurrency";
import { FaTrash } from "react-icons/fa";
import CartTotal from "@/components/CartTotal";

const Cart = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const cartItems = useAppSelector((state) => state.cart.items);

  return (
    <div className="container mx-auto px-4 border-b pb-8 border-amber-600 pt-14">
      <div className="mb-3 text-2xl">
        <Title text1="YOUR" text2="CART" />
      </div>

      <div>
        {cartItems.map((item) => {
          const imageUrl = item.thumbnail?.url ?? "";

          return (
            <div
              key={item._id}
              className="grid py-4 text-gray-700 border-t border-b grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4"
            >
              <div className="flex items-start gap-6">
                {imageUrl && (
                  <div className="relative w-16 h-16 sm:w-20 sm:h-20 shrink-0">
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
                  <p className="text-sm font-medium sm:text-lg">{item.name}</p>
                  <p className="mt-2">{formatCurrency(item.price)}</p>
                </div>
              </div>

              <input
                className="px-1 py-1 border max-w-10 sm:max-w-20 sm:px-2"
                type="number"
                min={1}
                defaultValue={item.quantity}
                onChange={(e) => {
                  const val = Number(e.target.value);
                  if (val >= 1) dispatch(updateQuantity({ id: item._id, quantity: val }));
                }}
              />

              <div
                className="w-4 mr-4 cursor-pointer sm:w-5"
                onClick={() => dispatch(removeItem(item._id))}
              >
                <FaTrash />
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex justify-end my-20">
        <div className="w-full sm:w-112.5">
          <CartTotal />
          <div className="w-full text-end">
            <button
              onClick={() => router.push("/place-order")}
              disabled={cartItems.length === 0}
              className={`px-8 py-3 my-8 text-sm text-white bg-black active:bg-gray-700 ${
                cartItems.length === 0 ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              PROCEED TO CHECKOUT
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
