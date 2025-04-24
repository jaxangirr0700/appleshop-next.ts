import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import Image from "next/image";
import {
  decrementQty,
  deleteCart,
  incrementQty,
} from "@/store/slices/cart.slice";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { ShoppingCart } from "lucide-react";

function KorzinkaModal() {
  const [open, setOpen] = useState<boolean>(false);
  const products = useAppSelector((state) => state.product.items);
  const dispatch = useAppDispatch();

  return (
    <div>
      <Button
        className="relative "
        variant={"outline"}
        onClick={() => {
          setOpen(true);
        }}
      >
        {products.length > 0 && (
          <span className=" absolute top-[-15px] right-[-15px] bg-slate-800 text-white text-xl px-2 py-1 font-mono rounded-full">
            {products?.length}
          </span>
        )}
        <ShoppingCart />{" "}
      </Button>
      <Dialog
        open={open}
        onOpenChange={(open) => {
          setOpen(open);
        }}
      >
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Savatcha</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            {products.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-4 border px-1 py-1 rounded-xl border-slate-300  hover:scale-105 transition-all 0.5s"
              >
                <Image
                  src={item.imageUrl}
                  alt={item.name}
                  width={60}
                  height={60}
                  className="rounded object-cover"
                />
                <div className="flex-1">
                  <p className="font-semibold">{item.name}</p>
                  <p className="text-sm text-gray-600">{item.description}</p>
                  <p className="font-bold text-blue-600">
                    {(item.price * item.quantity).toLocaleString()} $
                  </p>
                  <div className="flex items-center gap-2 mt-2">
                    <button
                      onClick={() => dispatch(decrementQty(item.id))}
                      className="bg-gray-200 px-2 rounded"
                    >
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      onClick={() => dispatch(incrementQty(item.id))}
                      className="bg-gray-200 px-2 rounded"
                    >
                      +
                    </button>
                  </div>
                </div>{" "}
                <button
                  onClick={() => dispatch(deleteCart(item.id))}
                  className="bg-gray-100 px-2 rounded border border-red-400  py-1 "
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default KorzinkaModal;
