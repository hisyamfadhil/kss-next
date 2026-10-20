"use client";

import Link from "next/link";
import { ChevronLeft, Home } from "lucide-react";
import SearchButton from "./SearchButton";

export default function MobileFooterNav({lang}:{lang:string}) {

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 flex justify-around items-center bg-white border-t border-gray-200 py-3">
      {/* Tombol Back */}
      <Link
        href="#"
        onClick={() => history.back()}
        title="Back"
        className="flex flex-col items-center text-gray-700 hover:text-green-600 transition"
      >
        <ChevronLeft className="text-2xl" />
      </Link>

      {/* Tombol Home */}
      <Link
        href={`/${lang}`}
        title="Home"
        className="flex flex-col items-center text-gray-700 hover:text-green-600 transition"
      >
        <Home className="text-2xl" />
      </Link>

      {/* Tombol Search */}
      <SearchButton lang={lang}/>
    </div>
  );
}
