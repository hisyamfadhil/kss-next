import { imageBaseUrl } from "./baseUrl";

export interface Product {
  image?: string;
  image_second?: string;
}
  const awsBaseUrl = process.env.NEXT_PUBLIC_AWS_BASE_URL || "";
  const baseUrl = imageBaseUrl("") || "";

export function getProductItemImage(
  product: Product | null,
  getSecond: boolean = false
): string {

  if (!product) {
    return `${baseUrl}@static/lazy/product-list-thumbnail.png`;
  }

  // ambil salah satu gambar
  const image = getSecond ? product.image_second : product.image;

  if (image) {
    const parts = image.split("::");
    if (parts.length === 2) {
      const [storage, path] = parts;
      if (storage === "aws_s3") {
        return `${awsBaseUrl}uploads/images/${path}`;
      }
      
      return `${baseUrl}uploads/images/${path}`;
    }
  }

  return `${baseUrl}@static/lazy/product-list-thumbnail.png`;
}

export function getProductDetailImage(storage?:string, image?:string){
  if (storage == "aws_s3") {
        return `${awsBaseUrl}kurnia-safety-supplies/uploads/images/${image}`;
    
  } else {
      return `${baseUrl}uploads/images/${image}`;

  }

}