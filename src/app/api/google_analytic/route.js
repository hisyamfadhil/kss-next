import { pool } from "@/config/db";
import { NextResponse } from "next/server";

export async function GET() {
    try {
      const resultGoogleAnalytic = await pool.query("SELECT google_analytics FROM general_settings WHERE id = 1");
  
      let result = {
        resultGoogleAnalytic:resultGoogleAnalytic[0].google_analytics,
      }
      await pool.end();
      return NextResponse.json(result);
    } catch (error) {
      await pool.end();
      return NextResponse.json({ message: error.message });
    }
  }