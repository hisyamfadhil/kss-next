import { NextResponse } from "next/server";
import { pool } from "@/config/db";

export async function GET(request, { params }) {
  try {
    const result = await pool.query("SELECT * FROM language_translations WHERE lang_id = ? AND label = ?", [
      await params.id,
      await params.label,
    ]);
    
    await pool.end();
    return NextResponse.json(result[0]);
  } catch (error) {
    await pool.end();
    return NextResponse.json({ message: error.message });
  }
}