import MarketingCard from "@/app/[lang]/resource-centre/MarketingCard"
import { getGatedContentData } from "@/app/lib/api"
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
    title: "Resource Centre",
    description: isId
      ? "Selamat datang di resource center kami. Di sini kami akan menyediakan template dan checklist gratis. Mohon diisi data diri untuk download dokumen"
      : "Welcome to our resource center. In this platform we provide free documents and templates for you to download. Please fill in the form to get your document",
    alternates: {
      canonical: baseUrl("/resource-centre", lang),
      languages: {
        en: baseUrl("/resource-centre", "en"),
        id: baseUrl("/resource-centre", "id"),
        "x-default": baseUrl("/resource-centre", "id"),
      },
    },
  };
}

export default async function webmaster({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const lang_id = lang === "id" ? "2" : "1";
  let getGatedContent = await getGatedContentData(lang_id);

  let items: any = getGatedContent.resultGatedContent || []

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
              Resource Centre
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
                Welcome to Kurnia Safety Resource Centre. A simple hub to access free safety content for your workplace.
              </p>

              <p className="text-gray-600">
                This page is for customers and safety teams who want practical resources from Kurnia Safety. Download PPE checklists, emergency eyewash guides, safety tips, and other educational materials after filling in a short form.
              </p>

              <p className="text-gray-600">
                These resources help you choose the right equipment, support staff training, and build safer work practices.
              </p>

              <p className="text-gray-600 pt-2">
                If you need other content for your team or training program, please contact Kurnia Safety through
                <Link
                  href={`mailto:webmaster@kurniasafety.com`}
                  className="hover:underline mx-1 text-green-600"
                >
                  webmaster@kurniasafety.com
                </Link>
              </p>
            </>
          ) : (
            <>
              <p className="text-gray-600">
                Selamat datang di Kurnia Safety Resource Centre. Sebuah pusat sederhana untuk mengakses konten keselamatan gratis bagi tempat kerja Anda.
              </p>


              <p className="text-gray-600">
                Halaman ini ditujukan untuk pelanggan dan tim keselamatan yang membutuhkan sumber daya praktis dari Kurnia Safety. Unduh daftar periksa APD, panduan emergency eyewash, tips keselamatan, dan materi edukasi lainnya setelah mengisi formulir singkat.
              </p>


              <p className="text-gray-600">
                Resource Centre ini dibuat untuk membantu Anda memilih peralatan yang tepat, mendukung pelatihan karyawan, dan membangun praktik kerja yang lebih aman.
              </p>

              <p className="text-gray-600 pt-2">
                Jika Anda membutuhkan konten lain untuk tim atau program pelatihan Anda, silakan hubungi Kurnia Safety melalui
                <Link
                  href={`mailto:webmaster@kurniasafety.com`}
                  className="hover:underline mx-1 text-green-600"
                >
                  webmaster@kurniasafety.com
                </Link>
              </p>
            </>
          )}
        </div>
      </section>
      <section className="bg-gray-100">
        <div className="max-w-6xl mx-auto px-6 pb-16">
          <div className="grid md:grid-cols-3 gap-10">

            {items.map((item: any, index: number) => (
              <MarketingCard key={index} {...item} />
            ))}
          </div>
        </div>

      </section>
    </>
  )
}