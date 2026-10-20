"use client";

import React, {
  useCallback,
  useEffect,
  useState,
  useRef,
  memo,
} from "react";
import useEmblaCarousel from "embla-carousel-react";
import { EmblaOptionsType } from "embla-carousel";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ProductMaster from "./PageProduct/ProductMaster";

type SliderProps = {
  slides: any[];
  options?: EmblaOptionsType;
  autoplayDelay?: number;
  lang: string;
};

/* ---------- CHILD ---------- */
const ProductCard = memo(({ item, lang }: any) => (
  <div className="p-2 flex-[0_0_50%] sm:flex-[0_0_50%] md:flex-[0_0_25%] lg:flex-[0_0_20%]">
    <ProductMaster
      data={item}
      promoted_badge={false}
      is_slider={1}
      discount_label={0}
      lang={lang}
    />
  </div>
));
ProductCard.displayName = "ProductCard";

/* ---------- MAIN ---------- */
function SliderProduct({
  slides,
  options,
  autoplayDelay = 3000,
  lang,
}: SliderProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    ...options,
  });

  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const isPaused = useRef(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const isMobile =
    typeof window !== "undefined" && window.innerWidth < 768;

  /* ---------- SCROLL ---------- */
  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  /* ---------- AUTOPLAY (TETAP ADA) ---------- */
  const startAutoplay = useCallback(() => {
    if (intervalRef.current || isMobile) return;

    intervalRef.current = setInterval(() => {
      if (!isPaused.current) emblaApi?.scrollNext();
    }, autoplayDelay);
  }, [emblaApi, autoplayDelay, isMobile]);

  const stopAutoplay = useCallback(() => {
    if (!intervalRef.current) return;
    clearInterval(intervalRef.current);
    intervalRef.current = null;
  }, []);

  /* ---------- VISIBILITY ---------- */
  useEffect(() => {
    const handleVisibility = () => {
      isPaused.current = document.hidden;
    };
    document.addEventListener("visibilitychange", handleVisibility);
    return () =>
      document.removeEventListener("visibilitychange", handleVisibility);
  }, []);

  /* ---------- INTERSECTION OBSERVER ---------- */
  useEffect(() => {
    if (!containerRef.current || !emblaApi) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          startAutoplay();
        } else {
          stopAutoplay();
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [emblaApi, startAutoplay, stopAutoplay]);

  /* ---------- EMBLA EVENTS ---------- */
  useEffect(() => {
    if (!emblaApi) return;

    emblaApi.on("select", onSelect);

    emblaApi.on("pointerDown", () => {
      isPaused.current = true;
      stopAutoplay();
    });

    emblaApi.on("pointerUp", () => {
      isPaused.current = false;
      startAutoplay();
    });

    onSelect();

    return stopAutoplay;
  }, [emblaApi, onSelect, startAutoplay, stopAutoplay]);

  /* ---------- LIMIT SLIDES ---------- */
  const visibleSlides = slides.slice(0, 10);

  return (
    <div
      ref={containerRef}
      className="relative w-full max-w-6xl mx-auto"
      onMouseEnter={() => (isPaused.current = true)}
      onMouseLeave={() => (isPaused.current = false)}
    >
      <button
        aria-label="Previous slide"
        onClick={scrollPrev}
        disabled={!canScrollPrev}
        className="absolute left-0 top-1/2 z-10 -translate-y-1/2 bg-white/70 rounded-full p-2 disabled:hidden"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex will-change-transform">
          {visibleSlides.map((item, index) => (
            <ProductCard key={item.id ?? index} item={item} lang={lang} />
          ))}
        </div>
      </div>

      <button
        aria-label="Next slide"
        onClick={scrollNext}
        disabled={!canScrollNext}
        className="absolute right-0 top-1/2 z-10 -translate-y-1/2 bg-white/70 rounded-full p-2 disabled:hidden"
      >
        <ChevronRight className="w-6 h-6" />
      </button>
    </div>
  );
}

export default memo(SliderProduct);
