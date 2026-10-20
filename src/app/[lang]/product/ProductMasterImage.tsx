"use client";

import React, { memo } from "react";

import { baseUrl } from "@/utils/baseUrl";
import { getProductDetailImage } from "@/utils/getProductImage";
import { useTranslations } from "@/app/hooks/useTranslate";
import Link from "next/link";
import Slider from "./Slider";
import ShareButtons from "@/app/[lang]/components/ShareButtons";

function ProductMasterImage({
  data = [],
  data_product = {},
  data_brand = {},
  data_categories = {},
  general_setting = {},
  lang
}: {
  data: any[];
  data_product: any;
  data_brand: any;
  data_categories: any;
  general_setting: any;
  lang: string
}) {
  const { t } = useTranslations();

  const imageProduct = data.map((item: any) => (
    getProductDetailImage(item.storage, item.image_default)
  ))
  

  return (
    <div className="md:col-span-9">
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
        {/* === Left Image Gallery === */}
        <div className="xl:col-span-7">
          <Slider slides={imageProduct} options={{ loop: true }} />
        </div>

        {/* === Right Product Info === */}
        <div className="xl:col-span-5">
          <div className="ps-product__info">
            <h1 className="ps-product__title">
              {data_product?.title || "Untitled"}
            </h1>

            {general_setting?.reviews === 1 && (
              <div className="ps-product__rating">
                <span className="ps-product__review">(0)</span>
              </div>
            )}

            {data_product?.short_desc && (
              <div
                className="ps-product__descshort"
                dangerouslySetInnerHTML={{
                  __html: data_product.short_desc || "",
                }}
              />
            )}

            {/* === Product Meta Info === */}
            <div className="ps-product__type">
              <ul className="ps-product__list">
                {data_brand.name && (
                  <li>
                    <span className="ps-list__title">
                      {t("brand")}:
                    </span>
                    <Link
                      className="ps-list__text hover:text-[#46b049]"
                      href={baseUrl(`/products?search=${data_brand?.slug}`, lang)}
                    >
                      {data_brand?.name}
                    </Link>
                  </li>
                )}

                {data_categories && (
                  <li>
                    <span className="ps-list__title">
                      {t("category")}:
                    </span>
                    <Link className="ps-list__text hover:text-[#46b049]" href={baseUrl(`/products/${data_categories.parent_slug}`, lang)}>
                      {data_categories.parent_name}
                    </Link>

                    <Link className="ps-list__text hover:text-[#46b049]" href={baseUrl(`/products/${data_categories.parent_slug}/${data_categories.category_slug}`, lang)}>
                      {data_categories.category_name}
                    </Link>
                  </li>
                )}

                {data_product?.sku && (
                  <li>
                    <span className="ps-list__title">
                      {t("sku")}:
                    </span>
                    <span className="ps-list__text">{data_product.sku}</span>
                  </li>
                )}
              </ul>
            </div>

            {/* === Social Share Buttons === */}
            <ShareButtons
              url={baseUrl(`/product/${data_product?.slug}`, lang)}
              title={data_product?.title}
              image={imageProduct[0]}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

// ✅ gunakan memo agar tidak re-render jika props sama
export default memo(ProductMasterImage);
