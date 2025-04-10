import { Geist, Geist_Mono } from "next/font/google";
import Navbar from "@/components/Navbar";
import Categories from "@/components/Categories";
import Banner from "@/components/Banners";
import Products from "@/components/Products";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function Home() {
  return (
    <div
      className={`${geistSans.className} ${geistMono.className} max-w-[1440px] m-auto font-bold`}
    >
      <Navbar />
      <Categories />
      <Banner />
      <Products />
      <Footer/>
    </div>
  );
}
