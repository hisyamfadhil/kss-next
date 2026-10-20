import PageID from "@/app/[lang]/about/PageID"
import PageEN from "@/app/[lang]/about/PageEN"
import { getTranslations } from "@/app/lib/getTranslations";
import { t } from "@/app/lib/t";
import { Metadata } from "next";
import { baseUrl } from "@/utils/baseUrl";

// export const metadata = {
//     title: "About",
//     description: "About",
// };

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const lang_id = lang === "id" ? "2" : "1";
  const dict = await getTranslations(lang_id);

  const enUrl = baseUrl("/about", "en");
  const idUrl = baseUrl("/about", "id");
  // const data = await getProductDetailData(lang_id, slug);
  return {
    title: t(dict, "about"),
    description: `${t(dict, "about")} Page`,
    keywords: `${t(dict, "about")}, Page`,
    alternates: {
      canonical: baseUrl("/about", lang),
      languages: {
        en: enUrl,
        id: idUrl,
        "x-default": idUrl,
      },
  },
  }
}
export default async function AboutPage({ params }: { params: Promise<{ lang: string }> }) {
    const { lang } = await params;
    
    return (
        <>
            {lang === "id" ? <PageID /> : <PageEN />}
        </>
    );
}