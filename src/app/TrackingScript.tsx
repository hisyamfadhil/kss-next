"use client";

import { useEffect } from "react";

export default function TrackingScript({
  html,
}: {
  html: string;
}) {
  useEffect(() => {
    const container = document.createElement("div");
    container.innerHTML = html;

    // Tambahkan noscript
    container.querySelectorAll("noscript").forEach((node) => {
      document.body.appendChild(node.cloneNode(true));
    });

    // Jalankan semua script
    container.querySelectorAll("script").forEach((oldScript) => {
      const script = document.createElement("script");

      // Salin atribut (src, async, dll)
      Array.from(oldScript.attributes).forEach((attr) => {
        script.setAttribute(attr.name, attr.value);
      });

      // Salin isi script
      script.text = oldScript.innerHTML;

      document.head.appendChild(script);
    });
  }, [html]);

  return null;
}