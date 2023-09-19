import { ReactElement, useEffect } from "react";
import { createPortal } from "react-dom";

interface ModalTemplateProps {
  closeModal: Function;
  timeout?: number;
  children?: ReactElement | ReactElement[];
}

const ModalTemplate = ({
  closeModal,
  timeout,
  children,
}: ModalTemplateProps) => {
  //Block scroll while modal is visible
  useEffect(() => {
    document.body.classList.add("overflow-hidden");
    let timeoutClose: number;
    if (timeout) timeoutClose = setTimeout(closeModal, timeout);

    return () => {
      document.body.classList.remove("overflow-hidden");
      if (timeoutClose) clearTimeout(timeoutClose);
    };
  }, []);
  return createPortal(
    // modal overlay
    <div
      className=" absolute left-0 top-0 z-20 h-full w-full bg-[rgba(0,0,0,0.6)]"
      onClick={(e) => {
        if (e.currentTarget === e.target) closeModal();
      }}
    >
      {/* modal container */}
      <div
        style={{ top: `${window.scrollY + window.innerHeight / 4}px` }}
        className=" absolute  left-1/2 z-20  w-11/12 -translate-x-1/2 rounded-xl bg-neutral-200 p-10  text-cyan-700 dark:bg-neutral-600 dark:text-cyan-200 md:max-w-sm lg:max-w-md"
      >
        <button
          className="absolute right-2 top-2 duration-500 hover:scale-125"
          onClick={() => closeModal()}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="h-6 w-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        {children}
      </div>
    </div>,
    document.body,
  );
};

export default ModalTemplate;
