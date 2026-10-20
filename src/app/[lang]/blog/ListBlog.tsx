import BlogItem from "./detail/BlogItem";
import { baseUrl } from "@/utils/baseUrl";
import Pagination from "@/app/[lang]/components/Pagination";
import Link from "next/link";
import { getTranslations } from "@/app/lib/getTranslations";
import { t } from "@/app/lib/t";

export default async function ListBlogNew({ data, page, lang }: { data: any, page: number, lang: string }) {
    const lang_id = lang == "id" ? "2" : "1"
    const dict = await getTranslations(lang_id);

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
                        {(data.category_name ? (
                            <>
                                <li className="ps-breadcrumb__item">
                                    <Link href={baseUrl("/blog", lang)}>
                                        {t(dict, "blog")}
                                    </Link>
                                </li>
                                <li className="ps-breadcrumb__item">
                                    <Link href={baseUrl("/blog/category", lang)}>
                                        {t(dict, "category")}
                                    </Link>
                                </li>
                                <li className="ps-breadcrumb__item text-[#46b049]" aria-current="page">
                                    {data.category_name}
                                </li>
                            </>
                        ) : data.tag_name ? (
                            <>
                                <li className="ps-breadcrumb__item">
                                    <Link href={baseUrl("/blog", lang)}>
                                        {t(dict, "blog")}
                                    </Link>
                                </li>
                                <li className="ps-breadcrumb__item">
                                    <Link href={baseUrl("/tag", lang)}>
                                        {t(dict, "tags")}
                                    </Link>
                                </li>
                                <li className="ps-breadcrumb__item text-[#46b049]" aria-current="page">
                                    {data.tag_name}
                                </li>
                            </>
                        ) : (
                            <li className="ps-breadcrumb__item text-[#46b049]" aria-current="page">
                                {t(dict, "blog")}
                            </li>
                        ))}
                    </ul>
                    <h1 className="ps-blog__title">
                        {data.category_name
                            ? data.category_name
                            : data.tag_name
                                ? data.tag_name
                                : t(dict, "blog")}
                    </h1>
                    <div className="ps-blog__content">
                        <div className="flex flex-wrap -mx-4">
                            {data.resultBlog.map((item: any) => (
                                <BlogItem key={item.id} data={item} lang={lang} />
                            ))}
                        </div>
                    </div>
                    <div className="ps-pagination mb-3">
                        <Pagination currentPage={page} totalPages={data.totalPages} />
                    </div>
                </div>
            </div>


        </>
    )
}