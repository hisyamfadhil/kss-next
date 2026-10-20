"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
// import Cookies from "js-cookie";
import { Globe } from "lucide-react";
import { imageBaseUrl } from "@/utils/baseUrl";
import { useRouter } from "next/navigation";

interface Language {
  id: string;
  name: string;
  short_form: string;
  flag_path?: string;
  base_url: string;
}

interface Props {
  data: Language[];
  lang_id: string; // default dari server jika cookie belum ada
}

const LanguageModal: React.FC<Props> = ({ data, lang_id }) => {
  
  const router = useRouter();

  const [show, setShow] = useState(false);
  const [activeLang, setActiveLang] = useState<string>(lang_id);

  useEffect(() => {
      setActiveLang(lang_id);
  }, [lang_id]);

  const handleSelectLanguage = (lang: Language) => {
    // simpan cookie
    document.cookie = `lang_id=${lang.id}; path=/; max-age=31536000; SameSite=Lax`;
  
    // prefix bahasa
    const newPrefix = lang.short_form === "id" ? "id" : "";
  
    const { pathname, search, hash } = window.location;
    const parts = pathname.split("/").filter(Boolean);
  
    // daftar prefix bahasa yang ada di URL
    const langPrefixes = data.map(l => l.short_form);
  
    // jika url sekarang sudah ada prefix bahasa
    if (parts.length && langPrefixes.includes(parts[0])) {
      if (newPrefix) {
        parts[0] = newPrefix;   // ganti prefix
      } else {
        parts.shift();          // hapus prefix
      }
    }
    // jika belum ada prefix dan bahasa baru butuh prefix
    else if (newPrefix) {
      parts.unshift(newPrefix);
    }
  
    const newPath = "/" + parts.join("/") + search + hash;
  
    router.push(newPath);
    router.refresh();
  };
  

  if (!data || data.length <= 1) return null;

  const currentLang = data.find((item) => item.id.toString() === activeLang) ?? data[0];

  return (
    <>
      {/* Tombol buka modal */}
      <button
        onClick={() => setShow(true)}
        className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 transition focus:outline-none"
      >
        {currentLang.flag_path && (
          <Image
            src={imageBaseUrl(currentLang.flag_path)}
            alt={currentLang.name}
            width={30}
            height={20}
            className="object-contain"
          />
        )}
        <span className="text-sm font-medium">{currentLang.name}</span>
      </button>

      {/* Modal overlay */}
      {show && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/40 backdrop-blur-sm"
          onClick={() => setShow(false)}
        >
          {/* Konten modal */}
          <div
            className="bg-white rounded-xl shadow-lg w-80 max-w-full p-6 relative animate-fadeIn"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Tombol close */}
            <button
              onClick={() => setShow(false)}
              className="absolute top-3 right-3 text-2xl text-gray-500 hover:text-gray-800"
            >
              &times;
            </button>

            {/* Judul */}
            <div className="text-center mb-4">
              <Globe className="text-3xl mx-auto mb-2" />
              <h2 className="text-lg font-semibold">Select Language</h2>
            </div>

            {/* Daftar bahasa */}
            <ul className="flex flex-col gap-2 max-h-[60vh] overflow-y-auto">
              {data.map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => handleSelectLanguage(item)}
                    className={`flex items-center justify-center gap-2 px-4 py-2 rounded-md border text-sm font-medium transition-all w-full ${item.id === currentLang.id
                      ? "border-blue-600 bg-blue-600 text-white"
                      : "border-gray-300 hover:bg-gray-100"
                      }`}
                  >
                    {item.flag_path && (
                      <Image
                        src={imageBaseUrl(item.flag_path)}
                        alt={item.name}
                        width={20}
                        height={20}
                        className="rounded-sm"
                      />
                    )}
                    {item.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </>
  );
};

export default LanguageModal;
