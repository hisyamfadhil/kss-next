import BlogSideBarSmall from "./BlogSideBarSmall";
import Link from "next/link";
import { baseUrl } from "@/utils/baseUrl";
import { getTranslations } from "@/app/lib/getTranslations";
import { t } from "@/app/lib/t";

export default async function BlogSideBar({ random_tag, latest_blog, lang }: { random_tag: any, latest_blog: any, lang:string }) {
    const lang_id = lang === "id" ? "2" : "1";

    const dict = await getTranslations(lang_id);
    return (
        <>

            <div className="col-span-12 md:col-span-3">
                <div className="ps-widget ps-widget--blog">
                    <aside className="widget-area">
                        <section className="widget widget_drodo_posts_thumb">
                            <h3 className="widget-title">
                                {t(dict, "latest_posts")}
                            </h3>
                            {/* <!--print related posts--> */}
                            {latest_blog.map((item: any, index: number) => (
                                <BlogSideBarSmall key={index} data={item} lang={lang} />
                            ))}
                        </section>
                        <section className="widget widget_tag_cloud">
                            <h3 className="widget-title">
                                {t(dict, "tags")}
                            </h3>
                            <div className="tagcloud">
                                {random_tag.map((item: any, index: number) => (
                                    <Link className="flex items-center gap-2" key={index}
                                    href={baseUrl(`/tag/${item.tag_slug}`, lang)}
                                    >
                                        # {item.tag}
                                    </Link>
                                ))}
                            </div>
                        </section>
                    </aside>
                </div>
            </div>
        </>
    )
}