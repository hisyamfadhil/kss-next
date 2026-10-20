"use client";

import { useEffect, useState } from "react";
import SidebarFilters from "@/app/[lang]/products/components/SidebarFilters";
import ProductGrid from "@/app/[lang]/products/components/ProductGrid";
import Pagination from "@/app/[lang]/components/Pagination";
import { getProductData } from "@/app/lib/api";
import { useRouter, useSearchParams } from "next/navigation";

interface Product {
  id: number;
  product_title: string;
  slug: string;
  image?: string;
  price?: number;
  [key: string]: unknown;
}

interface Category {
  id: number;
  name: string;
  slug: string;
  long_desc_category?: string;
}

interface Brand {
  id: number;
  name: string;
  slug: string;
}

interface Text {
  sort_by: string;
  most_recent: string;
  most_previous: string;
}

interface ProductApiResponse {
  resultCategory: Category[];
  resultSubCategory: Category[];
  resultBrand: Brand[];
  resultProduct: Product[];
  totalPages: number;
}

interface ListProductProps {
  data?: ProductApiResponse | null;
  lang_id: string;
  slug: string;
  page: number;
  filter_sort: string;
  text: Text;
}

export default function ListProduct({ data, lang_id, slug, page, filter_sort, text }: ListProductProps) {
  const lang = lang_id === "2" ? "id" : "";
  const router = useRouter();
  const searchParams = useSearchParams();

  const [products, setProducts] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [subCategories, setSubCategories] = useState<any[]>([]);
  const [brands, setBrands] = useState<any[]>([]);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);
  
  const handleChange = (e: { target: { value: any; }; }) => {
    const value = e.target.value;

    const query = new URLSearchParams(searchParams.toString());
    query.set("sort", value);

    router.push(`?${query.toString()}`);
    router.refresh()
  };

  useEffect(() => {
    if (data) {
      setCategories(data.resultCategory || []);
      setSubCategories(data.resultSubCategory || []);
      setBrands(data.resultBrand || []);
      setProducts(data.resultProduct || []);
      setTotalPages(data.totalPages)
      setLoading(false);
    } else {
      const loadData = async () => {
        try {
          const res = await getProductData(lang_id, "", "", "", "", 1, "");
          setCategories(res.resultCategory || []);
          setSubCategories(res.resultSubCategory || []);
          setBrands(res.resultBrand || []);
          setProducts(res.resultProduct || []);
          setTotalPages(res.totalPages)
        } finally {
          setLoading(false);
        }
      };
      loadData();
    }
  }, [data, lang_id]);


  if (loading) {
    return <p className="text-center py-10">Loading products...</p>;
  }

  return (
    <div className="container mx-auto lg:px-4 py-8 flex flex-col-reverse md:flex-row gap-6">
      {/* Sidebar */}
      <aside className="w-full md:w-1/4">
        <SidebarFilters categories={categories} brands={brands} slug={slug} lang={lang} />
      </aside>

      {/* Main content */}
      <main className="flex-1">
        <div className="flex md:justify-end justify-start bg-gray-50 rounded p-3 mb-5">
          <span className="text-gray-500 m-1">
            {text.sort_by}
          </span>
          <select id="select_sort_items" value={filter_sort}
            onChange={handleChange}
            className="form-select"
            data-current-url="<?= current_url(); ?>"
            data-query-string="<?= generate_filter_url($query_string_array, 'rmv_srt', ''); ?>"
            data-page="products"
            aria-label="Sort Items"
            >
            <option value="">Default</option>
            <option value="most_recent">
              {text.most_recent}
            </option>
            <option value="most_previous">
              {text.most_previous}
            </option>
            <option value="alphabetical_order">A-Z</option>
          </select>
        </div>
        <ProductGrid products={products} lang={lang} />
        <Pagination currentPage={page} totalPages={totalPages} />
        {/* <?php if (!empty($category->long_desc_category)): ?> */}
        {(subCategories[0]?.long_desc_category && (
          <>
            <hr className="my-5" />
            <article>
              <div className="col-md-12">
                <div className="ps-delivery__content">
                  <div className="ps-document">
                    <div
                      dangerouslySetInnerHTML={{ __html: subCategories[0]?.long_desc_category || "" }}
                    />
                  </div>
                </div>
              </div>
            </article>
            <hr />
          </>
        ))}
      </main>
    </div>
  );
}
