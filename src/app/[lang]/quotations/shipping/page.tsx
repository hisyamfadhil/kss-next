// import { getLocationCountriesData } from "@/app/lib/api";
import ShippingWrapper from "./ShippingClientWrapper";

export const metadata = {
  title: "Shipping",
  description: "Shipping",
};

export default async function Shipping({ params }: { params: Promise<{ lang: string }> }) {
  // const locationCountries = await getLocationCountriesData();
  const { lang } = await params;
  const lang_id = lang === "id" ? "2" : "1";

  return (
    <ShippingWrapper
      lang_id={lang_id}
    // locationCountries={locationCountries}
    />
  );
}
