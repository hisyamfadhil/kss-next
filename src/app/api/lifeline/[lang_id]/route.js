import { NextResponse } from "next/server";
import { pool } from "@/config/db";

export async function GET(req, 
  // { params }
) {
  // const { lang_id } = await params;

  const { searchParams } = new URL(req.url);
  const slug = searchParams.get("slug");

  try {
    const resultBySlug = await pool.query("SELECT * FROM lifeline_categories WHERE slug = ?", [
      // lang_id,
      slug
    ]);
    let category_id = resultBySlug[0].id

    const resultByCategoryID = await pool.query("SELECT * FROM lifeline WHERE category_id = ? ORDER BY content_order ASC", [
      // lang_id,
      category_id
    ]);

    let result = {
      resultBySlug: resultBySlug[0],
      resultByCategoryID: resultByCategoryID
    }

    await pool.end();
    return NextResponse.json(result);
  } catch (error) {
    await pool.end();
    return NextResponse.json({ message: error.message });
  }
}