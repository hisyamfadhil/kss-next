"use client";

import Image from "next/image";
import React from "react";

interface AwardItemProps {
  image: string;
  title: string;
  description: string;
  award: string;
  year: string;
  priority:boolean;
}

const AwardItem = ({
  image,
  title,
  description,
  award,
  year,
  priority=false
}: AwardItemProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
      {/* Image Section */}
      <div className="w-full rounded-lg shadow-md bg-[#f7f8fa] p-4 flex justify-center items-center">
        <Image
          src={image}
          alt={title}
          width={571} // Set width based on your image aspect ratio
          height={571} // Set height to maintain aspect ratio
          className="w-full h-auto rounded-lg object-cover"
          priority={priority ? true : undefined} // Use priority if true
          loading={priority ? undefined : 'lazy'} // Use lazy loading if priority is false
        
        />
      </div>

      {/* Content Section */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold text-[#46b049]">{title}</h2>
        <p className="text-gray-600 text-justify leading-relaxed">{description}</p>

        <div className="border-t border-gray-200 pt-4 space-y-2">
          <div className="flex flex-wrap gap-1">
            <span className="font-semibold text-gray-700">Award:</span>
            <span className="text-gray-600">{award}</span>
          </div>
          <div className="flex flex-wrap gap-1">
            <span className="font-semibold text-gray-700">Year:</span>
            <span className="text-gray-600">{year}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

// Memoize the component to avoid unnecessary re-renders
export default React.memo(AwardItem);
