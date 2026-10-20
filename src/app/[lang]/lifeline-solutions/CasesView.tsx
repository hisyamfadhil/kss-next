"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { baseUrl } from "@/utils/baseUrl";
import { getLifelineImage } from "@/utils/getLifelineImage";
import { characterLimiter } from "@/utils/characterLimiter";
import { ChevronUp } from "lucide-react";

interface CaseItem {
  slug: string;
  title: string;
  summary?: string;
  description?: string;
  content?: string;
  storage?: string;
  image_cover_small?: string;
  category_slug?: string;
}

interface CasesViewProps {
  casesList: CaseItem[];
  lang: string;
}

// Sub-komponen per kategori
function CaseCategorySection({
  title,
  items,
  lang,
}: {
  title: string;
  items: CaseItem[];
  lang: string;
}) {
  const [showAll, setShowAll] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  if (!items || items.length === 0) return null;

  // Tampilkan 3 item pertama secara default
  const visibleItems = showAll ? items : items.slice(0, 3);

  const handleCollapse = () => {
    // Scroll kembali tepat di atas judul section dengan kompensasi navbar
    sectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    setShowAll(false);
  };

  return (
    <section ref={sectionRef} className="pb-0 py-lg-5 mb-8 scroll-mt-36 relative">
      <div className="container mx-auto lg:px-4">
        {/* Judul Kategori Section */}
        <div className="border-b-2 border-gray-200 pb-2 mb-6">
          <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
        </div>

        {/* Layout relatif untuk menampung Tombol Sticky di Kiri */}
        <div className="relative">
          {/* Tombol Bulat Hijau Sticky di Kiri Luar Card (Hanya muncul jika showAll = true) */}
          {showAll && (
            <div className="absolute -left-14 top-0 h-full pointer-events-none hidden xl:block z-30">
              {/* top-44 memberikan jarak yang cukup di bawah navbar hijau agar tombol tidak kependem */}
              <div className="sticky top-44 pointer-events-auto">
                <button
                  type="button"
                  onClick={handleCollapse}
                  title="Tampilkan Lebih Sedikit & Ke Atas"
                  className="w-12 h-12 rounded-full bg-[#46b049] flex items-center justify-center text-white shadow-xl hover:bg-[#3d9c40] transition-all transform hover:scale-110 active:scale-95"
                >
                  <ChevronUp size={24} />
                </button>
              </div>
            </div>
          )}

          {/* Struktur 3 Kolom Berjajar Samping */}
          <ul className="cards grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 !p-0 !m-0">
            {visibleItems.map((item, index) => {
              const summaryText =
                item.summary ||
                item.description ||
                item.content?.replace(/<[^>]*>?/gm, "") ||
                "";

              return (
                <li key={index} className="list-none !w-full !m-0">
                  <Link
                    href={baseUrl(`/lifeline-solutions/cases/${item.slug}`, lang)}
                    className="card block relative overflow-hidden !w-full"
                  >
                    <Image
                      src={getLifelineImage(item.storage, item.image_cover_small)}
                      alt={item.title}
                      className="card__image w-full h-[280px] object-cover"
                      width={400}
                      height={400}
                      priority={index < 3}
                      loading={index < 3 ? "eager" : "lazy"}
                      fetchPriority={index < 3 ? "high" : "auto"}
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      quality={60}
                    />

                    <div className="card__overlay">
                      <div className="card__header !p-4 !flex !items-center !gap-3">
                        <svg className="card__arc" xmlns="http://www.w3.org/2000/svg">
                          <path />
                        </svg>
                        <Image
                          className="card__thumb !w-10 !h-10 !m-0 !static"
                          src="https://sandbox.kurniasafety.com/uploads/profile/avatar_6168727da25e03-95688106-96130947.jpg"
                          alt="Card Thumb"
                          width={100}
                          height={100}
                          priority={index < 3}
                        />
                        <div className="card__header-text !m-0 !p-0 flex-1">
                          <h2 className="card__title !m-0 !text-sm text-white font-bold leading-tight">
                            {item.title}
                          </h2>
                        </div>
                      </div>
                      <p className="card__description !text-sm text-white/90 !mt-2 !mb-0 leading-tight">
                        {characterLimiter(summaryText, 100)}
                      </p>
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Tombol Utama di Kanan Bawah */}
        {items.length > 3 && (
          <div className="mt-6 flex justify-end">
            <button
              type="button"
              onClick={() => {
                if (showAll) {
                  handleCollapse();
                } else {
                  setShowAll(true);
                }
              }}
              className="rounded-lg bg-[#46b049] px-6 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-[#3d9c40] transition-colors"
            >
              {showAll ? "Tampilkan Lebih Sedikit" : "Lihat Lebih Lanjut"}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

export default function CasesView({ casesList, lang }: CasesViewProps) {
  // Filter data berdasarkan kategori/judul sistem
  const horizontalCases = casesList.filter(
    (item) =>
      item.title?.toLowerCase().includes("horizontal") ||
      item.category_slug === "horizontal"
  );

  const verticalCases = casesList.filter(
    (item) =>
      item.title?.toLowerCase().includes("vertical") ||
      item.category_slug === "vertical"
  );

  const overheadCases = casesList.filter(
    (item) =>
      item.title?.toLowerCase().includes("overhead") ||
      item.category_slug === "overhead"
  );

  const otherCases = casesList.filter(
    (item) =>
      !horizontalCases.includes(item) &&
      !verticalCases.includes(item) &&
      !overheadCases.includes(item)
  );

  return (
    <main className="max-w-6xl mx-auto px-6 py-12">
      {/* Header Halaman Cases */}
      <div className="mb-10 container mx-auto lg:px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-3">
          Projek Pemasangan Lifeline System
        </h1>
        <p className="text-gray-600 leading-relaxed max-w-4xl">
          Halaman ini menampilkan studi kasus nyata yang telah ditangani oleh tim Height System Specialist kami. Berbagai contoh instalasi lifeline yang pernah kami kerjakan mencakup horizontal lifeline, vertical lifeline, overhead lifeline, dan roofing system, dengan solusi yang disesuaikan berdasarkan kebutuhan serta kondisi area kerja masing-masing proyek.
        </p>
      </div>

      {/* 1. Bagian Horizontal Lifeline System */}
      <CaseCategorySection
        title="Horizontal Lifeline System"
        items={horizontalCases.length > 0 ? horizontalCases : casesList}
        lang={lang}
      />

      {/* 2. Bagian Vertical Lifeline System */}
      <CaseCategorySection
        title="Vertical Lifeline System"
        items={verticalCases}
        lang={lang}
      />

      {/* 3. Bagian Overhead Lifeline System */}
      <CaseCategorySection
        title="Overhead Lifeline System"
        items={overheadCases}
        lang={lang}
      />

      {/* Bagian Lainnya (jika ada sisa) */}
      {otherCases.length > 0 && horizontalCases.length > 0 && (
        <CaseCategorySection
          title="Projek Pemasangan Lainnya"
          items={otherCases}
          lang={lang}
        />
      )}
    </main>
  );
}