"use client";

import React, { useState, useEffect, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { EmblaOptionsType } from "embla-carousel";
import Image from "next/image";
import Thumbnail from "@/app/[lang]/product/Thumbnail";

type SliderProps = {
  slides: string[];
  options?: EmblaOptionsType;
};

export default function Slider({ slides, options }: SliderProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel(options);
  const [emblaThumbsRef, emblaThumbsApi] = useEmblaCarousel({ containScroll: "keepSnaps", dragFree: true });
  const [selectedIndex, setSelectedIndex] = useState(0);

  // Sinkronisasi slide utama dengan thumbnail
  const onThumbClick = useCallback(
    (index: number) => {
      if (!emblaApi || !emblaThumbsApi) return;
      emblaApi.scrollTo(index);
    },
    [emblaApi, emblaThumbsApi]
  );

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());
    emblaApi.on("select", onSelect);
    onSelect();
  }, [emblaApi]);

  return (
    <div className="w-full">
      {/* Slider utama */}
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {slides.map((src, index) => (
            <div key={index} className="min-w-full">
              <Image
                src={src}
                alt={`Slide ${index}`}
                width={800}
                height={500}
                className="object-cover w-full h-auto"
                fetchPriority={index === 0 ? "high" : "auto"}  // Jika loading true, beri high priority
              />
            </div>
          ))}
        </div>
      </div>

      {/* Thumbnails */}
      <div className="mt-4 overflow-hidden" ref={emblaThumbsRef}>
        <div className="flex gap-2">
          {slides.map((src, index) => (
            <Thumbnail
              key={index}
              src={src}
              selected={index === selectedIndex}
              onClick={() => onThumbClick(index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
