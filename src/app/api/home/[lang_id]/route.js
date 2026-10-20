import { NextResponse } from "next/server";
import { pool } from "@/config/db";

export async function GET(request, { params }) {
  try {
    const { lang_id } = await params;

    const resultGeneralSetting = await pool.query("SELECT slider_status, index_latest_products, index_promoted_products, promoted_products, index_latest_products_count, index_promoted_products_count  FROM general_settings WHERE id = 1");
    const resultSetting = await pool.query("SELECT homepage_title, site_description, keywords FROM settings WHERE lang_id = ?",[
      lang_id
    ]);

    let index_latest_products_count = resultGeneralSetting[0].index_latest_products_count
    let index_promoted_products_count = resultGeneralSetting[0].index_promoted_products_count

    const latest_products = await pool.query(`
      SELECT 
        p.slug, 
        (SELECT title FROM product_details WHERE product_id = p.id AND lang_id = ?) AS title,
        (SELECT CONCAT(storage, '::', image_small) FROM images WHERE product_id = p.id ORDER BY is_main DESC LIMIT 1) AS image,
        (SELECT CONCAT(storage, '::', image_small) FROM images WHERE product_id = p.id ORDER BY is_main DESC LIMIT 1, 1) AS image_second
      FROM products p 
      ORDER BY p.created_at DESC 
      LIMIT ?`, [
      lang_id,
      index_latest_products_count,
    ]);

    const promoted_products = await pool.query(`SELECT 
        p.slug, 
        (SELECT title FROM product_details WHERE product_id = p.id AND lang_id = ?) AS title,
        (SELECT CONCAT(storage, '::', image_small) FROM images WHERE product_id = p.id ORDER BY is_main DESC LIMIT 1) AS image,
        (SELECT CONCAT(storage, '::', image_small) FROM images WHERE product_id = p.id ORDER BY is_main DESC LIMIT 1, 1) AS image_second
      FROM products p WHERE p.is_promoted = 1 ORDER BY p.promote_start_date DESC limit ?`, [
        lang_id,
      index_promoted_products_count,
    ]);

    const products_query_by_brand = `
    SELECT 
      p.slug,
      u.username AS user_username,
      u.shop_name AS shop_name,
      u.role AS user_role,
      ROUND(p.price - ((p.price * p.discount_rate)/100)) AS price_final,
      (SELECT title FROM product_details WHERE product_id = p.id AND lang_id = ?) AS title,
      (SELECT CONCAT(storage, '::', image_small) FROM images WHERE product_id = p.id ORDER BY is_main DESC LIMIT 1) AS image,
      (SELECT CONCAT(storage, '::', image_small) FROM images WHERE product_id = p.id ORDER BY is_main DESC LIMIT 1, 1) AS image_second,
      (SELECT COUNT(id) FROM wishlist WHERE product_id = p.id) AS wishlist_count
    FROM products p
    JOIN users u ON p.user_id = u.id
    WHERE p.brand_id = ?
      AND p.status = 1
      AND p.visibility = 1
      AND p.is_deleted = 0
      AND u.banned = 0
    ORDER BY p.price DESC
    LIMIT ?;
    `;

    const products_query_by_category = `
          SELECT 
          p.*,

          /* Judul produk sesuai bahasa aktif */
          (
              SELECT title 
              FROM product_details 
              WHERE product_details.product_id = p.id 
                AND product_details.lang_id = ? 
              LIMIT 1
          ) AS title,

          /* Gambar utama */
          (
              SELECT CONCAT(storage, '::', image_small) 
              FROM images 
              WHERE p.id = images.product_id 
              ORDER BY is_main DESC 
              LIMIT 1
          ) AS image,

          /* Gambar kedua (opsional) */
          (
              SELECT CONCAT(storage, '::', image_small) 
              FROM images 
              WHERE p.id = images.product_id 
              ORDER BY is_main DESC 
              LIMIT 1, 1
          ) AS image_second,

          /* Total wishlist */
          (
              SELECT COUNT(w.id) 
              FROM wishlist w 
              WHERE p.id = w.product_id
          ) AS wishlist_count,

          /* Ada variasi atau tidak */
          (
              SELECT v.id 
              FROM variations v 
              WHERE p.id = v.product_id 
              LIMIT 1
          ) AS has_variation,

          /* Judul kedua (bahasa fallback) */
          (
              SELECT title 
              FROM product_details 
              WHERE product_details.product_id = p.id 
                AND product_details.lang_id != ? 
              LIMIT 1
          ) AS second_title

      FROM products AS p

      WHERE 
          p.status = 1
          AND p.visibility = 1
          AND p.is_draft = 0
          AND p.is_deleted = 0
          AND p.is_sold = 0
          AND (
              p.category_id IN (
                  SELECT id 
                  FROM categories 
                  WHERE FIND_IN_SET(?, categories.parent_tree)
              )
              OR p.category_id = ?
          )

      ORDER BY p.created_at DESC
      LIMIT ?;
    `;

    const slider_items = await pool.query("SELECT link, image, image_mobile, title FROM slider WHERE lang_id = ? ORDER BY item_order ASC", [
      lang_id,
    ]);

    const index_categories = await pool.query("SELECT c.id, c.image, cl.name, c.slug FROM categories c JOIN categories_lang cl ON cl.category_id = c.id AND cl.lang_id = ? WHERE visibility = 1 AND show_products_on_index = 1 ORDER BY homepage_order ASC",[
      lang_id
    ]);

    const categories_with_products = [];

    for (const category of index_categories) {
      const products = await pool.query(products_query_by_category, [
        lang_id,       // lang id untuk title
        lang_id,       // lang id untuk title
        category.id,          // category id
        category.id,          // category id
        6 // limit produk per kategori
      ]);

      categories_with_products.push({
        ...category,
        products
      });
    }

    const index_brands = await pool.query("SELECT * FROM brands JOIN brands_lang bl ON bl.brand_id = brands.id AND bl.lang_id = ? WHERE visibility = 1 AND show_products_on_index = 1 ORDER BY homepage_order ASC",[
      lang_id
    ]);

    const brands_with_products = [];

    for (const brand of index_brands) {
      const products = await pool.query(products_query_by_brand, [
        lang_id,       // lang id untuk title
        brand.brand_id,          // brand id
        6 // limit produk per brand
      ]);

      brands_with_products.push({
        ...brand,
        products
      });
    }

    const clients = await pool.query("SELECT url, name, photo  FROM slider_clients ORDER BY id ASC");

    let result = {
      resultSetting:resultSetting[0],
      resultGeneralSetting: resultGeneralSetting[0],
      latest_products: latest_products,
      promoted_products: promoted_products,
      promoted_products_count: promoted_products.length,
      slider_items: slider_items,
      clients: clients,
      categories_with_products: categories_with_products,
      brands_with_products: brands_with_products
    }

    await pool.end();
    return NextResponse.json(result);
  } catch (error) {
    await pool.end();
    return NextResponse.json({ message: error.message });
  }
}