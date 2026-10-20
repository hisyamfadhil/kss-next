"use client";

import { useTranslations } from "@/app/hooks/useTranslate";
import ProductMasterDesc from "@/app/[lang]/product/ProductMasterDesc"
import ProductMasterImage from "@/app/[lang]/product/ProductMasterImage"
import ProductMasterDetail from "@/app/[lang]/product/ProductMasterDetail"
import SliderProduct from "@/app/[lang]/components/SliderProduct";

export default function ProductClientWrapper({
  data,
  lang
}: {
  data: any;
  lang:string
}) {
  const { t } = useTranslations();  

  return (
    <div className="ps-page__content">
      <div className="ps-product--detail">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          <ProductMasterImage
            data={data.resultImages}
            data_product={data.resultProduct}
            data_brand={data.resultBrand}
            data_categories={data.resultCategories}
            general_setting={data.resultGeneralSetting}
            lang={lang}
          />

          <ProductMasterDetail data={data.resultProduct} data_image={data.resultImages} />
        </div>

        <div className="ps-product__content mt-6">
          <ProductMasterDesc
            data={data.resultProduct}
          />
        </div>
      </div>

      {/* === Related Products === */}
      {data.resultRelate?.length > 0 && (
        <section className="ps-section--latest ps-categogy--detail mt-10">
          <h3 className="ps-section__title text-lg font-semibold mb-4">
            {t("you_may_also_like")}
          </h3>
          <SliderProduct slides={data.resultRelate} options={{ loop: true }} lang={lang}/>
        </section>
      )}

      {/* === More from brand === */}
      {data.resultRelateByBrand?.length > 0 && (
        <section className="ps-section--latest ps-categogy--detail mt-10">
          <h3 className="ps-section__title text-lg font-semibold mb-4">
            {t("more_from")}{" "}
            <span className="">
              {data.resultBrand?.name || "Kurnia Safety Supplies"}
            </span>
          </h3>
          <SliderProduct slides={data.resultRelateByBrand} options={{ loop: true }} lang={lang} />
        </section>
      )}
    </div>
  );
}
