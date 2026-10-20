"use client";
import { useRef } from "react";
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


const message = "Halo. Saya menemukan kurniasafety.com dan ingin bertanya seputar masker/respirator. Mohon dibantu. Terima kasih!";

const whatsappLink = `https://wa.me/6281111311192?text=${encodeURIComponent(message)}`;

export default function ProductCarousel() {
    const sliderRef = useRef<HTMLDivElement>(null);

    const scroll = (direction: "left" | "right") => {
        if (!sliderRef.current) return;

        const card = sliderRef.current.firstElementChild as HTMLElement;

        const gap = 24; // gap-6 = 24px
        const amount = card.offsetWidth + gap;

        sliderRef.current.scrollBy({
            left: direction === "right" ? amount : -amount,
            behavior: "smooth",
        });
    };
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-[#C4C4C4]/16" id="products">
            <h2 className="text-2xl sm:text-3xl font-bold text-center text-slate-900 py-10 ">
                Temukan Masker/Respirator Tujuan Anda 
            </h2>
            <div className="relative group">
                {/* Prev */}
                <button
                    onClick={() => scroll("left")}
                    className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white border shadow-md flex items-center justify-center hover:bg-gray-50"
                >
                    ‹
                </button>

                {/* Slider */}
                <div
                    ref={sliderRef}
                    className="flex overflow-x-auto gap-6 snap-x snap-mandatory scroll-smooth pb-6 pb-6
                    [scrollbar-width:none] [-ms-overflow-style:none]
                    [&::-webkit-scrollbar]:hidden"
                >
                    {products.map((product) => (
                        <div
                            key={product.id}
                            className="w-full sm:w-[calc(50%-12px)] md:w-[calc(33.333%-16px)] shrink-0 snap-start rounded-xl p-5 flex flex-col items-center text-center"
                        >
                            <h3 className="mt-4 font-semibold">{product.name}</h3>
                            <Image
                                src={product.image}
                                alt={product.name}
                                width={250}
                                height={250}
                            />
                        </div>
                    ))}
                </div>

                {/* Next */}
                <button
                    onClick={() => scroll("right")}
                    className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white border shadow-md flex items-center justify-center hover:bg-gray-50"
                >
                    ›
                </button>
            </div>
        </div>
    );
}