"use client";

import React, { memo, useCallback, useEffect, useRef } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import { imageBaseUrl } from "@/utils/baseUrl";


// ================= CARD =================
const ClientCard = memo(
  ({ item, index }: { item: any; index: number }) => {
    return (
      <div
        className="
          flex-[0_0_33.33%]
          sm:flex-[0_0_20%]
          px-2
        "
      >
        <div className="relative aspect-[5/3] flex items-center justify-center overflow-hidden">
          <Image
            src={imageBaseUrl(item)}
            alt={`Logo ${index}`}
            fill
            priority={index < 5}
            loading={index < 5 ? "eager" : "lazy"}
            className="
              object-contain
              transition-transform
              duration-500
              hover:scale-105
            "
            sizes="
              (max-width:640px) 33vw,
              (max-width:768px) 20vw,
              (max-width:1024px) 16vw,
              12vw
            "
          />
        </div>
      </div>
    );
  }
);

ClientCard.displayName = "ClientCard";


// ================= SLIDER =================
function SliderClient({
  slides,
}: {
  slides: any[];
}) {

  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      dragFree: true,
      skipSnaps: true,
      align: "start",
      duration: 5000,
    },
    []
  );


  const animationRef = useRef<number | null>(null);
  const paused = useRef(false);


  // smooth auto scroll
  const autoScroll = useCallback(() => {

    if (!emblaApi) return;


    const scroll = () => {

      if (!paused.current) {

        /**
         * scrollNext menggunakan animasi bawaan Embla
         */
        emblaApi.scrollNext();


      }

      animationRef.current = requestAnimationFrame(scroll);

    };


    animationRef.current = requestAnimationFrame(scroll);


  }, [emblaApi]);



  useEffect(() => {

    autoScroll();


    return () => {
      if(animationRef.current){
        cancelAnimationFrame(animationRef.current);
      }
    };


  }, [autoScroll]);



  return (

    <div
      className="relative w-full overflow-hidden"

      onMouseEnter={()=>{
        paused.current = true;
      }}

      onMouseLeave={()=>{
        paused.current = false;
      }}

      onTouchStart={()=>{
        paused.current = true;
      }}

      onTouchEnd={()=>{
        paused.current = false;
      }}

    >


      <div
        ref={emblaRef}
        className="overflow-hidden"
      >

        <div className="flex -mx-2">

          {
            slides.map((item,index)=>(
              <ClientCard
                key={index}
                item={item}
                index={index}
              />
            ))
          }

        </div>

      </div>


    </div>

  );
}


export default memo(SliderClient);