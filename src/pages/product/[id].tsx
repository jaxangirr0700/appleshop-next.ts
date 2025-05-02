// pages/product/[id].tsx
import Product from "@/components/Product";
import { ProductType } from "@/types";
import axios from "axios";
import { GetServerSideProps } from "next";
import Head from "next/head";

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

      <Product data={product} />

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
