import { baseUrl } from "@/utils/baseUrl";
import BlogImages from "@/app/[lang]/components/BlogImages";
import Link from "next/link";
import { characterLimiter } from "@/utils/characterLimiter";

export default async function BlogItem({ data, lang }: { data: any, lang:string
 }) {
    
    return (
        <>
            {/* <?php if ($item->status == 1): ?> */}

            <div className="w-full md:w-1/2 lg:w-1/4 px-4">
                <div className="ps-blog--latset">
                    <div className="ps-blog__thumbnail">
                        <Link href={baseUrl(`/${data.slug}`, lang)}>
                            <BlogImages data={data} type='small' />
                        </Link>
                        <div className="ps-blog__badge">
                            <Link href={baseUrl(`/blog-category/${data.category_slug}`, lang)}>
                                <span className="ps-badge__item">
                                    {data.category_name}
                                </span>
                            </Link>
                        </div>
                    </div>
                    <div className="ps-blog__content">
                        <Link className="ps-blog__title__text" href={baseUrl(`/${data.slug}`, lang)}>
                            {characterLimiter(data.title, 56)}
                        </Link>
                    </div>
                </div>
            </div>
            {/* <?php else: ?> */}

            {/* <?php endif; ?> */}


        </>
    )
}