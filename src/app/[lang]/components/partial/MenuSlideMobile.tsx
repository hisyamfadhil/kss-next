"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, ChevronDown } from "lucide-react";

import LanguageModal from "@/app/[lang]/components/partial/Modal";
import { baseUrl } from "@/utils/baseUrl";
import { usePathname } from "next/navigation";

interface Category {
  id: number;
  name: string;
  slug: string;
  children?: Category[];
}

interface Labels {
  tHome: string;
  tProducts: string;
  tAbout: string;
  tHse: string;
  tContact: string;
}

interface Props {
  lang_id: string;
  logo: string;
  categories: Category[];
  labels: Labels;
  dataLanguage: any;
}

export default function MenuSlideClient({
  lang_id,
  logo,
  categories,
  labels,
  dataLanguage,
}: Props) {
  const lang = lang_id === "2" ? "id" : "";
  const pathname = usePathname();

  const [open, setOpen] = useState(false);
  const { tHome, tProducts, tAbout, tContact } = labels;

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <>
      {/* Toggle Button */}
      <button
        className="p-2 rounded-md md:hidden"
        onClick={() => setOpen(true)}
        aria-label="Open menu"
      >
        <Menu size={20} />
      </button>

      {/* Sidebar */}
      <nav
        className={`overflow-y-auto fixed top-0 left-0 h-[calc(100vh-63px)] w-full bg-white shadow-lg z-50 transform transition-transform duration-300 ease-in-out ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b relative container mx-auto lg:px-4">
          <button
            className="absolute top-5 left-3 text-2xl text-gray-600 hover:text-red-500 focus:outline-none"
            onClick={() => setOpen(false)}
            aria-label="Close menu"
          >
            <X />
          </button>
          <Link
            href={baseUrl("/", lang)}
            onClick={() => setOpen(false)}
            className="w-full text-center"
          >
            <Image
              src={logo}
              alt="KSS Logo"
              width={100}
              height={100}
              className="object-contain mx-auto"
              priority
              fetchPriority="high"
            />
          </Link>
        </div>

        {/* Menu Items */}
        <div className="container mx-auto lg:px-4">
          <ul className="flex flex-col">
            {/* 1. Home */}
            <li>
              <Link
                href={baseUrl("/", lang)}
                className="block py-2 px-3 hover:bg-gray-100 rounded text-lg font-semibold"
                onClick={() => setOpen(false)}
              >
                {tHome}
              </Link>
            </li>

            {/* 2. Products */}
            {/* <li>
              <details className="group/main">
                <summary className="flex items-center justify-between cursor-pointer py-2 px-3 hover:bg-gray-100 rounded text-lg font-semibold">
                  {tProducts}
                  <ChevronDown className="transition-transform group-open/main:rotate-180" />
                </summary>
                <ul className="flex flex-col space-y-1" style={{ marginLeft: "20px" }}>
                  {categories.map((cat) => (
                    <li key={cat.id}>
                      {cat.children && cat.children.length > 0 ? (
                        <details className="group/sub">
                          <summary className="flex items-center justify-between cursor-pointer py-2 px-3 hover:bg-gray-100 text-gray-90 rounded">
                            <Link href={baseUrl(`/products/${cat.slug}`, lang)} className="text-lg text-[#5d6f88]">
                              {cat.name}
                            </Link>
                            <ChevronDown className="transition-transform group-open/sub:rotate-180" />
                          </summary>

                          <ul className="flex flex-col pl-5 border-l border-gray-200 ml-2 mt-1 space-y-1" style={{ marginLeft: "30px" }}>
                            {cat.children.map((sub) => (
                              <li key={sub.id}>
                                <Link
                                  href={baseUrl(`/products/${cat.slug}/${sub.slug}`, lang)}
                                  className="block py-1 px-2 hover:bg-gray-50 text-[#5d6f88] rounded text-md"
                                >
                                  {sub.name}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </details>
                      ) : (
                        <Link
                          href={baseUrl(`/products/${cat.slug}`, lang)}
                          className="block py-2 px-3 hover:bg-gray-100 rounded"
                        >
                          {cat.name}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </details>
            </li> */}

            {/* 3. About */}
            <li>
              <Link
                href={baseUrl("/about", lang)}
                className="block py-2 px-3 hover:bg-gray-100 rounded text-lg font-semibold"
                onClick={() => setOpen(false)}
              >
                {tAbout}
              </Link>
            </li>

            {/* 4. Projects (Dropdown Accordion) */}
            <li>
              <details className="group">
                <summary className="flex items-center text-lg font-semibold justify-between cursor-pointer py-2 px-3 hover:bg-gray-100 rounded">
                  <span>Projects</span>
                  <ChevronDown className="transition-transform group-open:rotate-180" />
                </summary>
                <ul className="flex flex-col ml-5 mt-1 border-l-2 border-[#46b049] pl-2 space-y-1">
                  <li>
                    <Link
                      href={baseUrl("/lifeline-solutions/solution", lang)}
                      className="block py-1.5 px-3 hover:bg-gray-50 rounded text-md text-gray-700 hover:text-[#46b049]"
                      onClick={() => setOpen(false)}
                    >
                      Solution
                    </Link>
                  </li>
                  <li>
                    <Link
                      href={baseUrl("/lifeline-solutions/services", lang)}
                      className="block py-1.5 px-3 hover:bg-gray-50 rounded text-md text-gray-700 hover:text-[#46b049]"
                      onClick={() => setOpen(false)}
                    >
                      Service
                    </Link>
                  </li>
                  <li>
                    <Link
                      href={baseUrl("/lifeline-solutions/cases", lang)}
                      className="block py-1.5 px-3 hover:bg-gray-50 rounded text-md text-gray-700 hover:text-[#46b049]"
                      onClick={() => setOpen(false)}
                    >
                      Cases
                    </Link>
                  </li>
                  <li>
                    <Link
                      href={baseUrl("/lifeline-solutions/fall-protection", lang)}
                      className="block py-1.5 px-3 hover:bg-gray-50 rounded text-md text-gray-700 hover:text-[#46b049]"
                      onClick={() => setOpen(false)}
                    >
                      APD Lifeline
                    </Link>
                  </li>
                </ul>
              </details>
            </li>

            {/* 5. Contact */}
            <li>
              <Link
                href={baseUrl("/contact", lang)}
                className="block py-2 px-3 hover:bg-gray-100 rounded text-lg font-semibold"
                onClick={() => setOpen(false)}
              >
                {tContact}
              </Link>
            </li>

            {/* 6. Kurnia Safety (Official Link) */}
            <li>
              <a
                href="https://www.kurniasafety.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="block py-2 px-3 hover:bg-gray-100 rounded text-lg font-semibold text-black hover:text-[#46b049]"
                onClick={() => setOpen(false)}
              >
                Kurnia Safety
              </a>
            </li>

            {/* 7. Blogs */}
            <li>
              <Link
                href={baseUrl("/blog", lang)}
                className="block py-2 px-3 hover:bg-gray-100 rounded text-lg font-semibold"
                onClick={() => setOpen(false)}
              >
                Blogs
              </Link>
            </li>

            {/* Bahasa Selector */}
            <li className="mt-2 pt-2 border-t">
              <LanguageModal data={dataLanguage} lang_id={lang_id} />
            </li>
          </ul>
        </div>
      </nav>

      {/* Overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-40"
          onClick={() => setOpen(false)}
        />
      )}
    </>
  );
}