import { useParams } from "next/navigation";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Loading from "@/components/Loading";
import { ProductType } from "@/types";
import Product from "@/components/Product";
import Head from "next/head";

function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState<ProductType | null>(null);
  const [similarProducts, setSimilarProducts] = useState<ProductType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (id) {
      setLoading(true);
      axios
        .get(`https://nt.softly.uz/api/front/products/${id}`)
        .then((res) => {
          setProduct(res.data);
        })
        .catch((err) => {
          console.error("Error fetching product:", err);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [id]);

  useEffect(() => {
    if (product?.categoryId) {
      axios
        .get(
          `https://nt.softly.uz/api/front/products?categoryId=${product.categoryId}`
        )
        .then((res) => {
          setSimilarProducts(res.data.items || []);
        })
        .catch((err) => {
          console.error("Error fetching similar products:", err);
        });
    }
  }, [product]);

  if (loading) {
    return (
      <div className="max-w-[1440px] m-auto">
        <Loading />
      </div>
    );
  }

  return (
    <div className="max-w-[1440px] m-auto flex items-center  gap-1 flex-col">
      {product && <Product data={product} />}
      <Head>
        <title>ProductPage</title>
        <meta content={product?.name} name="description" />
      </Head>
      {similarProducts.length > 0 && (
        <div className="mt-8">
          <h2 className="text-xl font-bold mb-4">Similar Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {similarProducts.map((item) => (
              <Product key={item.id} data={item} />
            ))}
          </div>
        </div>
      )}{" "}
    </div>
  );
}

export default ProductDetail;
