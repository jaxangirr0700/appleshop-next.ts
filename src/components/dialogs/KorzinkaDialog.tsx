import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import Image from "next/image";
import {
  decrementQty,
  deleteCart,
  incrementQty,
} from "@/store/slices/cart.slice";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { ShoppingCart } from "lucide-react";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import axios from "axios";
import { useRouter } from "next/router";
import { toast } from "sonner";

const formSchema = z.object({
  address: z.string().min(2).max(50),
});
function KorzinkaModal() {
  const [open, setOpen] = useState<boolean>(false);
  const products = useAppSelector((state) => state.product.items);
  const [loading, setLoading] = useState<boolean>(false);
  const user = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const router = useRouter();

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
    console.log(postValue);

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

  return (
    <div>
      <Button
        className="relative "
        variant={"outline"}
        onClick={() => {
          setOpen(true);
        }}
      >
        {products.length > 0 && (
          <span className=" absolute top-[-15px] right-[-15px] bg-slate-800 text-white text-xl px-2 py-1 font-mono rounded-full">
            {products?.length}
          </span>
        )}
        <ShoppingCart />{" "}
      </Button>
      <Dialog
        open={open}
        onOpenChange={(open) => {
          setOpen(open);
        }}
      >
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Savatcha</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 max-h-96 overflow-y-auto ">
            {products.length > 0 ? (
              products.map((item) => (
                <div
                  key={item.id}
                  className="max-w-19/20 flex items-center gap-4 border px-1 py-1 rounded-xl border-slate-300  hover:scale-105 transition-all 0.5s"
                >
                  <Image
                    src={item.imageUrl}
                    alt={item.name}
                    width={60}
                    height={60}
                    className="rounded object-cover"
                  />
                  <div className="flex-1">
                    <p className="font-semibold">{item.name}</p>
                    <p className="text-sm text-gray-600">{item.description}</p>
                    <p className="font-bold text-blue-600">
                      {(item.price * item.quantity).toLocaleString()} $
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() => dispatch(decrementQty(item.id))}
                        className="bg-gray-200 px-2 rounded"
                      >
                        -
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        onClick={() => dispatch(incrementQty(item.id))}
                        className="bg-gray-200 px-2 rounded"
                      >
                        +
                      </button>
                    </div>
                  </div>{" "}
                  <Button
                    onClick={() => dispatch(deleteCart(item.id))}
                    className="bg-red-100 text-red-900 px-2 mr-2 rounded border border-red-400  py-1 hover:bg-red-300"
                  >
                    Delete
                  </Button>
                </div>
              ))
            ) : (
              <div className="flex flex-col justify-between h-30">
                <span>Savatcha hozircha bo{"'"}sh</span>
                <Link
                  href={"/"}
                  onClick={() => {
                    setOpen(false);
                  }}
                >
                  <Button
                    className=" bg-slate-500 text-white hover:text-white hover:bg-slate-900 "
                    variant={"outline"}
                  >
                    Haridlar Sari
                  </Button>
                </Link>
              </div>
            )}
          </div>
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
                    <FormControl>
                      <Input placeholder="Manzil kiriting !!!" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default KorzinkaModal;
