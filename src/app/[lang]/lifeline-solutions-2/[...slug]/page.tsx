import React from "react";
import LifelineCategory from "../LifelineCategory";
import LifelineView from "../LifelineView";
import { getLifelineData, getLifelineDetailData } from "@/app/lib/api";
import { Metadata } from "next";

interface Props {
    params: Promise<{ slug?: string[]; lang: string }>; // slug bisa kosong, 1, atau 2 segmen
}
export async function generateMetadata(
    { params }: Props
): Promise<Metadata> {

    const { slug, lang } = await params;

    const lang_id = lang === "id" ? "2" : "1";

    const slugArray = slug || [];


    // /brand/sub_slug
    if (slugArray.length === 2) {

        const [, sub_slug] = slugArray;

        const data = await getLifelineDetailData(
            lang_id,
            sub_slug
        );


        return {
            title:
                data?.name ||
                "Lifeline",

            description:
                data?.name ||
                "Lifeline",

            keywords:
                data?.name
                    ? data.name.split(",")
                    : [
                        "lifeline",
                        "category",
                    ],
        };
    }


    // /brand
    if (slugArray.length === 1) {

        const [slug] = slugArray;

        const data = await getLifelineData(
            lang_id,
            slug
        );

        return {
            title:
                data?.name ||
                "Lifeline",

            description:
                data?.name ||
                "Lifeline",

            keywords:
                data?.name
                    ? data.name.split(",")
                    : [
                        "lifeline",
                        "category",
                    ],
        };
    }


    // homepage lifeline
    return {
        title: "Lifeline",
        description: "Lifeline",
        keywords: [
            "lifeline",
        ],
    };
}

export default async function DynamicPage({ params }: Props) {
    const { slug, lang } = await params;
    const lang_id = lang === "id" ? "2" : "1";

    const slugArray = slug || [];
    // handle: /brand/slug
    if (slugArray.length === 2) {
        const [slug, sub_slug] = slugArray;
        const data = await getLifelineDetailData(lang_id, sub_slug);
        const dataSlug = await getLifelineData(lang_id, slug);
        return (
            <>
                <LifelineView data={data} data_slug={dataSlug} lang_id={lang_id} />
            </>
        );
    }

    // handle: /brand
    if (slugArray.length === 1) {
        const [slug] = slugArray;
        const data = await getLifelineData(lang_id, slug);
        return (
            <>
                <LifelineCategory data={data} lang_id={lang_id} />
            </>
        );
    }

    // handle: /
    return (
        <div className="">
            <h1 className="text-2xl font-bold">Home Page</h1>
            <p>Welcome to homepage.</p>
        </div>
    );
}
