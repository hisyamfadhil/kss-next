import { baseUrl } from "@/utils/baseUrl";
import { getLifelineImage } from "@/utils/getLifelineImage";
import Link from "next/link";
import { characterLimiter } from "@/utils/characterLimiter";
import { getTranslations } from "@/app/lib/getTranslations";
import { t } from "@/app/lib/t";
import Image from "next/image";
import NavbarLifeline from "./NavbarLifeline";

const LifelineCategory = async ({ data, lang_id }: { data: any, lang_id: string }) => {
  const lang = lang_id === "2" ? "id" : "";
  const dict = await getTranslations(lang_id);

  return (
    <>
      <NavbarLifeline lang={lang} />
      <main>
        <section className="mb-3">
          <div className="container mx-auto lg:px-4">
            <ol className="ps-breadcrumb flex flex-wrap" itemScope itemType="https://schema.org/BreadcrumbList">
              <li className="ps-breadcrumb__item" itemProp="itemListElement" itemScope
                itemType="https://schema.org/ListItem">
                <Link itemProp="item" href={baseUrl("/", lang)}>
                  <span itemProp="name">
                    {t(dict, "home")}
                  </span>
                </Link>
                <meta itemProp="position" content="1" />
              </li>
              <li className="ps-breadcrumb__item" itemProp="itemListElement" itemScope
                itemType="https://schema.org/ListItem">
                <Link itemScope itemType="https://schema.org/WebPage"
                  itemProp="item" itemID={baseUrl("/lifeline-solutions", lang)} href={baseUrl("/lifeline-solutions", lang)}>
                  <span itemProp="name">
                    {t(dict, "hse")}
                  </span>
                </Link>
                <meta itemProp="position" content="2" />
              </li>
              {(data.resultBySlug && (

                <li className="ps-breadcrumb__item text-[#46b049]" aria-current="page" itemProp="itemListElement" itemScope
                  itemType="https://schema.org/ListItem">
                  <span itemProp="name">
                    {data.resultBySlug.name}
                  </span>
                  <meta itemProp="position" content="3" />
                </li>
              ))}
            </ol>
          </div>
        </section>

        <div className="mb-3 container mx-auto lg:px-4">
          <div className="lifeline-content"
            dangerouslySetInnerHTML={{ __html: data.resultBySlug?.lifeline_cat_description || "" }}
          />
        </div>

        <section className="pb-0 py-lg-5 mb-3">
          <div className="container mx-auto lg:px-4">
            <ul className="row cards">
              {data.resultByCategoryID.map((item: any, index: number) => (
                <li key={index}>
                  <Link href={baseUrl(`/lifeline-solutions/${data.resultBySlug.slug}/${item.slug}`, lang)} className="card">
                    {/* <Image src={getLifelineImage(item.storage, item.image_cover_small)} alt={item.title} className="card__image" width={1000} height={1000} fetchPriority={index < 3 ? "high" : "auto"} priority /> */}
                    <Image
                      src={getLifelineImage(item.storage, item.image_cover_small)}
                      alt={item.title}
                      className="card__image"
                      width={400}
                      height={400}
                      priority={index < 6}
                      loading={index < 6 ? "eager" : "lazy"}
                      fetchPriority={index < 6 ? "high" : "auto"}
                      sizes="(max-width: 640px) 100vw,
                      (max-width: 1024px) 50vw,
                      33vw"
                      quality={60}
                    />

                    <div className="card__overlay">
                      <div className="card__header">
                        <svg className="card__arc" xmlns="http://www.w3.org/2000/svg"><path /></svg>
                        <Image className="card__thumb" src="https://sandbox.kurniasafety.com/uploads/profile/avatar_6168727da25e03-95688106-96130947.jpg" alt="Card Thumb" width={1000} height={1000}
                          priority={index < 6}
                          loading={index < 6 ? "eager" : "lazy"}
                          fetchPriority={index < 6 ? "high" : "auto"} />
                        <div className="card__header-text">
                          <h2 className="card__title mt-3">
                            {item.title}
                          </h2>
                        </div>
                      </div>
                      <p className="card__description">
                        {characterLimiter(item.summary, 100)}
                      </p>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </main>
    </>
  )
}
export default LifelineCategory;
