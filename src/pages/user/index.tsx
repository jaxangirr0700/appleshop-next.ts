"use client";
import Loading from "@/components/Loading";
import { Button } from "@/components/ui/button";
import { useAppSelector } from "@/store/hooks";
import axios from "axios";
import { MoveLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export type OrderProductType = {
  categoryId: number;
  createdAt: string;
  description: string;
  id: number;
  imageUrl: string;
  name: string;
  price: number;
  stock: number;
};

export type OrdersType = {
  id: number;
  orderId: number;
  price: number;
  productId: number;
  quantity: number;
  product: OrderProductType;
};

export type OrderType = {
  createdAt: string;
  customerId: number;
  id: number;
  items: OrdersType[];
  status: string;
  totalPrice: number;
};

export type OrdetDataType = {
  items: OrderType[];
  limit: number;
  page: number;
  totalItems: number;
};

function UserPage() {
  const user = useAppSelector((state) => state.auth);
  const [isClient, setIsClient] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [routerUserPage, setRouterUserPage] = useState<"userpage" | "orders">(
    "userpage"
  );
  const [orders, setOrders] = useState<OrdetDataType>();
  const orderUser = orders?.items.find(
    (order) => order.customerId === user.user?.id
  );
  useEffect(() => {
    setIsClient(true);
  }, []);
  useEffect(() => {
    if (user?.accessToken) {
      setLoading(true);
      axios
        .get(`https://nt.softly.uz/api/front/orders?`, {
          headers: { Authorization: `Bearer ${user.accessToken}` },
        })
        .then((res) => {
          setOrders(res.data);
        })
        .catch((e) => {
          console.log(e);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [user]);

  if (!isClient || !user) return null;

  return (
    <div>
      <div className="ml-5 flex flex-col gap-2 items-start">
        <h1 className="text-2xl font-bold">UserPage</h1>
        <Link
          href="/"
          className="flex items-center gap-2 active:scale-105 transition-all 0.5s px-2 py-1 bg-slate-800 text-white rounded-xl"
        >
          <MoveLeft />
          Orqaga
        </Link>
      </div>

      <div className="flex flex-col md:flex-row bg-white p-4 gap-4">
        <aside className="w-full md:w-1/4 border rounded-lg p-4 space-y-6">
          <div className="flex items-center gap-2">
            <div className="bg-gray-200 rounded-full w-10 h-10 flex items-center justify-center text-lg font-bold">
              {user?.user?.name?.charAt(0)}
            </div>
            <div>
              <div>{user?.user?.name}</div>
              <div className="text-sm text-gray-500">{"+998940969699"}</div>
            </div>
          </div>

          <div className="flex gap-2 flex-col">
            <Button
              onClick={() => {
                setRouterUserPage("userpage");
              }}
              variant="outline"
            >
              Shaxsiy kabinet
            </Button>
            <Button
              onClick={() => {
                setRouterUserPage("orders");
              }}
              variant="outline"
            >
              Online buyurtmalar
            </Button>
            <Button variant="outline">
              Mening to{"'"}lo{"'"}vlarim
            </Button>
            <Button variant="outline">
              To{"'"}lo{"'"}vlar tarixi
            </Button>
            <Button variant="outline">Chiqish</Button>
          </div>
        </aside>

        {routerUserPage === "userpage" ? (
          <main className="w-full md:w-3/4 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="border rounded-lg p-4">
              <div className="flex justify-between items-center mb-3">
                <div className="font-bold">Shaxsiy ma{"'"}lumotlar</div>
                <button className="text-blue-500 hover:underline text-sm">
                  O{"'"}zgartirish
                </button>
              </div>
              <div>{user?.user?.name}</div>
              <div className="text-sm text-gray-500">
                Telefon: {"+998940969699"}
              </div>
            </div>

            <div className="border rounded-lg p-4">
              <div className="font-bold mb-3">Xabarlar yoki yangiliklar</div>
              <div className="text-sm mb-2">
                Aksiyalar va chegirmalar haqida ma{"'"}lumot olish
              </div>
              <div className="flex gap-4 text-sm">
                <label className="flex items-center gap-2">
                  <input type="checkbox" className="accent-blue-500" /> SMS
                  orqali
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
                <Button className="text-sm text-blue-500 hover:underline">
                  Qo{"'"}shish
                </Button>
              </div>
              <div className="text-sm text-gray-500">
                Manzil qo{"'"}shilmagan
              </div>
            </div>
          </main>
        ) : (
          <div className="w-full max-w-2/3 border rounded-lg p-4">
            <h2 className="font-bold text-lg mb-4">Buyurtmalar tarixi</h2>

            <div>
              <>
                {loading && <Loading />}{" "}
                {orderUser ? (
                  <div className="space-y-4 bg-white p-6 rounded-lg shadow-lg">
                    <div>
                      <p>
                        <strong>{user.user?.name}</strong>
                      </p>
                      <p>
                        <strong>Buyurtma holati:</strong> {orderUser.status}
                      </p>
                      <p>
                        <strong>Qachon buyurtma qilingani: </strong>{" "}
                        {new Date(orderUser.createdAt).toLocaleString()}
                      </p>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold">Mahsulotlar:</h3>
                      <ul className="space-y-2">
                        {orderUser.items.map((item, indexOrder) => (
                          <li key={item.id} className="border-b py-2">
                            <p>{indexOrder + 1}-Buyurtma</p>
                            <Image
                              src={item.product.imageUrl}
                              width={50}
                              height={50}
                              alt={item.product.name}
                            />
                            <p>Saqlangan vaqti {item.product.createdAt}</p>
                            <p>
                              <strong>Soni:</strong> {item.quantity}
                            </p>
                            <p>
                              <strong>Narxi:</strong>{" "}
                              {item.price.toLocaleString()} UZS
                            </p>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <p>
                      <strong>Umumiy Summa:</strong>{" "}
                      {orderUser.totalPrice.toLocaleString()} UZS
                    </p>
                  </div>
                ) : (
                  <div className="text-xl font-bold text-center text-gray-500">
                    Topilmadi
                  </div>
                )}
              </>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default UserPage;
