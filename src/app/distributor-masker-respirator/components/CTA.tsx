"use client";
import Link from "next/link";
import {gtagReportConversion} from "@/app/distributor-masker-respirator/components/gtagReportConversion";

const message = "Halo. Saya menemukan kurniasafety.com dan ingin bertanya seputar masker/respirator. Mohon dibantu. Terima kasih!";

const whatsappLink = `https://wa.me/6281111311192?text=${encodeURIComponent(message)}`;

export default function CTASection() {
  return (
    <section className="bg-[#46B049] px-4 py-6 text-white shadow-xl">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 text-center md:flex-row md:text-left">
        <div className="space-y-1">
          <h3 className="text-lg font-bold sm:text-xl">
            Butuh Konsultasi Produk Masker KN95?
          </h3>

          <p className="text-xs sm:text-sm">
            Hubungi kami via WhatsApp untuk respon cepat.
          </p>
        </div>

        <Link
          href={whatsappLink}
          onClick={(e) => {
            e.preventDefault();
            gtagReportConversion(whatsappLink);
          }}
          target="_blank"
          rel="noopener noreferrer"
          className="shrink-0 rounded-lg bg-white px-6 py-3 font-bold text-black shadow transition hover:bg-slate-100"
        >
          Tanya Harga 
        </Link>
      </div>
    </section>
  );
}