import { baseUrl, imageBaseUrl } from "@/utils/baseUrl";
import Image from "next/image";
import Link from "next/link";
import { getTranslations } from "@/app/lib/getTranslations";
import { t } from "@/app/lib/t";

export const metadata = {
    title: "About",
    description: "About",
};
export default async function PageID() {
    const dict = await getTranslations("1");

    return (
        <div>
            <div className="ps-about">
                <div className="container mx-auto lg:px-4">
                    <ul className="ps-breadcrumb flex flex-wrap">
                        <li className="ps-breadcrumb__item">
                            <Link href={baseUrl("/", "id")}>
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
                        <div className="ps-page__content">
                            <div className="ps-about__content">
                                <section className="ps-about__project">
                                    <div className="container">
                                        <section className="ps-section--block-grid">
                                            <div className="ps-section__thumbnail">
                                                <div className="ps-section__image">
                                                    <p><Image src={imageBaseUrl("uploads/blog/202112/img_61cc0ec95de812-48332307-10030720.jpg")}
                                                        style={{ width: 'full', height: 'full' }}
                                                        width={1000} height={1000} alt="Tentang KSS" /></p>
                                                </div>
                                            </div>
                                            <div className="ps-section__content">
                                                <h2 className="ps-section__title">Tentang KSS</h2>
                                                <div className="ps-section__subtitle text-center">&nbsp;</div>
                                                <div className="ps-section__desc">PT. Kurnia Safety Supplies (KSS) adalah salah satu perusahaan terkemuka yang menawarkan solusi keamanan dalam manufaktur, konstruksi, pertambangan, minyak dan gas, petrokimia, perkebunan dan keselamatan lalu lintas sejak tahun 2003. Kami mengkhususkan diri dalam menyediakan Alat Pelindung Diri (APD), Alas Kaki, Pakaian Keselamatan, Peralatan Darurat, Peralatan Pemadam Kebakaran, Produk Keamanan Jalan, dll.</div>
                                            </div>
                                        </section>
                                        <section className="ps-section--block-grid row-reverse">
                                            <div className="">
                                                <div className="ps-section__image">
                                                    <p><Image src={imageBaseUrl("uploads/blog/202112/img_61cc0fc221a246-63481735-63083589.jpg")} width={1000} height={1000} alt="Sejarah KSS" /></p>
                                                </div>
                                            </div>
                                            <div className="ps-section__content">
                                                <h2 className="ps-section__title">Sejarah KSS</h2>
                                                <div className="ps-section__subtitle">&nbsp;</div>
                                                <div className="ps-section__desc">Pada tahun 2003, kami mendirikan bisnis kami di industri kesehatan dan keselamatan sebagai P.D. Kurnia Safety. Sejak itu, perusahaan kami telah mencapai banyak keberhasilan dan berjalan sangat baik. Kami mengukuhkan diri menjadi PT Kurnia Safety Supplies (KSS) pada Mei 2008 untuk membuktikan komitmen dan pencapaian dalam industri ini serta bertujuan untuk memperluas pangsa pasar kami.</div>
                                                <div className="ps-section__desc">PT Kurnia Safety Supplies (KSS) didirikan dengan tujuan untuk memberikan semua pekerja lingkungan kerja yang aman. Mulai sebagai perusahaan kecil, kami selalu berusaha keras untuk itu meningkatkan pengetahuan dan keahlian kami dalam produk keamanan dan memperluas jaringan produk keamanan berkualitas tinggi.</div>
                                                <div className="ps-section__desc">PT Kurnia Safety Supplies (KSS) telah membangun jaringan keselamatan berkualitas tinggi dengan produsen produk di seluruh dunia dan hanya mendistribusikan produk berkualitas tinggi kepada pelanggan. Produk kami telah mencapai standar yang diakui dengan baik di industri produk keselamatan seperti AS, ANSI, EN, dll. Dengan pengalaman dan keahlian kami, kami dapat merekomendasikan pelanggan kami produk yang tepat untuk memenuhi kebutuhan spesifik mereka.</div>
                                            </div>
                                        </section>
                                        <section className="ps-section--block-grid">
                                            <div className="ps-section__thumbnail">
                                                <div className="ps-section__image">
                                                    <p><Image src={imageBaseUrl("uploads/blog/202112/img_61cc109ce9d0a3-82966056-98205690.jpg")} width={1000} height={1000} alt="Visi, Misi, dan Nilai" /></p>
                                                </div>
                                            </div>
                                            <div className="ps-section__content">
                                                <h2 className="ps-section__title">Visi, Misi, dan Nilai</h2>
                                                <div className="ps-section__subtitle">Visi</div>
                                                <div className="ps-section__desc">&nbsp;</div>
                                                <div className="ps-section__desc">Menjadi Mitra Utama dan Terpercaya dalam Penyediaan Produk Kesehatan dan Keselamatan Kerja di Indonesia.</div>
                                                <div className="ps-section__desc">&nbsp;</div>
                                                <div className="ps-section__subtitle">Misi</div>
                                                <div className="ps-section__desc">&nbsp;</div>
                                                <ul className="ps-section__list">
                                                    <li>Untuk memperkenalkan sekaligus mengedukasi penggunaan produk keselamatan yang tepat</li>
                                                    <li>Memberikan harga kompetitif dengan layanan bermutu</li>
                                                    <li>Membangun hubungan erat dengan pelanggan</li>
                                                </ul>
                                                <div className="ps-section__subtitle">Nilai</div>
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
                                <h2 className="text-center text-[22px] leading-[26px] text-[#313131] font-semibold mb-5">Komitmen Kami</h2>
                                <div className="ps-about__extent">
                                    <div className="flex flex-wrap m-0">
                                        <div className="w-full md:w-3/12 p-0 flex justify-center">
                                            <div className="text-center p-4">
                                                <div className="flex justify-center mb-3"><Image src={imageBaseUrl("@static/img/about/icon-1.png")} width={80} height={80} className="object-contain" alt="Provide Product Solution" /></div>
                                                {/* <!--<h5 className="ps-block__title">Provide Product Solution</h5>--> */}
                                                <div className="text-sm font-medium text-[#103178]">Memberikan Solusi Produk</div>
                                            </div>
                                        </div>
                                        <div className="w-full md:w-2/12 p-0 flex justify-center">
                                            <div className="text-center p-4">
                                                <div className="flex justify-center mb-3"><Image src={imageBaseUrl("@static/img/about/icon-2.png")} width={80} height={80} className="object-contain" alt="100% Original Products" /></div>
                                                {/* <!--<h5 className="ps-block__title">We Guarantee for 100% Original Products</h5>--> */}
                                                <div className="text-sm font-medium text-[#103178]">Menjamin 100% Keaslian Produk</div>
                                            </div>
                                        </div>
                                        <div className="w-full md:w-2/12 p-0 flex justify-center">
                                            <div className="text-center p-4">
                                                <div className="flex justify-center mb-3"><Image src={imageBaseUrl("@static/img/about/icon-3.png")} width={80} height={80} className="object-contain" alt="Same Day Response" /></div>
                                                {/* <!--<h5 className="ps-block__title"></h5>--> */}
                                                <div className="text-sm font-medium text-[#103178]">Membalas Permintaan Penawaran di Hari yang Sama</div>
                                            </div>
                                        </div>
                                        <div className="w-full md:w-2/12 p-0 flex justify-center">
                                            <div className="text-center p-4">
                                                <div className="flex justify-center mb-3"><Image src={imageBaseUrl("@static/img/about/icon-4.png")} width={80} height={80} className="object-contain" alt="1x24 Hours to Provide Quotation" /></div>
                                                {/* <!--<h5 className="ps-block__title"></h5>--> */}
                                                <div className="text-sm font-medium text-[#103178]">Mengirimkan Penawaran Dalam 1x24 Jam</div>
                                            </div>
                                        </div>
                                        <div className="w-full md:w-3/12 p-0 flex justify-center">
                                            <div className="text-center p-4">
                                                <div className="flex justify-center mb-3"><Image src={imageBaseUrl("@static/img/about/icon-5.png")} width={80} height={80} className="object-contain" alt="2 Working Days Delivery" /></div>
                                                {/* <!--<h5 className="ps-block__title"></h5>--> */}
                                                <div className="text-sm font-medium text-[#103178]">Mengirimkan Barang yang Tersedia Dalam 2 Hari Kerja</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </section>
                        </div>

                    </div>
                </div>
            </div>

        </div>
    );
}