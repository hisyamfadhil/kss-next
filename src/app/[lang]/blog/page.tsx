import { getBlogData } from "@/app/lib/api";
import BlogItem from "./detail/BlogItem";
import { baseUrl } from "@/utils/baseUrl";
import Pagination from "@/app/[lang]/components/Pagination";
import Link from "next/link";
import { getTranslations } from "@/app/lib/getTranslations";
import { t } from "@/app/lib/t";

interface Props {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
    params: Promise<{ lang: string }>
}
export default async function ListBlog({ searchParams, params }: Props) {
    const { lang } = await params;
    const lang_id = lang === "id" ? "2" : "1";
    const dict = await getTranslations(lang_id);

    const { page } = await searchParams;
    const pageNumber = Number(page) || 1;

    const data = await getBlogData(lang_id, pageNumber, "", "");

    return (
        <>
            <div className="ps-blog ps-blog--masonry">
                <div className="container mx-auto lg:px-4">
                    <ul className="ps-breadcrumb flex flex-wrap">
                        <li className="ps-breadcrumb__item">
                            <Link href={baseUrl("/", lang)}>
                                {t(dict, "home")}
                            </Link>
                        </li>
                        <li className="ps-breadcrumb__item text-[#46b049]" aria-current="page">
                            {t(dict, "blog")}
                        </li>
                    </ul>
                    <h1 className="ps-blog__title">
                        {t(dict, "blog")}
                    </h1>
                    <div className="ps-blog__content">
                        <div className="flex flex-wrap -mx-4">
                            {data.resultBlog.map((item: any) => (
                                <BlogItem key={item.id} data={item} lang={lang} />
                            ))}
                        </div>
                    </div>
                    <div className="ps-pagination">
                        <Pagination currentPage={pageNumber} totalPages={data.totalPages} />
                    </div>
                </div>
            </div>


        </>
    )
}