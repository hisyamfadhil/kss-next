import { NextResponse } from "next/server";
import { pool } from "@/config/db";
import path from "path";
import fs from "fs";

// Example DB fetchers (replace with real DB calls)
async function getPages() {
    const rows = await pool.query(`
      SELECT 
        slug,
        lang_id,
        visibility
      FROM pages
      WHERE visibility = 1
    `);

    return rows;
}

async function getLifeline() {
    const rows = await pool.query(`
    SELECT
      l.slug,
      l.lang_id,
      l.category_id,
      lc.slug AS category_slug,
      lc.lang_id AS category_lang_id
    FROM lifeline l
    LEFT JOIN lifeline_categories lc
      ON l.category_id = lc.id
  `);

    return rows;
}

async function getLifelineCategory() {
    const rows = await pool.query(`
      SELECT 
        slug,
        lang_id
      FROM lifeline_categories
    `);

    return rows;
}

async function getCategories() {
    const rows = await pool.query(
        `SELECT 
            DISTINCT c.id,
            c.slug,
            c.parent_id,
            p.slug AS parent_slug
        FROM categories c
        LEFT JOIN categories p 
            ON c.parent_id = p.id
        ORDER BY c.parent_id, c.id;    
        `
    );
    return rows;
}

async function getProducts() {
    const rows = await pool.query(`
        SELECT 
            id,
            slug,
            visibility
        FROM products
        WHERE visibility = 1
        AND is_deleted = 0
        AND is_draft = 0
        ORDER BY id DESC;
    `);

    return rows;
}

export async function getBlogCategories() {
    const rows = await pool.query(`
    SELECT id, name, slug, lang_id
    FROM blog_categories
    ORDER BY name ASC
  `);

    return rows;
}

export async function getBlogPosts() {
    const rows = await pool.query(`
    SELECT 
    lang_id, slug
    FROM blog_posts
  `);

    return rows;
}

export async function getTags() {
    const rows = await pool.query(`
      SELECT DISTINCT bt.tag_slug, bp.lang_id FROM blog_posts bp JOIN blog_tags bt ON bp.id = bt.post_id 
  `);

    return rows;
}

function addUrl(urls, loc, changefreq, lastmod, priority) {
    urls.push({
        loc: loc.toLowerCase(),
        changefreq,
        lastmod,
        priority
    });
}

const ALLOWED_ORIGIN = "https://sandbox.kurniasafety.com"; // 🔥 ganti domain PHP kamu

// ======================
// 🔹 helper CORS
// ======================
function corsHeaders() {
  return {
    "Access-Control-Allow-Origin": ALLOWED_ORIGIN,
    "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
  };
}

// ======================
// 🔹 preflight (WAJIB)
// ======================
export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders() });
}

