import { NextResponse } from "next/server";
import { pool } from "@/config/db";

export async function GET(request, { params }) {
  const { id, slug } = await params;
  try {
    const result = await pool.query("SELECT * FROM pages WHERE lang_id = ? AND slug = ? AND visibility = 1 ORDER BY page_order ASC", [
      id, slug
    ]);
    await pool.end();
    return NextResponse.json(result);
  } catch (error) {
    await pool.end();
    return NextResponse.json({ message: error.message });
  }
}