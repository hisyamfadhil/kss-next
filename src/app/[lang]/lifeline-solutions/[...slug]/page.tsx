import React from "react";
import LifelineCategory from "../LifelineCategory";
import LifelineView from "../LifelineView";
import CasesView from "../CasesView"; // 👈 Import komponen baru di sini
import { getLifelineData, getLifelineDetailData } from "@/app/lib/api";
import { Metadata } from "next";

interface Props {
    params: Promise<{ slug?: string[]; lang: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug, lang } = await params;
    const lang_id = lang === "id" ? "2" : "1";
    const slugArray = slug || [];

    if (slugArray.length === 2) {
        const [, sub_slug] = slugArray;
        const data = await getLifelineDetailData(lang_id, sub_slug);
        return {
            title: data?.name || "Lifeline",
            description: data?.name || "Lifeline",
        };
    }

    if (slugArray.length === 1) {
        const [slugVal] = slugArray;
        const data = await getLifelineData(lang_id, slugVal);
        return {
            title: data?.name || "Lifeline",
            description: data?.name || "Lifeline",
        };
    }

    return {
        title: "Lifeline",
        description: "Lifeline",
    };
}

export default async function DynamicPage({ params }: Props) {
    const { slug, lang } = await params;
    const lang_id = lang === "id" ? "2" : "1";
    const slugArray = slug || [];

    // handle: /brand/slug
    if (slugArray.length === 2) {
        const [slugVal, sub_slug] = slugArray;
        const data = await getLifelineDetailData(lang_id, sub_slug);
        const dataSlug = await getLifelineData(lang_id, slugVal);
        return (
            <>
                <LifelineView data={data} data_slug={dataSlug} lang_id={lang_id} />
            </>
        );
    }

    // handle: /brand
    if (slugArray.length === 1) {
        const [slugVal] = slugArray;
        const data = await getLifelineData(lang_id, slugVal);

        // 👉 Jika mengakses /lifeline-solutions/cases
        if (slugVal === "cases") {
            const casesList = data?.resultByCategoryID || [];
            return <CasesView casesList={casesList} lang={lang} />;
        }

        return (
            <>
                <LifelineCategory data={data} lang_id={lang_id} />
            </>
        );
    }

    // handle: /
    return (
        <div>
            <h1 className="text-2xl font-bold">Home Page</h1>
            <p>Welcome to homepage.</p>
        </div>
    );
}