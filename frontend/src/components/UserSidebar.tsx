import { Link, useNavigate } from "react-router-dom";

function UserSidebar() {

  const navigate = useNavigate();

  const logout = () => {

    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/");
  };

  return (
    <aside className="w-64 bg-slate-950 text-white min-h-screen p-6 border-r border-slate-800">

      <h2 className="text-2xl font-bold text-yellow-400 mb-10">
        Salon imperial (cliente)
      </h2>

      <nav>

        <ul className="space-y-4">

          <li>
            <Link
              to="/user/dashboard"
              className="block p-3 rounded-xl hover:bg-slate-800 transition"
            >
              Panel
            </Link>
          </li>

          <li>
            <Link
              to="/user/new-booking"
              className="block p-3 rounded-xl hover:bg-slate-800 transition"
            >
              Nueva Reserva
            </Link>
          </li>

          <li>
            <Link
              to="/user/my-bookings"
              className="block p-3 rounded-xl hover:bg-slate-800 transition"
            >
              Mis Reservas
            </Link>
          </li>

          <li>
            <Link
              to="/user/profile"
              className="block p-3 rounded-xl hover:bg-slate-800 transition"
            >
              Perfil
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

export default UserSidebar;