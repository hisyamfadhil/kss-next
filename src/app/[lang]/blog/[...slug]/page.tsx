import React from "react";
import { getBlogData } from "@/app/lib/api";
import ListBlogNew from "../ListBlog";
import { baseUrl } from "@/utils/baseUrl";
import { redirect } from "next/navigation";

interface Props {
    params: Promise<{
        slug?: string[], // slug bisa kosong, 1, atau 2 segmen
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


    const slugArray = slug || [];
    // handle: /brand/slug
    if (slugArray.length === 2) {
        const [slug, sub_slug] = slugArray;

        if (slug == 'tag') {
            const data = await getBlogData(lang_id, pageNumber, sub_slug, "");
            
            return (
                <>
                    <ListBlogNew data={data} page={pageNumber} lang={lang} />
                </>
            )
        } else if (slug == 'category') {
            const data = await getBlogData(lang_id, pageNumber, "", sub_slug);

            return (
                <>
                    <ListBlogNew data={data} page={pageNumber} lang={lang} />
                </>
            )
        }
    }

    // handle: /brand
    if (slugArray.length === 1) {
        redirect(baseUrl("/", lang));
        return null;
    }

    // handle: /
    return (
        <div className="">
            <h1 className="text-2xl font-bold">Home Page</h1>
            <p>Welcome to homepage.</p>
        </div>
    );
}

