import Link from "next/link";
import { baseUrl } from "@/utils/baseUrl";
import AwardItem from "./AwardItems";
import { getTranslations } from "@/app/lib/getTranslations";
import { t } from "@/app/lib/t";

export const metadata = {
    title: "Awards",
    description: "Awards",
};
export default async function AwardsPage({ params }: { params: Promise<{ lang: string }> }) {
    const { lang } = await params;
    const lang_id = lang === "id" ? "2" : "1";
    const dict = await getTranslations(lang_id);

    return (
        <>
            <div className="container mx-auto lg:px-4">
                <ol className="ps-breadcrumb flex flex-wrap" itemScope itemType="https://schema.org/BreadcrumbList">
                    <li itemScope itemType="https://schema.org/WebPage" itemProp="item" itemID={baseUrl("/", lang)} className="ps-breadcrumb__item">
                        <Link href={baseUrl("/", lang)}>
                            <span itemProp="name">
                                {t(dict, "home")}
                            </span>
                        </Link>
                        <meta itemProp="position" content="1" />
                    </li>
                    <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem" className="ps-breadcrumb__item text-[#46b049]"><span itemProp="name">Awards</span><meta itemProp="position" content="2" /></li>
                </ol>
                <h1 className="ps-about__title text-[34px] leading-[40px] mb-5 text-[#46b049] font-semibold">Awards</h1>
                <div>

                    <AwardItem
                        image="https://sandbox.kurniasafety.com/@static/awards/MSA Silver Award 2021.png"
                        title="Fastest Growth Channel Partner in Head Protection 2021"
                        description="PT. Kurnia Safety Supplies (KSS) menerima piagam penghargaan dari
                            principal MSA Safety Indonesia untuk kategori “Fastest Growth Channel
                            Partner in Head Protection 2021”. Penghargaan MSA Silver Award ini
                            menunjukkan komitmen KSS sebagai salah satu distributor MSA Safety yang
                            terbaik dan terpercaya di Indonesia."
                        award="Fastest Growth Channel Partner in Head Protection 2021."
                        year="2021"
                        priority={true}
                    />

                    <AwardItem
                        image="https://sandbox.kurniasafety.com/@static/awards/MSA Silver Award 2021 fastest growth channel.png"
                        title="Fastest Growth Channel Partner in Head Protection 2021"
                        description="PT. Kurnia Safety Supplies (KSS) menerima piala penghargaan dari principal MSA Safety Indonesia untuk kategori “Fastest Growth Channel Partner in Head Protection 2021”. Penghargaan MSA Silver Award ini menunjukkan komitmen KSS sebagai salah satu distributor MSA Safety yang terbaik dan terpercaya di Indonesia."
                        award="Fastest Growth Channel Partner in Head Protection 2021."
                        year="2021"
                        priority={false}
                    />

                    <AwardItem
                        image="https://sandbox.kurniasafety.com/@static/awards/Honeywell Outstanding Partner Award 2016.png"
                        title="Honeywell Automation and Solution 2016 Outstanding Partner Award"
                        description='PT. Kurnia Safety Supplies (KSS) menerima piala penghargaan "Honeywell Automation and Solution 2016 Outstanding Partner Award" dari principal Honeywell. Piala penghargaan ini diberikan berdasarkan kontribusi luar biasa KSS dalam memasarkan produk Honeywell di Indonesia pada tahun 2016. KSS menerima penghargaan ini selama 2 tahun berturut-turut.'
                        award="Honeywell Automation and Solution 2016 Outstanding Partner Award."
                        year="2016"
                        priority={false}
                    />

                    <AwardItem
                        image="https://sandbox.kurniasafety.com/@static/awards/Honeywell Outstanding Partner Award 2015.png"
                        title="Honeywell Automation and Solution 2015 Outstanding Partner Award"
                        description='PT. Kurnia Safety Supplies (KSS) menerima piala penghargaan "Honeywell Automation and Solution 2015 Outstanding Partner Award" dari principal Honeywell. Piala penghargaan ini diberikan berdasarkan kontribusi luar biasa KSS dalam memasarkan produk Honeywell di Indonesia pada tahun 2015.'
                        award="Honeywell Automation and Solution 2015 Outstanding Partner Award"
                        year="2015"
                        priority={false}
                    />

                    <AwardItem
                        image="https://sandbox.kurniasafety.com/@static/awards/3M Top 10 Channel Growth 2016.png"
                        title="3M Top 10 Channel Growth 2016"
                        description='PT. Kurnia Safety Supplies (KSS) menerima piagam penghargaan dari principal PT. 3M Indonesia untuk kategori "3M Top 10 Channel Growth 2016". Penghargaan ini diberikan sebagai bentuk apresiasi atas pencapaian luar biasa KSS dalam memasarkan produk 3M di Indonesia pada tahun 2016.'
                        award="3M Top 10 Channel Growth 2016."
                        year="2016"
                        priority={false}
                    />

                    <AwardItem
                        image="https://sandbox.kurniasafety.com/@static/awards/3M Star Partner 2018.png"
                        title="Star Partners 3M 2018"
                        description='PT. Kurnia Safety Supplies (KSS) menerima piala penghargaan dari principal 3M untuk kategori "Star Partners" Regional South East Asia (SEA) Tahun 2018. Piala penghargaan ini diberikan atas pencapaian luar biasa KSS sebagai partner 3M untuk Regional South East Asia (SEA).'
                        award="Star Partners 3M 2018."
                        year="2018"
                        priority={false}
                    />

                    <AwardItem
                        image="https://sandbox.kurniasafety.com/@static/awards/3M SEA Region Star Partners 2019.png"
                        title="Star Partners 3M 2019"
                        description='PT. Kurnia Safety Supplies (KSS) menerima piala penghargaan dari principal 3M untuk kategori "Star Partners" Regional South East Asia (SEA) Tahun 2019. Piala penghargaan ini diberikan kepada CEO PT. Kurnia Safety Supplies (KSS), Bpk. Rudy Kurniawan yang saat itu diundang langsung untuk menghadiri acara penghargaannya di Republik Rakyat Tiongkok.'
                        award="Star Partners 3M 2019."
                        year="2019"
                        priority={false}
                    />
                </div>
            </div>
        </>
    );
}
