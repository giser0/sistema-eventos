import type { ReactNode } from "react";
import UserSidebar from "../components/UserSidebar";

interface Props {
  children: ReactNode;
}

function UserLayout({ children }: Props) {

  return (

    <div className="min-h-screen bg-slate-100 flex">

      {/* SIDEBAR */}
      <div className="hidden md:flex">
        <UserSidebar />
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

export default UserLayout;