import { baseUrl, imageBaseUrl } from "@/utils/baseUrl";
import Image from "next/image";
import AccordionItem from "@/app/[lang]/components/Modals/Accordion";
import Link from "next/link";
import { getTranslations } from "@/app/lib/getTranslations";
import { t } from "@/app/lib/t";

export const metadata = {
  title: "FAQ",
  description: "FAQ Page",
  keywords: "FAQ, Page",
  alternates: {
    canonical: baseUrl("/faq", "en"),
    languages: {
      en: baseUrl("/faq", "en"),
      id: baseUrl("/faq", "id"),
      "x-default": baseUrl("/faq", "id"),
    },
  },
};
export default async function FAQ({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const lang_id = lang === "id" ? "2" : "1";
  const dict = await getTranslations(lang_id);
  const langKey = lang === "id" ? "id" : "en";

  const faqContent = {
    en: [
      {
        question: "What is KSS?",
        answer: (
          `
            KSS is one of the leading companies that offers safety solutions in manufacturing,
            construction, mining, oil and gas, petrochemical, plantation and traffic safety since 2003.
            We are specialized in providing Personal Protective Equipment (PPE), Footwear, Safety Clothing,
            Emergency Equipment, Fire Fighting Equipment, Road Safety Products, etc.
          `
        ),
      },
      {
        question: "What We Provide?",
        answer: (
          `
            We provide one stop solution, focusing on Personal Protective Equipment (PPE) including:
            <ol className="list-decimal list-inside space-y-1 mt-2 ml-4">
              <li>Head Protection</li>
              <li>Face Protection</li>
              <li>Eye Protection</li>
              <li>Ear Protection</li>
              <li>Respiratory Protection</li>
              <li>Hand Protection</li>
              <li>Protective Apparels</li>
              <li>Foot Protection</li>
              <li>Fall Protection</li>
              <li>Portable Eyewash & Safety Shower</li>
              <li>Detector Instruments</li>
              <li>Road Safety</li>
              <li>AED</li>
            </ol>
          `
        ),
      },
      {
        question: "How to Buy from KSS?",
        answer: (
          `
            To ask the product detail:
            <ol className="list-decimal list-inside space-y-1 mt-2 ml-4">
              <li>Browse the product that you need.</li>
              <li>Click image or title product</li>
              <li>Add the product quantity.</li>
              <li>Click “+ Quotation”</li>
              <li>Click "Browse Other Product or Click "Continue"</li>
              <li>Fill the form order, then click “Continue”.</li>
              <li>Our team will provide your quotation request in 1×24 hours (Max. 2×24 hours).</li>
            </ol>
          `
        ),
      },
    ],

    id: [
      {
        question: "Apa itu Kurnia Safety Supplies?",
        answer: (
          `
            PT. Kurnia Safety Supplies (KSS) adalah salah satu perusahaan terkemuka yang menawarkan solusi keamanan dalam manufaktur, konstruksi, pertambangan, minyak dan gas, petrokimia, perkebunan dan keselamatan lalu lintas sejak tahun 2003. Kami mengkhususkan diri dalam menyediakan Alat Pelindung Diri (APD), Alas Kaki, Pakaian Keselamatan, Peralatan Darurat, Peralatan Pemadam Kebakaran, Produk Keamanan Jalan, dll.
          `
        ),
      },
      {
        question: "Apa yang Kami Sediakan?",
        answer: (
          `
            Kami menyediakan solusi produk Alat Pelindung Diri yang lengkap, seperti:
            <ol className="list-decimal list-inside space-y-1 mt-2 ml-4">
              <li>Pelindung Kepala</li>
              <li>Pelindung Wajah</li>
              <li>Pelindung Mata</li>
              <li>Pelindung Telinga</li>
              <li>Perlindungan Pernafasan</li>
              <li>Pelindung Tangan</li>
              <li>Pakaian Pelindung</li>
              <li>Pelindung Kaki</li>
              <li>Alat Pelindung Jatuh</li>
              <li>Pencuci Mata portable</li>
              <li>Berbagai Alat Deteksi</li>
              <li>Alat Keselamatan Lalu Lintas</li>
              <li>AED</li>
            </ol>
          `
        ),
      },
      {
        question: "Bagaimana Cara Membeli Produk di Website KSS?",
        answer: (
          `
            Untuk menanyakan detail produk:
            <ol className="list-decimal list-inside space-y-1 mt-2 ml-4">
              <li>Cari produk yang anda butuhkan.</li>
              <li>Klik gambar atau nama produk</li>
              <li>Tambahkan jumlah produk&nbsp;</li>
              <li>Klik tombol "+ Penawaran"</li>
              <li>Klik "Cari Produk Lain" atau "Lanjutkan</li>
              <li>Isi formulir pemesanan, lalu pilih "Lanjutkan".</li>
              <li>Tim kami akan membalas email anda dalam 1x24 jam (maksimal 2x24jam).</li>
            </ol>
          `
        ),
      },
    ],
  };

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "Apa itu Kurnia Safety Supplies?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text":
                    "Kurnia Safety Supplies adalah salah satu perusahaan terkemuka yang menawarkan solusi keamanan dalammanufaktur, konstruksi, pertambangan, minyak dan gas, petrokimia, perkebunan dan keselamatan lalu lintas sejak tahun 2003. Kami mengkhususkan diri dalam menyediakan Alat Pelindung Diri (APD), Alas Kaki, Pakaian Keselamatan, Peralatan Darurat, Peralatan Pemadam Kebakaran, Produk Keamanan Jalan, dll."
                }
              },
              {
                "@type": "Question",
                "name": "Apa yang Kami Sediakan?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text":
                    "<ul><li>Pelindung Kepala</li><li>Pelindung Wajah</li><li>Pelindung Mata</li><li>Pelindung Telinga</li><li>Perlindungan Pernafasan</li><li>Pelindung Tangan</li><li>Pakaian Pelindung</li><li>Pelindung Kaki</li><li>Alat Pelindung Diri dari Ketinggian</li><li>Portable Eyewash dan Safety Shower</li><li>Berbagai Alat Deteksi</li><li>Alat Keselamatan Lalu Lintas</li></ul>"
                }
              },
              {
                "@type": "Question",
                "name": "Bagaimana Cara Membeli Produk di Website KSS?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text":
                    "Untuk menanyakan detail produk: <ul><li>Cari produk yang anda butuhkan</li><li>Klik tombol Tambah ke Keranjang</li><li>Klik ikon Keranjang</li><li>Masukan Jumlah Produk</li><li>Isi formulir pemesanan, lalu klik tombol kirim permintaan</li><li>Tim kami akan membalas email anda dalam 1x24 jam (maksimal 2x24 Jam)</li></ul>"
                }
              }
            ]
          })
        }}
        async
      />


      <div className="ps-about">
        <div className="container mx-auto lg:px-4">
          <ul className="ps-breadcrumb flex flex-wrap">
            <li className="ps-breadcrumb__item">
              <Link href={baseUrl("/", lang)}>
                {t(dict, "home")}
              </Link>
            </li>
            <li className="ps-breadcrumb__item text-[#46b049]" aria-current="page">
              FAQ
            </li>
          </ul>
          <h1 className="ps-about__title">
            FAQ
          </h1>
          <div className="ps-page__content">
            <section className="main-content__faq">
              <div className="container mx-auto lg:px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 items-start">
                  {/* Kolom kiri (gambar) */}
                  <div className="">
                    <Image
                      fetchPriority="high"
                      priority
                      src={imageBaseUrl("@static/img/modern-ui/question.jpg")}
                      alt="FAQ"
                      className="img-fluid"
                      width={380} height={450}
                    />
                  </div>

                  {/* Kolom kanan (accordion) */}
                  <div>
                    {faqContent[langKey].map((item: any, index: any) => (
                      <AccordionItem
                        key={index}
                        question={item.question}
                        answer={item.answer}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </section>
          </div>
          {/* <!-- separate sections --> */}
          <div className="ps-delivery-desktop"></div>
        </div>
      </div>
    </div>
  );
}
