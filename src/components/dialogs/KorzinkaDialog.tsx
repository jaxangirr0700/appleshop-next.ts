import { Input } from "@/components/ui/input";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  decrementQty,
  deleteCart,
  incrementQty,
} from "@/store/slices/cart.slice";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { Trash } from "lucide-react";
import dynamic from "next/dynamic";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
const KorzDiaologButton = dynamic(
  () => import("../hydration.errors/KorzDiaologButton"),
  { ssr: false }
);

const formSchema = z.object({
  address: z
    .string()
    .min(2, "Manzil kamida 2 harfdan iborat bo'lishi kerak")
    .max(50),
});

function KorzinkaModal() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const products = useAppSelector((state) => state.product?.items ?? []);
  const user = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      address: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const postValue = {
      address: values.address,
      items: products.map((i) => ({
        productId: i.id,
        quantity: i.quantity,
      })),
    };
    console.log(postValue);

    setLoading(true);
    try {
      await axios.post(`https://nt.softly.uz/api/front/orders`, postValue, {
        headers: {
          Authorization: `Bearer ${user.accessToken}`,
        },
      });
      toast.success("Rasmiylashtirildi!");
      localStorage.removeItem("carts");
      router.push("/user");
      setOpen(false);
    } catch (error) {
      console.error(error);
      toast.error("Xatolik yuz berdi. Iltimos, qayta urinib ko‘ring.");
    } finally {
      setLoading(false);
    }
  };
  if (!Array.isArray(products)) {
    return <p>Mahsulotlar topilmadi</p>;
  }
  return (
    <div>
      <KorzDiaologButton
        setOpen={() => {
          setOpen(true);
        }}
        products={products}
      />

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className=" max-w-[1000px]">
          <DialogHeader>
            <DialogTitle>Savatcha</DialogTitle>
          </DialogHeader>

          <div className="space-y-4 max-h-96  overflow-y-auto">
            {products.length > 0 ? (
              products.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-4 border px-2 py-2 rounded-xl border-slate-300 hover:scale-101 transition-all"
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
                      <Button
                        onClick={() => dispatch(decrementQty(item.id))}
                        className=" px-2 rounded"
                      >
                        -
                      </Button>
                      <span>{item.quantity}</span>
                      <Button
                        onClick={() => dispatch(incrementQty(item.id))}
                        className=" px-2 rounded"
                      >
                        +
                      </Button>
                    </div>
                  </div>
                  <Button
                    variant={"outline"}
                    color="red"
                    onClick={() => dispatch(deleteCart(item.id))}
                    className="bg-red-100 text-red-900 px-2 mr-2  border border-red-400 py-1 hover:bg-red-300"
                  >
                    <Trash />
                  </Button>
                </div>
              ))
            ) : (
              <div className="flex flex-col items-center justify-center space-y-4">
                <span>Savatcha hozircha bo{"'"}sh</span>
                <Link href="/" onClick={() => setOpen(false)}>
                  <Button className="bg-slate-500 text-white hover:bg-slate-900">
                    Haridlar sari
                  </Button>
                </Link>
              </div>
            )}
          </div>

          {products.length > 0 && (
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex items-end gap-5 mt-4"
              >
                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input placeholder="Manzil kiriting..." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" disabled={loading}>
                  {loading ? (
                    <div className="flex items-center gap-2">
                      <div className="animate-spin rounded-full h-5 w-5 border-t-4 border-white" />
                      Yuklanmoqda...
                    </div>
                  ) : (
                    "Rasmiylashtirish"
                  )}
                </Button>
              </form>
            </Form>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default KorzinkaModal;
