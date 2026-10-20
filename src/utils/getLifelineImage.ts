import { imageBaseUrl } from "./baseUrl";

export interface Product {
  image?: string;
  image_second?: string;
}
  const awsBaseUrl = process.env.NEXT_PUBLIC_AWS_BASE_URL || "";
  const baseUrl = imageBaseUrl("") || "";

export function getLifelineImage(storage?:string, image?:string){
  if (storage == "aws_s3") {
        return `${awsBaseUrl}${image}`;
  } else {
      return `${baseUrl}${image}`;
  }

}
