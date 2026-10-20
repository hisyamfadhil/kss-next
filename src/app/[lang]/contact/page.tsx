
import { baseUrl } from "@/utils/baseUrl";
// import { cookies } from "next/headers";
import { getContactData, getRecaptcha } from "@/app/lib/api";
import Link from "next/link";
import PdfPreviewModal from "./PdfPreviewModal";
import { getTranslations } from "@/app/lib/getTranslations";
import { t } from "@/app/lib/t";
import ContactForm from "./ContactForm";
import { Metadata } from "next";

// export const metadata = {
//   title: "Contact",
//   description: "Contact",
// };

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const lang_id = lang === "id" ? "2" : "1";
  const dict = await getTranslations(lang_id);

  const enUrl = baseUrl("/contact", "en");
  const idUrl = baseUrl("/contact", "id");
  // const data = await getProductDetailData(lang_id, slug);
  return {
    title: t(dict, "contact"),
    description: `${t(dict, "contact")} Page`,
    keywords: `${t(dict, "contact")}, Page`,
    alternates: {
      canonical: baseUrl("/contact", lang),
      languages: {
        en: enUrl,
        id: idUrl,
        "x-default": idUrl,
      }
    }
  }
}

export default async function Contact({
  searchParams,
  params
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
  params: Promise<{ lang: string }>
}) {
  const { success } = await searchParams

  const { lang } = await params;
  const lang_id = lang === "id" ? "2" : "1";
  const dict = await getTranslations(lang_id);

  const contact = await getContactData(lang_id)
  const recaptcha = await getRecaptcha();

  return (
    <>
      <div className="ps-contact">
        <div className="container mx-auto lg:px-4">
          <ul className="ps-breadcrumb flex flex-wrap">
            <li className="ps-breadcrumb__item">
              <Link href={baseUrl("/", lang)}>
                {t(dict, "home")}
              </Link>
            </li>
            <li className="ps-breadcrumb__item text-[#46b049]" aria-current="page">
              {t(dict, "contact")}
            </li>
          </ul>
          <div className="ps-contact__content">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
              {/* === Kiri: Info Kontak === */}
              <div className="lg:col-span-1">
                <div className="ps-contact__info">
                  <h1 className="text-[34px] leading-[40px] text-[#46b049] mb-[20px] font-semibold">{t(dict, "contact")}</h1>

                  <h2 className="ps-contact__fax text-[22px]">{t(dict, "working_time")}</h2>
                  <div className="text-[#70849d] text-base leading-[26px] mb-6">
                    {t(dict, "monday_friday")}: 08:30 - 17:00<br />
                    {t(dict, "saturday")}: 08:30 – 13:00<br />
                    {t(dict, "sunday")}: {t(dict, "closed")}
                  </div>

                  <h2 className="ps-contact__fax text-[22px]">
                    {t(dict, "contact")} {t(dict, "information")}
                  </h2>

                  <div className="text-[#70849d] text-base leading-[26px] mb-6">
                    {t(dict, "head_quarter")}: Jl. Griya Agung Blok N3 No. 47-48, Sunter, Jakarta Utara, Indonesia, 14350.<br />
                    {t(dict, "contact_support_sales")}: +62 21 658 38 111
                  </div>

                  <div className="text-[#70849d] text-base leading-[26px] mb-6">
                    {t(dict, "branch")} Balikpapan: Centra Bizpark 2 Ruko Blok BRK No. 10-11, Jl. Kol. Syarifudin Yoes Sepinggan, Balikpapan 76114.<br />
                    {t(dict, "contact_support_sales")}: 0542-8519888
                  </div>

                  <div className="text-[#70849d] text-base leading-[26px] mb-6">
                    {t(dict, "branch")} Surabaya: Jl. Raya Taman Asri No. 21, RT.025 / RW.008, Kel. Tambak Sumur, Kec. Waru, Sidoarjo, Jawa Timur 61256.<br />
                    {t(dict, "contact_support_sales")}: Phone: 031-35942018
                  </div>

                  <PdfPreviewModal brochure={t(dict, "brochure")} pdfUrl="https://sandbox.kurniasafety.com/@static/catalog/KSS-Catalogue-2023.pdf" />
                </div>
              </div>

              {/* === Kanan: Map + Form === */}
              <div className="lg:col-span-2 space-y-8 wow fadeInUp" data-wow-delay="0.3s">
                <div className="ps-contact__map w-full h-[450px]">
                  <iframe
                    src={`https://maps.google.com/maps?width=100%&height=100&hl=en&q=${contact.contact_address}&ie=UTF8&t=&z=18&iwloc=B&output=embed&disableDefaultUI=true`}
                    width="100%"
                    height="100%"
                    style={{ border: "0" }}
                    allowFullScreen
                    title="Map showing the location of PT Kurnia Safety"
                  ></iframe>
                </div>

                {/* <div className="ps-form--contact bg-white p-6">
                  <h2 className="ps-form__title text-xl font-semibold mb-4">
                    <br />
                    {t(dict, "send_us_email")}
                  </h2>

                  {success && <div className="text-green-600 my-4 text-xl">{t(dict, "msg_contact_success")}</div>}
                  <form className="space-y-6" action={submitContact}>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 ps-form__group">
                      <input
                        type="text"
                        name="name"
                        placeholder={t(dict, "name")}
                        className=" bg-[#f0f2f5] text-[#70849d] placeholder-[#70849d] w-full rounded-full p-3 focus:outline-none ps-form_input"
                        required
                      />
                      <input
                        type="email"
                        name="email"
                        placeholder={t(dict, "email_address")}
                        className=" bg-[#f0f2f5] text-[#70849d] placeholder-[#70849d] w-full rounded-full p-3 focus:outline-none ps-form_input"
                        required
                      />
                      <input
                        type="text"
                        name="subject"
                        placeholder={t(dict, "subject")}
                        className=" bg-[#f0f2f5] text-[#70849d] placeholder-[#70849d] w-full rounded-full p-3 focus:outline-none ps-form_input"
                        required
                      />
                    </div>

                    <textarea
                      name="message"
                      placeholder={t(dict, "message")}
                      className="bg-[#f0f2f5] text-[#70849d] placeholder-[#70849d] w-full rounded-full p-3 pl-10 min-h-[100px] focus:outline-none ps-form_input"
                      required
                    ></textarea>

                    <div className="hidden">
                      <label className="flex items-start space-x-2">
                        <input type="checkbox" name="terms" defaultChecked />
                        <span className="text-sm text-gray-600">
                          {t(dict, "terms_conditions_exp")}{" "}
                          <Link href="#" target="_blank" className="font-semibold text-[#103178] hover:text-[#FD8D27]">
                            Terms & Conditions
                          </Link>
                        </span>
                      </label>
                    </div>

                    <button
                      type="submit"
                      className="flex items-center gap-2 px-6 py-3 rounded-full bg-[#46b049] text-white font-semibold hover:text-[#46b049] hover:bg-white border hover:border-[#46b049] transition"
                    >
                      <FaPaperPlane />
                      {t(dict, "send")}
                    </button>
                  </form>
                </div> */}

                <ContactForm success={success} dict={dict} siteKey={recaptcha.siteKey} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>

  );
}
