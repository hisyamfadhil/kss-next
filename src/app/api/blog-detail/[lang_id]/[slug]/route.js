import { NextResponse } from "next/server";
import { pool } from "@/config/db";

export async function GET(req, { params }) {
  const { lang_id, slug } = await params;

  try {

    // general_settings
    const resultGeneralSettings = await pool.query("SELECT newsletter_status, logo FROM general_settings LIMIT 1");

    const resultBlogDetail = await pool.query("SELECT bp.id, bp.slug, bp.title, bp.summary, bp.keywords, bp.image_default, bp.created_at, bp.video_embed_code, bp.image_default, bp.content, bc.id AS category_id, bc.name AS category_name, bc.slug AS category_slug FROM blog_posts bp JOIN blog_categories bc ON bc.id = bp.category_id  WHERE bp.lang_id = ? AND bp.slug = ?", [
      lang_id,
      slug
    ]);

    let blog_id = resultBlogDetail[0].id
    let category_id = resultBlogDetail[0].category_id

    const resultLatestBlog = await pool.query("SELECT bp.id, bp.title, bp.slug, bp.image_small FROM blog_posts bp WHERE bp.lang_id = ? ORDER BY bp.created_at DESC LIMIT 5", [
      lang_id
    ]);    

    const resultRelateBlog = await pool.query("SELECT bp.id, bp.title, bp.slug, bp.image_small FROM blog_posts bp WHERE bp.category_id = ? AND bp.id != ? ORDER BY bp.created_at DESC LIMIT 3", [
      category_id,
      blog_id
    ]);

    const resultRamdomTags = await pool.query(`SELECT 
		    blog_tags.tag_slug,
		    blog_tags.tag
		FROM blog_tags
		JOIN blog_posts 
		    ON blog_posts.id = blog_tags.post_id
		WHERE blog_posts.lang_id = ?
		GROUP BY blog_tags.tag_slug, blog_tags.tag
		ORDER BY RAND()
		LIMIT 10;`, [
      lang_id
    ]);

    const resultBlogTags = await pool.query("SELECT * FROM blog_tags WHERE post_id = ?", [
      blog_id
    ]);

    let result = {
      resultGeneralSettings: resultGeneralSettings[0],
      resultBlogDetail: resultBlogDetail[0],
      resultBlogTags: resultBlogTags,
      resultRamdomTags: resultRamdomTags,
      resultLatestBlog: resultLatestBlog,
      resultRelateBlog: resultRelateBlog
    }

    await pool.end();
    return NextResponse.json(result);
  } catch (error) {
    await pool.end();
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}