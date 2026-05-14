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

type PropType = {
  options?: EmblaOptionsType;
  slides: BannerImages[];
};

const EmblaCarousel: React.FC<PropType> = (props) => {
  const { options, slides } = props;
  const [emblaRef, emblaApi] = useEmblaCarousel(options, [Autoplay()]);

  const onNavButtonClick = useCallback((emblaApi: EmblaCarouselType) => {
    const autoplay = emblaApi?.plugins()?.autoplay;
    if (!autoplay) return;

    const resetOrStop =
      autoplay.options.stopOnInteraction === false
        ? autoplay.reset
        : autoplay.stop;

    resetOrStop();
  }, []);

  const { selectedIndex, scrollSnaps, onDotButtonClick } = useDotButton(
    emblaApi,
    onNavButtonClick
  );

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = usePrevNextButtons(emblaApi, onNavButtonClick);

  return (
    <section className="embla relative">
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container h-[30vh] lg:h-[85vh] 2xl:h-[90vh]">
          {slides.map((slide, index) => (
            <div className="embla__slide" key={index}>
              {/* <div className="absolute mb-8 md:mb-0 z-10">
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 font-neoteric tracking-wider text-nowrap">
                  Handcrafted Leather Excellence
                </h1>
                <div className="h-20">
                  <p
                    className={`text-lg mb-6 transition-opacity duration-1000`}
                  >
                    {slide.name}: Crafted with passion and precision
                  </p>
                </div>
              </div>
              <Button
                variant="secondary"
                size="lg"
                className="rounded-none bg-black text-white hover:bg-amber-600 font-bold text-lg cursor-pointer"
              >
                Shop Now <ChevronRight className="ml-2 h-5 w-5 " />
              </Button> */}
              <div key={index} className="w-full h-full flex-shrink-0 relative">
                {/* <Image
                  width={1000}
                  height={600}
                  src={slide.image || "/placeholder.svg"}
                  alt={slide.name}
                  priority
                  className="w-full h-full aspect-video object-cover bg-center"
                /> */}
                <video
                  className="w-screen h-full object-cover
           z-10 aspect-video box-border"
                  autoPlay
                  loop
                  muted
                  playsInline
                >
                  <source src="/assets/videos/khalif01.mp4" type="video/mp4" />
                </video>
                <div className="absolute inset-0 bg-black/50" />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-center items-center absolute bottom-0 w-full">
        <div className="embla__controls absolute bottom-0 w-full px-4 ">
          <div className="hidden md:block ">
            <div className="embla__buttons py-5 ">
              <PrevButton
                onClick={onPrevButtonClick}
                disabled={prevBtnDisabled}
              />
              <NextButton
                onClick={onNextButtonClick}
                disabled={nextBtnDisabled}
              />
            </div>
          </div>
        </div>

        <div className="embla__dots">
          {scrollSnaps.map((_, index) => (
            <DotButton
              key={index}
              onClick={() => onDotButtonClick(index)}
              className={"embla__dot".concat(
                index === selectedIndex ? " embla__dot--selected" : ""
              )}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default EmblaCarousel;
