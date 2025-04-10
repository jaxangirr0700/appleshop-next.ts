import { Button } from "antd";
import React from "react";

function ModalButton({
  children,
  showModal,
}: {
  showModal: () => void;
  children: React.ReactNode;
}) {
  return (
    <Button
      type="text"
      style={{ width: 100, height: 50 }}
      onClick={showModal}
      className="flex flex-col items-center"
    >
      {children}
    </Button>
  );
}
{
}

export default ModalButton;
