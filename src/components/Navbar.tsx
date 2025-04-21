import Link from "next/link";
import UserModal from "./dialogs/UserDialog";
import KorzinkaModal from "./dialogs/KorzinkaDialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { setSearch } from "@/store/slices/cart.slice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useState } from "react";
import { AlignJustify, Search, X } from "lucide-react";

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
            className="bg-slate-900 border-none hover:bg-slate-500"
            onClick={() => {
              setKatalogState(!katalogState);
            }}
          >
            {!katalogState ? <X /> : <AlignJustify />}
            Katalog
          </Button>
        </div>
        <div className="relative w-full max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />

          <Input
            type="text"
            placeholder="Qidirish"
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) => {
              dispatch(setSearch(e.currentTarget.value));
            }}
          />
        </div>
        <div className="flex gap-6 items-center">
          <UserModal />

          <Link href={"/like"}>
            <Button
              variant={"outline"}
              className="flex flex-col items-center relative"
            >
              Sevimlilar
              {likeItems.length > 0 && (
                <span className="bg-slate-900 text-white px-2 py-1 rounded-full text-xl absolute -top-4 -right-4">
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
