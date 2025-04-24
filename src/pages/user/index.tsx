"use client";

import { useAppSelector } from "@/store/hooks";
import { MoveLeft } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";

function UserPage() {
  const user = useAppSelector((state) => state.auth.user);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  return (
    <div>
      <div className="ml-5 flex flex-col gap-2 items-start ">
        {" "}
        <h1 className="text-2xl font-bold ">UserPage</h1>
        <Link
          href={"/"}
          className=" flex items-center gap-2 active:scale-105 transition-all 0.5s px-2 py-1 bg-slate-800 text-white rounded-xl"
        >
          <MoveLeft />
          Orqaga
        </Link>
      </div>
      <div className="flex flex-col md:flex-row bg-white p-4 gap-4">
        <aside className="w-full md:w-1/4 border rounded-lg p-4 space-y-6">
          <div className="flex items-center gap-2">
            <div className="bg-gray-200 rounded-full w-10 h-10 flex items-center justify-center text-lg font-bold">
              {user?.name.charAt(0)}
            </div>
            <div>
              <div>{user?.name}</div>
              <div className="text-sm text-gray-500">+998940969699</div>
            </div>
          </div>
          <div className="space-y-3">
            {[
              "Mening to‘lovlarim",
              "To‘lov tarixi",
              "Onlayn buyurtmalar",
              "Chiqish",
            ].map((item) => (
              <div
                key={item}
                className="text-sm hover:underline cursor-pointer"
              >
                {item}
              </div>
            ))}
          </div>
        </aside>

        <main className="w-full md:w-3/4 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="border rounded-lg p-4">
            <div className="flex justify-between items-center mb-3">
              <div className="font-bold">Shaxsiy ma{"'"}lumotlar</div>
              <button className="text-blue-500 hover:underline text-sm">
                O‘zgartirish
              </button>
            </div>
            <div>{user?.name}</div>
            <div className="text-sm text-gray-500">Telefon: +998940969699</div>
          </div>

          <div className="border rounded-lg p-4">
            <div className="font-bold mb-3">Xabarlar yoki yangiliklar</div>
            <div className="text-sm mb-2">
              Aksiyalar va chegirmalar haqida ma{"'"}lumot olish
            </div>
            <div className="flex gap-4 text-sm">
              <label className="flex items-center gap-2">
                <input type="checkbox" className="accent-blue-500" /> SMS orqali
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" className="accent-blue-500" /> Telegram
                orqali
              </label>
            </div>
          </div>

          <div className="border rounded-lg p-4">
            <div className="font-bold mb-2">Mening kartam</div>
            <div className="text-sm text-gray-500">Mavjud emas</div>
          </div>

          <div className="border rounded-lg p-4">
            <div className="flex justify-between items-center mb-2">
              <div className="font-bold">Yetkazib berish manzili</div>
              <button className="text-sm text-blue-500 hover:underline">
                Qo{"'"}shish
              </button>
            </div>
            <div className="text-sm text-gray-500">Manzil qo{"'"}shilmagan</div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default UserPage;
