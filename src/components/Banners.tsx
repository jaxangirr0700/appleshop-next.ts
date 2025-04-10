import { Carousel } from "antd";
import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";

type BannerType = {
  createdAt: string;
  id: number;
  imageUrl: string;
  isActive: boolean;
  title: string;
};

const contentStyle: React.CSSProperties = {
  height: "350px",
  color: "#fff",
  lineHeight: "160px",
  textAlign: "center",
  background: "#364d79",
};
function Banner() {
  const [banners, setBanners] = useState<BannerType[]>([]);

  useEffect(() => {
    axios
      .get(`https://nt.softly.uz/api/front/banners/`)
      .then((res) => {
        setBanners(res.data);
      })
      .catch((er) => {
        console.error(er);
      })
      .finally(() => {});
  }, []);

  return (
    <div className="w-full rounded-xl">
      <Carousel autoplay={{ dotDuration: true }} autoplaySpeed={2500}>
        {banners.map((item) => (
          <div
            key={item.id}
            className="h-full flex items-center justify-center rounded-xl"
          >
            <Image
              width={500}
              height={100}
              style={contentStyle}
              src={item.imageUrl}
              alt={item.title}
              className="object-cover w-full h-full rounded-xl"
            />
          </div>
        ))}
      </Carousel>
    </div>
  );
}

export default Banner;
