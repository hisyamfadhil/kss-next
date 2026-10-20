"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { X } from "lucide-react";
import { useTranslations } from "@/app/hooks/useTranslate";
import {
    getCart,
    removeFromCart,
    updateQuantity,
    getCartProductCount,
} from "@/app/lib/cartService";
import { baseUrl } from "@/utils/baseUrl";
import { CartItem } from "@/app/lib/types";
import { useParams } from "next/navigation";

export default function ListQuotationTable() {
    const { t } = useTranslations();

    const params = useParams();
    const lang = Array.isArray(params.lang) ? params.lang[0] : params.lang || "";

    const [cartItems, setCartItems] = useState<CartItem[]>([]);

    // Load cart dan bahasa
    useEffect(() => {
        const cart = getCart();
        setCartItems(cart);
    }, []);

    // Hapus item
    const handleRemove = (id: string) => {
        removeFromCart(id);
        const updated = getCart();
        setCartItems(updated);
        window.dispatchEvent(new Event("cart-updated"));
    };

    // Update quantity
    const handleQuantityChange = (id: string, value: number) => {
        if (value < 1) return;
        updateQuantity(id, value);
        const updated = getCart();
        setCartItems(updated);
    };

    return (
        <div className="ps-shopping">
            <div className="container mx-auto lg:px-4">
                <ul className="ps-breadcrumb flex flex-wrap">
                    <li className="ps-breadcrumb__item">
                        <Link href={baseUrl("/", lang)}>
                            {t("home")}
                        </Link>
                    </li>
                    <li className="ps-breadcrumb__item text-[#46b049]" aria-current="page">
                        {t("quotation_list")}
                    </li>
                </ul>
                <h1 className="ps-shopping__title">
                    {t("quotation_list")}
                    {(getCartProductCount() > 0 && (
                        <sup>( {getCartProductCount()} )</sup>
                    ))}
                </h1>
                {cartItems.length > 0 ? (
                    <>
                        <ul className="ps-shopping__list">
                            {cartItems.map((item, index) => (
                                <li key={item.id || index}>
                                    <div className="ps-product ps-product--wishlist items-start gap-4">
                                        <button
                                            onClick={() => handleRemove(item.id)}
                                            className="text-red-500 hover:text-red-700 text-right ps-product__remove"
                                            aria-label="Remove product"
                                        >
                                            <X />
                                        </button>
                                        <div className="ps-product__thumbnail w-full">
                                            <Link
                                                href={`/product/${item.slug}`}
                                                className="w-24 h-24 relative flex-shrink-0"
                                            >
                                                <Image
                                                    src={item.image || "/images/no-image.png"}
                                                    alt={item.product_title}
                                                    className="object-contain rounded-md"
                                                    height={100}
                                                    width={100}
                                                />
                                            </Link>
                                            <h2 className="ps-product__title text-center font-semibold">
                                                {item.product_title}
                                                <br />
                                                <em className="text-gray-400">
                                                    {t("sku") || "SKU"}: {item.sku || "-"}
                                                </em>
                                            </h2>
                                            <div className="ps-product__row mt-2">
                                                <span className="text-gray-500">
                                                    {t("quantity") || "Quantity"}: {item.quantity}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>

                        {/* TABEL */}
                        <div className="ps-shopping__table overflow-x-auto">
                            <table className="table ps-table ps-table--product w-full border-collapse">
                                <thead>
                                    <tr className="border-b">
                                        <th className="ps-product__thumbnail text-left py-2">
                                            {t("product") || "Product"}
                                        </th>
                                        <th className="ps-product__name py-2"></th>
                                        <th className="ps-product__quantity text-left py-2">
                                            {t("quantity") || "Quantity"}
                                        </th>
                                        <th className="ps-product__remove py-2"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {cartItems.map((item) => (
                                        <tr key={item.id} className="border-b hover:bg-gray-50">
                                            <td className="ps-product__thumbnail py-3">
                                                <Link href={baseUrl(`/product/${item.slug}`, lang)}>
                                                    <figure className="w-20 h-20 relative">
                                                        <Image
                                                            src={item.image || "/no-image.png"}
                                                            alt={item.product_title}
                                                            fill
                                                            className="object-contain rounded"
                                                        />
                                                    </figure>
                                                </Link>
                                            </td>

                                            <td className="ps-product__name py-3 text-left align-top">
                                                <Link
                                                    href={baseUrl(`/product/${item.slug}`, lang)}
                                                    className="font-semibold text-gray-700"
                                                >
                                                    {item.product_title}
                                                </Link>
                                                <p className="text-gray-500 text-sm">
                                                    <em>
                                                        {t("sku") || "SKU"}: {item.sku || "-"}
                                                    </em>
                                                </p>
                                                {!item.is_stock_available && (
                                                    <span className="text-red-500 text-sm font-semibold">
                                                        [Out of stock]
                                                    </span>
                                                )}
                                            </td>

                                            <td className="ps-product__row py-3 text-left align-top">
                                                <input
                                                    type="number"
                                                    className="border w-16 text-center rounded-md p-1"
                                                    value={item.quantity}
                                                    onChange={(e) =>
                                                        handleQuantityChange(item.id, Number(e.target.value))
                                                    }
                                                />
                                            </td>

                                            <td className="ps-product__remove py-3 text-center">
                                                <button
                                                    onClick={() => handleRemove(item.id)}
                                                    className="text-red-500 hover:text-red-700 flex items-center gap-1"
                                                >
                                                    <X />
                                                    <span>{t("remove") || "Remove"}</span>
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* FOOTER */}
                        <div className="ps-shopping__footer mt-8 flex flex-wrap justify-end items-center">
                            <Link
                                href={baseUrl("/products", lang)}
                                className="bg-green-600 text-white px-6 py-2 rounded-full hover:bg-green-700 mr-2"
                            >
                                {t("browse") || "Browse Other Product"}
                            </Link>

                            <Link
                                href={baseUrl("/quotations/shipping", lang)}
                                className="bg-green-600 text-white px-6 py-2 rounded-full hover:bg-green-700"
                            >
                                {t("continue") || "Continue"}
                            </Link>
                        </div>
                    </>
                ) : (
                    <div className="border border-gray-200 text-center py-8 my-5">
                        <p>{t("your_cart_is_empty") || "Your cart is empty"}</p>
                        <Link
                            href={baseUrl("/products", lang)}
                            className="inline-flex bg-[#46b049] text-white px-3 py-1 rounded-full mt-4"
                        >
                            {t("search_products") || "Browse Other Product"}
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
}
