"use client";

import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  decrementQty,
  deleteCart,
  incrementQty,
} from "@/store/slices/cart.slice";
import { MoveLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useRouter } from "next/router";
import { toast } from "sonner";

const formSchema = z.object({
  address: z.string().min(2, {
    message: "Manzil kamida 6 ta harfdan iborab bo'lishi kerak!",
  }),
});

function UserPage() {
  const user = useAppSelector((state) => state.auth);
  const [isClient, setIsClient] = useState(false);
  const products = useAppSelector((state) => state.product.items);
  const dispatch = useAppDispatch();
  const [routerUserPage, setRouterUserPage] = useState<"userpage" | "orders">(
    "userpage"
  );
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      address: "",
    },
  });
  function onSubmit(values: z.infer<typeof formSchema>) {
    const postValue = {
      address: values.address,
      items: products.map((i) => {
        return { productId: i.id, quantity: i.quantity };
      }),
    };
    setLoading(true);
    axios
      .post(`https://nt.softly.uz/api/front/orders`, postValue, {
        headers: {
          Authorization: `Bearer ${user.accessToken}`,
        },
      })
      .then(() => {
        router.push("/user");
        toast.success("Rasmiylashtirildi");
      })
      .catch((e) => {
        console.log(e);
      })
      .finally(() => {
        setLoading(false);
      });
  }
  useEffect(() => {
    setIsClient(true);
  }, []);

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
              variant="outline"
              onClick={() =>
                setRouterUserPage((prev) =>
                  prev === "userpage" ? "orders" : "userpage"
                )
              }
            >
              {routerUserPage === "orders"
                ? "Online buyurtmalar"
                : "Shaxsiy kabinet"}
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
              {products.length > 0 ? (
                <div className="space-y-4">
                  <ul className="grid grid-cols-1 gap-4 overflow-y-auto max-h-96 px-2">
                    {products.map((item) => (
                      <li
                        key={item.id}
                        className="flex  items-center gap-4 border px-4 py-3 rounded-xl border-slate-300 hover:scale-101 transition-all duration-300"
                      >
                        <Image
                          src={item.imageUrl}
                          alt={item.name}
                          width={60}
                          height={60}
                          className="rounded object-cover"
                        />
                        <div className="flex-1">
                          <p className="font-semibold text-lg">{item.name}</p>
                          <p className="text-sm text-gray-600">
                            {item.description}
                          </p>
                          <p className="font-bold text-blue-600 mt-1">
                            {(item.price * item.quantity).toLocaleString()} $
                          </p>
                          <div className="flex items-center gap-3 mt-2">
                            <Button
                              onClick={() => dispatch(decrementQty(item.id))}
                              className="bg-gray-200 px-2 rounded text-black text-2xl hover:text-white active:scale-105 transition-all 0.3"
                            >
                              -
                            </Button>
                            <span>{item.quantity}</span>
                            <Button
                              onClick={() => dispatch(incrementQty(item.id))}
                              className="bg-gray-200 px-2 rounded text-black text-2xl hover:text-white active:scale-105 transition-all 0.3s"
                            >
                              +
                            </Button>
                            <Button
                              variant={"outline"}
                              onClick={() => dispatch(deleteCart(item.id))}
                              className="bg-gray-100 px-3 py-1 rounded border border-red-400 text-black hover:bg-red-100 transition-all duration-300"
                            >
                              Delete
                            </Button>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                  <div className="flex justify-center items-center gap-2">
                    <Form {...form}>
                      <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="flex items-end gap-5"
                      >
                        <Button type="submit">
                          {loading && (
                            <div className="flex justify-center items-center">
                              <div className="animate-spin rounded-full h-5 w-5 border-t-4 border-slate-50"></div>
                            </div>
                          )}
                          Rasmiylashtirish
                        </Button>
                        <FormField
                          control={form.control}
                          name="address"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Manzil Kiriting</FormLabel>
                              <FormControl>
                                <Input placeholder="shadcn" {...field} />
                              </FormControl>

                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </form>
                    </Form>
                  </div>
                </div>
              ) : (
                <div className="text-xl font-bold text-center text-gray-500">
                  Topilmadi
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default UserPage;
