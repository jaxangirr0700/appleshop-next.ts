import Banner, { BannerType } from "@/components/Banners";
import Products from "@/components/Products";
import axios from "axios";
import { GetServerSideProps } from "next";

type HomePagePropsType = {
  banners: BannerType[];
};

export const getServerSideProps: GetServerSideProps<
  HomePagePropsType
> = async () => {
  try {
    const resBanners = await axios.get(
      "https://nt.softly.uz/api/front/banners/"
    );

    return {
      props: {
        banners: resBanners.data,
      },
    };
  } catch (error) {
    console.error("Data fetch error:", error);
    return {
      props: {
        banners: [],
      },
    };
  }
};

export default function Home({ banners }: HomePagePropsType) {
  return (
    <div className="max-w-[1440px] m-auto font-bold">
      <Banner banners={banners} />
      <Products />
    </div>
  );
}
