import React from "react";
import MenuSlideClient from "./MenuSlideMobile";
import { imageBaseUrl } from "@/utils/baseUrl";
import { getTranslations } from "@/app/lib/getTranslations";
import { t } from "@/app/lib/t";

interface Category {
  id: number;
  name: string;
  slug: string;
  subcategories?: Category[];
}

interface Props {
  lang_id: string;
  logo?: string;
  categories?: Category[];
  dataLanguage: any
}

export default async function MenuSlide({ lang_id, logo, categories = [], dataLanguage }: Props) {
  const dict = await getTranslations(lang_id);
  // translate tetap bisa dipakai di server component
  const tHome = t(dict, "home");
  const tProducts = t(dict, "products");
  const tAbout = t(dict, "about");
  const tHse = t(dict, "hse");
  const tContact = t(dict, "contact");

  return (
    <MenuSlideClient
      lang_id={lang_id}
      logo={logo || imageBaseUrl("@static/img/logo.png")}
      categories={categories}
      labels={{ tHome, tProducts, tAbout, tHse, tContact }}
      dataLanguage={dataLanguage}
    />
  );
}
