import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Categories from "@/components/Categories";
import { CategoriesType } from "@/types";
import Loading from "@/components/Loading";
import Navbar from "@/components/Navbar";

function CategoriesPage() {
  const { id } = useParams();
  const [categoryData, setCategoryData] = useState<CategoriesType>();

  useEffect(() => {
    if (id) {
      axios
        .get(`https://nt.softly.uz/api/front/categories/${id}`)
        .then((res) => {
          setCategoryData(res.data);
          console.log(res.data);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, [id]);

  return (
    <div className="max-w-[1440px] m-auto">
      <Navbar />
      <h1 className="text-2xl font-bold">Category Details</h1>
      <Categories />

      {categoryData ? (
        <div>
          <h2>{categoryData?.name}</h2>
          <p>{categoryData?.description}</p>
        </div>
      ) : (
        <p>
          <Loading />
        </p>
      )}
    </div>
  );
}

export default CategoriesPage;
