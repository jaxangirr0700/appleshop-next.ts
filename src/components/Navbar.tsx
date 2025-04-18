import Link from "next/link";
import UserModal from "./dialogs/UserModal";
import KorzinkaModal from "./dialogs/KorzinkaModal";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { setSearch } from "@/store/slices/cart.slice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useState } from "react";

const Navbar = () => {
  const [katalogState, setKatalogState] = useState<boolean>(true);
  const likeItems = useAppSelector((state) => state.like_product.items);
  const dispatch = useAppDispatch();
  return (
    <header className="w-full">
      <div className="bg-[#2d2d2d] text-white text-xs px-4 md:px-20 py-1 flex flex-wrap justify-between items-center">
        <div className="flex gap-4 items-center">
          <span className="flex items-center gap-1">Toshkent</span>
          <Link href="/">Bizning do‘konlarimiz</Link>
          <Link href="/">Yuridik shaxslar uchun</Link>
          <Link href="/">To‘lov usullari</Link>
        </div>
        <span>
          Aloqa markazi: <strong>+99871 209 99 44</strong>
        </span>
      </div>
      <div className="bg-white px-4 md:px-20 py-4 flex flex-wrap justify-between items-center shadow-sm">
        <div className="flex items-center gap-6">
          <Link href="/" className="text-2xl font-bold text-black">
            Apple
            <span className="text-slate-800 text-3xl"></span>
          </Link>
          <Button
            // icon={!katalogState ? <CloseOutlined /> : <MenuOutlined />}
            className="bg-slate-900 border-none hover:bg-slate-500"
            onClick={() => {
              setKatalogState(!katalogState);
            }}
          >
            Katalog
          </Button>
        </div>
        <div className="flex-grow max-w-xl mx-4 my-2 md:my-0">
          <Input
            placeholder="Qidirish"
            // suffix={<SearchOutlined />}
            className="rounded-lg py-2"
            onChange={(e) => {
              dispatch(setSearch(e.currentTarget.value));
            }}
          />
        </div>
        <div className="flex gap-6 items-center">
          <UserModal />

          <Link href={"/like"}>
            <Button className="flex flex-col items-center relative">
              Sevimlilar{" "}
              {likeItems.length > 0 && (
                <span className="bg-slate-900 text-white px-2 py-1 rounded-full text-xl absolute top-[-10px] right-[-8px]">
                  {likeItems.length}{" "}
                </span>
              )}
            </Button>
          </Link>

          <KorzinkaModal />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
