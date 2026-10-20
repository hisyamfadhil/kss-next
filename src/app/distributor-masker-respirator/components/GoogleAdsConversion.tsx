"use client";

import { useEffect } from "react";

export default function GoogleAdsConversion() {
  useEffect(() => {
    window.gtag?.("event", "conversion", {
      send_to: "AW-10861005741/AHtWCK7X_8AcEK2X97oo",
    });
  }, []);

  return null;
}