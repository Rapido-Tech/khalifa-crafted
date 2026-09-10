import type { Metadata } from "next";
import Link from "next/link";
import { CategoriesSection } from "@/components/CategoriesSection";
import { FeaturedProducts } from "@/components/FeaturedProducts";
import { Button } from "@/components/ui/button";
import { WhyChooseUsSection } from "@/components/WhyChooseUsSection";
import MainCarousel from "@/components/HeroCarousel/MainCarousel";
import { FaFacebookF, FaTwitter } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa";
import { getProducts } from "@/lib/api";

export const metadata: Metadata = {
  title: "Khalifa Crafted — Handcrafted Leather Excellence",
  description:
    "Discover handcrafted leather goods of exceptional quality. From wallets to bags, each piece is crafted with passion and precision in Kenya.",
};

// Static category tiles use local public assets — no API dependency
const HOME_CATEGORIES = [
  { name: "Belts", image: "/assets/herosection/belts.jpg" },
  { name: "Wallets", image: "/assets/images/wallets.jpg" },
  { name: "Bags", image: "/assets/images/bags.jpg" },
  { name: "Clothes", image: "/assets/images/laptopsleeves.jpg" },
  { name: "Watch Straps", image: "/assets/images/customproducts.jpg" },
  { name: "Umbrellas", image: "/assets/images/umbrella.jpg" },
];

export default async function HomePage() {
  const products = await getProducts();

  return (
    <div className="min-h-screen">
      <MainCarousel />

      <CategoriesSection categories={HOME_CATEGORIES} />

      <FeaturedProducts products={products} />

      <WhyChooseUsSection />

      {/* Custom order CTA */}
      <section className="py-20 md:py-36 2xl:py-52 bg-[url('/assets/images/watches.jpg')] bg-cover bg-center bg-no-repeat relative overflow-hidden">
        <div className="absolute inset-0 bg-charcoal/75" />
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="max-w-2xl mx-auto">
            <h2 className="font-marcellus text-3xl md:text-5xl mb-6 text-white cursor-default">
              Create Your Custom Piece
            </h2>
            <p className="mb-8 md:text-xl text-white/80 leading-relaxed cursor-default">
              Have a unique idea? Let&apos;s bring it to life together.
            </p>
            <Link href="/custom">
              <Button size="lg">Start Custom Order</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Social links */}
      <section className="py-12 bg-secondary/40">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-marcellus text-xl mb-4 text-foreground cursor-default">
            Follow Us
          </h2>
          <div className="flex justify-center space-x-6">
            <a
              href="https://facebook.com/khalifacrafted"
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground/60 hover:text-brand transition-colors"
            >
              <FaFacebookF size={20} />
            </a>
            <a
              href="https://twitter.com/khalifacrafted"
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground/60 hover:text-brand transition-colors"
            >
              <FaTwitter size={20} />
            </a>
            <a
              href="https://instagram.com/khalifacrafted"
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground/60 hover:text-brand transition-colors"
            >
              <FaInstagram size={20} />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
