import type { Metadata } from "next";
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
  { name: "Belts", image: "/assets/images/belts.jpg" },
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
        <div className="absolute inset-0 bg-black/70" />
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-2xl md:text-4xl font-bold mb-6 drop-shadow-lg font-neoteric tracking-wider text-white cursor-default">
              Create Your Custom Piece
            </h2>
            <p className="mb-8 md:text-xl text-amber-400 drop-shadow-md leading-relaxed cursor-default">
              Have a unique idea? Let&apos;s bring it to life together.
            </p>
            <Button
              variant="secondary"
              size="lg"
              className="bg-white hover:bg-amber-50 font-semibold px-8 py-3 rounded-none cursor-pointer"
            >
              Start Custom Order
            </Button>
          </div>
        </div>
      </section>

      {/* Social links */}
      <section className="py-8 bg-gray-200">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-4 text-center">Follow Us</h2>
          <div className="flex justify-center space-x-4">
            <a
              href="https://facebook.com/khalifacrafted"
              target="_blank"
              rel="noopener noreferrer"
              className="text-amber-800 hover:text-amber-600"
            >
              <FaFacebookF size={24} />
            </a>
            <a
              href="https://twitter.com/khalifacrafted"
              target="_blank"
              rel="noopener noreferrer"
              className="text-amber-800 hover:text-amber-600"
            >
              <FaTwitter size={24} />
            </a>
            <a
              href="https://instagram.com/khalifacrafted"
              target="_blank"
              rel="noopener noreferrer"
              className="text-amber-800 hover:text-amber-600"
            >
              <FaInstagram size={24} />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
