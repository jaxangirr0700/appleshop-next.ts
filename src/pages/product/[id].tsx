import Image from "next/image";
import { useParams } from "next/navigation";
import React, { useState, useEffect } from "react"; 
import axios from "axios"; 
import { ProductType } from "@/types";
import Loading from "@/components/Loading";

function ProductDetail() {
  const { id } = useParams();
  const [data, setData] = useState<ProductType | null>(null);
  const [similarProducts, setSimilarProducts] = useState<ProductType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (id) {
      axios
        .get(`https://nt.softly.uz/api/front/products/${id}`)
        .then((res) => {
          setData(res.data);
        })
        .catch((er) => {
          console.error(er);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [id]);

  useEffect(() => {
    if (data) {
      axios
        .get(
          `https://nt.softly.uz/api/front/products?categoryId=${data.categoryId}`
        )
        .then((res) => {
          setSimilarProducts(res.data.items);
        })
        .catch((er) => {
          console.log(er);
        });
    }
  }, [data]);

  return (
    <div className="max-w-[1440px] m-auto">
      {loading ? (
        <Loading />
      ) : (
        <>
          {data ? (
            <div className="w-full flex flex-col items-center p-6 bg-gray-100 rounded-lg shadow-md">
              <div className="flex flex-col md:flex-row items-center gap-5 justify-center">
                <div className="flex flex-col items-start gap-3">
                  <h1 className="mt-4 text-3xl font-bold text-center text-gray-800">
                    {data.name}
                  </h1>
                  <Image
                    className="w-60 h-60 object-cover rounded-lg shadow-lg"
                    width={100}
                    height={100}
                    src={data.imageUrl}
                    alt={data.name}
                  />
                </div>
                <div className="flex flex-col gap-4">
                  <p className="text-lg text-gray-600">{data.description}</p>
                  <p className="text-2xl font-bold text-gray-800">
                    ${data.price}
                  </p>
                  <p className="text-gray-800">
                    Sotuvda: <span className="font-semibold">{data.stock}</span>{" "}
                    ta dona bor
                  </p>
                  <p className="text-2xl font-bold text-gray-800">
                    ${(data.price * 1.2) / 12} / 12 oy
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <p className="text-red-500">Mahsulot topilmadi.</p>
          )}

          {similarProducts.length > 0 && (
            <div className="mt-8">
              <h2 className="text-2xl font-bold text-gray-800">
                Oxshash mahsulotlar
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {similarProducts.map((p) => (
                  <div
                    key={p.id}
                    className="border rounded-lg p-4 cursor-pointer"
                    onClick={() => {
                      setData(p);
                    }}
                  >
                    <Image
                      width={100}
                      height={100}
                      src={p.imageUrl}
                      alt={p.name}
                      className="w-full h-40 object-cover rounded-md"
                    />
                    <h3 className="font-bold">{p.name}</h3>
                    <p className="text-lg">${p.price}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default ProductDetail;
