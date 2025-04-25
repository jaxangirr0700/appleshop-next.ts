import { HomePagePropsType } from "@/pages";
import Image from "next/image";
import React from "react";
import { useEffect, useState } from "react";

function Banner({ banners }: HomePagePropsType) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % banners.length);
    }, 1500);

    return () => clearInterval(interval);
  }, [banners.length]);

  return (
    <div className="rounded-xl w-full overflow-hidden">
      <div className="relative w-full h-56 sm:h-72 md:h-96">
        {banners.map((banner, index) => (
          <Image
            key={banner.id}
            src={banner.imageUrl}
            alt={banner.title}
            fill
            className={`object-cover transition-opacity duration-300 ease-in-out rounded-xl ${
              index === currentIndex ? "opacity-100" : "opacity-0"
            }`}
            priority={index === currentIndex}
          />
        ))}
      </div>
    </div>
  );
}

export default Banner;
