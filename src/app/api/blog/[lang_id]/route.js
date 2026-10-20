import { NextResponse } from "next/server";
import { pool } from "@/config/db";

export async function GET(req, { params }) {
  const { lang_id } = await params;

  const { searchParams } = new URL(req.url);
  const category = searchParams.get("category");
  const tag = searchParams.get("tag");

  const page = searchParams.get("page") || 1;
  const limit = searchParams.get("limit") || 12;
  let offset = (page - 1) * limit

  try {

    // Base query
    let whereClause = "WHERE bp.lang_id = ?";
    const params = [lang_id];

    // Jika ada tag → tambahkan kondisi
    let tag_name
    if (tag) {

      const [resultTag] = await pool.query( "SELECT tag FROM blog_tags WHERE tag_slug = ?",[tag])
      
      tag_name = resultTag?.tag
      whereClause += " AND bp.id IN (SELECT bt.post_id  FROM blog_tags bt WHERE bt.tag_slug = ?)";
      params.push(tag);
    }

    // Jika ada category → tambahkan kondisi
    let category_name
    if (category) {
      const [resultCategory] = await pool.query( "SELECT name FROM blog_categories WHERE slug = ?",[category])
      category_name = resultCategory?.name
      whereClause += " AND bp.category_id IN (SELECT bc.id FROM blog_categories bc WHERE bc.slug = ?)";
      params.push(category);
    }

    // Hitung total post (pagination)
    const countRows = await pool.query(
      `SELECT COUNT(*) AS total 
        FROM blog_posts bp 
        ${whereClause}`,
      params
    )

    // Ambil data post dengan kategori join
    const resultBlog = await pool.query(
      `SELECT bp.id, bp.title, bp.slug, bp.image_small, bc.name AS category_name, bc.slug AS category_slug 
        FROM blog_posts bp 
        JOIN blog_categories bc ON bc.id = bp.category_id 
        ${whereClause}
        ORDER BY bp.created_at DESC 
        LIMIT ? OFFSET ?`,
      [...params, limit, offset]
    );

    const totalBlog = countRows[0]?.total || 0;
    const totalPages = Math.ceil(totalBlog / limit);
    
    let result = {
      tag_name:tag_name,
      category_name:category_name,
      resultBlog: resultBlog,
      totalPages: totalPages
    }

    await pool.end();
    return NextResponse.json(result);
  } catch (error) {
    await pool.end();
    return NextResponse.json({ message: error.message });
  }
}