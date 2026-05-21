import type { Metadata } from "next";
import Title from "@/components/Title";

export const metadata: Metadata = {
  title: "FAQ — Khalifa Crafted",
  description: "Frequently asked questions about Khalifa Crafted leather goods.",
};

const FAQS = [
  {
    q: "What type of leather do you use?",
    a: "We use premium full-grain leather sourced from reputable tanneries. Full-grain is the highest quality cut — it retains the natural grain and develops a beautiful patina over time.",
  },
  {
    q: "How long does an order take?",
    a: "Standard orders ship within 2–3 business days. Custom orders take 7–14 business days depending on complexity. We'll keep you updated throughout.",
  },
  {
    q: "Do you offer custom sizing?",
    a: "Yes. We offer custom sizing on belts, watch straps, and bags. Reach out via WhatsApp or email with your measurements and we'll work with you to get it perfect.",
  },
  {
    q: "How do I care for my leather goods?",
    a: "Use a quality leather conditioner every 3–6 months and keep pieces away from prolonged moisture. Visit our Care Instructions page for a full guide.",
  },
  {
    q: "What is your return policy?",
    a: "We accept returns within 14 days of delivery for unused items in original condition. Custom orders are non-refundable. See our Shipping & Returns page for full details.",
  },
  {
    q: "Do you ship internationally?",
    a: "Currently we ship within Kenya. International shipping is coming soon — reach out directly for updates or special arrangements.",
  },
  {
    q: "Can I get my initials or a name embossed?",
    a: "Absolutely. Personalisation (initials, names, short text) is available on most products. Mention this when placing your order or contact us beforehand.",
  },
];

export default function FAQPage() {
  return (
    <div className="min-h-screen py-16 container mx-auto px-4">
      <div className="mb-8">
        <Title text1="FREQUENTLY ASKED" text2="QUESTIONS" />
      </div>

      <div className="max-w-2xl space-y-3">
        {FAQS.map(({ q, a }) => (
          <details
            key={q}
            className="border border-amber-200 group open:border-amber-400"
          >
            <summary className="px-5 py-4 cursor-pointer font-semibold text-amber-900 list-none flex justify-between items-center gap-4 select-none">
              <span>{q}</span>
              <span className="text-amber-600 text-2xl leading-none shrink-0 group-open:rotate-45 transition-transform duration-200">
                +
              </span>
            </summary>
            <p className="px-5 pb-5 text-gray-600 leading-relaxed">{a}</p>
          </details>
        ))}
      </div>
    </div>
  );
}
