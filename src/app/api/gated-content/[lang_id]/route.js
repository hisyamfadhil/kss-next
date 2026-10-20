import { NextResponse } from "next/server";
import { pool } from "@/config/db";

export async function GET(req, { params }) {
  const { lang_id } = await params;

  try {

    const resultGatedContent = await pool.query("SELECT * FROM marketing_tools WHERE lang_id = ?", [
      lang_id
    ]);

    let result = {
      resultGatedContent: resultGatedContent,
    }

    await pool.end();
    return NextResponse.json(result);
  } catch (error) {
    await pool.end();
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}