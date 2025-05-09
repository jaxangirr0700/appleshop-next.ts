import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { addToCart } from "@/store/slices/cart.slice";
import { removeLike, toggleLike } from "@/store/slices/like.slice";
import { ProductType } from "@/types";
import { Heart, ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { toast } from "sonner";

function Product({ data }: { data: ProductType | null }) {
  const dispatch = useAppDispatch();
  const { items: cartItems } = useAppSelector((state) => state.product);
  const { items: likeItems } = useAppSelector((state) => state.like_product);
  const [isClient, setIsClient] = useState<boolean>(false);

  useEffect(() => {
    setIsClient(true);
  }, []);
  if (!data) return null;

  const isProductInCart = cartItems.some((item) => item.id === data.id);
  const isProductLiked = likeItems.some((item) => item.id === data.id);

  function toggleLikePage(data: ProductType) {
    if (isProductLiked) {
      dispatch(removeLike(data.id));
    } else {
      dispatch(toggleLike(data));
    }
  }

  return (
    <>
      {isClient && (
        <Card
          key={data.id}
          className="max-w-sm list-none rounded-xl relative shadow-md p-4 bg-white pb-20"
        >
          <Link href={`/product/${data.id}`}>
            <Image
              width={100}
              height={300}
              alt={data.name}
              src={data.imageUrl}
              className="object-cover h-96 rounded-2xl w-full hover:scale-103 transition-transform duration-200"
            />
          </Link>
          <div className="mt-4">
            <h3 className="text-xl font-semibold">{data.name}</h3>
            <p className="text-gray-700 mt-2">{data.description}</p>
            <p className="text-lg font-bold mt-2">${data.price}</p>
            <p className="text-gray-800 mt-1">Stock: {data.stock}</p>
            <Button
              onClick={() => {
                dispatch(addToCart(data));
                toast.success("Korzinkaga Qo'shildi");
              }}
              className={`flex items-center gap-2 mt-4 px-4 py-2 bg-slate-900 text-white rounded hover:bg-slate-600 absolute right-9 bottom-3 transition-all duration-300 ${
                isProductInCart
                  ? "opacity-50 cursor-not-allowed"
                  : "cursor-pointer"
              }`}
              disabled={isProductInCart}
            >
              Stavatcha
              <ShoppingCart
                size={30}
                className="hover:scale-110 transition-transform duration-300"
              />
            </Button>
            <Button
              onClick={() => toggleLikePage(data)}
              className={`flex items-center mt-4 w-12 px-2 py-1 bg-transparent rounded-full  hover:bg-neutral-100 text-white absolute right-4 top-5 ${
                isProductLiked ? "text-red-500" : ""
              }`}
            >
              <Heart
                style={{ width: 60, fontSize: 52 }}
                className="cursor-pointer hover:scale-110 transition-transform duration-500"
              />
            </Button>
          </div>
        </Card>
      )}
    </>
  );
}

export default Product;
