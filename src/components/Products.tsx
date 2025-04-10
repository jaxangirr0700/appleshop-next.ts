import { ShoppingCartOutlined } from "@ant-design/icons";
import { Card } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import Image from "next/image";
import Loading from "./Loading";
import { DataType } from "@/types";
import Link from "next/link";

function Products() {
  const [data, setData] = useState<DataType | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    axios
      .get(`https://nt.softly.uz/api/front/products`)
      .then((res) => {
        setData(res.data);
      })
      .catch((er) => {
        console.error(er);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <>
      {loading && <Loading />}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full p-4 mt-3">
        {data?.items.map((p) => (
          <div
            key={p.id}
            className="max-w-sm  rounded-xl  hover:scale-105 transition-all 0.5s relative"
          >
            <Card
              hoverable
              cover={
                <Link href={`/product/${p.id}`}>
                  <Image
                    width={100}
                    height={300}
                    alt={p.name}
                    src={p.imageUrl}
                    className="object-bottom  h-60 w-full"
                  />
                </Link>
              }
            >
              <Card.Meta
                title={p.name}
                description={
                  <>
                    <p>{p.description}</p>
                    <p className="text-lg font-bold">${p.price}</p>
                    <p className="text-gray-800">Stock: {p.stock}</p>
                    <button>Stavatcha</button>
                  </>
                }
              />
            </Card>
            <div className=" absolute right-5 bottom-6">
              <ShoppingCartOutlined
                style={{ width: 40, fontSize: 28 }}
                className="cursor-pointer"
              />
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default Products;
