import Image from 'next/image';
import { baseUrl, imageBaseUrl } from '@/utils/baseUrl';
import { getTranslations } from "@/app/lib/getTranslations";
import { t } from "@/app/lib/t";
import { Metadata } from "next";
import NavbarLifeline from './NavbarLifeline';
import { getLifelineImage } from '@/utils/getLifelineImage';
import { getLifelineData } from '@/app/lib/api';
import Link from "next/link";
import SliderClient from '@/app/[lang]/lifeline-solutions/SliderClient';

// export const metadata = {
//   title: "Lifeline",
//   description: "Lifeline",
// };

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const lang_id = lang === "id" ? "2" : "1";
  const dict = await getTranslations(lang_id);

  // const data = await getProductDetailData(lang_id, slug);
  return {
    title: t(dict, "hse"),
    description: `Jasa pemasangan lifeline system profesional dan bersertifikat TKBT. Mulai dari konsultasi, desain sistem, instalasi, hingga pengujian keselamatan.`,
    keywords: `${t(dict, "hse")}, Page`
  }
}
const LifelineSolution = async ({ params }: { params: Promise<{ lang: string }> }) => {
  const { lang } = await params;
  const lang_id = lang === "id" ? "2" : "1";
  const dict = await getTranslations(lang_id);
  const data = await getLifelineData(lang_id, "services");

  let clients = [
    "@static/life-line/logo-klien/hss-huntsman-logo.png",
    "@static/life-line/logo-klien/hss-map-chestation.png",
    "@static/life-line/logo-klien/hss-musi-hutan-persada.png",
    "@static/life-line/logo-klien/hss-ppli.png",
    "@static/life-line/logo-klien/hss-smart.png",
    "@static/life-line/logo-klien/hss-gemala-kempa-daya.png",
    "@static/life-line/logo-klien/hss-mondelez.png",
    "@static/life-line/logo-klien/alibaba-web-crop.png",
    "@static/life-line/logo-klien/panasonic-batam web-crop.png",
    "@static/life-line/logo-klien/AJINOMOTO.png",
    "@static/life-line/logo-klien/Indokomas.png",
    "@static/life-line/logo-klien/Sika.png",
    "@static/life-line/logo-klien/Sopo-Del-Tower.png",
    "@static/life-line/logo-klien/Yamaha-Motor-Parts-Karawang.png",
    "@static/life-line/logo-klien/Panasonic-Gobel.png",
    "@static/life-line/logo-klien/Abadi-Energi-Nabati.png",
    "@static/life-line/logo-klien/vision-ease.png",
    "@static/life-line/logo-klien/wings.png",
    "@static/life-line/logo-klien/CS2-Pola-Sehat.png",
    "@static/life-line/logo-klien/firmenich.png",
  ]
  return (
    <>
      <NavbarLifeline lang={lang} />
      <main>
        {/* <section className="ps-section--banner overflow-hidden">
          <Image className="item h-300px h-xl-400px" src={imageBaseUrl("@static/life-line/Banner-HSS-1c.jpg")} alt="Banner-HSS-1c" width={2000} height={300} fetchPriority="high" />
        </section> */}



        <section className="ps-section--banner overflow-hidden">
          <div className="relative w-full aspect-[2359/692]">
            <Image
              src={imageBaseUrl("@static/life-line/Banner-HSS-1c.jpg")}
              alt="Banner-HSS-1c"
              fill
              priority
              fetchPriority="high"
              className="object-cover"
              sizes="100vw"
            />
          </div>
        </section>


        {/* <section className="ps-section--banner-m overflow-hidden">
          <Image className="item" src={imageBaseUrl("@static/life-line/hss-mobile-banner.jpg")} alt="hss-mobile-banner" width={800} height={800} fetchPriority="high" />
        </section> */}

        <section className="ps-section--banner-m overflow-hidden relative h-[620px] sm:h-[660px]">
          <Image
            src={imageBaseUrl("@static/life-line/hss-mobile-banner.jpg")}
            alt="hss-mobile-banner"
            fill
            priority
            fetchPriority="high"
            className="object-cover"
            sizes="100vw"
          />
        </section>


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
                Jasa Pemasangan Lifeline System
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

            <p className="text-gray-600">
              Setiap pekerjaan di ketinggian butuh sistem yang teruji dan didukung ahli yang berpengalaman. Tim height system specialist kami menangani seluruh prosesnya secara menyeluruh, mulai dari inspeksi area kerja, konsultasi & perancangan sistem, instalasi, edukasi dan training APD, hingga evaluasi akhir. Pendekatan ini memastikan setiap titik kerja di ketinggian memenuhi standar keselamatan yang seharusnya.
            </p>
          </div>
        </section>

        <section className="bg-[#f0f2f5] py-8">
          <div className="max-w-6xl mx-auto px-6">
            <h2 className="text-3xl font-bold text-[#46b049]">Jasa yang kami sediakan</h2>
            <div className="mt-4">
              <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {data.resultByCategoryID.map((item: any, index: number) => (
                  <li key={index} className="overflow-hidden border-0 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 bg-white">
                    <Link
                      href={baseUrl(
                        `/lifeline-solutions/${data.resultBySlug.slug}/${item.slug}`,
                        lang
                      )}
                      className="block"
                    >
                      {/* Image */}
                      <div className="aspect-square overflow-hidden">
                        <Image
                          src={getLifelineImage(item.storage, item.image_cover_small)}
                          alt={item.title}
                          className="h-full w-full object-cover"
                          width={400}
                          height={400}
                          priority={index < 6}
                          loading={index < 6 ? "eager" : "lazy"}
                          fetchPriority={index < 6 ? "high" : "auto"}
                          sizes="
                          (max-width: 640px) 50vw,
                          (max-width: 1024px) 33vw,
                          25vw
                        "
                          quality={60}
                        />
                      </div>

                      {/* Text */}
                      <div className="p-3">
                        <h3 className="text-sm font-semibold text-gray-800">
                          {item.title}
                        </h3>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* <section className="wpb_row row-fluid section-padd overflow-hidden p-[50px]">
          <div className="container mx-auto lg:px-4">
            <div className="flex flex-col lg:flex-row items-center gap-4 lg:gap-5">
              {/* Gambar di kiri untuk desktop, di bawah teks untuk mobile */}
              {/* <div className="relative order-2 lg:order-1 lg:w-1/2 w-full">
                <Image
                  src={imageBaseUrl("@static/life-line/hss-asset-image-about-us.png")}
                  alt=""
                  width={500}
                  height={55}
                  className="relative w-full h-auto"
                  fetchPriority="high"
                />
              </div> *

              <div className="relative order-2 lg:order-1 lg:w-1/2 w-full aspect-[4/3]">
                <Image
                  src={imageBaseUrl("@static/life-line/hss-asset-image-about-us.png")}
                  alt="About us illustration"
                  fill
                  className="object-contain"
                  sizes="
                    (max-width: 640px) 360px,
                    (max-width: 768px) 420px,
                    (max-width: 1024px) 520px,
                    560px
                  "
                />
              </div>


              {/* Teks di kanan untuk desktop, di atas gambar untuk mobile *
              <div className="relative order-1 lg:order-2 lg:w-1/2 w-full">
                <h1 className="text-[#46b049] text-3xl font-semibold mb-4">
                  {t(dict, "about_us")}
                </h1>
                <p className="text-justify text-gray-700 leading-relaxed">
                  Kurnia Safety Supplies merupakan salah satu distributor Alat Pelindung Diri terbaik di Indonesia.
                  Demi menciptakan lingkungan kerja yang lebih aman, KSS telah mengembangkan divisi Height System Specialist (HSS)
                  yang ditujukan untuk menyediakan jasa pemasangan sistem bekerja di ketinggian atau lifeline system.
                  HSS merupakan divisi khusus yang dibuat untuk menjadi solusi dan mengakomodasi kebutuhan Anda dalam memenuhi
                  standar keselamatan bekerja di ketinggian.
                </p>
              </div>
            </div>

          </div>
        </section> */}

        <section className="bg-[#f0f2f5] py-8">
          <div className="max-w-6xl mx-auto px-6">
            <h2 className="text-3xl font-bold text-[#46b049]">Kenapa Pilih Kami?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3">

              <div className="space-y-5">

                <div className="border-0 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 bg-white p-6 m-3">
                  <div className="">
                    <Image
                      src={imageBaseUrl("@static/life-line/icon/icon_principal_support.svg")}
                      alt="Principal Support"
                      width={50}
                      height={55}
                      className="mt-2 mb-4 hidden"
                    />
                    <h3 className="font-serif text-xl text-gray-900 mb-2">
                      Principle Support
                    </h3>
                    <p className="text-sm text-gray-600">
                      HSS didukung oleh berbagai brand ternama. Dukungan ini mencakup ketersediaan produk, pengetahuan produk, hingga dukungan teknis.
                    </p>
                  </div>
                </div>

                <div className="border-0 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 bg-white p-6 m-3">
                  <div className="">
                    <h3 className="font-serif text-xl text-gray-900 mb-2">
                      Expert Team
                    </h3>
                    <p className="text-sm text-gray-600">
                      Kami memiliki tim yang berpengalaman dan telah melakukan instalasi di berbagai industri dengan kondisi lapangan yang beragam.
                    </p>
                    <Image
                      src={imageBaseUrl("@static/life-line/icon/icon_expert_team.svg")}
                      alt="Expert Team"
                      width={50}
                      height={55}
                      className="mt-2 mb-4 hidden"
                    />
                  </div>
                </div>
              </div>
              <div className="border-0 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 bg-white p-6 my-3">

                <div>
                  <h3 className="font-serif text-xl mb-3 text-gray-900">
                    Stock Availability
                  </h3>

                  <p className="text-sm text-gray-600 mb-8">
                    Keunggulan kami tidak hanya terletak pada pengalaman instalasi, tetapi juga pada ketersediaan produk kami. Hal ini yang menjadikan proses instalasi menjadi lebih cepat dan optimal.
                  </p>
                </div>

                <div className="flex justify-center text-4xl">
                  <Image
                    src={imageBaseUrl("@static/life-line/icon/Building safety-rafiki.svg")}
                    alt="Stock Availability"
                    width={250}
                    height={255}
                    className=""
                  />
                </div>
              </div>

              <div className="space-y-5">

                <div className="border-0 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 bg-white p-6 m-3">

                  <Image
                    src={imageBaseUrl("@static/life-line/icon/icon_full_service.svg")}
                    alt="Full of Service"
                    width={50}
                    height={55}
                    className="mt-2 mb-4 hidden"
                  />

                  <h3 className="font-serif text-xl text-gray-900 mb-3">
                    Full of Service
                  </h3>

                  <p className="text-sm text-gray-600 mb-6">
                    Pelayanan terencana yang dimulai dari Roof Assesment & Evaluation, Plan of Action & Program of Requirements, Installation & Implementation, Training & Education, dan Test & Inspection.
                  </p>

                </div>

                <div className="border-0 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 bg-white p-6 m-3">
                  <h3 className="font-serif text-xl text-gray-900 mb-3">
                    Accreditation
                  </h3>

                  <p className="text-sm text-gray-600 mb-6">
                    Tim kami telah tersertifikasi oleh semua brand yang bekerjasama dengan kami dan juga kami memiliki sertifikat TKBT (Teknik Kerja Bangunan Tinggi)
                  </p>
                  <Image
                    src={imageBaseUrl("@static/life-line/icon/icon_accreditation.svg")}
                    alt="Accreditation"
                    width={40}
                    height={55}
                    className="mt-2 mb-4 hidden"
                  />
                </div>

              </div>
            </div>
          </div>
        </section>

        <section className="py-[50px] px-[20px]">
          <div className="flex mx-auto max-w-6xl">
            <h2 className="w-1/3 text-[#46b049] text-2xl font-semibold mt-5 mb-5">
              Dipercaya Oleh Mereka
            </h2>
            <div className="w-2/3 ">
              <SliderClient slides={clients} />

            </div>
            <div className="hidden w-2/3 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 place-items-center">
              <SliderClient slides={clients} options={{ loop: true }} />

              {/* Item Logo */}
              {[
                "@static/life-line/logo-klien/hss-huntsman-logo.png",
                "@static/life-line/logo-klien/hss-map-chestation.png",
                "@static/life-line/logo-klien/hss-musi-hutan-persada.png",
                "@static/life-line/logo-klien/hss-ppli.png",
                "@static/life-line/logo-klien/hss-smart.png",
                "@static/life-line/logo-klien/hss-gemala-kempa-daya.png",
                "@static/life-line/logo-klien/hss-mondelez.png",
                "@static/life-line/logo-klien/alibaba-web-crop.png",
                "@static/life-line/logo-klien/panasonic-batam web-crop.png",
                "@static/life-line/logo-klien/AJINOMOTO.png",
                "@static/life-line/logo-klien/Indokomas.png",
                "@static/life-line/logo-klien/Sika.png",
                "@static/life-line/logo-klien/Sopo-Del-Tower.png",
                "@static/life-line/logo-klien/Yamaha-Motor-Parts-Karawang.png",
                "@static/life-line/logo-klien/Panasonic-Gobel.png",
                "@static/life-line/logo-klien/Abadi-Energi-Nabati.png",
                "@static/life-line/logo-klien/vision-ease.png",
                "@static/life-line/logo-klien/wings.png",
                "@static/life-line/logo-klien/CS2-Pola-Sehat.png",
                "@static/life-line/logo-klien/firmenich.png",
              ].map((path, index) => (
                <div key={index} className="text-center mb-[1.875rem]">
                  <div className="swap-image flex justify-center items-center">
                    <Image
                      className="object-contain transition-transform duration-300 hover:scale-105"
                      src={imageBaseUrl(path)}
                      alt={`Logo ${index}`}
                      width={150}
                      height={55}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#f0f2f5] py-8">
          <div className="max-w-6xl mx-auto px-6">
            <h2 className="text-3xl font-bold text-[#46b049]">Hubungi Kami </h2>
            <p>Ingin bertanya lebih lanjut terkait pemasangan lifeline system?  </p>
            <div className="grid grid-cols-1 md:grid-cols-2">

              <div className="space-y-5">

                <div className="border-0 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 bg-white p-6 m-3">
                  <div className="">
                    <Image
                      src={imageBaseUrl("@static/life-line/icon/icon_principal_support.svg")}
                      alt="Principal Support"
                      width={50}
                      height={55}
                      className="mt-2 mb-4 hidden"
                    />
                    <h3 className="font-serif text-xl text-gray-900 mb-2">
                    Konsultasi secara  langsung terkait pemasangan lifeline  
                    </h3>
                    <p className="text-sm text-gray-600">
                      Waktu Operasional 
                      </p>

                    <p className="text-sm text-gray-600">
                      Hari: Senin – Jumat 
                      </p>

                    <p className="text-sm text-gray-600">
                      Pukul: 08:00 – 17:00 WIB 
                    </p>
                    <a
                      href="https://wa.me/6281388225700?text=Halo%20saya%20ingin%20bertanya"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-6 inline-flex items-center gap-2 bg-green-500 text-white px-5 py-3 rounded-lg hover:bg-green-600"
                    >
                      0813-8822-5700
                    </a>
                  </div>
                </div>

              </div>

              <div className="space-y-5">

                <div className="border-0 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 bg-white p-6 m-3">


                  <h3 className="font-serif text-xl text-gray-900 mb-3">
                    Atau hubungi kami kepada email. 
                  </h3>

                  <p className="text-sm text-gray-600">
                    Waktu Operasional 
                    </p>

                  <p className="text-sm text-gray-600">
                    Hari: Senin – Jumat 
                    </p>

                  <p className="text-sm text-gray-600">
                    Pukul: 08:00 – 17:00 WIB                   
                  </p>
                  <a href="mailto:info@kurniasafety.com"
                    className="mt-6 inline-flex items-center gap-2 bg-green-500 text-white px-5 py-3 rounded-lg hover:bg-green-600"
                  >
                    info@kurniasafety.com
                  </a>
                </div>

              </div>
            </div>
          </div>
        </section>

      </main >
    </>
  );
};

export default LifelineSolution;