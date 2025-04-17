import React from "react";

interface ModalProps {
  data: React.ReactNode;
}
const Modal: React.FC<ModalProps> = ({ data }) => {
  return (
    <div className="absolute bg-black/70 inset-0 z-[9999] h-full w-full">{data}</div>
  );
};

export default Modal;
