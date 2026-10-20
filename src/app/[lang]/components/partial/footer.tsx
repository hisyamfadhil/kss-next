import { Map, Phone, Mail } from "lucide-react";

import Link from 'next/link';
import { baseUrl } from '@/utils/baseUrl';
import { getTranslations } from "@/app/lib/getTranslations";
import { t } from "@/app/lib/t";
import WhatsappButton from "./WhatsappButton";

const Footer = async ({ data, lang_id }: { data: any, lang_id:string }) => {
  const lang = lang_id === "2" ? "id" : "";
  const dict = await getTranslations(lang_id);

  return (
    <>
      <footer className="ps-footer ps-footer--5">
        <div className="lg:container lg:mx-auto">
          <br />
          <div className="mb-[30px] grid grid-cols-1 md:grid-cols-5 gap-8 bg-black/10 md:pt-10 p-5 md:mx-4">
            {/* Kolom 1: About Company */}
            <div className="ps-footer--contact col-span-2">
              <h2 className="text-white mb-2">
                {t(dict, "about_company")}
              </h2>
              <div
                className="text-sm leading-relaxed about-footer pb-4"
                dangerouslySetInnerHTML={{
                  __html: data.resultSetting?.about_footer || "",
                }}
              />
            </div>

            {/* Kolom 2: Contact Info */}
            <div className="ps-footer--address col-span-2">
              <h2 className="text-white mb-2">
                {t(dict, "contact")} {t(dict, "information")}
              </h2>

              {data.resultSetting?.contact_address && (
                <p className="flex items-start gap-2">
                  <Map className="w-[5%] mb-4" />
                  <span className="w-[95%] mb-4">{data.resultSetting?.contact_address}</span>
                </p>
              )}

              {data.resultSetting?.contact_phone && (
                <p className="flex items-center gap-2">
                  <Phone className="w-[5%] mb-4" />
                  <span className="w-[95%] mb-4">Call Support & Sale: {data.resultSetting?.contact_phone}</span>
                </p>
              )}

              <p className="flex items-start gap-2">
                <Map className="w-[5%] mb-4" />
                <span className="w-[95%] mb-4">
                  Balikpapan: Centra Bizpark 2 Ruko Blok BRK No. 10-11, Jl. Kol. Syarifudin Yoes Sepinggan, Balikpapan 76114.
                </span>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-[5%] mb-4" /> <span className="w-[95%] mb-4">Call Support & Sale: 0542-8519888</span>
              </p>

              <p className="flex items-start gap-2">
                <Map className="w-[5%] mb-4" />
                <span className="w-[95%] mb-4">
                  Surabaya: Jl. Raya Taman Asri No. 21, RT.025 / RW.008, Kel. Tambak Sumur, Kec. Waru, Sidoarjo, Jawa Timur 61256.
                </span>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-[5%] mb-4" /> <span className="w-[95%] mb-4">Call Support & Sale: 031-35942018</span>
              </p>

              <p className="flex items-center gap-2">
                <Mail className="w-[5%]" />
                <Link className="w-[95%] underline" href="mailto:info@kurniasafety.com">
                  info@kurniasafety.com
                </Link>
              </p>
            </div>

            {/* Kolom 3: Information */}
            <div className="ps-footer--address col-span-1">
              <h2 className="text-white mb-2">{t(dict, "information")}</h2>

              <ul className="ps-block__list space-y-2">
                <li>
                  <h3>
                    <a 
                      href="https://www.kurniasafety.com/products/fall-protection" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="underline hover:underline text-[#9bcdac] hover:text-[#46b049]"
                      aria-label="Go To Product Page"
                    >
                      {t(dict, "product")}
                    </a>
                  </h3>
                </li>
                <li>
                  <h3>
                    <Link href={baseUrl("/blog", lang)} className="underline hover:underline text-[#9bcdac] hover:text-[#46b049]"
                      aria-label="Go To Blog Page"
                    >
                      {t(dict, "blog")}
                    </Link>
                  </h3>
                </li>
                <li>
                  <h3>
                    <Link href={baseUrl("/contact", lang)} className="underline hover:underline text-[#9bcdac] hover:text-[#46b049]"
                      aria-label="Go To Contact Page"
                    >
                      {t(dict, "contact")}
                    </Link>
                  </h3>
                </li>

                {/* Halaman dari Database (Career, Awards, Resource Centre, dsb. dikomentari agar tidak muncul) */}
                {/* {data.resultPages
                  .filter((page: { location: string }) => page.location === "information")
                  .map((page: { id: number; slug: string; title: string }) => (
                    <li key={page.id}>
                      <h3>
                        <Link href={baseUrl(`/${page.slug}`, lang)} className="underline hover:underline text-[#9bcdac] hover:text-[#46b049]"
                          aria-label={`Go To ${page.title} Page`}
                        >
                          {page.title}
                        </Link>
                      </h3>
                    </li>
                  ))} */}

                <li>
                  <h3>
                    <Link href={baseUrl("/faq", lang)} className="underline hover:underline text-[#9bcdac] hover:text-[#46b049]"
                      aria-label="Go To FAQ Page"
                    >
                      {t(dict, "faq")}
                    </Link>
                  </h3>
                </li>
              </ul>
            </div>
          </div>
          <div className="ps-footer--bottom mx-4">
            <p>
              {data.resultSetting?.copyright}
            </p>
          </div>
        </div>
      </footer>
      <WhatsappButton/>
    </>
  );
};

export default Footer;