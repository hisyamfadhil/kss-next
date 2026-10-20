"use client";

import SliderSingleImage from "@/app/[lang]/components/home/SliderSingleImage";
import Link from "next/link";

interface OurProjectsProps {
  lang: string;
}

export default function OurProjects({ lang }: OurProjectsProps) {
  // GAMBAR DI SINI
  const projectSlides = [
    {
      image: "@static/life-line/hss-asset-image-about-us.png",
      image_mobile: "@static/life-line/hss-asset-image-about-us.png",
      title: "Proyek 1"
    },
    {
      image: "@static/life-line/Banner-HSS-1c.jpg",
      image_mobile: "@static/life-line/hss-mobile-banner.jpg",
      title: "Proyek 2"
    },
  ];

  return (
    <section className="max-w-6xl mx-auto px-6 py-8">
      {/* Header: Judul & Tombol Projek Lainnya */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
        <h2 className="text-3xl font-bold text-gray-900">Projek Kami</h2>
        <Link
          href={`/${lang}/lifeline-solutions`}
          className="mt-3 sm:mt-0 inline-block bg-[#46b049] hover:bg-[#3d9c40] text-white font-medium px-6 py-2.5 rounded-md transition-colors text-center w-fit"
        >
          Projek Lainnya
        </Link>
      </div>

      {/* Deskripsi Teks */}
      <p className="text-gray-600 mb-8 leading-relaxed max-w-4xl">
        Height system specialist kami telah tersertifikasi TKBT dan memiliki pengalaman mendalam dalam instalasi lifeline, memastikan keselamatan Anda dan seluruh pekerja terjamin di setiap titik kerja.
      </p>

      {/* Gambar Slider */}
      <div className="rounded-xl overflow-hidden shadow-md bg-white">
        <SliderSingleImage slides={projectSlides} autoplayDelay={5000} />
      </div>
    </section>
  );
}