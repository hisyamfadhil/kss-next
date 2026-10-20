"use client";

import React, { useCallback, useEffect, useRef, useState, memo } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { EmblaOptionsType } from "embla-carousel";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { imageBaseUrl } from "@/utils/baseUrl";

type SlideItem = {
  image: string;
  image_mobile: string;
  title?: string;
  link?: string;
};

type SliderProps = {
  slides: SlideItem[];
  options?: EmblaOptionsType;
  autoplayDelay?: number;
};

function SliderSingleImage({ slides, options, autoplayDelay = 4000 }: SliderProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "center",
    ...options,
  });

  const [selectedIndex, setSelectedIndex] = useState(0);

  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const isPaused = useRef(false);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);
  const scrollTo = useCallback((i: number) => emblaApi?.scrollTo(i), [emblaApi]);

  const onSelect = useCallback(() => {
    if (emblaApi) setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  /* ------------------ AUTOPLAY CORE ------------------ */
  const startAutoplay = useCallback(() => {
    if (!emblaApi) return;

    if (intervalRef.current) clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      if (!isPaused.current) emblaApi.scrollNext();
    }, autoplayDelay);
  }, [emblaApi, autoplayDelay]);

  const stopAutoplay = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
  }, []);

  /* Pause kalau tab tidak aktif */
  useEffect(() => {
    const handleVisibility = () => {
      isPaused.current = document.hidden;
    };
    document.addEventListener("visibilitychange", handleVisibility);
    return () => document.removeEventListener("visibilitychange", handleVisibility);
  }, []);

  /* Setup Embla listeners */
  useEffect(() => {
    if (!emblaApi) return;

    // Setup autoplay
    startAutoplay();
    emblaApi.on("select", onSelect);
    onSelect();

    // Pause saat drag
    emblaApi.on("pointerDown", () => {
      isPaused.current = true;
      stopAutoplay();
    });
    emblaApi.on("pointerUp", () => {
      isPaused.current = false;
      startAutoplay();
    });

    return () => {
      stopAutoplay();
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi, startAutoplay, stopAutoplay, onSelect]);

  /* ------------------ RENDER ------------------ */
  return (
    <div
      className="relative w-full mx-auto"
      onMouseEnter={() => (isPaused.current = true)}
      onMouseLeave={() => (isPaused.current = false)}
    >
      {/* Tombol kiri */}
      <button
        onClick={scrollPrev}
        aria-label="Previous slide"
        className="absolute left-3 top-1/2 -translate-y-1/2 z-20 bg-white/70 hover:bg-white rounded-full p-2 shadow-md transition"
      >
        <ChevronLeft className="w-6 h-6 text-gray-700" />
      </button>

      {/* Viewport */}
      <div className="overflow-hidden relative" ref={emblaRef}>
        <div className="flex">
          {slides.map((item, index) => {
            const imageContent = (
              <>
                {/* Desktop */}
                <div className="hidden md:block">
                  <Image
                    src={imageBaseUrl(item.image)}
                    alt={item.title || `Slide ${index + 1}`}
                    width={1920}
                    height={500}
                    fetchPriority={index < 1 ? "high" : "auto"}
                    loading={index < 1 ? "eager" : "lazy"}
                    className="w-full h-auto object-contain"
                  />
                </div>

                {/* Mobile */}
                <div className="block md:hidden">
                  <Image
                    src={imageBaseUrl(item.image_mobile)}
                    alt={item.title || `Slide ${index + 1}`}
                    width={900}
                    height={1200}
                    fetchPriority={index < 1 ? "high" : "auto"}
                    loading={index < 1 ? "eager" : "lazy"}
                    className="w-full h-auto object-contain"
                  />
                </div>
              </>
            );

            return (
              <div key={index} className="flex-[0_0_100%] relative w-full">
                {item.link ? (
                  <Link href={item.link} target="_blank" rel="noopener noreferrer" className="block">
                    {imageContent}
                  </Link>
                ) : (
                  imageContent
                )}
              </div>
            );
          })}
        </div>

        {/* Dots */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-2 bg-black/30 px-4 py-2 rounded-full backdrop-blur-sm">
          {slides.map((_, dotIndex) => (
            <button
              key={dotIndex}
              onClick={() => scrollTo(dotIndex)}
              aria-label={`Dot slide ${dotIndex}`}
              className={`w-3 h-3 rounded-full transition-all ${
                dotIndex === selectedIndex
                  ? "bg-white scale-110"
                  : "bg-white/50 hover:bg-white/80"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Tombol kanan */}
      <button
        onClick={scrollNext}
        aria-label="Next slide"
        className="absolute right-3 top-1/2 -translate-y-1/2 z-20 bg-white/70 hover:bg-white rounded-full p-2 shadow-md transition"
      >
        <ChevronRight className="w-6 h-6 text-gray-700" />
      </button>
    </div>
  );
}

export default memo(SliderSingleImage);
