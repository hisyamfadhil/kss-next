"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question:
      "Apakah Kurnia Safety melayani pembelian grosir / tender perusahaan?",
    answer:
      "Ya, kami adalah distributor resmi alat pelindung diri K3 yang melayani pengiriman ke seluruh Indonesia.",
  },
  {
    question:
      "Jenis masker seperti apa yang cocok untuk nyaring debu/partikel kecil?",
    answer:
      "Masker Honeywell KN95 H910V+ cukup digunakan untuk melindungi pekerja dari partikel kecil seperti debu di area pertambangan.",
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="bg-white py-16">
      <div className="mx-auto max-w-4xl px-4">
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-bold text-gray-900">
            Frequently Asked Questions
          </h2>
          <p className="mt-3 text-gray-600">
            Temukan jawaban atas pertanyaan yang paling sering diajukan oleh
            pelanggan Kurnia Safety.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={index}
                className="overflow-hidden rounded-xl border border-gray-200"
              >
                <button
                  type="button"
                  onClick={() =>
                    setOpenIndex(isOpen ? null : index)
                  }
                  className="flex w-full items-center justify-between bg-slate-50 px-6 py-5 text-left"
                >
                  <span className="text-lg font-semibold text-gray-900">
                    {faq.question}
                  </span>

                  <ChevronDown
                    className={`h-5 w-5 transition-transform duration-300 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                <div
                  className={`grid transition-all duration-300 ${
                    isOpen
                      ? "grid-rows-[1fr]"
                      : "grid-rows-[0fr]"
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="border-t border-gray-100 px-6 py-5 text-gray-600">
                      {faq.answer}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}