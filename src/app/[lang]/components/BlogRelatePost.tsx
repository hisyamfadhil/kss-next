import BlogImages from "@/app/[lang]/components/BlogImages";
import { baseUrl } from "@/utils/baseUrl";
import { characterLimiter } from "@/utils/characterLimiter";
import Link from "next/link";

export default async function BlogRelatePost({data, lang}:{data: any, lang:string}) {
	
	return (
		<>
			<div className="blog-item blog-item-small">
				<div className="blog-item-img">
					<Link
						// href="<?php echo generate_url("") . $item->slug; ?>"
						href={baseUrl(`/${data.slug}`, lang)}
					>
						<BlogImages data={data} type="small" />
						{/* <?php $this->load->view("_KSSfront/page_blog/__details/blog_images.html", ['post_item' => $item, 'type' => 'small']); ?> */}
					</Link>
				</div>
				<h4 className="blog-post-title">
					<br />
					<Link
						// href="<?php echo generate_url("") . $item->slug; ?>"
						href={baseUrl(`/${data.slug}`, lang)}
					>
						{/* {data.data.title} */}
						{characterLimiter(data.title, 56)}
						{/* <?php echo html_escape(character_limiter($item->title, 56, '...')); ?> */}
					</Link>
				</h4>
			</div>

		</>
	)
}