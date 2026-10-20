"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";

import { addToCart } from "@/app/lib/cartService";
import { useTranslations } from "@/app/hooks/useTranslate";
import { getProductDetailImage } from "@/utils/getProductImage";
import Toast from "../components/Toast";

export default function ProductMasterDetail({
  data,
  data_image,
}: {
  data: any;
  data_image: any;
}) {
  const { t } = useTranslations();

  const [quantity, setQuantity] = useState<number>(1);

  const handleIncrease = () => setQuantity((prev) => prev + 1);
  const handleDecrease = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value > 0) setQuantity(value);
  };
  const [toast, setToast] = useState({
    show: false,
    message: "",
    type: "success" as "success" | "error" | "info",
  });

  const showToastHandler = (
    message: string,
    type: "success" | "error" | "info"
  ) => {
    setToast({ show: false, message: "", type: "success" });

    setTimeout(() => {
      setToast({
        show: true,
        message,
        type,
      });
    }, 100);
  };

  const handleQuotation = () => {
    const image = getProductDetailImage(data_image[0].storage, data_image[0].image_small)
    addToCart(data, quantity, image);

    window.dispatchEvent(new Event("cart-updated"));
    showToastHandler(`Added ${quantity} item(s) of ${data.title} to cart!`, "success");

  };

  return (
    <>
      <div className="md:col-span-3">
        <div id="toast-container" className="fixed top-5 right-5 z-50 space-y-3"></div>

        <div className="ps-product__feature flex flex-col items-center space-y-5 mt-6">
          {/* === Quantity Selector === */}
          <div className="w-full flex flex-col items-center space-y-2">
            <label htmlFor="quantity" className="text-center font-semibold text-gray-800">
              {t("quantity")}
            </label>

            <div className="def-number-input number-input flex items-center py-1 rounded-full overflow-hidden bg-white w-full">
              {/* Decrease Button */}
              <button
                type="button"
                onClick={handleDecrease}
                aria-label="Decrease quantity"
                className="minus min-w-12 min-h-12 flex items-center justify-center text-gray-400"
              >
                <Minus aria-hidden="true" />
              </button>

              {/* Quantity Input */}
              <label htmlFor="quantity" className="sr-only">Quantity</label>
              <input
                id="quantity"
                type="number"
                name="product_quantity"
                min={1}
                value={quantity}
                onChange={handleChange}
                aria-label="Quantity"
                className="quantity text-center outline-none min-h-12 w-full
                [&::-webkit-inner-spin-button]:appearance-none
                [&::-webkit-outer-spin-button]:appearance-none
                [appearance:textfield]"
              />

              {/* Increase Button */}
              <button
                type="button"
                onClick={handleIncrease}
                aria-label="Increase quantity"
                className="plus min-w-12 min-h-12 flex items-center justify-center text-gray-400"
              >
                <Plus aria-hidden="true" />
              </button>
            </div>


          </div>

          {/* === Quotation Button === */}
          <button
            onClick={handleQuotation}
            className="ps-btn ps-btn--primary btn-contact-seller bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition font-semibold"
          >
            {t("quotation")}
          </button>
        </div>
      </div>
      <Toast
        show={toast.show}
        message={toast.message}
        type={toast.type}
        onClose={() => setToast({ ...toast, show: false })}
      />
    </>
  );
}

