// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { pool } from "@/config/db";

export async function GET(req, res) {
  const results = await pool.query("SELECT NOW()");
  res.status(200).json({ result: results[0]["NOW()"] });
}
