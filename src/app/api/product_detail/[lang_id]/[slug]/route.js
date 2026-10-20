import { NextResponse } from "next/server";
import { pool } from "@/config/db";

export async function GET(req, { params }) {
  const { lang_id, slug } = await params;

  try {
    const resultGeneralSetting = await pool.query("SELECT reviews, product_comments, facebook_comment_status FROM general_settings WHERE id = 1");
    await pool.query(`
        UPDATE products
        SET pageviews = pageviews + 1
        WHERE slug = ?
    `, [slug]);
    const resultProduct = await pool.query(`SELECT p.*,
      pd.product_id,
      pd.lang_id,
      pd.title,
      pd.short_desc,
      pd.description,
      pd.specification,
      pd.seo_title,
      pd.seo_description,
      pd.seo_keywords
      FROM products p JOIN product_details pd ON pd.product_id = p.id  AND pd.lang_id = ? WHERE p.status = 1 AND p.visibility = 1 AND p.slug = ?`, [
      lang_id,
      slug
    ]);

    let product_id = resultProduct[0].id
    let brand_id = resultProduct[0].brand_id
    let category_id = resultProduct[0].category_id

    let resultBrand = await pool.query("select bl.name, b.slug from brands b LEFT JOIN brands_lang bl ON b.id = bl.brand_id AND bl.lang_id = ? where b.id = ?",[lang_id, brand_id])
    let resultCategories = await pool.query(`SELECT 
      cl.name AS category_name,
      c.slug AS category_slug,
      c.parent_id,
      pl.name AS parent_name,
      p.slug AS parent_slug
    FROM categories c
    LEFT JOIN categories_lang cl ON cl.category_id = c.id
    LEFT JOIN categories p ON p.id = c.parent_id
    LEFT JOIN categories_lang pl ON pl.category_id = p.id AND pl.lang_id = cl.lang_id
    WHERE c.id = ?
      AND cl.lang_id = ?`,[category_id, lang_id])

    const resultRelate = await pool.query(`SELECT 
        slug, 
        (SELECT title FROM product_details WHERE product_id = products.id AND lang_id = ?) AS title,
        (SELECT CONCAT(storage, '::', image_small) FROM images WHERE product_id = products.id ORDER BY is_main DESC LIMIT 1) AS image,
        (SELECT CONCAT(storage, '::', image_small) FROM images WHERE product_id = products.id ORDER BY is_main DESC LIMIT 1, 1) AS image_second 
      FROM 
          products
      WHERE 
          products.category_id = ?
          AND products.is_draft = 0
          AND products.is_deleted = 0
          AND products.id != ?
      ORDER BY 
          RAND()
      LIMIT 5`, [
      lang_id,
      category_id,
      product_id
    ]);

    const resultRelateByBrand = await pool.query(`SELECT 
        slug, 
        (SELECT title FROM product_details WHERE product_id = products.id AND lang_id = ?) AS title,
        (SELECT CONCAT(storage, '::', image_small) FROM images WHERE product_id = products.id ORDER BY is_main DESC LIMIT 1) AS image,
        (SELECT CONCAT(storage, '::', image_small) FROM images WHERE product_id = products.id ORDER BY is_main DESC LIMIT 1, 1) AS image_second 
      FROM 
          products
      WHERE 
          products.brand_id = ?
          AND products.is_draft = 0
          AND products.is_deleted = 0
          AND products.id != ?
      ORDER BY 
          RAND()
      LIMIT 10`, [
      lang_id,
      brand_id,
      product_id
    ]);
    
    const resultImages = await pool.query(`SELECT * FROM images WHERE product_id = ? ORDER BY is_main DESC`, [
      product_id
    ]);

    let result = {
      resultBrand: resultBrand[0],
      resultCategories: resultCategories[0],
      resultGeneralSetting:resultGeneralSetting[0],
      resultRelate: resultRelate,
      resultRelateByBrand: resultRelateByBrand,
      resultProduct: resultProduct[0],
      resultImages:resultImages
    }

    await pool.end();
    return NextResponse.json(result);
  } catch (error) {
    await pool.end();
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}