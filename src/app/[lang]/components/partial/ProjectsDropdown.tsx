"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { baseUrl } from "@/utils/baseUrl";

export default function ProjectsDropdown({ lang }: { lang: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <li className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex items-center gap-1 focus:outline-none"
        aria-expanded={isOpen}
      >
        Projects
        <svg
          className={`w-4 h-4 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <ul className="absolute left-0 mt-2 w-48 bg-white text-gray-800 rounded-md shadow-lg py-2 z-50 border border-gray-100">
          <li>
            <Link
              href={baseUrl("/lifeline-solutions", lang)}
              onClick={() => setIsOpen(false)}
              className="block px-4 py-2 text-sm hover:bg-gray-100 hover:text-[#46b049] transition-colors"
            >
              Solution
            </Link>
          </li>
          <li>
            <Link
              href={baseUrl("/lifeline-solutions/services", lang)}
              onClick={() => setIsOpen(false)}
              className="block px-4 py-2 text-sm hover:bg-gray-100 hover:text-[#46b049] transition-colors"
            >
              Service
            </Link>
          </li>
          <li>
            <Link
              href={baseUrl("/lifeline-solutions/cases", lang)}
              onClick={() => setIsOpen(false)}
              className="block px-4 py-2 text-sm hover:bg-gray-100 hover:text-[#46b049] transition-colors"
            >
              Cases
            </Link>
          </li>
        </ul>
      )}
    </li>
  );
}