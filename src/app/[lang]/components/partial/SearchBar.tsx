"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Search } from "lucide-react";
import { getInitialKeyword } from "@/utils/getInitialKeyword";
import { baseUrl } from "@/utils/baseUrl";
import { getProductData } from "@/app/lib/api";
import { getProductItemImage } from "@/utils/getProductImage";

export default function SearchBar({ placeholder, lang }: { placeholder: string, lang:string }) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [keyword, setKeyword] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    
    const [results, setResults] = useState<[]>([]);
    const [loading, setLoading] = useState(false);
    const lang_id = lang === "id" ? "2" : "1";

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!keyword.trim()) return;

        const query = new URLSearchParams(searchParams.toString());
        query.set("search", encodeURIComponent(keyword));
        const url = baseUrl(`/products?${query.toString()}`, lang)   

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
        <form onSubmit={handleSubmit} className="flex items-center border border-gray-300 rounded-full bg-white overflow-hidden w-full max-w-md">
            <input
                type="text"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                onFocus={() => setIsOpen(true)}
                onBlur={() => setTimeout(() => setIsOpen(false), 200)}
                placeholder={placeholder}
                className="w-[90%] px-4 py-2 outline-none text-gray-700 placeholder-gray-400"
            />
            <button type="submit" aria-label="Search product" className="w-[10%] flex items-center justify-center text-gray-600 hover:text-gray-800">
                <Search size={18} />
            </button>
        </form>
        {/* ✅ RESULT DROPDOWN */}
        {isOpen && results.length > 0 && (
            <div className="ps-search--result">
                <div className="ps-result__content p-2 grid grid-cols-2 gap-2">
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
        </>
    );
}
