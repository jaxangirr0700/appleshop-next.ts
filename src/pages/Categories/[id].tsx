import Categories from "@/components/Categories";
import Navbar from "@/components/Navbar";

function CategoriesPage() {
  return (
    <div className="max-w-[1440px] m-auto">
      <Navbar />
      <h1 className="text-2xl font-bold">Category Details</h1>
      <Categories />
    </div>
  );
}

export default CategoriesPage;
