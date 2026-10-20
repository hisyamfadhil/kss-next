import { NextResponse } from "next/server";
import { pool } from "@/config/db";

export async function GET(request, { params }) {
  const { lang_id } = await params;
  try {
    const resultGeneralSetting = await pool.query("SELECT * FROM general_settings WHERE id = 1");
    
    const resultSetting = await pool.query("SELECT * FROM settings WHERE lang_id = ?", [
      lang_id,
    ]);

  
    let fontID = resultSetting[0].site_font
    const resultFont = await pool.query("SELECT * FROM fonts WHERE id = ?", [
      fontID,
    ]);

    let result = {
      resultGeneralSetting:resultGeneralSetting[0],
      resultSetting:resultSetting[0],
      resultFont:resultFont[0]
    }
    await pool.end();
    return NextResponse.json(result);
  } catch (error) {
    await pool.end();
    return NextResponse.json({ message: error.message });
  }
}