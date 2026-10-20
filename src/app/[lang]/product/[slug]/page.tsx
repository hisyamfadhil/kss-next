import Link from "next/link";
import { getProductDetailData } from "@/app/lib/api";
import { baseUrl } from "@/utils/baseUrl";
import ProductClientWrapper from "@/app/[lang]/product/ProductClientWrapper";
import { getTranslations } from "@/app/lib/getTranslations";
import { t } from "@/app/lib/t";
import { getProductDetailImage } from "@/utils/getProductImage";
import { Metadata } from "next";

// export const metadata = {
//   title: "Product Detail",
//   description: "Product Detail",
// };
export async function generateMetadata({ params }:{
  params: Promise<{ lang: string, slug: string }>}): Promise<Metadata> {
  const { slug, lang } = await params;
  const lang_id = lang === "id" ? "2" : "1";
  const data = await getProductDetailData(lang_id, slug);

  const enUrl = baseUrl(`/product/${slug}`, "en");
  const idUrl = baseUrl(`/product/${slug}`, "id");
  
  return {
    title:data.resultProduct.title,
    description: data.resultProduct.seo_description,
    keywords:data.resultProduct.title,
    alternates: {
      canonical: baseUrl(`/product/${slug}`, lang),
      languages: {
        en: enUrl,
        id: idUrl,
        "x-default": idUrl,
      }
    }
  }
}

export default async function ProductDetail({
  params,
}: {
  params: Promise<{ slug: string; lang: string }>
}) {
  const { slug, lang } = await params;
  const lang_id = lang === "id" ? "2" : "1";

  const data = await getProductDetailData(lang_id, slug);
  const dict = await getTranslations(lang_id);
  
  return (
    <>
      <script type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [{
              "@type": "ListItem",
              "position": 1,
              "name": t(dict, "home"),
              "item": baseUrl('/', lang)
            }, {
              "@type": "ListItem",
              "position": 2,
              "name": t(dict, "product"),
              "item": baseUrl('/products', lang)
            }, {
              "@type": "ListItem",
              "position": 3,
              "name": data.resultProduct.title,
              "item": baseUrl(`/product/${slug}`, lang)
            }]
          })
        }}
      />

      <script type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            "name": data.resultProduct.title,
            "image": data.resultImages.map((item: any) => (
              getProductDetailImage(item.storage, item.image_big)
            )),
            "description": data.resultProduct.seo_description,
            "sku": data.resultProduct.sku,
            "mpn": data.resultProduct.sku,
            "brand": {
              "@type": "Brand",
              "name": data.resultBrand?.name
            },
            "review": {
              "@type": "Review",
              "reviewRating": {
                "@type": "Rating",
                "ratingValue": "5",
                "bestRating": "5"
              },
              "author": {
                "@type": "Person",
                "name": "KSS"
              }
            },
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": "5",
              "reviewCount": "3724"
            }
          })
        }}
      />
      <div className="ps-page--product">
        <div className="container mx-auto lg:px-4">
          <ol className="ps-breadcrumb flex flex-wrap gap-2 text-sm text-gray-700">
            <li className="ps-breadcrumb__item">
              <Link href={baseUrl("/", lang)}>{t(dict, "home")}</Link>
            </li>
            <li className="ps-breadcrumb__item">
              <Link href={baseUrl("/products", lang)}>{t(dict, "product")}</Link>
            </li>
            <li className="ps-breadcrumb__item text-[#46b049]">{data.resultProduct.title}</li>
          </ol>

          <ProductClientWrapper data={data} lang={lang} />
        </div>
      </div>
    </>
  );
}
