"use client";

import { useState } from "react";
import Image from "next/image";

export const products = [
  {
    id: 1,
    name: "Honeywell H910V+",
    image: "/images/distributor-masker-respirator/Honeywell-H910+.jpg",
  },
  {
    id: 2,
    name: "Honeywell H910CV",
    image: "/images/distributor-masker-respirator/H910CV.jpg",
  },
  {
    id: 3,
    name: "3M 8210",
    image: "/images/distributor-masker-respirator/3M-8210.jpg",
  },
  {
    id: 4,
    name: "3M 9501 KN95",
    image: "/images/distributor-masker-respirator/3M-9501-KN95.jpg",
  },
  {
    id: 5,
    name: "3M 9501V+",
    image: "/images/distributor-masker-respirator/3M-9501+.jpg",
  },
  {
    id: 6,
    name: "Honeywell H801",
    image: "/images/distributor-masker-respirator/Honeywell-H801.jpg",
  },
];

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);

  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? products.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrent((prev) => (prev === products.length - 1 ? 0 : prev + 1));
  };

  const product = products[current];

  return (
    <div className="space-y-6">
      {/* Hero Image */}
      <div className="relative group">
        {/* Previous Button */}
        <button
          type="button"
          onClick={prevSlide}
          className="absolute left-0 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-[#46B049] text-xl text-white shadow transition hover:bg-[#37903b]"
        >
          ‹
        </button>

        {/* Main Image */}
        <div className="flex min-h-[420px] flex-col items-center justify-center">
          <h3 className="mt-6 text-xl font-semibold text-gray-800">
            {product.name}
          </h3>
          <Image
            src={product.image}
            alt={product.name}
            width={500}
            height={500}
            priority
            className="max-h-[340px] w-auto object-contain"
          />
        </div>

        {/* Next Button */}
        <button
          type="button"
          onClick={nextSlide}
          className="absolute right-0 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-[#46B049] text-xl text-white shadow transition hover:bg-[#37903b]"
        >
          ›
        </button>
      </div>

      {/* Thumbnail List */}
      <div className="mx-auto grid max-w-2xl grid-cols-3 gap-4 sm:grid-cols-6">
        {products.map((item, index) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setCurrent(index)}
            className={`flex aspect-square items-center justify-center rounded-xl border bg-white p-2 transition ${
              current === index
                ? "border-2 border-[#46B049] shadow-md"
                : "border-gray-200 hover:border-[#46B049]"
            }`}
          >
            <Image
              src={item.image}
              alt={item.name}
              width={80}
              height={80}
              className="max-h-full max-w-full object-contain"
            />
          </button>
        ))}
      </div>
    </div>
  );
}