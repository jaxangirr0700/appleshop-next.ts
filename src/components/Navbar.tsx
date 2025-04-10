/* eslint-disable react/jsx-no-undef */
import Link from "next/link";
import SavatchaModal from "./SavatchaModal";

const Navbar = () => {
  return (
    <nav className="flex justify-between items-center p-4 bg-gray-800 text-white">
      <div className="text-lg font-bold">
        <Link href={'/'} className="cursor-pointer">Logo</Link>
      </div>
      <div>
        <SavatchaModal />
      </div>
    </nav>
  );
};

export default Navbar;
