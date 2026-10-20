import React from "react";
import Image from "next/image";

type ThumbnailProps = {
  src: string;
  selected: boolean;
  onClick: () => void;
};

export default function Thumbnail({ src, selected, onClick }: ThumbnailProps) {
  return (
    <button
      onClick={onClick}
      className={`border-2 rounded-md overflow-hidden ${
        selected ? "border-green-500" : "border-transparent"
      }`}
    >
      <Image src={src} alt="Thumbnail" width={100} height={60} className="object-cover" fetchPriority="high" />
    </button>
  );
}
