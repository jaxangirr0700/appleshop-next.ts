import Link from "next/link";
import UserModal from "./dialogs/UserDialog";
import KorzinkaModal from "./dialogs/KorzinkaDialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { setSearch } from "@/store/slices/cart.slice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useEffect, useState } from "react";
import { AlignJustify, HeartIcon, Search, X } from "lucide-react";

const Navbar = () => {
  const [katalogState, setKatalogState] = useState<boolean>(true);
  const likeItems = useAppSelector((state) => state.like_product.items);
  const dispatch = useAppDispatch();
  const [isClient, setIsClient] = useState<boolean>(false);

  useEffect(() => {
    setIsClient(true);
  }, []);
  return (
    <>
      {isClient && (
        <header className="w-full">
          <div className="bg-[#2d2d2d] text-white text-xs px-4 md:px-20 py-1 flex flex-col md:flex-row justify-between items-start md:items-center gap-2">
            <div className="flex flex-wrap gap-3 items-center">
              <span className="flex items-center gap-1">📍 Toshkent</span>
              <Link href="/" className="hover:underline">
                Bizning do‘konlarimiz
              </Link>
              <Link href="/" className="hover:underline">
                Yuridik shaxslar uchun
              </Link>
              <Link href="/" className="hover:underline">
                To‘lov usullari
              </Link>
            </div>
            <span className="whitespace-nowrap">
              Aloqa markazi: <strong>+99871 209 99 44</strong>
            </span>
          </div>

          <div className="bg-white px-4 md:px-20 py-4 flex flex-wrap md:flex-nowrap justify-between items-center gap-4 shadow-sm">
            <div className="flex items-center flex-wrap gap-4">
              <Link href="/" className="text-2xl font-bold text-black">
                Apple<span className="text-slate-800 text-3xl"></span>
              </Link>
              <Button
                className="bg-slate-900 text-white border-none hover:bg-slate-500 flex items-center gap-2"
                onClick={() => setKatalogState(!katalogState)}
              >
                {katalogState ? <X size={18} /> : <AlignJustify size={18} />}
                <span className="hidden sm:inline">Katalog</span>
              </Button>
            </div>

            <div className="relative w-full md:max-w-md flex-1 order-3 md:order-none">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                type="text"
                placeholder="Qidirish"
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={(e) => dispatch(setSearch(e.currentTarget.value))}
              />
            </div>

            <div className="flex items-center gap-10 flex-wrap w-full justify-between md:justify-end md:w-auto">
              <UserModal />

              <Link href="/like">
                <Button
                  variant="outline"
                  className="relative flex items-center justify-center gap-1 text-sm"
                >
                  <HeartIcon className="w-4 h-4" />
                  <span className="hidden sm:inline"></span>
                  {likeItems.length > 0 && (
                    <span className="bg-slate-900 text-white px-2 py-1 rounded-full text-xs absolute -top-3 -right-3">
                      {likeItems.length}
                    </span>
                  )}
                </Button>
              </Link>

              <KorzinkaModal />
            </div>
          </div>
        </header>
      )}
    </>
  );
};

export default Navbar;
