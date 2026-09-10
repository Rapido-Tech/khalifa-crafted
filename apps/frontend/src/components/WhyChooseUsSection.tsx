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
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-marcellus text-3xl md:text-4xl text-foreground cursor-default">
            Why Choose Khalifa Crafted?
          </h2>
          <span className="mt-3 block w-12 h-px bg-brand mx-auto" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="text-center group">
              <div className="bg-brand-muted w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 transition-colors duration-300">
                <feature.icon className="h-7 w-7 text-brand" />
              </div>
              <h3 className="font-marcellus text-lg md:text-xl mb-2 text-foreground">
                {feature.title}
              </h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
