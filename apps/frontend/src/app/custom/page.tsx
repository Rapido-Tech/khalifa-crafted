"use client";

import Link from "next/link";
import Title from "@/components/Title";
import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";

const WHATSAPP = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "254123456789";

const STEPS = [
  {
    n: 1,
    title: "Share Your Idea",
    body: "Tell us what you have in mind — a design, dimensions, colour, or a rough concept. No idea is too ambitious.",
  },
  {
    n: 2,
    title: "We Quote & Confirm",
    body: "We'll provide a price and timeline. Once you confirm, a 50% deposit is required to begin.",
  },
  {
    n: 3,
    title: "Crafting Begins",
    body: "Our artisans handcraft your piece with care. We share progress updates along the way.",
  },
  {
    n: 4,
    title: "Delivery",
    body: "Your finished piece is carefully packaged and delivered. Final payment on delivery.",
  },
];

export default function CustomPage() {
  const handleWhatsApp = () => {
    const msg = "Hi! I'd like to enquire about a custom leather order.";
    window.open(
      `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(msg)}`,
      "_blank"
    );
  };

  return (
    <div className="min-h-screen">
      <section className="py-24 bg-[url('/assets/images/craftedwallet.jpg')] bg-cover bg-center relative">
        <div className="absolute inset-0 bg-black/65" />
        <div className="container mx-auto px-4 relative z-10 text-center text-white">
          <h1 className="text-4xl md:text-6xl font-bold font-neoteric tracking-wider mb-4">
            Custom Orders
          </h1>
          <p className="text-lg md:text-xl text-amber-200 max-w-2xl mx-auto">
            Have something specific in mind? We craft bespoke leather pieces
            tailored exactly to you.
          </p>
        </div>
      </section>

      <section className="py-16 container mx-auto px-4">
        <div className="mb-10">
          <Title text1="HOW IT" text2="WORKS" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {STEPS.map(({ n, title, body }) => (
            <div key={n} className="text-center">
              <div className="w-12 h-12 bg-amber-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                {n}
              </div>
              <h3 className="font-bold text-amber-900 mb-2">{title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{body}</p>
            </div>
          ))}
        </div>

        <div className="bg-amber-50 p-8 max-w-2xl mx-auto text-center">
          <h3 className="text-xl font-bold text-amber-900 mb-3">
            What can we make?
          </h3>
          <p className="text-gray-600 leading-relaxed mb-2">
            Belts · Wallets · Bags · Watch Straps · Passport Holders · Laptop
            Sleeves · Key Holders · Corporate Gifts
          </p>
          <p className="text-gray-500 text-sm">
            If it's leather, we can likely make it.
          </p>
        </div>

        <div className="mt-12 text-center space-y-4">
          <p className="text-gray-700 text-lg">
            Ready to start? Reach out and let's bring your vision to life.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Button
              className="bg-green-500 hover:bg-green-600 text-white px-8 py-3 rounded-none cursor-pointer"
              onClick={handleWhatsApp}
            >
              <MessageCircle className="mr-2 h-5 w-5" />
              WhatsApp Us
            </Button>
            <Link href="/contact">
              <Button
                variant="outline"
                className="border-amber-600 text-amber-600 hover:bg-amber-50 px-8 py-3 rounded-none bg-transparent"
              >
                Other Ways to Reach Us
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
