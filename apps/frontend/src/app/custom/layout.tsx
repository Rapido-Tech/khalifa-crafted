import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Custom Orders",
  description:
    "Commission a bespoke handcrafted leather piece from Khalifa Crafted, tailored exactly to you.",
};

export default function CustomLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
