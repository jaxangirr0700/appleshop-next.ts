import Product from "@/components/Product";
import { DataType } from "@/types";
import axios from "axios";
import Head from "next/head";
import { useParams, useSearchParams } from "next/navigation";

import PaginationComponent from "@/components/PaginationComponent";
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
  const params = useParams();
  const searchParams = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;
  const limit = parseInt(searchParams.get("limit") || "10", 10);
  const totalPages = Math.ceil(data?.totalItems / limit);

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

      <PaginationComponent
        currentPage={page}
        totalPages={totalPages}
        basePath={`/category/${params.id}`} 
        limit={limit}
      />
    </div>
  );
}

export default CategoryPage;
