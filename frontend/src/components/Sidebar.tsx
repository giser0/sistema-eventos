import { Link } from "react-router-dom";
import { logoutUser } from "../services/authService";

function Sidebar() {

  const logout = async () => {

    try {
      await logoutUser();
    } catch (error) {
      console.log(error);
    }

    localStorage.removeItem("token");
    localStorage.removeItem("user");

    window.location.href = "/";
  };

  return (
    <aside className="w-64 bg-slate-950 text-white min-h-screen p-6 border-r border-slate-800">

      <h2 className="text-2xl font-bold text-yellow-400 mb-10">
        Salon imperial (Admin)
      </h2>

      <nav>
        <ul className="space-y-4">

          <li>
            <Link
              to="/admin/dashboard"
              className="block p-3 rounded-xl hover:bg-slate-800 transition"
            >
              Panel
            </Link>
          </li>

          <li>
            <Link
              to="/admin/reservations"
              className="block p-3 rounded-xl hover:bg-slate-800 transition"
            >
              Reservas
            </Link>
          </li>

          <li>
            <Link
              to="/admin/new-reservation"
              className="block p-3 rounded-xl hover:bg-slate-800 transition"
            >
              Nueva Reserva
            </Link>
          </li>

          <li>
            <Link
              to="/admin/users"
              className="block p-3 rounded-xl hover:bg-slate-800 transition"
            >
              Usuarios
            </Link>
          </li>

          <li>
            <Link
              to="/admin/pagos"
              className="block p-3 rounded-xl hover:bg-slate-800 transition"
            >
              Pagos
            </Link>
          </li>

          <li>
            <Link
              to="/admin/logs"
              className="block p-3 rounded-xl hover:bg-slate-800 transition"
            >
              Logs Acceso
            </Link>
          </li>

          <li>
            <Link
              to="/admin/locales"
              className="block p-3 rounded-xl hover:bg-slate-800 transition"
            >
              Configuración Local
            </Link>
          </li>

        </ul>
      </nav>

      <button
        onClick={logout}
        className="mt-10 w-full bg-red-600 hover:bg-red-700 py-3 rounded-xl font-semibold transition"
      >
        Cerrar sesión
      </button>

    </aside>
  );
}

export default Sidebar;