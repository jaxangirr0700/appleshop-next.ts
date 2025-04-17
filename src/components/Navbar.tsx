import {
  SearchOutlined,
  MenuOutlined,
  HeartOutlined,
  EnvironmentOutlined,
  CloseOutlined,
  AppleFilled,
} from "@ant-design/icons";
import { Input, Button } from "antd";
import { useState } from "react";
import UserModal from "./modals/UserModal";
import KorzinkaModal from "./modals/KorzinkaModal";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setSearch } from "@/store/slices/cart.slice";
import Link from "next/link";

const Navbar = () => {
  const [katalogState, setKatalogState] = useState<boolean>(true);
  const state = useAppSelector((state) => state.product.search);
  const likeItems = useAppSelector((state) => state.like_product.items);
  const dispatch = useAppDispatch();
  return (
    <header className="w-full">
      <div className="bg-[#2d2d2d] text-white text-xs px-4 md:px-20 py-1 flex flex-wrap justify-between items-center">
        <div className="flex gap-4 items-center">
          <span className="flex items-center gap-1">
            <EnvironmentOutlined /> Toshkent
          </span>
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
            <span className="text-slate-800 text-3xl">
              <AppleFilled />
            </span>
          </Link>
          <Button
            type="primary"
            color="default"
            variant="solid"
            icon={!katalogState ? <CloseOutlined /> : <MenuOutlined />}
            className="bg-yellow-400 border-none hover:bg-yellow-500"
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
            suffix={<SearchOutlined />}
            className="rounded-lg py-2"
            size="large"
            onChange={(e) => {
              dispatch(setSearch(e.currentTarget.value));
              console.log(state);
            }}
          />
        </div>
        <div className="flex gap-6 items-center text-sm">
          <UserModal />

          <Link href={"/like"}>
            {" "}
            <Button
              type="text"
              style={{ width: 100, height: 50 }}
              className="flex flex-col items-center relative"
            >
              <HeartOutlined className="text-xl" />
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
