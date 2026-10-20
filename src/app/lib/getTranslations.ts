import { baseUrlAPI } from "@/utils/baseUrl";

export async function getTranslations(langId:string) {
  const res = await fetch(baseUrlAPI(`api/language_translations`), {
    next: { revalidate: 3600 }, // cache 1 jam
  });

  const data = await res.json();

  // Filter hanya sesuai lang_id
  const filtered = data.filter((item: any) => String(item.lang_id) === String(langId));

  // Ubah menjadi object key-value
  const dictionary: Record<string, string> = {};
  filtered.forEach((row: any) => {
    dictionary[row.label] = row.translation;
  });

  return dictionary;
}
