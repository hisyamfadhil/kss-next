"use client";
import Cookies from "js-cookie";
import { useEffect } from "react";

export default function LangCookieSync({ lang_id }: { lang_id: string }) {
  useEffect(() => {
    const current = Cookies.get("lang_id");

    if (current !== lang_id) {
      Cookies.set("lang_id", lang_id, { expires: 365 });

      // reload halaman agar semua fetch/server component ikut lang baru
      window.location.reload();
    }
  }, [lang_id]);

  return null;
}
