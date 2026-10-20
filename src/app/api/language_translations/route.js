import { pool } from "@/config/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    
    // const results = await pool.query(`SELECT * FROM settings WHERE lang_id = ${NextRequest}`);
    const results = await pool.query(`SELECT * FROM language_translations`);
    await pool.end();
    return NextResponse.json(results);
  } catch (error) {
    await pool.end();
    return NextResponse.json(
      { message: error.message },
      {
        status: 500,
      }
    );
  }
}