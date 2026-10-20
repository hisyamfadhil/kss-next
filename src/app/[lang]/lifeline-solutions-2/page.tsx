import Image from 'next/image';
import { imageBaseUrl } from '@/utils/baseUrl';
import { getTranslations } from "@/app/lib/getTranslations";
import { t } from "@/app/lib/t";
import { Metadata } from "next";
import NavbarLifeline from './NavbarLifeline';

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


        <section className="wpb_row row-fluid section-padd overflow-hidden p-[50px]">
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
              </div> */}

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


              {/* Teks di kanan untuk desktop, di atas gambar untuk mobile */}
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
        </section>

        <section className="row-o-equal-height section-padd p-[50px]" style={{ backgroundColor: "#f0f2f5" }}>
          <div className="container mx-auto lg:px-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Judul Why HSS */}
              <div className="mb-[1.875rem]">
                <a className="block group cursor-pointer">
                  <div className="p-5">
                    <h2 className="text-[#46b049] text-3xl font-semibold">Why HSS?</h2>
                  </div>
                </a>
              </div>

              {/* Card 1 */}
              <div className="mb-[1.875rem]">
                <div className="h-full border-0 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 p-5 bg-white">
                  <Image
                    src={imageBaseUrl("@static/life-line/icon/icon_principal_support.svg")}
                    alt="Principal Support"
                    width={50}
                    height={55}
                    className="mt-2 mb-4"
                  />
                  <h3 className="text-left text-lg font-semibold mb-2">Principle Support</h3>
                  <p className="text-sm text-gray-700 leading-relaxed">
                    HSS didukung oleh berbagai brand ternama. Dukungan ini mencakup ketersediaan produk, pengetahuan produk, hingga dukungan teknis.
                  </p>
                </div>
              </div>

              {/* Card 2 */}
              <div className="mb-[1.875rem]">
                <div className="h-full border-0 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 p-5 bg-white">
                  <Image
                    src={imageBaseUrl("@static/life-line/icon/icon_expert_team.svg")}
                    alt="Expert Team"
                    width={50}
                    height={55}
                    className="mt-2 mb-4"
                  />
                  <h3 className="text-left text-lg font-semibold mb-2">Expert Team</h3>
                  <p className="text-sm text-gray-700 leading-relaxed">
                    Kami memiliki tim yang berpengalaman dan telah melakukan instalasi di berbagai industri dengan kondisi lapangan yang beragam.
                  </p>
                </div>
              </div>

              {/* Card 3 */}
              <div className="mb-[1.875rem]">
                <div className="h-full border-0 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 p-5 bg-white">
                  <Image
                    src={imageBaseUrl("@static/life-line/icon/icon_full_service.svg")}
                    alt="Full of Service"
                    width={50}
                    height={55}
                    className="mt-2 mb-4"
                  />
                  <h3 className="text-left text-lg font-semibold mb-2">Full of Service</h3>
                  <p className="text-sm text-gray-700 leading-relaxed">
                    Pelayanan terencana yang dimulai dari Roof Assesment & Evaluation, Plan of Action & Program of Requirements, Installation & Implementation, Training & Education, dan Test & Inspection.
                  </p>
                </div>
              </div>

              {/* Card 4 */}
              <div className="mb-[1.875rem]">
                <div className="h-full border-0 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 p-5 bg-white">
                  <Image
                    src={imageBaseUrl("@static/life-line/icon/icon_stock_availability.svg")}
                    alt="Stock Availability"
                    width={50}
                    height={55}
                    className="mt-2 mb-4"
                  />
                  <h3 className="text-left text-lg font-semibold mb-2">Stock Availability</h3>
                  <p className="text-sm text-gray-700 leading-relaxed">
                    Keunggulan kami tidak hanya terletak pada pengalaman instalasi, tetapi juga pada ketersediaan produk kami. Hal ini yang menjadikan proses instalasi menjadi lebih cepat dan optimal.
                  </p>
                </div>
              </div>

              {/* Card 5 */}
              <div className="mb-[1.875rem]">
                <div className="h-full border-0 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 p-5 bg-white">
                  <Image
                    src={imageBaseUrl("@static/life-line/icon/icon_accreditation.svg")}
                    alt="Accreditation"
                    width={40}
                    height={55}
                    className="mt-2 mb-4"
                  />
                  <h3 className="text-left text-lg font-semibold mb-2">Accreditation</h3>
                  <p className="text-sm text-gray-700 leading-relaxed">
                    Tim kami telah tersertifikasi oleh semua brand yang bekerjasama dengan kami dan juga kami memiliki sertifikat TKBT (Teknik Kerja Bangunan Tinggi)
                  </p>
                </div>
              </div>
            </div>

          </div>
        </section>
        <section className="py-[50px] px-[20px]">
          <h2 className="text-center text-[#46b049] text-2xl font-semibold mt-5 mb-5">
            Trusted by great companies
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 place-items-center">
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
        </section>
      </main >
    </>
  );
};

export default LifelineSolution;