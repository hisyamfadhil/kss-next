import React from "react";
import ListProduct from "../listProduct/ListProduct";
import { getProductData } from "@/app/lib/api";
import Breadcrumb from "../components/Breadcrumb";
import { getTranslations } from "@/app/lib/getTranslations";
import { t } from "@/app/lib/t";
import { Metadata } from "next";
import { baseUrl } from "@/utils/baseUrl";
import { notFound } from "next/navigation";

interface Props {
    params: Promise<{
        slug?: string[]; // slug bisa kosong, 1, atau 2 segmen
        lang: string;
    }>;
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}
// export const metadata = {
//     title: "Product",
//     description: "Product",
// };

export async function generateMetadata({ searchParams, params }: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
    params: Promise<{ lang: string, slug: string }>
}): Promise<Metadata> {
    const {
        sort = "",
        brand = "",
        page = "",
        search = "",
      } = await searchParams;
    const { slug, lang } = await params;
    const lang_id = lang === "id" ? "2" : "1";

    //   const data = await getProductDetailData(lang_id, slug);

    const slugArray: any = slug ?? [];
    const category = slugArray[0] ?? "";
    const sub_category = slugArray[1] ?? "";

    // ambil data produk untuk SEO
    const data = await getProductData(
        lang_id,
        category,
        sub_category,
        brand, // brand
        search, // search
        page,  // page
        sort  // sort
    );

    console.log("data products", data);
    

    const dict = await getTranslations(lang_id);
    const product = t(dict, "product");

    const slugPath = slugArray.join("/");

    const enUrl = baseUrl(`/products/${slugPath}`, "en");
    const idUrl = baseUrl(`/products/${slugPath}`, "id");
    let title =
        data.resultSubCategory?.[0]?.name ??
        data.resultParentCategory?.[0]?.name ??
        "";
        
        
    if (brand) {
        title += ` - Brand ${brand}`;
    }

    if (search) {
        title += ` - Search ${search}`;
    }

    if (page) {
        title += ` - Page ${page}`;
    }
    return {
        title: title,
        description: data.resultParentCategory[0].description || product,
        keywords: title,
        alternates: {
            canonical: baseUrl(`/products/${slugPath}`, lang),
            languages: {
                en: enUrl,
                id: idUrl,
                "x-default": idUrl,
            },
        },
    }
}
export default async function DynamicPage({ params, searchParams }: Props) {
    const {
        sort = "",
        brand = "",
        page = "",
        search = "",
      } = await searchParams;
    const { slug, lang } = await params;
    const lang_id = lang === "id" ? "2" : "1";

    const slugArray = slug ?? [];
    
    const category = slugArray[0] ?? "";
    const sub_category = slugArray[1] ?? "";
    const data = await getProductData(
        lang_id,
        category,
        sub_category,
        brand, // brand
        search, // search
        page,  // page
        sort  // sort
    );
    const brandParam = brand || "";
    const pageNumber = Number(page) || 1;
    const searchParam = search || "";
    const filter_sort = sort || "";
    const sortToString = filter_sort.toString() || "";
    const dict = await getTranslations(lang_id);
    const text = {
        sort_by: t(dict, "sort_by"),
        most_recent: t(dict, "most_recent"),
        most_previous: t(dict, "most_previous")
    }

        return (
            <div className="">
                <Breadcrumb parentCategories={data?.resultParentCategory?.[0] || undefined} category={data?.resultSubCategory?.[0] || undefined} lang_id={lang_id} />
                <ListProduct data={data} page={pageNumber} lang_id={lang_id} slug={`${category}/${sub_category}`} filter_sort={sortToString} text={text} />
            </div>
        );
}
