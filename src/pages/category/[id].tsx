import Loading from "@/components/Loading";
import Product from "@/components/Product";
import { DataType } from "@/types";
import axios from "axios";
import Head from "next/head";
import { useParams, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import Link from "next/link";

function CategoryPage() {
  const [productsData, setProductsData] = useState<DataType>();
  const [loading, setLoading] = useState<boolean>(true);
  const params = useParams();
  const searchParams = useSearchParams();

  const page = parseInt(searchParams.get("page") || "1", 10);
  const limit = parseInt(searchParams.get("limit") || "5", 10);
  const totalPages = productsData?.totalItems || 1;

  useEffect(() => {
    if (!params?.id) return;

    setLoading(true);
    axios
      .get(`https://nt.softly.uz/api/front/products`, {
        params: {
          page: page,
          limit: limit,
          categoryId: params.id,
        },
      })
      .then((res) => {
        setProductsData(res.data);
      })
      .catch((err) => {
        console.error("Xatolik:", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [params?.id, page, limit]);

  if (loading) {
    return (
      <div className="max-w-[1440px] m-auto">
        <Loading />
      </div>
    );
  }

  return (
    <div className="max-w-[1440px] m-auto">
      <Head>
        <title>Category Page</title>
        <meta
          content={productsData?.items?.[0]?.name || "Mahsulotlar"}
          name="description"
        />
      </Head>

      <div>
        <h1 className="text-2xl font-bold my-4">
          Kategoriya bo‘yicha mahsulotlar
        </h1>

        <div className="grid grid-cols-3 gap-4">
          {productsData?.items?.map((item) => (
            <Product data={item} key={item.id} />
          ))}
        </div>
      </div>

      <Pagination className="mt-6 font-bold font-mono">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href={`/category/${params.id}?page=${Math.max(
                1,
                page - 1
              )}&limit=${limit}`}
            />
          </PaginationItem>

          {[...Array(totalPages)].map((_, idx) => {
            const pageNum = idx + 1;

            if (pageNum === 1 || pageNum === totalPages || pageNum === page) {
              return (
                <PaginationItem key={pageNum}>
                  <Link
                    className="font-bold"
                    href={`/category/${params.id}?page=${pageNum}&limit=${limit}`}
                  >
                    {pageNum}
                  </Link>
                </PaginationItem>
              );
            }

            return null;
          })}

          <PaginationItem>
            <PaginationNext
              href={`/category/${params.id}?page=${Math.min(
                totalPages,
                page + 1
              )}&limit=${limit}`}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}

export default CategoryPage;
