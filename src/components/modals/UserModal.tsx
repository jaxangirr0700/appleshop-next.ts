import { UserOutlined } from "@ant-design/icons";
import { Button, Input } from "antd";
import React, { useState } from "react";
import ModalButton from "./ModalButton";
import CustomModal from "./CustomModal";

function UserModal() {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  return (
    <div>
      <ModalButton showModal={showModal}>
        <UserOutlined className="text-xl" />
        Kirish
      </ModalButton>
      <CustomModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}>
        <p className="text-xl font-bold mb-4">
          Kirish yoki ro{"'"}yxatdan o{"'"}tish
        </p>{" "}
        <label>Telefon</label>
        <div className="flex flex-col gap-3">
          {" "}
          <Input placeholder="+9989" style={{ borderRadius: 30 }} />
          <Button type="primary" color="yellow">
            Kodni olish
          </Button>
        </div>
      </CustomModal>
    </div>
  );
}

export default UserModal;
