"use client";

import { useSelector } from "react-redux";
import Title from "./Title";
import { formatCurrency } from "@/utils/formatCurrency";
import { selectCartTotal } from "@/lib/features/cartSlice";

const CartTotal = () => {
  const total = useSelector(selectCartTotal);

  return (
    <div className="w-full">
      <div className="text-2xl">
        <Title text1="CART" text2="TOTAL" />
      </div>
      <div className="flex flex-col gap-2 mt-2 text-sm">
        <div className="flex justify-between">
          <p className="text-lg font-medium">Sub Total</p>
          <p className="text-lg font-medium">{formatCurrency(total)}</p>
        </div>
        <hr />
        <div className="flex justify-between">
          <p className="text-lg font-medium">Shipping Fee</p>
          <p className="text-lg font-medium">{formatCurrency(0)}</p>
        </div>
        <hr />
        <div className="flex justify-between">
          <p className="text-2xl font-semibold">Total Amount</p>
          <p className="text-2xl font-semibold">{formatCurrency(total)}</p>
        </div>
      </div>
    </div>
  );
};

export default CartTotal;
