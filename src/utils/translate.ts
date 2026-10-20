import axios from "axios";

const base_url = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

interface Translation {
  id?: number;
  lang_id?: string | number;
  label?: string;
  translation?: string;
}

// Cache global di memory
let translationCache: Translation[] | null = null;

// Muat semua translations
export const loadTranslations = async (): Promise<Translation[]> => {
  if (translationCache) return translationCache;

  try {
    const { data } = await axios.get(`${base_url}/api/language_translations`);
    translationCache = Array.isArray(data) ? (data as Translation[]) : [];
    return translationCache;
  } catch (error) {
    console.error("Gagal memuat semua translations:", error);
    translationCache = [];
    return [];
  }
};

// Ambil translation berdasarkan lang_id dan label
export const translate = async (lang_id: string, label: string): Promise<string> => {
  const translations = await loadTranslations();

  if (!translations || translations.length === 0) {
    return ""; // fallback jika tidak ada data
  }

  const found = translations.find(
    (t: Translation) =>
      String(t.lang_id) === String(lang_id) &&
      String(t.label).toLowerCase() === String(label).toLowerCase()
  );

  return found?.translation || "";
};

// Hapus cache
export const clearTranslationCache = () => {
  translationCache = null;
};
