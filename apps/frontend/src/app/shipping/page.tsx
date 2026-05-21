import type { Metadata } from "next";
import Title from "@/components/Title";
import { formatCurrency } from "@/utils/formatCurrency";

export const metadata: Metadata = {
  title: "Shipping & Returns — Khalifa Crafted",
  description:
    "Shipping times, delivery fees, and return policy for Khalifa Crafted orders.",
};

export default function ShippingPage() {
  return (
    <div className="min-h-screen py-16 container mx-auto px-4">
      <div className="mb-8">
        <Title text1="SHIPPING &" text2="RETURNS" />
      </div>

      <div className="max-w-3xl space-y-12 text-gray-700">
        <section>
          <h2 className="text-xl font-bold text-amber-900 mb-4">Delivery</h2>
          <ul className="space-y-3 list-disc list-inside leading-relaxed">
            <li>Standard delivery within Nairobi: 1–2 business days</li>
            <li>Upcountry delivery: 3–5 business days</li>
            <li>
              Free shipping on orders over{" "}
              <strong>{formatCurrency(20000)}</strong>
            </li>
            <li>
              A flat delivery fee applies to orders below the free-shipping
              threshold
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-amber-900 mb-4">
            Order Processing
          </h2>
          <p className="leading-relaxed">
            All standard orders are processed within 1–2 business days. Custom
            orders require 7–14 business days before dispatch. You will receive
            a confirmation message once your order ships, including a tracking
            reference where available.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-amber-900 mb-4">
            Returns &amp; Exchanges
          </h2>
          <ul className="space-y-3 list-disc list-inside leading-relaxed">
            <li>Returns accepted within 14 days of delivery</li>
            <li>Items must be unused and in original condition</li>
            <li>Custom and personalised orders are non-refundable</li>
            <li>
              To initiate a return, contact us via WhatsApp or email with your
              order reference
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-amber-900 mb-4">
            Damaged or Incorrect Items
          </h2>
          <p className="leading-relaxed">
            If your item arrives damaged or you receive the wrong product,
            contact us within 48 hours with a photo. We will arrange a
            replacement or full refund at no extra cost to you.
          </p>
        </section>
      </div>
    </div>
  );
}
