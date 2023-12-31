import ModalTemplate from "../components/Modal/ModalTemplate";
import { useState } from "react";

const useModal = () => {
  const [isVisible, setIsVisible] = useState(false);
  const openModal = () => {
    setIsVisible(true);
  };
  const closeModal = () => {
    setIsVisible(false);
  };
  return { ModalTemplate, isVisible, closeModal, openModal };
};

export default useModal;
