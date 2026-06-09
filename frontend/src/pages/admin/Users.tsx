import {
  useEffect,
  useState
} from "react";

import AdminLayout
  from "../../layouts/AdminLayout";

import Modal
  from "../../components/Modal";

import {

  obtenerUsuarios,

  crearUsuario,

  eliminarUsuario,

  editarUsuario

}
  from "../../services/userService";

function Users() {

  const [usuarios, setUsuarios] =
    useState<any[]>([]);

  const [nombre, setNombre] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [rol, setRol] =
    useState("cliente");

  // MODAL EDITAR
  const [openModal, setOpenModal] =
    useState(false);

  const [usuarioEditando,
    setUsuarioEditando] =
    useState<any>(null);

  useEffect(() => {

    cargarUsuarios();

  }, []);

  const cargarUsuarios = async () => {

    try {

      const data =
        await obtenerUsuarios();

      setUsuarios(data);

    } catch (error) {

      console.log(error);

    }

  };

  const handleCrearUsuario =
    async (
      e: React.FormEvent
    ) => {

      e.preventDefault();

      try {

        await crearUsuario({

          nombre,
          email,
          password,
          rol,

        });

        alert(
          "Usuario creado"
        );

        setNombre("");
        setEmail("");
        setPassword("");
        setRol("cliente");

        cargarUsuarios();

      } catch (error) {

        console.log(error);

      }

    };

  const handleEliminarUsuario =
    async (id: number) => {

      const confirmar =
        window.confirm(
          "¿Desactivar usuario?"
        );

      if (!confirmar) return;

      try {

        await eliminarUsuario(id);

        cargarUsuarios();

      } catch (error) {

        console.log(error);

      }

    };

  const abrirModalEditar =
    (usuario: any) => {

      setUsuarioEditando(usuario);

      setOpenModal(true);

    };

  const guardarEdicion =
    async () => {

      try {

        await editarUsuario(
          usuarioEditando.id_usuario,
          {
            nombre:
              usuarioEditando.nombre,

            email:
              usuarioEditando.email,

            rol:
              usuarioEditando.rol,
          }
        );

        alert(
          "Usuario actualizado"
        );

        setOpenModal(false);

        cargarUsuarios();

      } catch (error) {

        console.log(error);

      }

    };

  return (

    <AdminLayout>

      <div className="space-y-8">

        {/* HEADER */}

        <div
          className="
            bg-gradient-to-r
            from-slate-900
            to-slate-800
            p-8
            rounded-3xl
            text-white
            shadow-xl
          "
        >

          <h1 className="text-3xl font-bold">
            Gestión de Usuarios
          </h1>

          <p className="text-slate-300 mt-2">
            Administra clientes y administradores
          </p>

        </div>

        {/* FORMULARIO */}

        <div
          className="
            bg-white
            rounded-3xl
            shadow-lg
            border
            border-slate-200
            p-8
          "
        >

          <h2
            className="
              text-2xl
              font-bold
              text-slate-800
              mb-6
            "
          >
            Nuevo Usuario
          </h2>

          <form
            onSubmit={handleCrearUsuario}
            className="
              grid
              grid-cols-1
              md:grid-cols-2
              xl:grid-cols-4
              gap-5
            "
          >

            <input
              type="text"
              placeholder="Nombre"
              value={nombre}
              onChange={(e) =>
                setNombre(e.target.value)
              }
              className="
                border
                border-slate-300
                rounded-xl
                px-4
                py-3
                focus:outline-none
                focus:ring-2
                focus:ring-yellow-400
              "
            />

            <input
              type="email"
              placeholder="Correo"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              className="
                border
                border-slate-300
                rounded-xl
                px-4
                py-3
                focus:outline-none
                focus:ring-2
                focus:ring-yellow-400
              "
            />

            <input
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              className="
                border
                border-slate-300
                rounded-xl
                px-4
                py-3
                focus:outline-none
                focus:ring-2
                focus:ring-yellow-400
              "
            />

            <select
              value={rol}
              onChange={(e) =>
                setRol(e.target.value)
              }
              className="
                border
                border-slate-300
                rounded-xl
                px-4
                py-3
                focus:outline-none
                focus:ring-2
                focus:ring-yellow-400
              "
            >

              <option value="cliente">
                Cliente
              </option>

              <option value="admin">
                Admin
              </option>

            </select>

            <button
              type="submit"
              className="
                md:col-span-2
                xl:col-span-4
                bg-slate-900
                hover:bg-slate-800
                text-white
                py-3
                rounded-xl
                font-semibold
                transition
              "
            >
              Crear Usuario
            </button>

          </form>

        </div>

        {/* TABLA */}

        <div
          className="
            bg-white
            rounded-3xl
            shadow-lg
            border
            border-slate-200
            overflow-hidden
          "
        >

          <div className="overflow-x-auto">

            <table className="w-full">

              <thead
                className="
                  bg-slate-100
                  text-slate-700
                "
              >

                <tr>

                  <th className="p-4 text-left">
                    ID
                  </th>

                  <th className="p-4 text-left">
                    Nombre
                  </th>

                  <th className="p-4 text-left">
                    Email
                  </th>

                  <th className="p-4 text-left">
                    Rol
                  </th>

                  <th className="p-4 text-left">
                    Acciones
                  </th>

                </tr>

              </thead>

              <tbody>

                {usuarios.map((usuario) => (

                  <tr
                    key={usuario.id_usuario}
                    className="
                      border-t
                      hover:bg-slate-50
                      transition
                    "
                  >

                    <td className="p-4">
                      #{usuario.id_usuario}
                    </td>

                    <td className="p-4 font-semibold">
                      {usuario.nombre}
                    </td>

                    <td className="p-4">
                      {usuario.email}
                    </td>

                    <td className="p-4">

                      <span
                        className={`
                          px-3
                          py-1
                          rounded-full
                          text-sm
                          font-semibold
                          ${usuario.rol === "admin"
                            ? "bg-red-100 text-red-700"
                            : "bg-blue-100 text-blue-700"
                          }
                        `}
                      >
                        {usuario.rol}
                      </span>

                    </td>

                    <td className="p-4">

                      <div className="flex gap-3">

                        <button
                          onClick={() =>
                            abrirModalEditar(usuario)
                          }
                          className="
                            bg-blue-600
                            hover:bg-blue-700
                            text-white
                            px-4
                            py-2
                            rounded-lg
                            transition
                          "
                        >
                          Editar
                        </button>

                        <button
                          onClick={() =>
                            handleEliminarUsuario(
                              usuario.id_usuario
                            )
                          }
                          className="
                            bg-red-500
                            hover:bg-red-600
                            text-white
                            px-4
                            py-2
                            rounded-lg
                            transition
                          "
                        >
                          Desactivar
                        </button>

                      </div>

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        </div>

      </div>

      {/* MODAL */}

      <Modal
        isOpen={openModal}
        onClose={() => setOpenModal(false)}
        title="Editar Usuario"
      >

        {usuarioEditando && (

          <div className="space-y-4">

            <input
              type="text"
              value={usuarioEditando.nombre}
              onChange={(e) =>
                setUsuarioEditando({
                  ...usuarioEditando,
                  nombre: e.target.value
                })
              }
              className="
                w-full
                border
                rounded-xl
                px-4
                py-3
              "
            />

            <input
              type="email"
              value={usuarioEditando.email}
              onChange={(e) =>
                setUsuarioEditando({
                  ...usuarioEditando,
                  email: e.target.value
                })
              }
              className="
                w-full
                border
                rounded-xl
                px-4
                py-3
              "
            />

            <select
              value={usuarioEditando.rol}
              onChange={(e) =>
                setUsuarioEditando({
                  ...usuarioEditando,
                  rol: e.target.value
                })
              }
              className="
                w-full
                border
                rounded-xl
                px-4
                py-3
              "
            >

              <option value="cliente">
                Cliente
              </option>

              <option value="admin">
                Admin
              </option>

            </select>

            <button
              onClick={guardarEdicion}
              className="
                w-full
                bg-slate-900
                hover:bg-slate-800
                text-white
                py-3
                rounded-xl
                font-semibold
              "
            >
              Guardar Cambios
            </button>

          </div>

        )}

      </Modal>

    </AdminLayout>

  );

}

export default Users;