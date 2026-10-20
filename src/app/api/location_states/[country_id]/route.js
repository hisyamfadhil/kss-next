import { pool } from "@/config/db";
import { NextResponse } from "next/server";

export async function GET(req,{params}) {
  const { country_id } = await params;
  try {
    // location_states
    const results = await pool.query("SELECT * FROM location_states WHERE country_id = ?", [country_id]);
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