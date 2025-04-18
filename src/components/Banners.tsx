import Image from "next/image";
import * as React from "react";
import { Carousel, CarouselContent, CarouselItem } from "./ui/carousel";
import { Card, CardContent } from "./ui/card";
// import { useEffect, useState } from "react";

export type BannerType = {
  createdAt: string;
  id: number;
  imageUrl: string;
  isActive: boolean;
  title: string;
};

export type BannerProps = {
  banners: BannerType[];
};

function Banner({ banners }: BannerProps) {
  // const [prewImg, setPrewImg] = useState<number>(0);

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setPrewImg((prewImg) => (prewImg + 1) % banners.length);
  //   }, 1000);
  // }, [banners.length]);
  return (
    <div className="w-full rounded-xl">
      <Carousel className="w-full">
        <CarouselContent>
          {banners.map((b) => (
            <CarouselItem key={b.id} className="w-full">
              <div className="p-2 w-full">
                <Card className="w-full">
                  <CardContent className="flex items-center justify-center p-0 w-full">
                    <div className="relative w-full h-56 sm:h-72 md:h-96">
                      <Image
                        src={b.imageUrl}
                        alt={b.title}
                        fill
                        className="object-cover w-full h-full rounded-xl"
                        priority
                      />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
}

export default Banner;
