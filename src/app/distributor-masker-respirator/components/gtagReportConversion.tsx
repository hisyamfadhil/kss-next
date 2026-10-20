"use client";

declare global {
  interface Window {
    gtag: (...args: any[]) => void;
  }
}

export function gtagReportConversion(url: string) {
  const callback = () => {
    window.open(url, "_blank");
  };

  window.gtag?.("event", "conversion", {
    send_to: "AW-10861005741/AHtWCK7X_8AcEK2X97oo",
    value: 1.0,
    currency: "IDR",
    event_callback: callback,
  });

  return false;
}