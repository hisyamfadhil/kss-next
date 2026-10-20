"use client";

import { useState } from "react";
import Image from "next/image";

const images = [
  "/images/distributor-masker-respirator/masker-kn95-honeywell-1.png",
  "/images/distributor-masker-respirator/masker-kn95-honeywell-2.png",
  "/images/distributor-masker-respirator/masker-kn95-honeywell-3.png",
  "/images/distributor-masker-respirator/masker-kn95-honeywell-4.jpg",
];

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);

  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrent((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="space-y-6">
      <div className="relative group">
        {/* Previous */}
        <button
          onClick={prevSlide}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-[#46B049] flex items-center justify-center shadow text-white text-lg hover:bg-[#46B049]/80 transition opacity-70 group-hover:opacity-100"
        >
          ‹
        </button>

        {/* Image */}
        <div className="flex items-center justify-center min-h-[340px]">
          <Image
            src={images[current]}
            alt={`Masker ${current + 1}`}
            width={500}
            height={320}
            className="max-h-[320px] w-auto object-contain"
            priority
          />
        </div>

        {/* Next */}
        <button
          onClick={nextSlide}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-[#46B049] flex items-center justify-center shadow text-white text-lg hover:bg-[#46B049]/80 transition opacity-70 group-hover:opacity-100"
        >
          ›
        </button>
      </div>

      {/* Thumbnail */}
      <div className="grid grid-cols-4 gap-4 max-w-md mx-auto">
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`aspect-square rounded-xl p-2 flex items-center justify-center transition border bg-white ${
              current === index
                ? "border-2 border-[#46B049]"
                : "border-[#46B049]/80"
            }`}
          >
            <Image
              src={image}
              alt={`Thumbnail ${index + 1}`}
              width={90}
              height={90}
              className="max-h-full max-w-full object-contain"
            />
          </button>
        ))}
      </div>
    </div>
  );
}