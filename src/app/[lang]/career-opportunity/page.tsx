import CareerCard from "@/app/[lang]/career-opportunity/CareerCard"
import { getCareerOpportunityData } from "@/app/lib/api"
import Image from "next/image";
import { baseUrl, imageBaseUrl } from '@/utils/baseUrl';
import Link from "next/link";
import { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;

  const isId = lang === "id";

  return {
    title: isId ? "Peluang Karier" : "Career Opportunity",
    description: isId
      ? "Sedang mencari lowongan kerja? Temukan peluang karir kamu di Kurnia Safety Supplies, yuk apply sesuai pilihan role kamu disini"
      : "Looking for a job opportunity?  Find a career spot in Kurnia Safety Supplies. Choose and apply a job role that suits your industry. Learn with us!",
    alternates: {
      canonical: baseUrl("/career-opportunity", lang),
      languages: {
        en: baseUrl("/career-opportunity", "en"),
        id: baseUrl("/career-opportunity", "id"),
        "x-default": baseUrl("/career-opportunity", "id"),
      },
    },
  };
}

export default async function careerOpportunity({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const lang_id = lang === "id" ? "2" : "1";
  let getCareerOpportunity = await getCareerOpportunityData(lang_id);

  let items: any = getCareerOpportunity.resultCareerOpportunity || []

  return (
    <>
      <section className="max-w-6xl mx-auto px-6 pt-16">

        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-4 mb-5">
            <Image
              src={imageBaseUrl("@static/img/about/kss--left.png")}
              alt="kss left decorative"
              width={38}
              height={77}
              priority={false}
              decoding="async"
              loading="lazy"
              aria-hidden="true"
              role="presentation"
            />
            <h1 className="text-4xl font-bold">
              Career Opportunity
            </h1>
            <Image
              src={imageBaseUrl("@static/img/about/kss--right.png")}
              alt="kss right decorative"
              width={38}
              height={77}
              priority={false}
              decoding="async"
              loading="lazy"
              aria-hidden="true"
              role="presentation"
            />
          </div>
          {lang_id == "1" ? (
            <>
              <p className="text-gray-600">
                Welcome to Kurnia Safety Career Page. We are glad to invite you to be a part of our group. Please fill in the details if you find any opportunities that suit you.
              </p>
            </>
          ) : (
            <>
              <p className="text-gray-600">
                Selamat datang di Halaman Karir Kurnia Safety. Kami dengan senang hati mengundang Anda untuk menjadi bagian dari grup kami. Silakan isi data Anda jika Anda menemukan peluang yang sesuai dengan bidang Anda.
              </p>
            </>
          )}
        </div>
      </section>
      <section className="bg-gray-100">
        {items.length > 0 ? (
          <div className="max-w-6xl mx-auto px-6 pb-16">
            <div className="grid md:grid-cols-3 gap-10 m-3 p-3">
              {
                items.map((item: any, index: number) => (
                  <CareerCard key={index} {...item} />
                ))
              }
            </div>
          </div>
        ) : lang_id == "1" ? (
          <p className="text-gray-600 text-center p-5">
            Sorry, currently we don't have available jobs. Please come and visit this page on another day.
          </p>
        ) : (
          <p className="text-gray-600 text-center p-5">
            Maaf, kami sedang tidak membuka lowongan pekerjaan. Mohon mencoba di lain hari.
          </p>
        )}

      </section>
    </>
  )
}