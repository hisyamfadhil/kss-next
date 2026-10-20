import { NextResponse } from "next/server";
import { pool } from "@/config/db";

export async function GET(request, { params }) {
  const { id } = await params;
  try {
    const resultS = await pool.query("SELECT site_title, site_description FROM settings WHERE lang_id = ?", [
      id,
    ]);

    const resultGS = await pool.query("SELECT favicon FROM general_settings LIMIT 1", [
      id,
    ]);

    let result = {
      settings: resultS[0],
      general_settings: resultGS[0],
    }
    await pool.end();
    return NextResponse.json(result);
  } catch (error) {
    await pool.end();
    return NextResponse.json({ message: error.message });
  }
}