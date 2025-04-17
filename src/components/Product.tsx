import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { addToCart } from "@/store/slices/cart.slice";
import { removeLike, toggleLike } from "@/store/slices/like.slice";
import { ProductType } from "@/types";
import { HeartOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import Image from "next/image";
import Link from "next/link";
import React from "react";

function Product({ data }: { data: ProductType | null }) {
  const dispatch = useAppDispatch();
  const { items: cartItems } = useAppSelector((state) => state.product);
  const { items: likeItems } = useAppSelector((state) => state.like_product);

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
    <div
      key={data.id}
      className="max-w-sm rounded-xl relative shadow-md p-4 bg-white pb-20"
    >
      <Link href={`/product/${data.id}`}>
        <Image
          width={100}
          height={300}
          alt={data.name}
          src={data.imageUrl}
          className="object-bottom h-60 w-full hover:scale-105 transition-transform duration-500"
        />
      </Link>
      <div className="mt-4">
        <h3 className="text-xl font-semibold">{data.name}</h3>
        <p className="text-gray-700 mt-2">{data.description}</p>
        <p className="text-lg font-bold mt-2">${data.price}</p>
        <p className="text-gray-800 mt-1">Stock: {data.stock}</p>
        <button
          onClick={() => {
            dispatch(addToCart(data));
          }}
          className="flex items-center gap-2 mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 absolute left-5 bottom-2 cursor-pointer"
        >
          Stavatcha
          <ShoppingCartOutlined
            style={{ width: 40, fontSize: 28 }}
            className=" hover:scale-110 transition-transform duration-500"
          />
        </button>{" "}
        <button
          onClick={() => dispatch(addToCart(data))}
          className={`flex items-center gap-2 mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 absolute left-5 bottom-2 cursor-pointer ${
            isProductInCart ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={isProductInCart}
        >
          Stavatcha
          <ShoppingCartOutlined
            style={{ width: 40, fontSize: 28 }}
            className="hover:scale-110 transition-transform duration-500"
          />
        </button>
        <button
          onClick={() => toggleLikePage(data)}
          className={`flex items-center gap-2 mt-4 px-4 py-2 bg-transparent rounded hover:bg-neutral-100 absolute right-0 top-5 ${
            isProductLiked ? "text-red-500" : ""
          }`}
        >
          <HeartOutlined
            style={{ width: 40, fontSize: 28 }}
            className="cursor-pointer hover:scale-110 transition-transform duration-500"
          />
        </button>
      </div>
    </div>
  );
}

export default Product;
