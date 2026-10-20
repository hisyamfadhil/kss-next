import BlogImages from "@/app/[lang]/components/BlogImages";
import { baseUrl } from "@/utils/baseUrl";
import { characterLimiter } from "@/utils/characterLimiter";
import Link from "next/link";

export default async function BlogSideBar({ data, lang }: { data:any, lang:string }) {
    return (
        <>
            <Link href={baseUrl(`/${data.slug}`, lang)} className="thumb">
                <BlogImages data={data} type="small"/>
            </Link>
            <hr />
            <div className="info" style={{ textAlign: "left" }}>
                <Link href={baseUrl(`/${data.slug}`, lang)}>
                    {characterLimiter(data.title, 30)}
                </Link>
            </div>
            <br />
        </>
    )
}