"use client";

import React, { useCallback, useEffect, useRef, memo } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { EmblaOptionsType } from "embla-carousel";
import Image from "next/image";
import Link from "next/link";
import { imageBaseUrl } from "@/utils/baseUrl";

// ---------- CHILD COMPONENT ----------
const ProductCard = memo(
  ({ item, index }: { item: any; index: number }) => {
    return (
      <div
        className="
          px-2
          flex-[0_0_33.33%]   /* Mobile: 3 items */
          sm:flex-[0_0_20%]    /* Tablet kecil: 5 items */
          md:flex-[0_0_16.66%] /* Tablet besar: 6 items */
          lg:flex-[0_0_12.5%]  /* Desktop: 8 items */
        "
      >
        <div className="relative w-full aspect-[5/3] flex items-center justify-center bg-gray-100 rounded-lg overflow-hidden">
          <Image
            src={imageBaseUrl(`uploads/slider-client/${item.photo}`)}
            alt={item.name || `Slide ${index}`}
            fill
            loading={index < 2 ? "eager" : "lazy"}
            priority={index < 2}
            className="object-contain transition-transform duration-500 ease-in-out hover:scale-105"
            sizes="(max-width: 640px) 33vw,
                   (max-width: 768px) 20vw,
                   (max-width: 1024px) 16.66vw,
                   12.5vw"
          />
        </div>
      </div>
    );
  }
);
ProductCard.displayName = "ProductCard";

// ---------- MAIN SLIDER ----------
function SliderProduct({
  slides,
  options,
  autoplayDelay = 3000,
}: {
  slides: any[];
  options?: EmblaOptionsType;
  autoplayDelay?: number;
}) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    ...options,
  });

  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const isPaused = useRef(false);

  const startAutoplay = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      if (!isPaused.current) emblaApi?.scrollNext();
    }, autoplayDelay);
  }, [emblaApi, autoplayDelay]);

  const stopAutoplay = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
  }, []);

  // Handle visibility change (pause autoplay ketika tab tidak aktif)
  useEffect(() => {
    const handleVisibility = () => {
      isPaused.current = document.hidden;
    };
    document.addEventListener("visibilitychange", handleVisibility);
    return () =>
      document.removeEventListener("visibilitychange", handleVisibility);
  }, []);

  // Setup autoplay
  useEffect(() => {
    if (!emblaApi) return;

    startAutoplay();

    emblaApi.on("pointerDown", () => {
      isPaused.current = true;
      stopAutoplay();
    });

    emblaApi.on("pointerUp", () => {
      isPaused.current = false;
      startAutoplay();
    });

    return stopAutoplay;
  }, [emblaApi, startAutoplay, stopAutoplay]);

  return (
    <div
      className="relative w-full mx-auto bg-gray-100"
      onMouseEnter={() => (isPaused.current = true)}
      onMouseLeave={() => (isPaused.current = false)}
    >
      <div className="overflow-hidden px-4 sm:px-6 lg:px-8" ref={emblaRef}>
        <div className="-mx-2 flex will-change-transform">
          {slides.map((item, index) => (
            <ProductCard key={index} item={item} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default memo(SliderProduct);
