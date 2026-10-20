import { NextResponse } from "next/server";
import { pool } from "@/config/db";

export async function GET(req, { params }) {

  const { lang_id } = await params;
  let limit = 40

  const { searchParams } = new URL(req.url);
  const parent_category = searchParams.get("parent_category"); //jika parent category ga ada maka ambil parent id di category
  const category = searchParams.get("category");
  const brand = searchParams.get("brand");
  const search = searchParams.get("search");
  const page = searchParams.get("page") || 1;
  const sort = searchParams.get("sort");

  let category_id
  let brand_id
  let resultSubCategory

  try {

    let queryParentCategory = `
      SELECT cl.name, c.slug, c.description
      FROM categories c
      JOIN categories_lang cl ON cl.category_id = c.id
        AND cl.lang_id = ?
      WHERE visibility = 1 AND slug = ?
    `;

    const paramsParentCategory = [lang_id, parent_category];

    const resultParentCategory = await pool.query(queryParentCategory, paramsParentCategory);

    if (category) {

      let querySubCategory = `
      SELECT cl.name, c.slug, c.long_desc_category
      FROM categories c
      JOIN categories_lang cl ON cl.category_id = c.id
        AND cl.lang_id = ?
      WHERE visibility = 1 AND slug = ?
    `;

      const paramsSubCategory = [lang_id, category];

      resultSubCategory = await pool.query(querySubCategory, paramsSubCategory);

      const resultCategoryBySlug = await pool.query("SELECT id, slug FROM categories WHERE slug = ?", [
        category
      ]);

      category_id = resultCategoryBySlug[0].id
    }

    const brands = brand.split(",").map(b => b.trim());
    // IN (${brands.map(() => "?").join(",")})
    // params.push(...brands);
    if (brand) {
      const resultBrandBySlug = await pool.query(`SELECT id, slug FROM brands WHERE visibility = 1 AND slug IN (${brands.map(() => "?").join(",")})`, brands);

      if (Array.isArray(resultBrandBySlug) && resultBrandBySlug.length > 0) {
        brand_id = resultBrandBySlug.map(item => item.id);
      }
    }

    let queryCategory = `
      SELECT *
      FROM categories
      JOIN categories_lang cl ON cl.category_id = categories.id
        AND cl.lang_id = ?
      WHERE visibility = 1
    `;

    const paramsCategory = [lang_id];

    // Jika ada filter kategori (slug)
    if (category_id) {
      queryCategory += " AND parent_id = ?";
      paramsCategory.push(category_id);
    } else {
      queryCategory += " AND parent_id = 0";
    }

    queryCategory += " ORDER BY categories.slug ASC";

    const resultCategory = await pool.query(queryCategory, paramsCategory);

    let queryBrand = `
      SELECT 
        br.id,
        br.slug,
        bl.name
      FROM brands AS br 
      JOIN brands_lang AS bl ON bl.brand_id = br.id
      AND bl.lang_id = ?
       WHERE br.visibility = 1
         AND br.parent_id = 0
         AND br.id IN (
           SELECT DISTINCT b.id
           FROM brands b
           WHERE b.id IN (
             SELECT p.brand_id
             FROM products p
             WHERE p.status = 1
               AND p.visibility = 1
               AND p.is_draft = 0
               AND p.is_deleted = 0
    `;

    const paramsBrand = [lang_id];

    // Jika ada filter brand (slug)
    if (category_id) {
      queryBrand += ` AND (p.category_id = ?
        OR p.category_id IN (SELECT id FROM categories WHERE FIND_IN_SET(?, parent_tree)))
      `;
      paramsBrand.push(category_id, category_id);
    }

    queryBrand += ` )
      )
    ORDER BY slug ASC`;

    const resultBrand = await pool.query(queryBrand, paramsBrand);

    //         SELECT *
    // FROM brands
    // WHERE visibility = 1
    //   AND parent_id = 0
    //   AND id IN (
    //     SELECT DISTINCT b.id
    //     FROM brands b
    //     WHERE b.id IN (
    //       SELECT p.brand_id
    //       FROM products p
    //       WHERE p.status = 1
    //         AND p.visibility = 1
    //         AND p.is_draft = 0
    //         AND p.is_deleted = 0
    //         AND p.category_id = 3
    //     )
    //   )
    // ORDER BY slug ASC;

    let baseQuery = `
  FROM products p
  JOIN product_details pd 
    ON pd.product_id = p.id 
    AND pd.lang_id = ?
  WHERE p.status = 1 
    AND p.visibility = 1
               AND p.is_draft = 0
               AND p.is_deleted = 0
`;
    const params = [lang_id];

    // Filter kategori
    if (category_id) {
      baseQuery += ` AND (p.category_id = ?
        OR p.category_id IN (SELECT id FROM categories WHERE FIND_IN_SET(?, parent_tree)))`;
      params.push(category_id, category_id);
    }

    // Filter brand
    // console.log("brand_id", brand_id);
    
    if (brand_id) {
      baseQuery += ` AND p.brand_id IN (${brands.map(() => "?").join(",")})`;
      params.push(...brand_id);
    }

    // Split kata
    // console.log("search", search);

    if (search) {
      const keywords = search.split("%20").filter((w) => w.length > 1);

      if (keywords.length > 0) {
        baseQuery += " AND (";
        keywords.forEach((word, idx) => {
          if (idx > 0) sql += " AND ";
          baseQuery += " pd.title LIKE ? ";
          params.push(`%${word}%`);
        });
        baseQuery += ")";
      }

      // OR SKU
      baseQuery += " OR p.sku LIKE ? ";
      params.push(`%${search.replace(/\s+/g, "-").toLowerCase()}%`);
    }

    // --- Hitung total data (tanpa LIMIT) ---
    const queryCount = `SELECT COUNT(*) AS total ${baseQuery}`;
    const countRows = await pool.query(queryCount, params);
    const totalProducts = countRows[0]?.total || 0;
    const totalPages = Math.ceil(totalProducts / limit);

    // --- Ambil data produk (dengan LIMIT) ---
    let offset = (page - 1) * limit
    if (sort === "most_previous") {
      baseQuery += " ORDER BY p.id ASC ";
    } else if (sort === "most_recent") {
      baseQuery += " ORDER BY p.id DESC ";
    } else if (sort === "alphabetical_order") {
      baseQuery += " ORDER BY p.slug ASC ";
    } else if(category_id) {
      baseQuery += " ORDER BY p.is_promoted DESC ";
    } else {
      baseQuery += " ORDER BY RAND() "
    }
    const queryProduct = `
      SELECT 
        p.id,
        p.slug, 
        pd.title,
        p.category_id,
        p.brand_id,
        p.is_promoted,
        (
          SELECT CONCAT(storage, '::', image_small) 
          FROM images 
          WHERE product_id = p.id 
          ORDER BY is_main DESC LIMIT 1
        ) AS image,
        (
          SELECT CONCAT(storage, '::', image_small) 
          FROM images 
          WHERE product_id = p.id 
          ORDER BY is_main DESC LIMIT 1, 1
        ) AS image_second 
      ${baseQuery}
      LIMIT ? OFFSET ?
    `;

    const paramsProduct = [...params, limit, offset];

    const resultProduct = await pool.query(queryProduct, paramsProduct);

    let result = {
      resultParentCategory: resultParentCategory,
      resultSubCategory: resultSubCategory,
      resultCategory: resultCategory,
      resultBrand: resultBrand,
      resultProduct: resultProduct,
      totalProducts: totalProducts,
      totalPages: totalPages
    }

    await pool.end();
    return NextResponse.json(result);
  } catch (error) {
    await pool.end();
    return NextResponse.json({ message: error.message });
  }
}