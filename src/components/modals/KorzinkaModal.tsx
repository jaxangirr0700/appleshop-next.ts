import React, { useState } from "react";
import ModalButton from "./ModalButton";
import CustomModal from "./CustomModal";
import { ShoppingCartOutlined } from "@ant-design/icons";

function KorzinkaModal() {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  return (
    <div>
      <ModalButton showModal={showModal}>
        <ShoppingCartOutlined className="text-xl" />
        Savatcha
      </ModalButton>
      <CustomModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}>
        <p className="text-2xl font-bold">Savatcha</p>
      </CustomModal>
    </div>
  );
}

export default KorzinkaModal;
