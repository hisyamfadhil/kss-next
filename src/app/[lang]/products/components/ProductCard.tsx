"use client";

import Image from "next/image";
import { imageBaseUrl } from "@/utils/baseUrl";
import Link from "next/link";

interface Product {
  id: string;
  name: string;
  image: string;
  price: number;
  url: string;
}

interface ProductCardProps {
  product: Product;
  promoted_badge?: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, promoted_badge = false }) => {
  return (
    <div className="border rounded p-2 flex flex-col items-center">
      {promoted_badge && <span className="bg-green-600 text-white px-2 py-1 text-xs rounded absolute top-2 left-2">Promo</span>}
      <Image
        src={imageBaseUrl(product.image)}
        alt={product.name}
        width={200}
        height={200}
        className="object-cover rounded"
        priority
      />
      <h3 className="mt-2 text-center text-sm font-medium">{product.name}</h3>
      <p className="text-center text-green-600 font-semibold">${product.price}</p>
      <Link href={product.url} className="mt-2 px-4 py-1 bg-blue-600 text-white rounded hover:bg-blue-700">View</Link>
    </div>
  );
};

export default ProductCard;
