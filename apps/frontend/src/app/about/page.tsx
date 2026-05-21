import type { Metadata } from "next";
import Title from "@/components/Title";

export const metadata: Metadata = {
  title: "About — Khalifa Crafted",
  description:
    "The story behind Khalifa Crafted — handcrafted leather goods made with passion in Kenya.",
};

const VALUES = [
  {
    title: "Craftsmanship",
    body: "Every item is hand-cut, stitched, and finished by skilled artisans with years of experience.",
  },
  {
    title: "Quality",
    body: "We source only the finest full-grain leather, ensuring your piece lasts a lifetime and looks better with age.",
  },
  {
    title: "Authenticity",
    body: "No shortcuts. No mass production. Just genuine craft made with intention, pride, and care.",
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      <section className="py-24 bg-[url('/assets/herosection/passport_holder.jpg')] bg-cover bg-center relative">
        <div className="absolute inset-0 bg-black/65" />
        <div className="container mx-auto px-4 relative z-10 text-center text-white">
          <h1 className="text-4xl md:text-6xl font-bold font-neoteric tracking-wider mb-4">
            Our Story
          </h1>
          <p className="text-lg md:text-xl text-amber-200 max-w-2xl mx-auto">
            Every stitch tells a story. Every piece carries a legacy.
          </p>
        </div>
      </section>

      <section className="py-16 container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <Title text1="THE" text2="BRAND" />
          <p className="text-gray-700 text-lg leading-relaxed mt-4">
            Khalifa Crafted was born from a deep love for leather and a desire
            to keep the art of handcrafting alive. Founded in Nairobi, Kenya, we
            believe that every accessory should tell a story — yours.
          </p>
          <p className="text-gray-700 text-lg leading-relaxed mt-4">
            Each piece we make is crafted by hand from premium full-grain
            leather, ensuring durability that improves with age. No two pieces
            are exactly alike — that is the beauty of handcraft.
          </p>
          <p className="text-gray-700 text-lg leading-relaxed mt-4">
            From belts to wallets, bags to watch straps, every product that
            leaves our workshop meets the same exacting standard: it must be
            something we would be proud to carry ourselves.
          </p>
        </div>
      </section>

      <section className="py-16 bg-amber-50">
        <div className="container mx-auto px-4">
          <div className="mb-10">
            <Title text1="OUR" text2="VALUES" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {VALUES.map(({ title, body }) => (
              <div key={title} className="text-center p-6">
                <div className="w-12 h-1 bg-amber-600 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-amber-900 mb-3">
                  {title}
                </h3>
                <p className="text-gray-600 leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 container mx-auto px-4 text-center">
        <div className="max-w-2xl mx-auto">
          <Title text1="THE" text2="PROCESS" />
          <p className="text-gray-700 text-lg leading-relaxed mt-4">
            From selecting the hide to the final edge burnish, every step is
            done by hand. We do not use machines where hands can do it better.
            The result is a product with character — one that ages gracefully
            and becomes a companion for life.
          </p>
        </div>
      </section>
    </div>
  );
}
