import type { ReactNode } from "react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
}

function Modal({
  isOpen,
  onClose,
  title,
  children,
}: Props) {

  if (!isOpen) return null;

  return (

    <div
      className="
        fixed
        inset-0
        bg-black/50
        flex
        items-center
        justify-center
        z-50
        p-4
      "
    >

      <div
        className="
          bg-white
          w-full
          max-w-lg
          rounded-2xl
          shadow-2xl
          p-6
          animate-fadeIn
        "
      >

        <div className="flex justify-between items-center mb-6">

          <h2 className="text-2xl font-bold text-slate-800">
            {title}
          </h2>

          <button
            onClick={onClose}
            className="
              text-slate-500
              hover:text-red-500
              text-xl
            "
          >
            ✕
          </button>

        </div>

        {children}

      </div>

    </div>

  );

}

export default Modal;