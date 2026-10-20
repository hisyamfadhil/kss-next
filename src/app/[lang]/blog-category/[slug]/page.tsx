import React from "react";
import { getBlogData } from "@/app/lib/api";
import { baseUrl } from "@/utils/baseUrl";
import { redirect } from "next/navigation";
import ListBlogNew from "../../blog/ListBlog";

interface Props {
    params: Promise<{
        slug: string, // slug bisa kosong, 1, atau 2 segmen
        lang: string
    }>;
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}
export const metadata = {
    title: "Blog",
    description: "Blog",
};
export default async function DynamicPage({ params, searchParams }: Props) {
    const { lang } = await params;
    const lang_id = lang === "id" ? "2" : "1";

    const { page } = await searchParams;
    const { slug } = await params;
    const pageNumber = Number(page) || 1;


    // handle: /brand/slug

    const data = await getBlogData(lang_id, pageNumber, "", slug);

    return (
        <>
            <ListBlogNew data={data} page={pageNumber} lang={lang} />
        </>
    )
}

