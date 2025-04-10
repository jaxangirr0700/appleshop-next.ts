import { Modal } from "antd";

function CustomModal({
  children,
  setIsModalOpen,
  isModalOpen,
}: {
  children: React.ReactNode;
  setIsModalOpen: (isOpen: boolean) => void;
  isModalOpen: boolean;
}) {
  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <Modal open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
      {children}
    </Modal>
  );
}

export default CustomModal;
