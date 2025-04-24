import { CategoriesType } from "@/types";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

function Categories() {
  const [categories, setCategories] = useState<CategoriesType[] | []>([]);

  useEffect(() => {
    axios
      .get(`https://nt.softly.uz/api/front/categories`)
      .then((res) => {
        setCategories(res.data);
      })
      .catch((er) => {
        console.log(er);
      });
  }, []);

  return (
    <div>
      <ul className="flex items-center flex-wrap gap-2 justify-between py-4">
        {categories.map((category) => (
          <Link
            href={`/category/${category.id}?page=1&limit=5`}
            key={category.id}
            className="cursor-pointer"
          >
            <div className="font-bold text-xl hover:scale-105 border border-gray-300 px-2 py-2 rounded-xl transition-all 0.5s">
              <span>{category.name}</span>
            </div>
          </Link>
        ))}
      </ul>
    </div>
  );
}

export default Categories;
