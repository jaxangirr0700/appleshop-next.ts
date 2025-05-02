import Product from "@/components/Product";
import { useAppSelector } from "@/store/hooks";
import dynamic from "next/dynamic";
import Head from "next/head";
const LikeAlert = dynamic(
  () => import("@/components/hydration.errors/LikeAlert"),
  { ssr: false }
);

function LikesPage() {
  const likeItems = useAppSelector((state) => state.like_product.items);

  return (
    <div className="max-w-[1440px] m-auto">
      <Head>
        <title>LikedPage</title>
        <meta content={likeItems[0]?.name} name="description" />
      </Head>
      <LikeAlert likeItems={likeItems} />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full p-4 mt-3 items-center justify-around">
        {likeItems.map((i) => (
          <Product data={i} key={i.id} />
        ))}
      </div>
    </div>
  );
}

export default LikesPage;
