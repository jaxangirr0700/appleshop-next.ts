import { useAppSelector } from "@/store/hooks";
import { DataType, ProductType } from "@/types";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import Loading from "./Loading";
import Product from "./Product";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "./ui/pagination";

function Products() {
  const search = useAppSelector((state) => state.product.search);

  const [data, setData] = useState<DataType | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setLoading(true);
    axios
      .get(
        `https://nt.softly.uz/api/front/products?search=${search}&page=${1}&limit=${10}`
      )
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [search]);

  return (
    <>
      {loading && <Loading />}

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
        {data?.items.map((item: ProductType) => (
          <Product key={item.id} data={item} />
        ))}
      </div>
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious href="#" />
          </PaginationItem>
          <PaginationItem>
            <Link href="#">1</Link>
          </PaginationItem>
          <PaginationItem>
            <Link href="#">2</Link>
          </PaginationItem>
          <PaginationItem>
            <Link href="#">3</Link>
          </PaginationItem>
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
          <PaginationItem>
            <PaginationNext href="#" />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </>
  );
}

export default Products;
