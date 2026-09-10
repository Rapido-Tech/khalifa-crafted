"use client";

import { useAppSelector } from "@/lib/store";
import Title from "./Title";
import { formatCurrency } from "@/utils/formatCurrency";
import { selectCartTotal } from "@/lib/features/cartSlice";

const CartTotal = () => {
  const total = useAppSelector(selectCartTotal);

  return (
    <div className="w-full">
      <Title text1="Cart" text2="Total" />
      <div className="flex flex-col gap-3 mt-4 text-sm">
        <div className="flex justify-between text-foreground/80">
          <p>Sub Total</p>
          <p>{formatCurrency(total)}</p>
        </div>
        <hr className="border-border" />
        <div className="flex justify-between text-foreground/80">
          <p>Shipping Fee</p>
          <p>{formatCurrency(0)}</p>
        </div>
        <hr className="border-border" />
        <div className="flex justify-between text-lg font-semibold text-foreground">
          <p>Total Amount</p>
          <p>{formatCurrency(total)}</p>
        </div>
      </div>
    </div>
  );
};

export default CartTotal;
