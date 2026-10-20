import ListProduct from "./listProduct/ListProduct";
import { getProductData } from "@/app/lib/api";
import Breadcrumb from "./components/Breadcrumb";
import { getTranslations } from "@/app/lib/getTranslations";
import { t } from "@/app/lib/t";
import { Metadata } from "next";
import { baseUrl } from "@/utils/baseUrl";

// export const metadata = {
//   title: "Product",
//   description: "Product",
// };

export async function generateMetadata({ searchParams, params }: { 
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
  params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { sort, brand, page, search } = await searchParams;
  const { lang } = await params;
  const lang_id = lang === "id" ? "2" : "1";
  const dict = await getTranslations(lang_id);

  // base title
  let title = t(dict, "product"); // "Product" atau versi bahasa lain

  // // jika punya slug → sub product
  // if (slug) {
  //   const subName = slug.replace(/-/g, " ");
  //   title += ` - ${subName}`;
  // }

  // pagination → Page X
  if (brand) {
    title += ` - Brand ${brand}`;
  }

  if (search) {
    title += ` - Search ${search}`;
  }

  if (page) {
    title += ` - Page ${page}`;
  }

  const enUrl = baseUrl("/products", "en");
  const idUrl = baseUrl("/products", "id");
  // const data = await getProductDetailData(lang_id, slug);
  return {
    title: title,
    description: `${title} Page`,
    keywords: `${title}, Page`,
    alternates: {
        canonical: baseUrl("/products", lang),
        languages: {
          en: enUrl,
          id: idUrl,
          "x-default": idUrl,
        },
    },
  }
}
export default async function Product({
  searchParams,
  params
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
  params: Promise<{ lang: string }>
}) {
  const { sort, brand, page, search } = await searchParams;
  const { lang } = await params;
  const lang_id = lang === "id" ? "2" : "1";

  const brandParam = brand || "";
  const pageNumber = Number(page) || 1;
  const searchParam = search || "";
  const filter_sort = sort || "";
  const sortToString = filter_sort.toString() || "";
  const data = await getProductData(lang_id, "", "", brandParam, searchParam.toString(), pageNumber, sortToString);
  const dict = await getTranslations(lang_id);
  const text = {
    sort_by: t(dict, "sort_by"),
    most_recent: t(dict, "most_recent"),
    most_previous: t(dict, "most_previous")
  }
  return (
    <div>
      <Breadcrumb parentCategories={data?.resultParentCategory?.[0] || undefined} category={data?.resultSubCategory?.[0] || undefined} lang_id={lang_id} />
      <ListProduct data={data} lang_id={lang_id} slug="" page={pageNumber} filter_sort={sortToString} text={text} />
    </div>
  );
}
