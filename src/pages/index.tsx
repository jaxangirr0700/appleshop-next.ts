import { Geist, Geist_Mono } from "next/font/google";
import Banner, { BannerType } from "@/components/Banners";
import Products from "@/components/Products";
import axios from "axios";
import { GetServerSideProps } from "next";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

type HomePagePropsType = {
  banners: BannerType[];
};

export const getServerSideProps: GetServerSideProps<
  HomePagePropsType
> = async () => {
  try {
    const res = await axios.get("https://nt.softly.uz/api/front/banners/");
    const banners = res.data;

    return {
      props: {
        banners,
      },
    };
  } catch (error) {
    console.error("Banner fetch error:", error);
    return {
      props: {
        banners: [],
      },
    };
  }
};
export default function Home({ banners }: HomePagePropsType) {
  return (
    <div
      className={`${geistSans.className} ${geistMono.className} max-w-[1440px] m-auto font-bold`}
    >
      <Banner banners={banners} />
      <Products />
    </div>
  );
}
