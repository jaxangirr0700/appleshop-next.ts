// pages/product/[id].tsx
import Product from "@/components/Product";
import { Button } from "@/components/ui/button";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { addToCart } from "@/store/slices/cart.slice";
import { ProductType } from "@/types";
import axios from "axios";
import { ShoppingCart } from "lucide-react";
import { GetServerSideProps } from "next";
import Head from "next/head";
import Image from "next/image";
import { toast } from "sonner";

type Props = {
  product: ProductType | null;
  similarProducts: ProductType[];
};

export const getServerSideProps: GetServerSideProps<Props> = async (contex) => {
  const { id } = contex.params as { id: string };

  try {
    const resProducts = await axios.get(
      `https://nt.softly.uz/api/front/products/${id}`
    );
    const product = resProducts.data;

    let similarProducts: ProductType[] = [];
    if (product?.categoryId) {
      const resSimilarProducts = await axios.get(
        `https://nt.softly.uz/api/front/products?categoryId=${product.categoryId}`
      );
      similarProducts = resSimilarProducts.data.items || [];
    }
    return {
      props: {
        product,
        similarProducts,
      },
    };
  } catch (e) {
    console.log(e);
    return {
      props: {
        product: null,
        similarProducts: [],
      },
    };
  }
};

function ProductDetail({ product, similarProducts }: Props) {
  const { items: cartItems } = useAppSelector((state) => state.product);
  const isProductInCart = cartItems.some((item) => item.id === product?.id);

  const dispatch = useAppDispatch();

  if (!product) {
    return (
      <div className="text-center py-10 text-red-500">Mahsulot topilmadi</div>
    );
  }

  return (
    <div className="max-w-[1440px] m-auto flex items-center flex-col">
      <Head>
        <title>{product.name} - Mahsulot</title>
        <meta content={product?.name} name="description" />
      </Head>

      <div className="w-full flex flex-col md:flex-row gap-6 mt-6 px-4 md:px-0">
        <div className="md:w-1/2 flex justify-center items-center">
          <Image
            width={50}
            height={50}
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-full max-w-md object-contain rounded-lg shadow"
          />
        </div>

        <div className="md:w-1/2 space-y-4">
          <h1 className="text-2xl font-bold">{product.name}</h1>
          <p className="text-xl text-green-600 font-semibold">
            {product.price.toLocaleString()} so‘m
          </p>

          <div className="text-sm text-gray-600 space-y-1">
            <p>
              <strong>Mahsulot tavsifi:</strong> {product.description || "Yo‘q"}
            </p>
            <p>
              <strong>Stok:</strong> {product.stock || "Mavjud emas"}
            </p>
          </div>

          <Button
            onClick={() => {
              dispatch(addToCart(product));
              toast.success("Korzinkaga Qo'shildi");
            }}
            className={`flex items-center gap-2 mt-4 px-4 py-2 bg-slate-900 text-white rounded hover:bg-slate-600 transition-all duration-300 ${
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
        </div>
      </div>

      {similarProducts.length > 0 && (
        <div className="mt-8 w-full">
          <h2 className="text-xl font-bold mb-4">O{"'"}xshash mahsulotlar</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {similarProducts.map((item) => (
              <Product key={item.id} data={item} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductDetail;
