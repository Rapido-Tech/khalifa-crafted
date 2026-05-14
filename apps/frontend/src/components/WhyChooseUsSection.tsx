"use client";

import { Shield, Truck, Users, Award } from "lucide-react";

const features = [
  {
    icon: Shield,
    title: "Quality Guarantee",
    description:
      "Every piece is crafted with premium materials and comes with our quality guarantee.",
  },
  {
    icon: Truck,
    title: "Fast Delivery",
    description:
      "Free shipping on orders over KES 10,000 with delivery within 3-5 business days.",
  },
  {
    icon: Users,
    title: "Expert Craftsmanship",
    description:
      "Our skilled artisans have years of experience in leather crafting.",
  },
  {
    icon: Award,
    title: "Award Winning",
    description:
      "Recognized for excellence in handcrafted leather goods across Kenya.",
  },
];

export function WhyChooseUsSection() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-xl md:text-4xl font-extrabold font-neoteric tracking-wider text-center py-8 cursor-default">
          Why Choose Khalifa Crafted?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="text-center group">
              <div className="bg-amber-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-amber-200 transition-colors duration-300">
                <feature.icon className="h-8 w-8 text-amber-600" />
              </div>
              <h3 className="texl-lg md:text-xl  font-semibold mb-2 tracking-wider font-neoteric">
                {feature.title}
              </h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
