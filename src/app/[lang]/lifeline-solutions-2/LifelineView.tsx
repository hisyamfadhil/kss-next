// "use client"

import { baseUrl } from "@/utils/baseUrl";
import Link from "next/link";
import { getTranslations } from "@/app/lib/getTranslations";
import { t } from "@/app/lib/t";
import NavbarLifeline from "./NavbarLifeline";

const LifelineView = async ({ data, data_slug, lang_id }: { data: any, data_slug: any, lang_id:string }) => {
  const lang = lang_id === "2" ? "id" : "";
  const dict = await getTranslations(lang_id);

    return (
        <>
            <NavbarLifeline lang={lang}/>
            <main>
                <section className="mb-3">
                    <div className="container mx-auto lg:px-4">
                        <ol className="ps-breadcrumb flex flex-wrap" itemScope itemType="https://schema.org/BreadcrumbList">
                            <li className="ps-breadcrumb__item" itemProp="itemListElement" itemScope
                                itemType="https://schema.org/ListItem">
                                <Link itemProp="item" href={baseUrl("/", lang)}>
                                    <span itemProp="name">
                                        {t(dict,"home")}
                                    </span>
                                </Link>
                                <meta itemProp="position" content="1" />
                            </li>
                            <li className="ps-breadcrumb__item" itemProp="itemListElement" itemScope
                                itemType="https://schema.org/ListItem">
                                <Link itemScope itemType="https://schema.org/WebPage"
                                    itemProp="item" itemID={baseUrl("/lifeline-solutions", lang)} href={baseUrl("/lifeline-solutions", lang)}>
                                    <span itemProp="name">
                                        {t(dict,"hse")}
                                    </span>
                                </Link>
                                <meta itemProp="position" content="2" />
                            </li>
                            {(data_slug.resultBySlug && (
                                <li className="ps-breadcrumb__item text-[#46b049]" aria-current="page" itemProp="itemListElement" itemScope
                                    itemType="https://schema.org/ListItem"><span itemProp="name">
                                        {data_slug.resultBySlug.name}
                                    </span>
                                    <meta itemProp="position" content="3" />
                                </li>
                            ))}
                        </ol>
                    </div>
                </section>

                <div className="ps-categogy mb-3">
                    <div className="container mx-auto lg:px-4">
                        <h1 className="ps-categogy__name">
                            {data.resultBySlug[0].title}
                        </h1>
                        <div className="ps-categogy__content">
                            <div className="row row-reverse">
                                <div className="col-12">
                                    <div className=" border border-gray-300 rounded-xl p-4" style={{ textAlign: "justify" }}>
                                        <div
                                            className="lifeline-content"
                                            dangerouslySetInnerHTML={{ __html: data.resultBySlug[0].content || "" }}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            {/* <style jsx global>{`
                    ul{
                        color: #70849d;
                    }
                    li a {
                        color : #46b049;
                    }
                    li a:hover {
                        color : #6ae225;
                    }
                    .ps-categogy a {
                        color : #46b049;
                    }
                    .ps-categogy a:hover {
                        color : #6ae225;
                    }

                    .ps-categogy .card-body img{
                        -o-object-fit: cover;
                        object-fit: cover;
                        transition: 0.8s ease 0s;
                        border-radius: 4px;
                    }

                    .ps-categogy .card-body img:hover{
                        transform: scale(1.1, 1.1);
                    }
            `}</style> */}

        </>
    )
}
export default LifelineView;
