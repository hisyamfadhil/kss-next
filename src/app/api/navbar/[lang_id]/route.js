import { NextResponse } from "next/server";
import { pool } from "@/config/db";

async function getCategoriesByLang(lang_id) {
  const result = await pool.query(
    `
    SELECT 
      c.id,
      c.slug,
      c.parent_id,
      cl.lang_id,
      cl.name
    FROM categories c
    LEFT JOIN categories_lang cl ON c.id = cl.category_id
    WHERE cl.lang_id = ? AND c.visibility = 1
    ORDER BY c.parent_id, c.id
    `,
    [lang_id]
  );

  // Bentuk struktur tree
  const map = {};
  const tree = [];

  for (const row of result) {
    map[row.id] = { ...row, children: [] };
  }

  for (const row of result) {
    if (row.parent_id) {
      map[row.parent_id]?.children.push(map[row.id]);
    } else {
      tree.push(map[row.id]);
    }
  }

  return tree;
}

export async function GET(request, { params }) {
  const { lang_id } = await params;
  try {
    const resultGeneralSetting = await pool.query("SELECT logo, multilingual_system FROM general_settings WHERE id = 1");

    const resultLanguage = await pool.query("SELECT * FROM languages");

    const resultSelectedLanguage = await pool.query("SELECT * FROM languages WHERE id = ?", [
      lang_id,
    ]);

    const resultPages = await pool.query("SELECT id, location, slug, title FROM pages WHERE lang_id = ?", [
      lang_id,
    ]);

    const resultSetting = await pool.query("SELECT contact_phone, contact_email, facebook_url, twitter_url, instagram_url, linkedin_url, youtube_url, pinterest_url, whatsapp_url, telegram_url FROM settings WHERE lang_id = ?", [
      lang_id,
    ]);

    let categoryProductPages = await getCategoriesByLang(lang_id)

    let result = {
      resultGeneralSetting:resultGeneralSetting[0],
      resultLanguage:resultLanguage,
      resultSelectedLanguage:resultSelectedLanguage[0],
      resultPages:resultPages,
      resultSetting:resultSetting[0],
      categoryProductPages:categoryProductPages
    }
    await pool.end();
    return NextResponse.json(result);
  } catch (error) {
    await pool.end();
    return NextResponse.json({ message: error.message });
  }
}