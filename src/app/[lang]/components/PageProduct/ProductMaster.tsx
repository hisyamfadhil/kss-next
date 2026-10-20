/* eslint-disable */
import { baseUrl } from "@/utils/baseUrl";
import Image from "next/image";
import Link from "next/link";
import { getProductItemImage } from "@/utils/getProductImage";
import React from "react";

interface ProductMasterProps {
  data: any;
  promoted_badge: boolean;
  is_slider: number;
  discount_label: number;
  loading?: boolean;
  lang: string;
}

export default function ProductMaster({
  data,
  promoted_badge,
  loading = false,
  lang
}: ProductMasterProps) {

  const productUrl = baseUrl(`/product/${data.slug}`, lang);
  const mainImage = getProductItemImage(data);
  const secondaryImage = data.image_second
    ? getProductItemImage(data, true)
    : null;

  // if (loading) {
  //   return (
  //     <div className="animate-pulse space-y-2">
  //       <div className="bg-gray-200 w-full aspect-square rounded"></div>
  //       <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto"></div>
  //     </div>
  //   );
  // }

  return (
    <div className="ps-product ps-product--standard">
      <Link href={productUrl} className="ps-product__image">
        <div
          className={`relative w-full aspect-square overflow-hidden ${secondaryImage ? "group" : ""
            }`}
        >
          {promoted_badge && data.is_promoted ? (
            <div className="ps-product__badge">
              <span className="ps-badge ps-badge--featured">Featured</span>
            </div>
          ) : null}

          <Image
            src={mainImage}
            alt={data.title}
            fill
            sizes="(max-width: 768px) 250px, (max-width: 1200px) 250px, 33vw"
            style={{ objectFit: "cover" }}
            loading={loading ? "eager" : "lazy"}  // Jika loading true, gunakan eager
            fetchPriority={loading ? "high" : "auto"}  // Jika loading true, beri high priority
            className={`object-cover transition-opacity duration-500 ${secondaryImage ? "group-hover:opacity-0" : ""
              }`}
          />

          {secondaryImage && (
            <Image
              src={secondaryImage}
              alt={data.title}
              fill
              sizes="(max-width: 768px) 250px, (max-width: 1200px) 250px, 33vw"
              style={{ objectFit: "cover" }}
              loading="lazy"
              className="object-cover inset-0 opacity-0 transition duration-500 group-hover:opacity-100 group-hover:scale-110"
            />
          )}
        </div>
      </Link>

      <div className="ps-product__content mt-2">
        <Link
          href={productUrl}
          className="text-sm font-medium line-clamp-2 hover:text-[#46b049]"
        >
          {data.title}
        </Link>
      </div>
    </div>
  );
}
