import { baseUrl, imageBaseUrl } from "@/utils/baseUrl"
import GatedDownloadModal from "./GatedDownloadModal"

type Props = {
    name: string
    photo: string
    description: string
  }
  
  export default function MarketingCard({
    name,
    photo,
    description,
  }: Props) {
    let image_url = imageBaseUrl("uploads/marketing-tools/"+photo);
    
    return (
      <div className="text-center flex flex-col items-center gap-4 p-6">
        <h4 className="text-lg font-semibold uppercase line-clamp-2 h-[56px] flex items-center justify-center text-center">{name}</h4>
  
        <img
          src={image_url}
          alt={name}
          className="w-[220px] object-contain"
        />
  
        <p className="text-gray-600 max-w-sm">
          {description}
        </p>
        <GatedDownloadModal buttonText={"DOWNLOAD NOW"} title={name}/>
      </div>
    )
  }