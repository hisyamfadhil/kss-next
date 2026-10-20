import { getBlogDetailData } from "@/app/lib/api";
import { baseUrl, imageBaseUrl } from "@/utils/baseUrl";
import {
    Calendar,
    Clock,
    Folder,
    User,
} from "lucide-react";
import BlogSideBar from "../components/BlogSideBar";
import BlogRelatePost from "../components/BlogRelatePost";
import { formatDate, timeAgo } from "@/utils/formatDate";
import ReadingTime from "../components/ReadingTime";
import Link from "next/link";
import { getTranslations } from "@/app/lib/getTranslations";
import { t } from "@/app/lib/t";
import BlogImages from "@/app/[lang]/components/BlogImages";
import ShareButtons from "@/app/[lang]/components/ShareButtons";
import { Metadata } from "next";

export async function generateMetadata(
    { params }: { params: Promise<{ slug: string; lang: string }> }
  ): Promise<Metadata> {
  
    const { slug, lang } = await params;
    const lang_id = lang === "id" ? "2" : "1";
  
    const data = await getBlogDetailData(lang_id, slug);
  
    return {
        title: data?.resultBlogDetail?.title || "Detail Blog",
        description: data?.resultBlogDetail?.summary || "Detail Blog",
        keywords: data?.resultBlogDetail?.keywords || "Keywords Blog",
        alternates: {
            canonical: baseUrl(`/${slug}`, lang),
        },
    };
  }


