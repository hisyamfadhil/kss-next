"use client";

import { useEffect, useState } from "react";
import { ChevronUp } from "lucide-react";

export default function ScrollTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  // Tampilkan tombol ketika scroll melewati 300px
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) setIsVisible(true);
      else setIsVisible(false);
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  // Fungsi untuk scroll ke atas
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-20 left-5 z-50 flex items-center justify-center w-10 h-10 
          rounded-full bg-green-600 text-white shadow-lg hover:bg-green-700 transition-all duration-300 
          animate-fade-in"
          aria-label="Scroll to top"
        >
          <ChevronUp className="text-xl" />
        </button>
      )}
    </>
  );
}
