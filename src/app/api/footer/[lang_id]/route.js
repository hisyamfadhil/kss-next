import { NextResponse } from "next/server";
import { pool } from "@/config/db";

export async function GET(request, { params }) {
  const { lang_id } = await params;
  try {

    const resultPages = await pool.query("SELECT id, slug, title, location FROM pages WHERE lang_id = ? AND visibility = 1 ORDER BY page_order ASC", [
      lang_id,
    ]);

    const resultSetting = await pool.query("SELECT copyright, about_footer, contact_address, contact_phone FROM settings WHERE lang_id = ?", [
      lang_id,
    ]);

    let result = {
      resultPages: resultPages,
      resultSetting: resultSetting[0],
    }
    await pool.end();
    return NextResponse.json(result);
  } catch (error) {
    await pool.end();
    return NextResponse.json({ message: error.message });
  }
}