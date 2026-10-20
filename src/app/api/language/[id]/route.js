import { NextResponse } from "next/server";
import { pool } from "@/config/db";

export async function GET(request, { params }) {
  const { id } = await params;
  try {
    const result = await pool.query("SELECT * FROM languages WHERE id = ?", [
      id,
    ]);
    await pool.end();
    return NextResponse.json(result[0]);
  } catch (error) {
    await pool.end();
    return NextResponse.json({ message: error.message });
  }
}