"use client";

import React from "react";
import { EmblaOptionsType } from "embla-carousel";
import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import { BannerImages } from "@/types";
import "./embla.css";
import { Button } from "../ui/button";
import Image from "next/image";
import Link from "next/link";

const SLIDES: BannerImages[] = [
  { name: "Leather Wallet", image: "/assets/images/belts_wallet.jpg" },
  { name: "Handcrafted Belt", image: "/assets/images/craftedwallet.jpg" },
  { name: "Leather Watch Strap", image: "/assets/images/craftedwatchstrips.jpg" },
  { name: "Leather Bag", image: "/assets/images/laptopsleeves.jpg" },
];

const MainCarousel = () => {
  const options: EmblaOptionsType = { loop: true };
  const [emblaRef] = useEmblaCarousel(options, [
    Autoplay({ delay: 6000 }),
  ]);

  return (
    <section className="embla relative">
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container">
          {SLIDES.map((img, index) => (
            <div className="embla__slide w-full h-screen relative" key={index}>
              <div className="absolute inset-0 bg-gradient-to-r from-charcoal/70 via-charcoal/30 to-transparent z-10" />
              <Image
                src={img.image}
                alt={img.name}
                fill
                priority
                className="object-cover"
              />
            </div>
          ))}
        </div>
      </div>
      <div className="absolute inset-0 z-20 flex items-center">
        <div className="container mx-auto px-6 md:px-16">
          <div className="max-w-2xl space-y-6 text-white cursor-default">
            <p className="uppercase text-xs md:text-sm tracking-[0.3em] text-brand-foreground/90">
              Crafted with Passion
            </p>
            <h1 className="font-marcellus text-4xl md:text-6xl leading-tight md:leading-[1.1]">
              Timeless leather, expertly handcrafted for you
            </h1>
            <Link href="/shop">
              <Button
                variant="outline"
                size="lg"
                className="border-white/70 bg-transparent text-white hover:bg-white hover:text-charcoal"
              >
                Shop Collection
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MainCarousel;