export async function POST(request) {
    const { frequency, last_modification, priority } = await request.json();

    // 🔹 update DB
    await pool.query(
        `
        UPDATE product_settings
        SET 
          sitemap_frequency = ?,
          sitemap_last_modification = ?,
          sitemap_priority = ?
        WHERE id = 1
        `,
        [frequency, last_modification, priority]
      );

    const urls = [];

    const settings = {
        frequency: frequency || "weekly",
        last_modification: last_modification || "server_response",
        priority: "0.8"
    };

    const lastmod = settings.last_modification === "server_response"
        ? new Date().toISOString().split("T")[0]
        : null;

    // Static URL
    addUrl(urls, `${process.env.NEXT_PUBLIC_BASE_URL2}`, settings.frequency, lastmod, 1);
    addUrl(urls, `${process.env.NEXT_PUBLIC_BASE_URL2}/id`, settings.frequency, lastmod, 1);
    addUrl(urls, `${process.env.NEXT_PUBLIC_BASE_URL2}/lifeline-solutions`, settings.frequency, lastmod, 0.8);
    addUrl(urls, `${process.env.NEXT_PUBLIC_BASE_URL2}/id/lifeline-solutions`, settings.frequency, lastmod, 0.8);

    // Pages
    const pages = await getPages();
    // console.log("pages", pages);
    pages.forEach(page => {
        if (page.visibility === 1) {
            if (page.lang_id == 1) {
                addUrl(urls, `${process.env.NEXT_PUBLIC_BASE_URL2}/${page.slug}`, settings.frequency, lastmod, 0.8);
            } else {
                addUrl(urls, `${process.env.NEXT_PUBLIC_BASE_URL2}/id/${page.slug}`, settings.frequency, lastmod, 0.8);
            }
        }
    });

    // LifelineCategory
    const LifelineCategory = await getLifelineCategory();
    // console.log("LifelineCategory", LifelineCategory);
    LifelineCategory.forEach(page => {
        if (page.lang_id == 1) {
            addUrl(urls, `${process.env.NEXT_PUBLIC_BASE_URL2}/lifeline-solutions/${page.slug}`, settings.frequency, lastmod, 0.8);
        } else {
            addUrl(urls, `${process.env.NEXT_PUBLIC_BASE_URL2}/id/lifeline-solutions/${page.slug}`, settings.frequency, lastmod, 0.8);
        }
    });

    // Lifeline
    const Lifeline = await getLifeline();
    // console.log("Lifeline", Lifeline);
    Lifeline.forEach(page => {
        if (page.lang_id == 1) {
            addUrl(urls, `${process.env.NEXT_PUBLIC_BASE_URL2}/lifeline-solutions/${page.category_slug}/${page.slug}`, settings.frequency, lastmod, 0.8);
        } else {
            addUrl(urls, `${process.env.NEXT_PUBLIC_BASE_URL2}/id/lifeline-solutions/${page.category_slug}/${page.slug}`, settings.frequency, lastmod, 0.8);
        }
    });

    // Categories
    const categories = await getCategories();
    // console.log("categories", categories);
    categories.forEach(cat => {
        const base = process.env.NEXT_PUBLIC_BASE_URL2;
        const parentPath = cat.parent_slug ? `/${cat.parent_slug}` : '';

        const url = `${base}/products${parentPath}/${cat.slug}`;

        addUrl(urls, url, settings.frequency, lastmod, 0.8);
    });

    // Products
    const products = await getProducts();
    // console.log("products", products);
    products.forEach(product => {
        addUrl(urls, `${process.env.NEXT_PUBLIC_BASE_URL2}/product/${product.slug}`, settings.frequency, lastmod, 0.8);
    });

    // Blog Categories
    const blogCategories = await getBlogCategories();
    // console.log("blogCategories", blogCategories);
    blogCategories.forEach(cat => {
        if (cat.lang_id === 1) {
            addUrl(urls, `${process.env.NEXT_PUBLIC_BASE_URL2}/blog-category/${cat.slug}`, settings.frequency, lastmod, 0.8);
        } else {
            addUrl(urls, `${process.env.NEXT_PUBLIC_BASE_URL2}/id/blog-category/${cat.slug}`, settings.frequency, lastmod, 0.8);
        }
    });

    // Blog Posts
    const blogPosts = await getBlogPosts();
    // console.log("blogPosts", blogPosts);
    blogPosts.forEach(post => {
        if (post.lang_id === 1) {
            addUrl(urls, `${process.env.NEXT_PUBLIC_BASE_URL2}/${post.slug}`, settings.frequency, lastmod, 0.8);
        } else {
            addUrl(urls, `${process.env.NEXT_PUBLIC_BASE_URL2}/id/${post.slug}`, settings.frequency, lastmod, 0.8);
        }
    });

    // Blog Tags
    const tags = await getTags();
    // console.log("tags", tags);
    tags.forEach(tag => {
        if (tag.lang_id === 1) {
            addUrl(urls, `${process.env.NEXT_PUBLIC_BASE_URL2}/tag/${tag.tag_slug}`, settings.frequency, lastmod, 0.8);
        } else {
            addUrl(urls, `${process.env.NEXT_PUBLIC_BASE_URL2}/id/tag/${tag.tag_slug}`, settings.frequency, lastmod, 0.8);
        }
    });

    // Generate XML
    const xml = `
  <?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${urls.map(url => `
      <url>
        <loc>${url.loc}</loc>
        ${url.lastmod ? `<lastmod>${url.lastmod}</lastmod>` : ""}
        ${url.changefreq ? `<changefreq>${url.changefreq}</changefreq>` : ""}
        ${url.priority ? `<priority>${url.priority}</priority>` : ""}
      </url>
    `).join("")}
  </urlset>
  `.trim();

    const filePath = path.join(process.cwd(), "public", "sitemap.xml");
    fs.writeFileSync(filePath, xml);

    return NextResponse.json({
        success: true,
        message: "Sitemap updated",
    }, { headers: corsHeaders() });
}
