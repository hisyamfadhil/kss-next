import { imageBaseUrl } from "@/utils/baseUrl";
import Image from "next/image";

export default async function BlogImages({ data, type }: { data: any, type: string }) {
    
    let imgUrl = "";
    let img
    // const bg = imageBaseUrl("@static/lazy/kss-placeholder.svg");

    if (type == 'image_default') {
        img = data.image_default
        imgUrl = `${imageBaseUrl(data.image_default)}`;
    } else {
        img = data.image_small
        imgUrl = `${imageBaseUrl(data.image_small)}`;
    }

    return (
        <>
            {(img ? (
                <Image src={imgUrl} alt={data.title} className="img-fluid" priority width={1000} height={1000} />
            ) : (
                <Image src={imageBaseUrl("@static/lazy/blog-list-thumb-no-image.jpg")} className="img-fluid" alt={data.title} priority width={1000} height={1000} />
            ))}
        </>
    )
}