export default async function ListBlog({ params }: { params: Promise<{ slug: string, lang: string }> }) {
    const { slug, lang } = await params;
    const lang_id = lang === "id" ? "2" : "1";

    const dict = await getTranslations(lang_id);

    const data = await getBlogDetailData(lang_id, slug);

    return (
        <>
            <script type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "BlogPosting",
                        "mainEntityOfPage": {
                            "@type": "WebPage",
                            "@id": baseUrl(`/${data.resultBlogDetail?.slug}`, lang)
                        },
                        "headline": data.resultBlogDetail?.title,
                        "image": [
                            imageBaseUrl(data.resultBlogDetail?.image_default)
                        ],
                        "author": {
                            "@type": "Person",
                            "name": "KSS",
                            "url": baseUrl("/", lang)
                        },
                        "publisher": {
                            "@type": "Organization",
                            "name": "PT. Kurnia Safety Supplies (KSS)",
                            "logo": {
                                "@type": "ImageObject",
                                "url": imageBaseUrl(data.resultGeneralSettings?.logo)
                            }
                        },
                        "datePublished": timeAgo(data.resultBlogDetail?.created_at),
                        "dateModified": timeAgo(data.resultBlogDetail?.created_at)
                    })

                }}
            />

            <div className="ps-post ps-post--sidebar">
                <div className="container mx-auto lg:px-4">
                    <ol itemScope itemType="https://schema.org/BreadcrumbList" className="ps-breadcrumb return flex flex-wrap">
                        <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem" className="ps-breadcrumb__item">
                            <Link itemProp="item" href={baseUrl("/", lang)}>
                                <span itemProp="name">
                                    {t(dict, "home")}
                                </span>
                            </Link>
                            <meta itemProp="position" content="1" />
                        </li>
                        <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem" className="ps-breadcrumb__item">
                            <Link itemScope itemType="https://schema.org/WebPage" itemProp="item"
                                itemID={baseUrl(`/blog-category/${data.resultBlogDetail?.category_slug}`, lang)}
                                href={baseUrl(`/blog-category/${data.resultBlogDetail?.category_slug}`, lang)}
                            ><span itemProp="name">
                                    {data.resultBlogDetail?.category_name}
                                </span>
                            </Link>
                            <meta itemProp="position" content="2" />
                        </li>
                        <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem" className="ps-breadcrumb__item"><span itemProp="name" className="text-[#46b049]">
                            {data.resultBlogDetail?.title}
                        </span>
                            <meta itemProp="position" content="3" />
                        </li>
                    </ol>

                    <div className="ps-post__content">
                        <div className="grid grid-cols-12 gap-4">
                            <div className="col-span-12 md:col-span-9">
                                {(data.resultBlogDetail?.video_embed_code ? (
                                    <><div className="ps-blog__banner embed-responsive embed-responsive-16by9">
                                        <iframe className="embed-responsive-item" src="<?php echo $post->video_embed_code; ?>" allowFullScreen></iframe>
                                    </div><h1 className="post__view-title">
                                            {data.resultBlogDetail?.title}
                                        </h1><div className="ps-blog__meta">
                                            <span className="ps-blog__author">
                                                <User size={18} /> &nbsp; {lang == "id" ?"Penulis":"Author"}: &nbsp; <Link target="_blank"  href="https://www.linkedin.com/in/elizabeth-sarah-48b3a0224" className="hover:text-green-600">Elizabeth Sarah</Link> &nbsp; </span>
                                            <span className="ps-blog__date">
                                                <Calendar size={18} /> &nbsp; {formatDate(data.resultBlogDetail?.created_at, lang)}
                                            </span>
                                            <span>
                                                <Link
                                                    href={baseUrl(`/blog-category/${data.resultBlogDetail?.category_slug}`, lang)}
                                                    className="hover:text-green-600"
                                                >
                                                    <Folder size={18} /> &nbsp; {data.resultBlogDetail?.category_name}
                                                </Link>
                                            </span>
                                            <Clock size={18} /> <ReadingTime /> <span>min, estimated reading time.</span>
                                        </div></>
                                ) : (
                                    <>
                                        <h1 className="post__view-title text-3xl">
                                            {data.resultBlogDetail?.title}
                                        </h1>
                                        <div className="ps-blog__meta return flex flex-wrap gap-2">
                                            <span className="ps-blog__author flex items-center gap-2">
                                                <User size={18} /> &nbsp; {lang == "id" ?"Penulis":"Author"}: &nbsp; <Link target="_blank"  href="https://www.linkedin.com/in/elizabeth-sarah-48b3a0224" className="hover:text-green-600">Elizabeth Sarah</Link> &nbsp;
                                            </span>
                                            <span className="ps-blog__date flex items-center gap-2">
                                                <Calendar size={18} /> &nbsp; {formatDate(data.resultBlogDetail?.created_at, lang)}
                                            </span>
                                            <span>
                                                <Link className="flex items-center gap-2 hover:text-green-600"
                                                    href={baseUrl(`/blog-category/${data.resultBlogDetail?.category_slug}`, lang)}
                                                >
                                                    <Folder size={18} /> &nbsp; {data.resultBlogDetail?.category_name}
                                                </Link>
                                            </span>
                                            <span className="flex items-center gap-2">
                                                <Clock size={18} /> <ReadingTime /> <span>min, estimated reading time.</span>
                                            </span>
                                        </div><div className="ps-blog__banner">
                                            <BlogImages data={data.resultBlogDetail} type='image_default' />
                                        </div>
                                    </>
                                ))}
                                <div id="article">
                                    <div
                                        dangerouslySetInnerHTML={{ __html: data.resultBlogDetail?.content || "" }}
                                    />
                                </div>
                                {/* <!--blog_view tag--> */}
                                <div className="ps-blog__badge">
                                    {data.resultBlogTags.map((item: any, index: number) => (
                                        <Link href={baseUrl(`/tag/${item.tag_slug}`, lang)} key={index}>
                                            <span
                                                className="ps-badge__item"
                                                dangerouslySetInnerHTML={{ __html: item.tag }}
                                            />
                                        </Link>
                                    ))}
                                    <ShareButtons
                                        url={baseUrl(`/${data.resultBlogDetail?.slug}`, lang)}
                                        title={data.resultBlogDetail?.title}
                                        image={imageBaseUrl(data.resultBlogDetail?.image_default)} 
                                    />
                                </div>
                                {/* <?php $this->load->view("_KSSfront/page_blog/__details/blog_comment.html"); ?> */}
                            </div>
                            {/* <!--blog_view sidebar--> */}
                            <BlogSideBar random_tag={data.resultRamdomTags} latest_blog={data.resultLatestBlog} lang={lang} />
                        </div>
                    </div>
                </div>
                {/* <!--blog_view related post--> */}
                <section className="ps-section--blog">
                    <div className="container mx-auto lg:px-4">
                        <h3 className="ps-section__title">
                            {t(dict, "related_posts")}
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-3">
                            {data.resultRelateBlog.map((item: any, index: number) => (
                                <div key={index} className="ps-section__item">
                                    <div className="ps-blog--latset">
                                        <BlogRelatePost data={item} lang={lang} />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div style={{ visibility: "hidden" }}>
                        <div className="owl-carousel" data-owl-auto="false" data-owl-loop="false" data-owl-speed="13000" data-owl-gap="0" data-owl-nav="true" data-owl-dots="true" data-owl-item="3" data-owl-item-xs="1" data-owl-item-sm="1" data-owl-item-md="2" data-owl-item-lg="3" data-owl-item-xl="3" data-owl-duration="1000" data-owl-mousedrag="on">
                            {/* <?php foreach ($related_posts as $item): ?> */}
                            <span></span>
                            {/* <?php endforeach; ?> */}
                        </div>
                    </div>

                </section>
                {(data.resultGeneralSettings.newsletter_status == 1 && (
                    <div className="container mx-auto lg:px-4">
                        <section className="ps-section--newsletter">
                            <h5 className="ps-section__title">
                                {t(dict, "newsletter")}
                            </h5>
                            <div className="ps-section__content">
                                {/* <?php echo form_open('add-to-subscribers-post', ['id' => 'form_validate_newsletter']); ?> */}
                                <div className="ps-form--subscribe">
                                    <div className="ps-form__control">
                                        <input type="email" className="form-control ps-input" name="email"
                                            // placeholder="<?php echo trans("enter_email"); ?>"
                                            maxLength={250} required />
                                        <button className="ps-btn ps-btn--primary"><i className="fa fa-newspaper-o"></i></button>
                                    </div>
                                </div>
                                {/* <?php echo form_close(); ?> */}
                            </div>
                        </section>
                        <br />
                        <div id="newsletter" className="text-center">
                            {/* <?php if ($this->session->flashdata('news_error')):
            echo '<span className="text-danger">' . $this->session->flashdata('news_error') . '</span>';
            endif;
            if ($this->session->flashdata('news_success')):
                echo '<span className="text-success">' . $this->session->flashdata('news_success') . '</span>';
            endif; ?> */}
                        </div>
                    </div>
                ))}
                {/* <!-- separate sections --> */}
                <div className="ps-delivery"></div>
            </div>

        </>
    )
}