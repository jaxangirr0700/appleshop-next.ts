import axios from "axios";
import { useEffect, useState } from "react";
import Loading from "./Loading";
import { DataType, ProductType } from "@/types";
import Product from "./Product";
import { useAppSelector } from "@/store/hooks";

function Products() {
  const [data, setData] = useState<DataType | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const search = useAppSelector((state) => state.product.search);

  useEffect(() => {
    axios
      .get(
        `https://nt.softly.uz/api/front/products?search=${search}&page=1&limit=10`
      )
      .then((res) => {
        setData(res.data);
      })
      .catch((er) => {
        console.error(er);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [search]);

  return (
    <>
      {loading && <Loading />}

      <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
        {data?.items.map((item: ProductType) => (
          <Product key={item.id} data={item} />
        ))}
        
      </ul>
    </>
  );
}

export default Products;
