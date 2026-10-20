import Image from 'next/image';
import Social from './Social';
import { baseUrl, imageBaseUrl } from '@/utils/baseUrl';
import { JSXElementConstructor, ReactElement, ReactNode, ReactPortal } from 'react';
import { Phone, Mail } from "lucide-react";
import Link from 'next/link';
import { UrlObject } from 'url';
import LanguageModal from './Modal';
import MenuSlide from './MenuSlide';
import MobileFooterNav from './MobileFooterNav';
import ScrollTopButton from './ScrollTopButton';

import { getTranslations } from "@/app/lib/getTranslations";
import { t } from "@/app/lib/t";
import SearchBar from './SearchBar';
import Quotation from './Quotation';

const Navbar = async ({ data, lang_id }: { data: any, lang_id: string }) => {    
    
    const dict = await getTranslations(lang_id);
    // load translation sesuai cookie
    const categories = data.categoryProductPages
    const home = t(dict, "home");
    const product = t(dict, "product");
    const about_us = t(dict, "about_us");
    const hse = t(dict, "hse");
    const search_products = t(dict, "search_products");
    const lang = lang_id == "2" ? "id" : ""
    
    const awards = [
        { src: "@static/awards/MSA Silver Award 2021.png", alt: "MSA Silver Award 2021" },
        { src: "@static/awards/MSA Silver Award 2021 fastest growth channel.png", alt: "MSA Silver Award 2021 fastest growth channel" },
        { src: "@static/awards/Honeywell Outstanding Partner Award 2016.png", alt: "Honeywell Outstanding Partner Award 2016" },
        { src: "@static/awards/Honeywell Outstanding Partner Award 2015.png", alt: "Honeywell Outstanding Partner Award 2015" },
        { src: "@static/awards/3M Top 10 Channel Growth 2016.png", alt: "3M Top 10 Channel Growth 2016" },
        { src: "@static/awards/3M Star Partner 2018.png", alt: "3M Star Partner 2018" },
        { src: "@static/awards/3M SEA Region Star Partners 2019.png", alt: "3M SEA Region Star Partners 2019" }
    ];


    const renderCategories = (items: any[]) => {
        return items.map((category) => (
            <div
                key={category.id}
                className="px-4 text-[#000000] md:w-1/4"
                data-category-id={category.id}
            >
                <Link
                    href="https://www.kurniasafety.com/products/fall-protection"
                    id={`nav_main_category_${category.id}`}
                    data-id={category.id}
                    data-parent-id={category.parent_id ?? ""}
                    data-has-sb={category.children?.length ? "1" : "0"}
                    className="font-semibold"
                    aria-label={`${category.name} Products Page`}
                >
                    <span className="text-black text-[16.5px] hover:text-[#46b049]">
                        {category.name}
                    </span>
                </Link>
                <hr className="border-gray-950" />
                {/* Subcategories */}
                {category.children && category.children.length > 0 && (
                    <ul className="bg-transparent ml-2 mt-2">
                        {category.children.map((sub: { id: number | null | undefined; slug: any; parent_id: any; children: any[]; name: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; }) => (
                            <li key={sub.id}>
                                <Link
                                    href="https://www.kurniasafety.com/products/fall-protection"
                                    data-id={sub.id}
                                    data-parent-id={sub.parent_id ?? ""}
                                    data-has-sb={sub.children?.length ? "1" : "0"}
                                    className="text-[#5d6f88] hover:underline 
                                        block 
                                        leading-[24px] 
                                        py-[5px] 
                                        pr-[5px] 
                                        pl-0 
                                        text-[15px] 
                                        bg-transparent 
                                        relative 
                                        hover:text-[#f3f3f3] 
                                        first-letter:uppercase
                                        transition-colors
                                        duration-200
                                    "
                                    aria-label={`${sub.name} Products Page`}
                                >
                                    <span style={{ color: "#5d6f88" }}>
                                        <em>{sub.name}</em>
                                    </span>
                                </Link>

                                {/* Third Level */}
                                {sub.children && sub.children.length > 0 && (
                                    <ul className="ml-4 mt-1">
                                        {sub.children.map((third: { id: number | null | undefined; slug: any; parent_id: any; name: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; }) => (
                                            <li key={third.id}>
                                                <Link
                                                    href="https://www.kurniasafety.com/products/fall-protection"
                                                    id={`nav_main_category_${third.id}`}
                                                    data-id={third.id}
                                                    data-parent-id={third.parent_id ?? ""}
                                                    className="text-[#697e9c] hover:underline"
                                                    aria-label={`${third.name} Products Page`}
                                                >
                                                    <span style={{ color: "#697e9c" }}>
                                                        {third.name}
                                                    </span>
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        ));
    };

    return (
        <>
            <script type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "Corporation",
                        "@id": baseUrl('/', lang),
                        "name": "PT. Kurnia Safety Supplies",
                        "legalname": "PT. Kurnia Safety Supplies",
                        "description": "Distributor Alat Safety Indonesia untuk Brand 3M, MSA, AED ZOLL, Honeywell, Ansell, Bullard, Microgard, DBI Sala, Protector dan Haws.",
                        "image": ["https://sandbox.kurniasafety.com/uploads/blog/202112/img_61cc0ec95de812-48332307-10030720.jpg"],
                        "logo": `${imageBaseUrl('uploads/logo/logo-pt-kurnia-safety-supplies.jpg')}`,
                        "areaServed": ["Indonesia"],
                        "address": {
                            "@type": "PostalAddress",
                            "streetAddress": "Jl. Griya Agung Blok N3 No. 47-48",
                            "addressLocality": "Sunter",
                            "addressRegion": "Jakarta Utara",
                            "postalCode": "14350",
                            "addressCountry": "Indonesia"
                        },
                        "brand": ["3m", "MSA", "Honeywell", "Ansell", "Bullard", "Microgard", "DBI Sala", "Protector", "Haws", "Kstrong", "Safety Ranger"],
                        "url": "https://www.kurniasafety.com/id/contact",
                        "slogan": "Your Reliable Safety Partner",
                        "telephone": "021-65838111",
                        "department": {
                            "type": "Corporation",
                            "name": "PT Kurnia Safety Supplies Balikpapan",
                            "image": ["https://sandbox.kurniasafety.com/uploads/blog/202112/img_61cc0ec95de812-48332307-10030720.jpg"],
                            "address": {
                                "@type": "PostalAddress", "streetAddress": "Centra Bizpark 2 Ruko Blok BRK No. 10-11",
                                "addressLocality": "Jl. Kol. Syarifudin Yoes Sepinggan",
                                "addressRegion": "Balikpapan",
                                "postalCode": "76114",
                                "addressCountry": "Indonesia"
                            },
                            "telephone": "0542-8519888",
                            "areaServed": ["Balikpapan", "Kalimantan"],
                            "knowsLanguage": ["Indonesia", "English"]
                        }
                    })
                }} />

            <header className="ps-header ps-header--1 autohide sticky top-0 z-50">
                <div className="ps-header__middle navvv">
                    <div className="container mx-auto lg:px-4">
                        <div className="ps-logo">
                            <Link href={baseUrl("/", lang)} 
                                aria-label="Go To Home Page"
                            >
                                <Image
                                    src={imageBaseUrl(data.resultGeneralSetting.logo)}
                                    style={{ width: 'full', height: 'full' }}
                                    width={1000}
                                    height={1000}
                                    alt="PT. Kurnia Safety Supplies Logo (KSS)" />
                            </Link>
                        </div>
                        <div className="ps-header__right">
                            <ul className="ps-header__icons">
                                <li>
                                    <Quotation lang={lang} />
                                </li>
                            </ul>
                            <div className="ps-language-currency">
                                {data.resultGeneralSetting.multilingual_system == 1 && data.resultLanguage.length > 1 && (
                                    <LanguageModal data={data.resultLanguage} lang_id={lang_id} />
                                )}
                                <Social data={data} />
                            </div>
                            <div className="hidden lg:flex" itemScope itemType="https://schema.org/WebSite">
                                <meta itemProp="url" content={baseUrl("/", lang)} />
                                <SearchBar placeholder={search_products} lang={lang} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="ps-navigation"
                // style="display: block;"
                >
                    <div className="container mx-auto lg:px-4">
                        <div className="ps-navigation__left">
                            <nav className="ps-main-menu">
                                <ul className="menu">
                                    <li>
                                        <Link href={baseUrl("/", lang)}
                                            aria-label="Go To Home Page"
                                        >
                                            {home}
                                        </Link>
                                    </li>
                                    {/* <li className="has-mega-menu">
                                        <Link href="#"
                                            aria-label="Go To Product Page"
                                        >
                                            {product}
                                        </Link>
                                        <div className="mega-menu">
                                            <div className="container mx-auto lg:px-4">
                                                <div className="flex flex-wrap max-h-90 overflow-y-auto">
                                                    {categories.length > 0 ? (
                                                        renderCategories(categories)
                                                    ) : (
                                                        <p>Memuat kategori...</p>
                                                    )}
                                            </div>
                                        </div>
                                    </div>
                                </li> */}

                                    <li>
                                        <Link href={baseUrl("/about", lang)}
                                            aria-label="Go To About Page"
                                        >
                                            {about_us}
                                        </Link>
                                    </li>

                                    {/* Menu Projects dengan Dropdown (Solution, Service, Cases, APD Lifeline) */}
                                    <li className="menu-item-has-children relative group">
                                        <Link 
                                            href="#" 
                                            aria-label="Go To Projects Page"
                                            className="!text-white hover:!text-white/80"
                                        >
                                            Projects
                                        </Link>
                                        <ul className="sub-menu absolute left-0 top-full hidden group-hover:block bg-white shadow-lg py-2 min-w-[180px] z-50 rounded-md border border-gray-100">
                                            <li>
                                                <Link 
                                                    href={baseUrl("/lifeline-solutions/solution", lang)} 
                                                    className="block px-4 py-2 text-sm !text-gray-800 hover:!text-[#46b049] hover:bg-gray-50 transition-colors"
                                                >
                                                    Solution
                                                </Link>
                                            </li>
                                            <li>
                                                <Link 
                                                    href={baseUrl("/lifeline-solutions/services", lang)} 
                                                    className="block px-4 py-2 text-sm !text-gray-800 hover:!text-[#46b049] hover:bg-gray-50 transition-colors"
                                                >
                                                    Service
                                                </Link>
                                            </li>
                                            <li>
                                                <Link 
                                                    href={baseUrl("/lifeline-solutions/cases", lang)} 
                                                    className="block px-4 py-2 text-sm !text-gray-800 hover:!text-[#46b049] hover:bg-gray-50 transition-colors"
                                                >
                                                    Cases
                                                </Link>
                                            </li>
                                            <li>
                                                <Link 
                                                    href="https://www.kurniasafety.com/products/fall-protection" 
                                                    className="block px-4 py-2 text-sm !text-gray-800 hover:!text-[#46b049] hover:bg-gray-50 transition-colors"
                                                >
                                                    APD Lifeline
                                                </Link>
                                            </li>
                                        </ul>
                                    </li>

                                    {/* Halaman dari Database (termasuk Contact Us & FAQ yang di-exclude/di-comment agar FAQ tersembunyi dari header) */}
                                    {data.resultPages
                                        .filter((page: { location: string; slug: string }) => page.location === "top_menu" && page.slug !== "faq")
                                        .map((page: { id: number | null | undefined; slug: string | UrlObject; title: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; }) => (
                                            <li key={page.id}>
                                                <Link href={baseUrl(`/${page.slug}`, lang)}
                                                    aria-label={`Go To ${page.title} Page`}
                                                >{page.title}</Link>
                                            </li>
                                        ))
                                    }

                                    {/* Menu Kurnia Safety */}
                                    <li>
                                        <a 
                                            href="https://www.kurniasafety.com/" 
                                            target="_blank" 
                                            rel="noopener noreferrer"
                                            aria-label="Go To Kurnia Safety Official Website"
                                            className="!text-white hover:!text-white/80"
                                        >
                                            Kurnia Safety
                                        </a>
                                    </li>

                                    {/* Menu Blogs mengarah ke rute /blog */}
                                    <li>
                                        <Link 
                                            href={baseUrl("/blog", lang)}
                                            aria-label="Go To Blogs Page"
                                            className="!text-white hover:!text-white/80"
                                        >
                                            Blogs
                                        </Link>
                                    </li>

                                    {/* <li>
                                        <Link href={baseUrl("/lifeline-solutions", lang)}
                                            aria-label="Go To Lifeline Page"
                                        >
                                            {hse}
                                        </Link>
                                    </li> */}
                                    {/* <!-- awards --> */}
                                    {/* <li className="has-mega-menu"><Link href={baseUrl("/awards", lang)}>Awards</Link>
                                        <div className="mega-menu">
                                            <div className="container mx-auto lg:px-4">
                                                <div className="">
                                                    <ul className="flex justify-between">
                                                        {awards.map((item, index) => (
                                                            <li key={index}>
                                                                <Link href={baseUrl("/awards", lang)} className="block overflow-hidden"
                                                                >
                                                                    <Image
                                                                        className="transition-all duration-[350ms] ease-in-out"
                                                                        src={imageBaseUrl(item.src)}
                                                                        alt={item.alt}
                                                                        width={150}
                                                                        height={150}
                                                                    />
                                                                </Link>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </li> */}
                                </ul>
                            </nav>
                        </div>
                        <div className="ps-navigation__right hidden lg:flex items-center justify-end md:hidden" style={{ display: "flex", justifyContent: "flex-end", alignItems: "center" }}>
                            {/* Telepon */}
                            <div className="lg:flex flex-wrap items-center md:hidden justify-end">
                                {data.resultSetting?.contact_phone && (
                                    <div className="flex">
                                        <Phone className='my-auto' size={18}/> {" "}
                                        <span className='mx-1'>{data.resultSetting.contact_phone}</span>
                                    </div>
                                )}

                                {/* Garis pemisah, hanya tampil kalau dua-duanya ada */}
                                {data.resultSetting?.contact_phone && data.resultSetting?.contact_email && (
                                    <span className="font-bold mx-2"> | </span>
                                )}

                                {/* Email */}
                                {data.resultSetting?.contact_email && (
                                    <div className="flex">
                                        <Mail className='my-auto' size={18}/>{" "}
                                        <Link
                                            href={`mailto:${data.resultSetting.contact_email}`}
                                            className="hover:underline mx-1"
                                        >
                                            {data.resultSetting.contact_email}
                                        </Link>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            <header
                className="sticky top-0 z-50 bg-white shadow-md w-full py-2 md:hidden"
            >
                <div className="container mx-auto flex items-center justify-between lg:px-4 py-2">
                    {/* Left: Menu Mobile */}
                    <div className="flex items-center">
                        <MenuSlide
                            lang_id={lang_id}
                            logo={imageBaseUrl(data.resultGeneralSetting.logo)}
                            categories={categories}
                            dataLanguage={data.resultLanguage}
                        />
                    </div>

                    {/* Center: Logo */}
                    <div className="flex items-center justify-center">
                        <Link href={baseUrl("/", lang)} className="flex items-center"
                            aria-label="Go To Home Page"
                        >
                            <Image
                                src={imageBaseUrl(data.resultGeneralSetting.logo)}
                                alt="KSS Logo"
                                width={120}
                                height={40}
                                className="object-contain h-auto w-auto max-h-10"
                                priority
                            />
                        </Link>
                    </div>

                    {/* Right: Quotation Icon */}
                    <div className="flex items-center">
                        <Quotation lang={lang} />
                    </div>
                </div>
            </header>


            <div className="lg:hidden">
                <MobileFooterNav lang={lang} />
            </div>
            <ScrollTopButton />

            {/* <Modal data={data.resultLanguage} lang_id={lang_id} /> */}
        </>
    );
};

export default Navbar;