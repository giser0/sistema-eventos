import type { ReactNode } from "react";

interface Props {
  children: ReactNode;
  onClick?: () => void;
  color?: "blue" | "green" | "red" | "yellow";
  type?: "button" | "submit";
}

function ActionButton({
  children,
  onClick,
  color = "blue",
  type = "button"
}: Props) {

  const colors = {
    blue: "bg-blue-600 hover:bg-blue-700",
    green: "bg-green-600 hover:bg-green-700",
    red: "bg-red-600 hover:bg-red-700",
    yellow: "bg-yellow-400 hover:bg-yellow-300 text-black"
  };

  return (

    <button
      type={type}
      onClick={onClick}
      className={`
        px-4
        py-2
        rounded-xl
        text-white
        font-medium
        transition
        ${colors[color]}
      `}
    >
      {children}
    </button>

  );

}

export default ActionButton;