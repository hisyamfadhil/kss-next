import { baseUrl, imageBaseUrl } from "@/utils/baseUrl";
import Link from "next/link";
import { getTranslations } from "@/app/lib/getTranslations";
import { t } from "@/app/lib/t";
import Image from "next/image";

export const metadata = {
    title: "About",
    description: "About",
};
export default async function PageEN() {
    const dict = await getTranslations("1");

    return (
        <div>
            <div className="ps-about">
                <div className="container mx-auto lg:px-4">
                    <ul className="ps-breadcrumb flex flex-wrap">
                        <li className="ps-breadcrumb__item">
                            <Link href={baseUrl("/", "")}>
                                {t(dict, "home")}
                            </Link>
                        </li>
                        <li className="ps-breadcrumb__item text-[#46b049]" aria-current="page">
                            {t(dict, "about")}
                        </li>
                    </ul>
                    <h1 className="ps-about__title">
                        {t(dict, "about")}
                    </h1>
                    <div className="ps-page__content">
                        <div className="ps-about__content">
                            <section className="ps-about__project">
                                <div className="container">
                                    <section className="ps-section--block-grid">
                                        <div className="ps-section__thumbnail">
                                            <div className="ps-section__image">
                                                <div className="ps-section__image">
                                                    <p><Image src={imageBaseUrl("uploads/blog/202112/img_61cc0ec95de812-48332307-10030720.jpg")} width={1000} height={1000} alt="Who Are We"
                                                        style={{ width: 'full', height: 'full' }}
                                                     /></p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="ps-section__content">
                                            <h2 className="ps-section__title">Who Are We</h2>
                                            <div className="ps-section__subtitle text-center">&nbsp;</div>
                                            <div className="ps-section__desc">PT. Kurnia Safety Supplies (KSS) is one of the leading companies that offers safety solution in manufacturing, construction, mining, oil and gas, petrochemical, plantation and traffic safety since 2003. We are specialized in providing Personal Protective Equipment (PPE), Footwear, Safety Clothing, Emergency Equipment, Fire Fighting Equipment, Road Safety Products, etc.</div>
                                        </div>
                                    </section>
                                    <section className="ps-section--block-grid row-reverse">
                                        <div className="ps-section__thumbnail">
                                            <div className="ps-section__image">
                                                <div className="ps-section__image">
                                                    <p><Image src={imageBaseUrl("uploads/blog/202112/img_61cc0fc221a246-63481735-63083589.jpg")}
                                                        width={1000} height={1000} alt="Our History" /></p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="ps-section__content">
                                            <h2 className="ps-section__title">Our History</h2>
                                            <div className="ps-section__subtitle">&nbsp;</div>
                                            <div className="ps-section__desc">In year 2003, we established our bussines in health and safety industry as P.D. Kurnia Safety. Since then, our company has achieved many successes and made excellent progresses. Estabilishing PT Kurnia Safety Supplies (KSS) in May 2008 proves our commitment and achievement in this industry and aims to expand our market share.</div>
                                            <div className="ps-section__desc">PT Kurnia Safety Supplies (KSS) is incorporated with the objective of providing all workers a safe working environment. Starting as a small company, we always strive to increase our knowledge and expertise in safety products and expand high-quality safety product network.</div>
                                            <div className="ps-section__desc">PT Kurnia Safety Supplies (KSS) has built a network of high-quality safety product manufacturers around the world and distributed only high-quality product to the end-users. Our products have attained well-recognized standard in safety product industry such as AS, ANSI, EN, etc. With our experience and expertise, we are able recommend our clients the right product to meet their specific need.</div>
                                        </div>
                                    </section>
                                    <section className="ps-section--block-grid">
                                        <div className="">
                                            <div className="ps-section__image">
                                                <div className="ps-section__image">
                                                    <p><Image src={imageBaseUrl("uploads/blog/202112/img_61cc109ce9d0a3-82966056-98205690.jpg")} width={1000} height={1000} alt="Our Vision, Mission and Value" /></p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="ps-section__content">
                                            <h2 className="ps-section__title">Our Vision, Mission and Value</h2>
                                            <div className="ps-section__subtitle">Vision</div>
                                            <div className="ps-section__desc">&nbsp;</div>
                                            <div className="ps-section__desc">Being the preferred partner among all the other distributors of health and safety products</div>
                                            <div className="ps-section__subtitle">Mission</div>
                                            <div className="ps-section__desc">&nbsp;</div>
                                            <ul className="ps-section__list">
                                                <li>To promote and educate customers the usage of quality health and safety product</li>
                                                <li>To provide competitive pricing and good customer service</li>
                                                <li>To build excellent customer relationship</li>
                                            </ul>
                                            <div className="ps-section__subtitle">Value</div>
                                            <div className="ps-section__desc">&nbsp;</div>
                                            <ul className="ps-section__list">
                                                <li>Agile</li>
                                                <li>Continuous Improvement</li>
                                                <li>Teamwork</li>
                                                <li>Integrity</li>
                                                <li>Optimistic</li>
                                                <li>Networking</li>
                                            </ul>
                                        </div>
                                    </section>
                                </div>
                            </section>
                        </div>
                        <section className="ps-about--info">
                            <h2 className="text-center text-[22px] leading-[26px] text-[#313131] font-semibold mb-5">Our Commitments</h2>
                            <div className="ps-about__extent">
                                <div className="flex flex-wrap m-0">
                                    {/* Item 1 */}
                                    <div className="w-full md:w-3/12 p-0 flex justify-center">
                                        <div className="text-center p-4">
                                            <div className="flex justify-center mb-3">
                                                <Image
                                                    src={imageBaseUrl("@static/img/about/icon-1.png")}
                                                    alt="Provide Product Solution"
                                                    width={80} height={80} className="object-contain"
                                                />
                                            </div>
                                            <div className="text-sm font-medium text-[#103178]">
                                                Provide Product Solution
                                            </div>
                                        </div>
                                    </div>

                                    {/* Item 2 */}
                                    <div className="w-full md:w-2/12 p-0 flex justify-center">
                                        <div className="text-center p-4">
                                            <div className="flex justify-center mb-3">
                                                <Image
                                                    src={imageBaseUrl("@static/img/about/icon-2.png")}
                                                    alt="We Guarantee for 100% Original Products"
                                                    width={80} height={80} className="object-contain"
                                                />
                                            </div>
                                            <div className="text-sm font-medium text-[#103178]">
                                                We Guarantee for 100% Original Products
                                            </div>
                                        </div>
                                    </div>

                                    {/* Item 3 */}
                                    <div className="w-full md:w-2/12 p-0 flex justify-center">
                                        <div className="text-center p-4">
                                            <div className="flex justify-center mb-3">
                                                <Image
                                                    src={imageBaseUrl("@static/img/about/icon-3.png")}
                                                    alt="Same Day Response"
                                                    width={80} height={80} className="object-contain"
                                                />
                                            </div>
                                            <div className="text-sm font-medium text-[#103178]">
                                                Same Day Response
                                            </div>
                                        </div>
                                    </div>

                                    {/* Item 4 */}
                                    <div className="w-full md:w-2/12 p-0 flex justify-center">
                                        <div className="text-center p-4">
                                            <div className="flex justify-center mb-3">
                                                <Image
                                                    src={imageBaseUrl("@static/img/about/icon-4.png")}
                                                    alt="1x24 Hours to Provide Quotation"
                                                    width={80} height={80} className="object-contain"
                                                />
                                            </div>
                                            <div className="text-sm font-medium text-[#103178]">
                                                1x24 Hours to Provide Quotation
                                            </div>
                                        </div>
                                    </div>

                                    {/* Item 5 */}
                                    <div className="w-full md:w-3/12 p-0 flex justify-center">
                                        <div className="text-center p-4">
                                            <div className="flex justify-center mb-3">
                                                <Image
                                                    src={imageBaseUrl("@static/img/about/icon-5.png")}
                                                    alt="2 Working Days Delivery (Ready Stock)"
                                                    width={80} height={80} className="object-contain"
                                                />
                                            </div>
                                            <div className="text-sm font-medium text-[#103178]">
                                                2 Working Days Delivery (Ready Stock)
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>

                </div>
            </div>

        </div>
    );
}