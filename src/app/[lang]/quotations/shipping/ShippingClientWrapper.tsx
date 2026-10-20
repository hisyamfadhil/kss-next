"use client";

import { useTranslations } from "@/app/hooks/useTranslate";
import { useEffect, useState } from "react";
import { CartItem } from "@/app/lib/types";
import { clearCart, getCart, getCartProductCount } from "@/app/lib/cartService";
import { 
  // getLocationStatesData, 
  PostShippingData } from "@/app/lib/api";
import { redirect } from "next/navigation";
import { baseUrl } from "@/utils/baseUrl";
// import Select from "react-select";
import Link from "next/link";
// import { SingleValue } from "react-select";

// interface OptionType {
//   value: string | number;
//   label: string;
// }

// interface Country {
//   id: string | number;
//   name: string;
// }

// interface State {
//   id: string | number;
//   name: string;
// }

interface PostShippingResponse {
  order_number: string;
}

interface ShippingWrapperProps {
  lang_id: string;
  // locationCountries: Country[];
}

export default function ShippingWrapper({
  lang_id,
  // locationCountries,
}: ShippingWrapperProps) {
  const { t } = useTranslations();
  const lang = lang_id === "2" ? "id" : "";

  const [langId, setLangId] = useState(lang_id);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [cartCount, setCartCount] = useState(0);
  // const [locationStates, setLocationStates] = useState<State[]>([]); // ✅ untuk states
  interface ShippingData {
    shipping_first_name: string;
    shipping_last_name: string;
    shipping_email: string;
    shipping_phone_number: string;
    shipping_company_name: string;
    shipping_address: string;
    shipping_city: string;
    shipping_zip_code: string;
    country_id: string;
    state_id: string;
    shipping_notes?: string;
    [key: string]: string | undefined;
  }

  const [dataShipping, setDataShipping] = useState<ShippingData>({
    shipping_first_name: "",
    shipping_last_name: "",
    shipping_email: "",
    shipping_phone_number: "",
    shipping_company_name: "",
    shipping_address: "",
    shipping_city: "",
    shipping_zip_code: "",
    country_id: "",
    state_id: "",
    shipping_notes: "",
  });

  const [errorMessage, setErrorMessage] = useState("");

  function validateShipping() {
    // daftar field wajib
    const requiredFields = [
      { key: "shipping_first_name", label: t("first_name") },
      { key: "shipping_last_name", label: t("last_name") },
      { key: "shipping_email", label: t("email") },
      { key: "shipping_phone_number", label: t("phone_number") },
      { key: "shipping_company_name", label: t("company") },
      { key: "shipping_address", label: t("address") },
      // { key: "shipping_city", label: t("city") },
      // { key: "shipping_zip_code", label: t("zip_code") },
      // { key: "country_id", label: t("country") },
      // { key: "state_id", label: t("state") },
    ];

    for (const field of requiredFields) {
      const value = dataShipping[field.key]?.trim() || "";
      if (!value) {
        let msg
        if (langId == "1") {
          msg = `Please fill out the ${field.label} field.`
        } else {
          msg = `Harap isi ${field.label}.`
        }

        setErrorMessage(msg);
        return false;
      }
    }

    setErrorMessage("");
    return true;
  }

  async function postShipping() {
    if (validateShipping()) {
      const postShipping: PostShippingResponse = await PostShippingData(dataShipping, cartItems)
      clearCart()
      window.dispatchEvent(new Event("cart-updated"));
      redirect(baseUrl(`/order-completed/${postShipping.order_number}`, lang));
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setDataShipping((prev) => ({ ...prev, [name]: value }));
  };

  // const handleChangeSelect = (name: string, value: string) => {
  //   setDataShipping((prev) => ({ ...prev, [name]: value }));
  // };

  // Load cart dan bahasa
  useEffect(() => {
    const cookies = document.cookie.split(";").reduce<Record<string, string>>((acc, c) => {
      const [key, val] = c.trim().split("=");
      acc[key] = val;
      return acc;
    }, {});
    const lang = cookies["lang_id"] || lang_id;
    setLangId(lang);

    setCartItems(getCart());
    setCartCount(getCartProductCount());
  }, [lang_id]);

  return (
    <div className="ps-checkout">
      <div className="container mx-auto lg:px-4">
        {/* Breadcrumb */}
        <ul className="ps-breadcrumb flex flex-wrap">
          <li className="ps-breadcrumb__item">
            <Link href="/">{t("home")}</Link>
          </li>
          <li
            className="ps-breadcrumb__item text-[#46b049]"
            aria-current="page"
          >
            {t("details")} {t("information")}
          </li>
        </ul>

        {/* Title */}
        <h3 className="ps-checkout__title">
          {t("details")} {t("information")}
        </h3>

        {/* Content */}
        <div className="ps-checkout__content">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-8 col-span-12">
              <div className="ps-checkout__form">
                <h3 className="ps-checkout__heading">{t("details")}</h3>

                {errorMessage && (
                  <div className="text-red-600 bg-red-50 border border-red-300 p-2 mt-3 rounded">
                    {errorMessage}
                  </div>
                )}
                {/* Shipping Form */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* First Name */}
                  <div className="ps-checkout__group">
                    <label htmlFor="first_name" className="ps-checkout__label">{t("first_name")} *</label>
                    <input
                      id="first_name"
                      type="text"
                      name="shipping_first_name"
                      className="ps-input form-input"
                      maxLength={250}
                      required
                      onChange={handleChange}
                    />
                  </div>

                  {/* Last Name */}
                  <div className="ps-checkout__group">
                    <label htmlFor="last_name" className="ps-checkout__label">{t("last_name")} *</label>
                    <input
                      id="last_name"
                      type="text"
                      name="shipping_last_name"
                      className="ps-input form-input"
                      maxLength={250}
                      required
                      onChange={handleChange}
                    />
                  </div>

                  {/* Email */}
                  <div className="ps-checkout__group">
                    <label htmlFor="email" className="ps-checkout__label">{t("email")} *</label>
                    <input
                      id="email"
                      type="email"
                      name="shipping_email"
                      className="ps-input form-input"
                      maxLength={250}
                      required
                      onChange={handleChange}
                    />
                  </div>

                  {/* Phone */}
                  <div className="ps-checkout__group">
                    <label htmlFor="phone" className="ps-checkout__label">{t("phone_number")} *</label>
                    <input
                      id="phone"
                      type="text"
                      name="shipping_phone_number"
                      className="ps-input form-input"
                      maxLength={100}
                      required
                      onChange={handleChange}
                    />
                  </div>

                  {/* Company */}
                  <div className="col-span-full ps-checkout__group">
                    <label htmlFor="company" className="ps-checkout__label">{t("company")} *</label>
                    <input
                      id="company"
                      type="text"
                      name="shipping_company_name"
                      className="ps-input form-input"
                      maxLength={250}
                      required
                      onChange={handleChange}
                    />
                  </div>

                  {/* Address */}
                  <div className="col-span-full ps-checkout__group">
                    <label htmlFor="address" className="ps-checkout__label">{t("address")} *</label>
                    <input
                      id="address"
                      type="text"
                      name="shipping_address"
                      className="ps-input form-input"
                      maxLength={250}
                      required
                      onChange={handleChange}
                    />
                  </div>

                  {/* Country */}
                  {/* <div className="ps-checkout__group">
                    <label htmlFor="country" className="ps-checkout__label">{t("country")} *</label>
                    <Select
                      id="country"
                      className="rounded-full"
                      options={locationCountries.map((item: Country) => ({
                        value: item.id,
                        label: item.name,
                      }))}
                      placeholder="Select country..."
                      onChange={async (selected: SingleValue<OptionType>) => {
                        const country_id = selected?.value;

                        try {
                          const states = await getLocationStatesData(String(country_id));
                          setLocationStates(states);
                          handleChangeSelect("country_id", String(country_id));
                        } catch (err) {
                          console.error("Gagal mengambil data states:", err);
                          setLocationStates([]);
                        }
                      }}
                    />
                  </div> */}

                  {/* State */}
                  {/* <div className="ps-checkout__group">
                    <label htmlFor="state" className="ps-checkout__label">{t("state")} *</label>
                    <Select
                      id="state"
                      className="rounded-full"
                      options={locationStates.map((item: State) => ({
                        value: item.id,
                        label: item.name,
                      }))}
                      placeholder="Select state..."
                      onChange={(selected: any) => {
                        const state_id = selected?.value;
                        handleChangeSelect("state_id", String(state_id));
                      }}
                    />
                  </div> */}

                  {/* City */}
                  {/* <div className="ps-checkout__group">
                    <label htmlFor="city" className="ps-checkout__label">{t("city")} *</label>
                    <input
                      id="city"
                      type="text"
                      name="shipping_city"
                      className="ps-input form-input"
                      maxLength={250}
                      required
                      onChange={handleChange}
                    />
                  </div> */}

                  {/* Zip Code */}
                  {/* <div className="ps-checkout__group">
                    <label htmlFor="zip_code" className="ps-checkout__label">{t("zip_code")} *</label>
                    <input
                      id="zip_code"
                      type="text"
                      name="shipping_zip_code"
                      className="ps-input form-input"
                      maxLength={90}
                      required
                      onChange={handleChange}
                    />
                  </div> */}

                  {/* Notes */}
                  <div className="col-span-full ps-checkout__group">
                    <label htmlFor="notes" className="ps-checkout__label">
                      {t("order_notes")} (optional)
                    </label>
                    <textarea
                      name="shipping_notes"
                      className="ps-textarea"
                      id="notes"
                      cols={30}
                      rows={5}
                      maxLength={4900}
                      onChange={handleChange}
                    ></textarea>
                  </div>
                </div>
              </div>
            </div>

            {/* Order Summary */}

            <div className="lg:col-span-4 col-span-12">
              <div className="ps-checkout__order">
                <h3 className="ps-checkout__heading">
                  {t("summary")} ({cartCount})
                </h3>

                {cartItems.map((item: CartItem, index: number) => (
                  <div className="ps-checkout__row ps-product" key={index}>
                    <div className="ps-product__name">
                      {item.product_title}
                    </div>
                    <div className="ps-product__price">x
                      {item.quantity}
                    </div>
                  </div>
                ))}

                <div className="ps-checkout__payment">
                  <button type="submit" name="submit" value="update" className="ps-btn ps-btn--primary" onClick={() => postShipping()}>
                    {t("continue")}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
