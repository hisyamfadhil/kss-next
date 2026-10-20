"use client";

import { useState, useRef, useCallback } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

interface SidebarProps {
  slug?: string;
  categories?: { id: string; name: string; slug: string }[];
  brands?: { id: string; name: string; slug: string }[];
  lang:string
}

const SidebarFilters: React.FC<SidebarProps> = ({ categories, brands, slug, lang }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentBrands = searchParams.get("brand")?.split(",") || [];

  const [selectedBrands, setSelectedBrands] = useState<string[]>(currentBrands);
  const debounceTimeout = useRef<NodeJS.Timeout | null>(null);

  const handleBrandToggle = useCallback((slug: string) => {
    setSelectedBrands((prev) => {
      const updated = prev.includes(slug)
        ? prev.filter((b) => b !== slug)
        : [...prev, slug];

      if (debounceTimeout.current) clearTimeout(debounceTimeout.current);
      debounceTimeout.current = setTimeout(() => {
        const query = new URLSearchParams(searchParams.toString());

        if (updated.length > 0) query.set("brand", updated.join(","));
        else query.delete("brand");

        router.push(`?${query.toString()}`);
      }, 200);

      return updated;
    });
  }, [router, searchParams]);

  return (
    <div className="space-y-6">
      {/* Category */}
      {categories?.length ? (
        <div>
          <h2 className="font-semibold mb-2 text-2xl text-[#5d6f88]">
            Category
          </h2>
          <ul className="space-y-1">
            {categories.map((cat) => (
              <li key={cat.id}>
                <Link
                  href={
                    slug && slug !== "products"
                      ? `${lang ? `/${lang}` : ""}/products/${slug}/${cat.slug}`
                      : `${lang ? `/${lang}` : ""}/products/${cat.slug}`
                  }
                  className="hover:underline text-[#000000] mb-3 block"
                >
                  {cat.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ):(<></>)}

      {/* Brand */}
      {brands?.length ? (
        <div>
          <h2 className="font-semibold mb-2 text-2xl text-[#5d6f88]">Brand</h2>
          <ul className="space-y-2 max-h-64 overflow-y-auto custom-scroll">
            {brands.map((brand) => (
              <li key={brand.id} className="flex items-center gap-2">
                <input
                  id={`brand-${brand.id}`}
                  type="checkbox"
                  checked={selectedBrands.includes(brand.slug)}
                  onChange={() => handleBrandToggle(brand.slug)}
                  aria-label={`Filter by brand ${brand.name}`}
                  className="h-4 w-4 accent-green-600 border-green-300 rounded"
                />
                <label
                  htmlFor={`brand-${brand.id}`}
                  className="cursor-pointer"
                >
                  {brand.name}
                </label>
              </li>
            ))}
          </ul>
        </div>
      ):(<></>)}
    </div>
  );
};

export default SidebarFilters;
