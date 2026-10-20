import { pool } from "@/config/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const results = await pool.query("SELECT * FROM location_countries WHERE status = 1");
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