import { baseUrl } from '@/utils/baseUrl';
import { redirect } from 'next/navigation';

export default async function SubProduct({
    params,
}: {
    params: Promise<{ slug: string; lang: string; sub: string }>
}) {
    const { slug, lang, sub } = await params
    
    let url = baseUrl(`/products/${slug}/${sub}`, lang)

    redirect(url)
}
