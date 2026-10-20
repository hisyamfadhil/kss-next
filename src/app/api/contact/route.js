import { pool } from "@/config/db";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const body = await req.json();
    const { name, email, subject, message } = body;

    // validasi sederhana
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { success: false, error: "Semua field wajib diisi" },
        { status: 400 }
      );
    }

    // buat data untuk disimpan
    const created_at = new Date().toISOString().slice(0, 19).replace('T', ' ');

    // simpan ke database
    const query = `
      INSERT INTO contacts (name, email, subject, message, created_at)
      VALUES (?, ?, ?, ?, ?)
    `;
    const values = [name, email, subject, message, created_at];

    const { rows } = await pool.query(query, values);
    return NextResponse.json({message:"success send", rows:rows})
  } catch (error) {
    return NextResponse.json(
      { message: error.message },
      {
        status: 500,
      }
    );
  }
}

export async function GET() {
  try {

    // const results = await pool.query(`SELECT * FROM settings WHERE lang_id = ${NextRequest}`);
    const results = await pool.query(`SELECT contact_address FROM settings`);
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