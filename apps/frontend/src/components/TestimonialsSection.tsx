"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Sarah Johnson",
    rating: 5,
    comment:
      "Absolutely love my leather wallet! The craftsmanship is exceptional and it's aging beautifully.",
    image: "/placeholder.svg?height=60&width=60&text=SJ",
  },
  {
    name: "Michael Chen",
    rating: 5,
    comment:
      "The custom belt I ordered exceeded my expectations. Perfect fit and amazing quality.",
    image: "/placeholder.svg?height=60&width=60&text=MC",
  },
  {
    name: "Amina Hassan",
    rating: 5,
    comment:
      "Fast delivery and excellent customer service. My laptop sleeve is perfect for work.",
    image: "/placeholder.svg?height=60&width=60&text=AH",
  },
];

export function TestimonialsSection() {
  return (
    <section className="py-16 bg-amber-50">
      <div className="container mx-auto px-4">
        <h2 className="text-xl md:text-4xl font-extrabold font-neoteric tracking-wider text-center py-8 cursor-default">
          What Our Customers Say
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card
              key={index}
              className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <img
                    src={testimonial.image || "/placeholder.svg"}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full mr-4"
                  />
                  <div>
                    <h4 className="font-semibold text-amber-900">
                      {testimonial.name}
                    </h4>
                    <div className="flex">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star
                          key={i}
                          className="h-4 w-4 fill-yellow-400 text-yellow-400"
                        />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-gray-600 italic">"{testimonial.comment}"</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
