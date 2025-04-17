import Loading from "@/components/Loading";
import Product from "@/components/Product";
import { DataType } from "@/types";
import axios from "axios";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

function CategoryPage() {
  const [products, setProducts] = useState<DataType>();
  const [loading, setLoading] = useState<boolean>(true);
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const params = useParams();

  useEffect(() => {
    if (!params?.id) return;

    setLoading(true);

    axios
      .get(
        `https://nt.softly.uz/api/front/products?categoryId=${params.id}&page=${page}&limit=10`
      )
      .then((res) => {
        setProducts(res.data);
        setTotalPages(res.data?.meta?.totalPages || 1);
      })
      .catch((err) => {
        console.error("Xatolik:", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [params?.id, page]);

  const handleNext = () => {
    if (page < totalPages) setPage((prev) => prev + 1);
  };

  const handlePrev = () => {
    if (page > 1) setPage((prev) => prev - 1);
  };

  if (loading) {
    return (
      <div className="max-w-[1440px] m-auto">
        <Loading />
      </div>
    );
  }

  return (
    <div className="max-w-[1440px] m-auto">
      <div>
        <h1 className="text-2xl font-bold">Kategoriya bo‘yicha mahsulotlar</h1>
        <div className="grid grid-cols-3 items-center justify-between">
          {products?.items.map((i) => (
            <Product data={i} key={i.id} />
          ))}
        </div>

        <div className="mt-6 flex items-center justify-center gap-4">
          <button
            onClick={handlePrev}
            disabled={page === 1}
            className={`px-4 py-2 rounded-full border text-sm font-medium transition ${
              page === 1
                ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                : "bg-white text-gray-800 hover:bg-gray-100 shadow"
            }`}
          >
            {"<"}
          </button>

          <span className="text-sm text-gray-700">
            Page <span className="font-semibold">{page}</span> of{" "}
            <span className="font-semibold">{totalPages}</span>
          </span>

          <button
            onClick={handleNext}
            disabled={page === totalPages}
            className={`px-4 py-2 rounded-full border text-sm font-medium transition ${
              page === totalPages
                ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                : "bg-white text-gray-800 hover:bg-gray-100 shadow"
            }`}
          >
            {">"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default CategoryPage;
