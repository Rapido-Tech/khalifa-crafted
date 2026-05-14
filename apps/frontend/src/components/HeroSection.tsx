import type { BannerImages } from "@/types";
import { EmblaOptionsType } from "embla-carousel";
import EmblaCarousel from "./HeroCarousel/EmblaCarousel";

interface HeroSectionProps {
  products: BannerImages[];
}

export function HeroSection({ products }: HeroSectionProps) {
  const OPTIONS: EmblaOptionsType = {
    axis: "y",
    dragFree: true,
    direction: "rtl",
  };

  return <EmblaCarousel slides={products} options={OPTIONS} />;
}
