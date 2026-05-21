import type { Metadata } from "next";
import Title from "@/components/Title";

export const metadata: Metadata = {
  title: "Leather Care — Khalifa Crafted",
  description:
    "How to care for your Khalifa Crafted leather goods to keep them looking their best.",
};

const STEPS = [
  {
    n: "01",
    title: "Keep it Dry",
    body: "Leather and water don't mix well. If your piece gets wet, blot gently with a dry cloth and let it air-dry naturally away from direct heat sources.",
  },
  {
    n: "02",
    title: "Condition Regularly",
    body: "Apply a quality leather conditioner every 3–6 months to prevent drying and cracking. Use a soft cloth in circular motions — a little goes a long way.",
  },
  {
    n: "03",
    title: "Store Properly",
    body: "Store in a cool, dry place away from direct sunlight. Use a dust bag or breathable cloth. Never use an airtight plastic bag — leather needs to breathe.",
  },
  {
    n: "04",
    title: "Clean Gently",
    body: "For surface dirt, wipe with a slightly damp cloth. For stains, use a leather-specific cleaner and always test on a hidden area first.",
  },
  {
    n: "05",
    title: "Embrace the Patina",
    body: "Full-grain leather develops a unique patina over time — a natural darkening and sheen that makes your piece distinctly yours. This is not wear; it is character.",
  },
];

export default function CarePage() {
  return (
    <div className="min-h-screen py-16 container mx-auto px-4">
      <div className="mb-6">
        <Title text1="CARE" text2="INSTRUCTIONS" />
      </div>

      <p className="max-w-2xl text-gray-600 text-lg leading-relaxed mb-14">
        Full-grain leather is built to last a lifetime. With the right care,
        your Khalifa Crafted piece will only get better with age.
      </p>

      <div className="max-w-2xl space-y-10">
        {STEPS.map(({ n, title, body }) => (
          <div key={n} className="flex gap-6 items-start">
            <span className="text-5xl font-bold text-amber-200 leading-none shrink-0 select-none">
              {n}
            </span>
            <div>
              <h3 className="text-lg font-bold text-amber-900 mb-2">{title}</h3>
              <p className="text-gray-600 leading-relaxed">{body}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-14 max-w-2xl p-6 bg-amber-50 border-l-4 border-amber-600">
        <p className="text-gray-700 text-sm leading-relaxed">
          <strong className="text-amber-900">Pro tip:</strong> Never use
          household cleaners, shoe polish with dyes, or petroleum-based products
          on your leather. When in doubt, reach out to us and we'll advise the
          right product for your specific piece.
        </p>
      </div>
    </div>
  );
}
