import Link from "next/link";
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

const Navbar = () => {
  const [katalogState, setKatalogState] = useState<boolean>(true);
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
              console.log(katalogState);
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
          />
        </div>
        <div className="flex gap-6 items-center text-sm">
          <UserModal />

          <Button
            type="text"
            style={{ width: 100, height: 50 }}
            className="flex flex-col items-center"
          >
            <HeartOutlined className="text-xl" />
            Sevimlilar
          </Button>

          <div className="flex flex-col items-center">
            <KorzinkaModal />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
