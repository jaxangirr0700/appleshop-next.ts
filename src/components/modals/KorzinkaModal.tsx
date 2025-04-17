import React, { useState } from "react";
import ModalButton from "./ModalButton";
import CustomModal from "./CustomModal";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import Image from "next/image";
import {
  decrementQty,
  deleteCart,
  incrementQty,
} from "@/store/slices/cart.slice";

function KorzinkaModal() {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const products = useAppSelector((state) => state.product.items);
  const dispatch = useAppDispatch();
  const showModal = () => {
    setIsModalOpen(true);
  };

  return (
    <div>
      <ModalButton showModal={showModal}>
        <ShoppingCartOutlined className="text-xl" />
        Savatcha
        {products.length > 0 && (
          <span className=" absolute top-[-10px] right-[-5px] bg-slate-800 text-white text-xl px-2 py-1 font-mono rounded-full">
            {products?.length}
          </span>
        )}
      </ModalButton>
      <CustomModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}>
        <p className="text-2xl font-bold mb-4">Savatcha</p>

        {products.length === 0 ? (
          <p className="text-gray-500">Savatchangiz bo‘sh</p>
        ) : (
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
        )}
      </CustomModal>
    </div>
  );
}

export default KorzinkaModal;
