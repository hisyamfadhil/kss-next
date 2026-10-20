"use client";

import { useRouter, useSearchParams } from "next/navigation";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
}

export default function Pagination({ currentPage, totalPages }: PaginationProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  if (totalPages <= 1) return null;

  const goToPage = (p: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", p.toString());
    router.push(`?${params.toString()}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const maxPagesToShow = 5;
  const startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
  const endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);
  const pages: number[] = [];
  for (let i = startPage; i <= endPage; i++) pages.push(i);

  return (
    <ul className="pagination flex flex-wrap justify-center items-center gap-1 mt-6 text-xs sm:text-sm select-none">
      {/* Tombol « ke halaman pertama */}
      <li className={`pagination ${currentPage === 1 ? "hidden" : ""}`}>
        <button
          onClick={() => currentPage !== 1 && goToPage(1)}
          className={`cursor-pointer px-3 py-1 border rounded-full hover:bg-gray-100 ${currentPage === 1 ? "hidden" : ""
            }`}
          rel="start"
        >
          «
        </button>
      </li>

      {/* Tombol ‹ ke halaman sebelumnya */}
      <li className={`pagination ${currentPage === 1 ? "hidden" : ""}`}>
        <button
          onClick={() => currentPage > 1 && goToPage(currentPage - 1)}
          className={`cursor-pointer px-3 py-1 border rounded-full hover:bg-gray-100 ${currentPage === 1 ? "pointer-events-none" : ""
            }`}
          rel="prev"
        >
          ‹
        </button>
      </li>

      {/* Nomor halaman */}
      {pages.map((p) => (
        <li
          key={p}
          className={`${p === currentPage
            ? "active bg-green-600 text-white border-green-600"
            : "hover:bg-gray-100"
            } border rounded-full`}
        >
          <button
            onClick={() => goToPage(p)}
            className={`block px-3 py-1 cursor-pointer ${p === currentPage ? "pointer-events-none" : ""
              }`}
          >
            {p}
          </button>
        </li>
      ))}

      {/* Tombol › ke halaman berikutnya */}
      {(totalPages != undefined && (
        <>
          <li className={`pagination ${currentPage === totalPages ? "hidden" : ""}`}>
            <button
              onClick={() => currentPage < totalPages && goToPage(currentPage + 1)}
              className={`cursor-pointer px-3 py-1 border rounded-full hover:bg-gray-100 ${currentPage === totalPages ? "hidden" : ""}`}
              rel="next"
            >
              ›
            </button>
          </li>
          {/*  Tombol » ke halaman terakhir */}
          <li className={`pagination ${currentPage === totalPages ? "hidden" : ""}`}>
            <button
              onClick={() => currentPage !== totalPages && goToPage(totalPages)}
              className={`cursor-pointer px-3 py-1 border rounded-full hover:bg-gray-100 ${currentPage === totalPages ? "hidden" : ""}`}
              rel="end"
            >
              »
            </button>
          </li>
        </>
      ))}

    </ul>
  );
}
