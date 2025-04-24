import Product from "@/components/Product";
import { DataType } from "@/types";
import axios from "axios";
import Head from "next/head";
import { useParams, useSearchParams } from "next/navigation";
import React from "react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import Link from "next/link";
import { GetServerSideProps } from "next";

type ServerDataType = {
  data: DataType;
};

export const getServerSideProps: GetServerSideProps<ServerDataType> = async (
  args
) => {
  console.log(args.query);
  const { page, limit, id } = args.query;

  try {
    const resProduct = await axios.get(
      "https://nt.softly.uz/api/front/products",
      {
        params: {
          page: page,
          limit: limit,
          categoryId: id,
        },
      }
    );
    return {
      props: {
        data: resProduct.data,
      },
    };
  } catch (error) {
    console.log("Error", error);
    return {
      props: {
        data: [],
      },
    };
  }
};

function CategoryPage({ data }: { data: DataType }) {
  console.log(data);

  const params = useParams();
  const searchParams = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;
  const limit = parseInt(searchParams.get("limit") || "10", 10);
  const totalPages = Math.ceil(data.totalItems / limit);

  return (
    <div className="max-w-[1440px] m-auto">
      <Head>
        <title>Category Page</title>
        <meta
          content={data?.items?.[0]?.name || "Mahsulotlar"}
          name="description"
        />
      </Head>

      <div>
        <h1 className="text-2xl font-bold my-4">
          Kategoriya bo{"'"}yicha mahsulotlar
        </h1>

        <div className="grid grid-cols-3 gap-4">
          {data?.items?.map((item) => (
            <Product data={item} key={item.id} />
          ))}
        </div>
      </div>

      <Pagination className="mt-6 font-bold font-mono">
        <PaginationContent>
          {page > 1 && (
            <PaginationItem>
              <PaginationPrevious
                href={`/category/${params.id}?page=${page - 1}&limit=${limit}`}
                aria-disabled={page === 1}
              />
            </PaginationItem>
          )}

          {[...Array(totalPages)].map((_, index) => {
            const num = index + 1;

            if (
              num === 1 ||
              num === page - 1 ||
              num === page ||
              num === page + 1
            ) {
              return (
                <PaginationItem key={num}>
                  <Link
                    className={`font-bold ${
                      page === num ? "text-blue-600 underline" : ""
                    }`}
                    href={`/category/${params.id}?page=${num}&limit=${limit}`}
                  >
                    {num}
                  </Link>
                </PaginationItem>
              );
            }

            return null;
          })}

          {totalPages > 3 && (
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
          )}
          <PaginationItem>
            <Link
              href={`/category/${params.id}?page=${totalPages}&limit=${limit}`}
            >
              {totalPages}
            </Link>
          </PaginationItem>

          {page < totalPages && (
            <PaginationItem>
              <PaginationNext
                href={`/category/${params.id}?page=${Math.min(
                  totalPages,
                  page + 1
                )}&limit=${limit}`}
                aria-disabled={page === totalPages}
              />
            </PaginationItem>
          )}
        </PaginationContent>
      </Pagination>
    </div>
  );
}

export default CategoryPage;
