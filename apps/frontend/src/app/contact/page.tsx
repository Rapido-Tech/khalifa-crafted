import type { Metadata } from "next";
import Title from "@/components/Title";
import { FaWhatsapp } from "react-icons/fa";

export const metadata: Metadata = {
  title: "Contact — Khalifa Crafted",
  description: "Get in touch with Khalifa Crafted — we'd love to hear from you.",
};

const WHATSAPP = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "254123456789";

export default function ContactPage() {
  return (
    <div className="min-h-screen py-16 container mx-auto px-4">
      <div className="mb-8">
        <Title text1="GET IN" text2="TOUCH" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl">
        <div className="space-y-6">
          <p className="text-gray-700 text-lg leading-relaxed">
            Have a question, want a custom order, or just want to say hello?
            We typically respond within a few hours during business hours.
          </p>

          <div className="space-y-4">
            <div>
              <p className="text-sm font-semibold text-amber-900 uppercase tracking-wide mb-1">
                Email
              </p>
              <a
                href="mailto:info@khalifacrafted.com"
                className="text-amber-600 hover:underline"
              >
                info@khalifacrafted.com
              </a>
            </div>

            <div>
              <p className="text-sm font-semibold text-amber-900 uppercase tracking-wide mb-1">
                Phone
              </p>
              <p className="text-gray-700">+254 123 456 789</p>
            </div>

            <div>
              <p className="text-sm font-semibold text-amber-900 uppercase tracking-wide mb-1">
                Location
              </p>
              <p className="text-gray-700">Nairobi, Kenya</p>
            </div>
          </div>

          <a
            href={`https://wa.me/${WHATSAPP}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-6 py-3 font-semibold transition-colors"
          >
            <FaWhatsapp className="h-5 w-5" />
            Chat on WhatsApp
          </a>
        </div>

        <div className="bg-amber-50 p-8 self-start">
          <h3 className="text-xl font-bold text-amber-900 mb-5">
            Business Hours
          </h3>
          <div className="space-y-3 text-gray-700 text-sm">
            {[
              { day: "Monday – Friday", hours: "9:00 AM – 6:00 PM" },
              { day: "Saturday", hours: "10:00 AM – 4:00 PM" },
              { day: "Sunday", hours: "Closed" },
            ].map(({ day, hours }) => (
              <div key={day} className="flex justify-between border-b border-amber-100 pb-3">
                <span>{day}</span>
                <span className="font-medium">{hours}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
