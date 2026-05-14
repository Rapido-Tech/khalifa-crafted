"use client";

import React, { useCallback } from "react";
import { EmblaOptionsType, EmblaCarouselType } from "embla-carousel";
import { DotButton, useDotButton } from "./EmblaCarouselDotButton";
import {
  PrevButton,
  NextButton,
  usePrevNextButtons,
} from "./EmblaCarouselArrowButtons";
import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import { BannerImages } from "@/types";
import "./embla.css";
import { Button } from "../ui/button";
import { ChevronRight } from "lucide-react";
import Image from "next/image";

const MainCarousel = () => {
  const options: EmblaOptionsType = { loop: true };
  const [emblaRef, emblaApi] = useEmblaCarousel(options, [Autoplay()]);

  const BannerImages: BannerImages[] = [
    {
      name: "Leather Wallet",
      image: "/assets/images/belts_wallet.jpg",
    },
    {
      name: "Handcrafted Belt",
      image: "/assets/images/craftedwallet.jpg",
    },

    {
      name: "Laptop Sleeve",
      image: "/assets/images/craftedwatchstrips.jpg",
    },
    {
      name: "Leather Umbrella",
      image: "/assets/images/laptopsleeves.jpg",
    },
    // {
    //   name: "Custom Piece",
    //   image: "/assets/images/craftedbelts.jpg",
    // },
  ];

  return (
    <section className="embla relative">
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container">
          {BannerImages.map((img, index) => (
            <div className="embla__slide w-full h-screen relative" key={index}>
              <div className="absolute inset-0 bg-black/50 z-10" />
              <div className="w-full h-full relative">
                <Image
                  src={img.image}
                  alt={img.name}
                  layout="fill"
                  objectFit="cover"
                  priority
                  className="absolute top-0 left-0"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="absolute top-1/2 left-20 transform -translate-y-1/2 z-20 space-y-4 text-white cursor-default">
        <h1 className="uppercase text-sm ">Crafted with Passion</h1>
        <h1 className="font-marcellus text-6xl leading-16 max-w-3xl">
          Timeless leather, expertly handcrafted for you
        </h1>
        <Button
          variant="outline"
          className="bg-transparent rounded-none p-5 cursor-pointer"
        >
          Shop Collection
        </Button>
      </div>
    </section>
  );
};

export default MainCarousel;
