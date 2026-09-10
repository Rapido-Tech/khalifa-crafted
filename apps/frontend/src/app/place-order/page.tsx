"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/lib/store";
import { useDispatch } from "react-redux";
import { clearCart, selectCartTotal } from "@/lib/features/cartSlice";
import { formatCurrency } from "@/utils/formatCurrency";
import Title from "@/components/Title";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Image from "next/image";

interface FormData {
  first_name: string;
  last_name: string;
  email: string;
  address: string;
  city: string;
  zipcode: string;
}

const EMPTY_FORM: FormData = {
  first_name: "",
  last_name: "",
  email: "",
  address: "",
  city: "",
  zipcode: "",
};

export default function PlaceOrderPage() {
  const router = useRouter();
  const dispatch = useDispatch();
  const cartItems = useAppSelector((state) => state.cart.items);
  const total = useAppSelector(selectCartTotal);

  const [form, setForm] = useState<FormData>(EMPTY_FORM);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  if (cartItems.length === 0 && !success) {
    return (
      <div className="min-h-screen flex items-center justify-center flex-col gap-4 text-muted-foreground">
        <p className="text-lg">Your cart is empty.</p>
        <Button onClick={() => router.push("/shop")}>Browse Shop</Button>
      </div>
    );
  }

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center flex-col gap-4 text-center px-4">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-2">
          <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="font-marcellus text-2xl text-foreground">Order Placed!</h2>
        <p className="text-muted-foreground">Your order reference is <strong className="text-foreground">{success}</strong>.</p>
        <p className="text-muted-foreground text-sm">We'll be in touch shortly to confirm your order.</p>
        <Button className="mt-4" size="lg" onClick={() => router.push("/shop")}>
          Continue Shopping
        </Button>
      </div>
    );
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customer: form,
          basket: cartItems.map((item) => ({
            product_id: item._id,
            quantity: item.quantity,
          })),
          total,
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setError((data as { error?: string }).error ?? "Something went wrong. Please try again.");
        return;
      }

      const data = await res.json() as { reference: string };
      dispatch(clearCart());
      setSuccess(data.reference);
    } catch {
      setError("Network error. Please check your connection and try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const field = (
    name: keyof FormData,
    label: string,
    type = "text",
    autoComplete: string = name
  ) => (
    <div className="flex flex-col gap-1">
      <label htmlFor={name} className="text-sm font-medium text-foreground/80">
        {label}
      </label>
      <Input
        id={name}
        name={name}
        type={type}
        autoComplete={autoComplete}
        required
        value={form[name]}
        onChange={handleChange}
      />
    </div>
  );

  return (
    <div className="min-h-screen py-12 container mx-auto px-4">
      <div className="mb-6">
        <Title text1="PLACE" text2="ORDER" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Shipping form */}
        <div>
          <h2 className="font-marcellus text-lg text-foreground mb-5">
            Shipping Information
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              {field("first_name", "First Name", "text", "given-name")}
              {field("last_name", "Last Name", "text", "family-name")}
            </div>
            {field("email", "Email Address", "email", "email")}
            {field("address", "Street Address", "text", "street-address")}
            <div className="grid grid-cols-2 gap-4">
              {field("city", "City", "text", "address-level2")}
              {field("zipcode", "Postcode / ZIP", "text", "postal-code")}
            </div>

            {error && (
              <p className="text-red-600 text-sm bg-red-50 px-4 py-3 border border-red-200">
                {error}
              </p>
            )}

            <Button type="submit" disabled={submitting} size="lg" className="w-full mt-2">
              {submitting ? "Placing Order..." : "Confirm Order"}
            </Button>
          </form>
        </div>

        {/* Order summary */}
        <div>
          <h2 className="font-marcellus text-lg text-foreground mb-5">
            Order Summary
          </h2>
          <div className="border border-border divide-y divide-border">
            {cartItems.map((item) => (
              <div key={item._id} className="flex items-center gap-4 p-4">
                {item.thumbnail?.url && (
                  <div className="relative w-14 h-14 shrink-0 bg-muted">
                    <Image
                      src={item.thumbnail.url}
                      alt={item.name}
                      fill
                      className="object-cover"
                      sizes="56px"
                    />
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate text-foreground">{item.name}</p>
                  <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                </div>
                <p className="text-sm font-semibold shrink-0 text-foreground">
                  {formatCurrency(item.price * item.quantity)}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-4 space-y-2 text-sm">
            <div className="flex justify-between text-muted-foreground">
              <span>Subtotal</span>
              <span>{formatCurrency(total)}</span>
            </div>
            <div className="flex justify-between text-muted-foreground">
              <span>Shipping</span>
              <span>{formatCurrency(0)}</span>
            </div>
            <div className="flex justify-between text-lg font-semibold text-foreground border-t border-border pt-3 mt-3">
              <span>Total</span>
              <span>{formatCurrency(total)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
