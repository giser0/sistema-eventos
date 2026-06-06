import type { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

function Table({
  children
}: Props) {

  return (

    <div
      className="
        bg-white
        rounded-2xl
        border
        border-slate-200
        shadow-sm
        overflow-hidden
      "
    >

      <div className="overflow-x-auto">

        <table
          className="
            w-full
            text-sm
          "
        >
          {children}
        </table>

      </div>

    </div>

  );

}

export default Table;