import Product from "@/components/Product";
import { useAppSelector } from "@/store/hooks";
import Head from "next/head";
import React from "react";

function LikesPage() {
  const likeItems = useAppSelector((state) => state.like_product.items);
  console.log(likeItems);

  return (
    <div className="max-w-[1440px] m-auto">
      <Head>
        <title>LikedPage</title>
        <meta content={likeItems[0]?.name} name="description" />
      </Head>
      {likeItems.length === 0 ? (
        <p className="text-2xl font-bold ">
          Hozirda sizda sevimli mahsulotlar yo{"'"}q.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full p-4 mt-3 items-center justify-around">
          {likeItems.map((i) => (
            <Product data={i} key={i.id} />
          ))}
        </div>
      )}
    </div>
  );
}

export default LikesPage;
