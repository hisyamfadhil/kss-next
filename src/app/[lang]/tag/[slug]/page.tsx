import React from "react";
import { getBlogData } from "@/app/lib/api";
import ListBlogNew from "../../blog/ListBlog";

interface Props {
    params: Promise<{
        slug: string,
        lang: string
    }>;
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}
export const metadata = {
    title: "Blog",
    description: "Blog",
};
export default async function TagCategoryPage({ params, searchParams }: Props) {
    const { lang } = await params;
    const lang_id = lang === "id" ? "2" : "1";

    const { page } = await searchParams;
    const { slug } = await params;
    const pageNumber = Number(page) || 1;    

    const data = await getBlogData(lang_id, pageNumber, slug, "");

    return (
        <>
            <ListBlogNew data={data} page={pageNumber} lang={lang} />
        </>
    )
}



