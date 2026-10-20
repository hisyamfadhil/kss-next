"use client";
import HeroSlider from "@/app/distributor-masker-respirator/components/HeroSlider";
import Image from "next/image";
import {gtagReportConversion} from "@/app/distributor-masker-respirator/components/gtagReportConversion";

export default function Hero() {
    const message = "Halo. Saya menemukan kurniasafety.com dan ingin bertanya seputar masker/respirator. Mohon dibantu. Terima kasih!";

    const whatsappLink = `https://wa.me/6281111311192?text=${encodeURIComponent(message)}`;

    return (
        <>
            <header className="bg-[linear-gradient(90deg,_rgba(70,176,73,0.1)_0%,_rgba(205,234,206,0.51)_64%,_rgba(255,255,255,1)_100%)] py-12 border-b">
                <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-10">

                    <div className="space-y-6">
                        <h2 className="text-4xl">Distributor Masker Partikulat</h2>
                        <h1 className="text-4xl font-bold">
                            Jual Masker KN95 Dengan Valve 
                        </h1>

                        <div className="flex gap-4">
                            <a className="bg-[#46B049] font-bold text-white px-6 py-3 rounded-lg flex items-center gap-2"
                                href={whatsappLink}
                                onClick={(e) => {
                                    e.preventDefault();
                                    gtagReportConversion(whatsappLink);
                                  }}>
                                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                                    <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                                    <g id="SVGRepo_iconCarrier">
                                        <path fillRule="evenodd" clipRule="evenodd"
                                            d="M3.50002 12C3.50002 7.30558 7.3056 3.5 12 3.5C16.6944 3.5 20.5 7.30558 20.5 12C20.5 16.6944 16.6944 20.5 12 20.5C10.3278 20.5 8.77127 20.0182 7.45798 19.1861C7.21357 19.0313 6.91408 18.9899 6.63684 19.0726L3.75769 19.9319L4.84173 17.3953C4.96986 17.0955 4.94379 16.7521 4.77187 16.4751C3.9657 15.176 3.50002 13.6439 3.50002 12ZM12 1.5C6.20103 1.5 1.50002 6.20101 1.50002 12C1.50002 13.8381 1.97316 15.5683 2.80465 17.0727L1.08047 21.107C0.928048 21.4637 0.99561 21.8763 1.25382 22.1657C1.51203 22.4552 1.91432 22.5692 2.28599 22.4582L6.78541 21.1155C8.32245 21.9965 10.1037 22.5 12 22.5C17.799 22.5 22.5 17.799 22.5 12C22.5 6.20101 17.799 1.5 12 1.5ZM14.2925 14.1824L12.9783 15.1081C12.3628 14.7575 11.6823 14.2681 10.9997 13.5855C10.2901 12.8759 9.76402 12.1433 9.37612 11.4713L10.2113 10.7624C10.5697 10.4582 10.6678 9.94533 10.447 9.53028L9.38284 7.53028C9.23954 7.26097 8.98116 7.0718 8.68115 7.01654C8.38113 6.96129 8.07231 7.046 7.84247 7.24659L7.52696 7.52195C6.76823 8.18414 6.3195 9.2723 6.69141 10.3741C7.07698 11.5163 7.89983 13.314 9.58552 14.9997C11.3991 16.8133 13.2413 17.5275 14.3186 17.8049C15.1866 18.0283 16.008 17.7288 16.5868 17.2572L17.1783 16.7752C17.4313 16.5691 17.5678 16.2524 17.544 15.9269C17.5201 15.6014 17.3389 15.308 17.0585 15.1409L15.3802 14.1409C15.0412 13.939 14.6152 13.9552 14.2925 14.1824Z"
                                            fill="#ffffff"></path>
                                    </g>
                                </svg>
                                Tanya Harga
                            </a>
                        </div>
                        <ul className="space-y-3 pt-4 text-sm sm:text-base text-gray-900 font-medium">
                            <li className="flex items-start">
                                <span className="mr-2">•</span>
                                <span>Melayani konsultasi secara gratis terhadap produk yang diinginkan.</span>
                            </li>
                            <li className="flex items-start">
                                <span className="mr-2">•</span>
                                <span>Dapat dikirim kepada seluruh Indonesia.</span>
                            </li>
                            <li className="flex items-start">
                                <span className="mr-2">•</span>
                                <span>100% resmi dan original sesuai dari 3M & Honeywell</span>
                            </li>
                            <li className="flex items-start">
                                <span className="mr-2">•</span>
                                <span>Cocok untuk sektor:  Tambang, Konstruksi, & Minyak dan Gas </span>
                            </li>
                        </ul>
                    </div>

                    <div className="text-center">
                        <HeroSlider />
                    </div>

                </div>
            </header>
            <section className="bg-white py-8 border-b border-gray-100">
                <div className="max-w-5xl mx-auto px-4 flex flex-nowrap items-center justify-center gap-6 md:gap-20">
                    <Image src="/images/distributor-masker-respirator/logo-3m.png" alt="3M Logo" width={100} height={100} className="h-6 md:h-8 w-auto object-contain" />
                    <Image src="/images/distributor-masker-respirator/logo-honeywell.png" alt="Honeywell Logo" width={100} height={100} className="h-6 md:h-8 w-auto object-contain" />
                    {/* <Image src="/images/distributor-masker-respirator/logo-msa.png" alt="MSA Logo" width={100} height={100} className="h-6 md:h-8 w-auto object-contain" /> */}
                </div>
            </section>
        </>
    );
}