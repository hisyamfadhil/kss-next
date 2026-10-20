import { NextResponse } from "next/server";
import { pool } from "@/config/db";

export async function GET(request, { params }) {
  const { id } = await params;
  try {
    const getSiteFont = await pool.query("SELECT * FROM settings WHERE lang_id = ?", [
      id,
    ]);
    let fontID = getSiteFont[0].site_font
    const result = await pool.query("SELECT * FROM fonts WHERE id = ?", [
      fontID,
    ]);
    await pool.end();
    return NextResponse.json(result[0]);
  } catch (error) {
    await pool.end();
    return NextResponse.json({ message: error.message });
  }
}