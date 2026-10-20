import Link from "next/link";
import { baseUrl } from "@/utils/baseUrl";
import { getTranslations } from "@/app/lib/getTranslations";
import { t } from "@/app/lib/t";

interface BreadcrumbProps {
  parentCategories?: any;
  category?: any;
  lang_id:string;
}

export default async function Breadcrumb({ parentCategories, category, lang_id }: BreadcrumbProps) {
  const lang = lang_id === "2" ? "id" : "";
  // ✅ Ambil dictionary server-side
  const dict = await getTranslations(lang_id);

  const home = t(dict, "home");
  const product = t(dict, "product");

  return (
    <div className="container mx-auto lg:px-4">
      <ol className="ps-breadcrumb flex flex-wrap gap-2 text-sm text-gray-600">

        <li className="ps-breadcrumb__item hover:text-[#46b049]">
          <Link href={baseUrl("/", lang)} className="hover:underline ">
            {home}
          </Link>
        </li>

        <li className={`ps-breadcrumb__item ${!parentCategories && !category && "text-[#46b049]" }`}>
          {!parentCategories && !category ? (product) : 
          (<Link
            href={baseUrl("/products", lang)}
            className={!parentCategories && !category ? "text-[#46b049]" : "hover:text-[#46b049]"}
          >
            {product}
          </Link>)}
          {/* <Link
            href={baseUrl("/products", lang)}
            className={!parentCategories && !category ? "text-[#46b049]" : "hover:text-[#46b049]"}
          >
            {product}
          </Link> */}
        </li>

        {parentCategories && (
          <li className="ps-breadcrumb__item hover:text-[#46b049]">
            <Link
              href={baseUrl(`/products/${parentCategories.slug}`, lang)}
              className="hover:underline "
            >
              {parentCategories.name}
            </Link>
          </li>
        )}

        {category && (
          <li className="ps-breadcrumb__item text-[#46b049]">
            {category.name}
          </li>
        )}
      </ol>

      <h1 className="ps-categogy__name text-[#46b049] text-3xl">
        {category?.name ?? product}
      </h1>
    </div>
  );
}
