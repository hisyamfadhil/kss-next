"use client"
import { baseUrl, imageBaseUrl } from "@/utils/baseUrl";
import Link from 'next/link';
import Image from 'next/image';
import { getCartProductCount } from '@/app/lib/cartService';
import { useEffect, useState } from "react";

export default function Quotation({lang}:{lang:string}) {
    const [count, setCount] = useState(0);

  const updateCount = () => {
    const newCount = getCartProductCount();
    setCount(newCount);
  };

  useEffect(() => {
    updateCount(); // ambil count awal

    // Dengarkan event global
    const handleCartUpdate = () => updateCount();
    window.addEventListener("cart-updated", handleCartUpdate);

    return () => {
      window.removeEventListener("cart-updated", handleCartUpdate);
    };
  }, []);
    return (
        <Link href={baseUrl("/quotations", lang)} className="relative flex items-center">
            <Image
                src={imageBaseUrl("@static/img/q3.png")}
                alt="cart-quote"
                width={28}
                height={28}
                className="object-contain"
            />
            {(count > 0 && (
                <span
                    id="my-cart"
                    className="absolute -top-1 -right-2 bg-red-600/50 text-white text-xs font-semibold rounded-full w-5 h-5 flex items-center justify-center"
                >
                    {count}
                </span>
            ))}
        </Link>
    )
}