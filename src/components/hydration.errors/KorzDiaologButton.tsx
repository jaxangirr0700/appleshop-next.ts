import React from "react";
import { Button } from "../ui/button";
import { ShoppingCart } from "lucide-react";
import { ProductType } from "@/types";

function KorzDiaologButton({
  setOpen,
  products,
}: {
  setOpen: () => void;
  products: ProductType[];
}) {
  return (
    <Button variant="outline" className="relative" onClick={() => setOpen()}>
      {products.length > 0 && (
        <span className="absolute top-[-15px] right-[-15px] bg-slate-800 text-white text-xl px-2 py-1 font-mono rounded-full">
          {products.length}
        </span>
      )}
      <ShoppingCart />
    </Button>
  );
}

export default KorzDiaologButton;
