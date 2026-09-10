import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Place Order",
};

export default function PlaceOrderLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
