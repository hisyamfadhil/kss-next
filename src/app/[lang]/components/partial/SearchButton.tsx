"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Search } from "lucide-react";
import { getInitialKeyword } from "@/utils/getInitialKeyword";
import { baseUrl } from "@/utils/baseUrl";
import { getProductItemImage } from "@/utils/getProductImage";
import { getProductData } from "@/app/lib/api";

export default function SearchButton({lang}:{lang:string}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [open, setOpen] = useState(false);
  const [keyword, setKeyword] = useState("");
  const lang_id = lang === "id" ? "2" : "1";

  const [results, setResults] = useState<[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!keyword.trim()) return;

    setOpen(false); 

    const query = new URLSearchParams(searchParams.toString());
    query.set("search", encodeURIComponent(keyword));
    const url = baseUrl(`/products?${query.toString()}`, "")   

    router.push(url);
    router.refresh()

  };

  useEffect(() => {
    setKeyword(getInitialKeyword(searchParams));
  }, [searchParams]);

  useEffect(() => {
    if (!keyword.trim()) {
        setResults([]);
        return;
    }

    const delay = setTimeout(async () => {
        try {
            setLoading(true);

            const data = await getProductData(
                lang_id,     // lang_id
                "",       // category
                "",       // brand
                "",       // sort
                keyword,  // 🔥 search
                1,       // page
                "20"      // limit suggestion
            );
            
            setResults(data?.resultProduct || []);
        } catch (err) {
            console.error("search error", err);
        } finally {
            setLoading(false);
        }
    }, 100); // debounce

    return () => clearTimeout(delay);
}, [keyword, lang]);
  return (
    <>
      {/* Tombol Search */}
      <button
        title="Search"
        onClick={() => setOpen(true)}
        className="flex flex-col items-center text-gray-700 hover:text-green-600 transition"
      >
        <Search className="text-2xl" />
      </button>

      {/* Modal */}
      {open && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white shadow-lg rounded-lg p-6 w-[90%] max-w-md">
            <h2 className="text-lg font-semibold mb-4">Search</h2>

            {/* Form → tekan Enter langsung search */}
            <form onSubmit={handleSearch}>
              <input
                type="text"
                autoFocus
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                placeholder="Type to search..."
                className="w-full border border-gray-300 rounded px-3 py-2"
              />

              <div className="flex justify-end mt-4 gap-2">
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded"
                >
                  Search
                </button>
              </div>
            </form>
            {/* ✅ RESULT DROPDOWN */}
            {results.length > 0 && (
                <div className="mt-2 max-h-96 overflow-y-auto">
                    <div className="ps-result__content">
                        {loading && (
                            <div className="text-sm text-gray-500 p-2">
                                Searching...
                            </div>
                        )}

                        {!loading && results.length === 0 && (
                            <div className="text-sm text-gray-400 p-2">
                                No results
                            </div>
                        )}

                        {!loading &&
                            results.map((item: any) => (
                                <a
                                    key={item.id}
                                    href={baseUrl(`/product/${item.slug}`, lang)}
                                    className="flex gap-3 p-2 hover:bg-gray-50 rounded-lg"
                                >
                                    <img
                                        src={getProductItemImage(item)}
                                        alt={item.title}
                                        className="w-25 h-25 object-cover rounded"
                                    />

                                    <div>
                                        <div className="text-sm font-medium">
                                            {item.title}
                                        </div>
                                        <div className="text-xs text-gray-500">
                                            SKU: {item.sku}
                                        </div>
                                    </div>
                                </a>
                            ))}
                    </div>
                </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
