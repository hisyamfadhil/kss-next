"use client";

import { useEffect, useState } from "react";
import { baseUrlAPI } from "@/utils/baseUrl";

export function useTranslations() {
  const [dict, setDict] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTranslations() {
      try {
        // Ambil lang_id dari cookie browser
        const langId =
          document.cookie
            .split("; ")
            .find((row) => row.startsWith("lang_id="))
            ?.split("=")[1] || "1";

        const res = await fetch(baseUrlAPI(`api/language_translations`));
        if (!res.ok) throw new Error("Failed to fetch translations");

        const data = await res.json();

        // Filter hanya sesuai lang_id
        const filtered = data.filter(
          (item: any) => String(item.lang_id) === String(langId)
        );        

        // Ubah menjadi object key-value
        const dict: Record<string, string> = {};
        filtered.forEach((row: any) => {
          dict[row.label] = row.translation;
        });

        setDict(dict);
      } catch (err) {
        console.error("Translation fetch error:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchTranslations();
  }, []);

  // helper translator function
  function t(label: string) {    
    return dict[label] || label;
  }

  return { dict, t, loading };
}
