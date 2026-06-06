import type { ReactNode } from "react";
import Sidebar from "../components/Sidebar";

interface Props {
  children: ReactNode;
}

function AdminLayout({ children }: Props) {

  return (

    <div className="min-h-screen bg-slate-100 flex">

      {/* SIDEBAR */}
      <div className="hidden md:flex">
        <Sidebar />
      </div>

      {/* CONTENIDO */}
      <main
        className="
          flex-1
          overflow-y-auto
          p-4
          md:p-8
        "
      >

        {/* CONTENEDOR CENTRAL */}
        <div
          className="
            max-w-7xl
            mx-auto
          "
        >

          {children}

        </div>

      </main>

    </div>

  );

}

export default AdminLayout;