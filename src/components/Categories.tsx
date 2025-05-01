import { CategoriesType } from "@/types";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";

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
      <ul className="flex md:px-20 items-center flex-wrap gap-2 justify-between py-4">
        {categories.map((category) => (
          <Button
            variant={"outline"}
            size={"lg"}
            key={category.id}
            className="text-xl"
          >
            <Link
              href={`/category/${category.id}?page=1&limit=5`}
              className="cursor-pointer"
            >
              <span>{category.name}</span>
            </Link>
          </Button>
        ))}
      </ul>
    </div>
  );
}

export default Categories;
