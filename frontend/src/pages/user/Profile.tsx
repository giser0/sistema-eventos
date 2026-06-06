import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import UserLayout from "../../layouts/UserLayout";

function Profile() {

  const navigate = useNavigate();

  const [editMode, setEditMode] =
    useState(false);

  const [user, setUser] =
    useState<any>(null);

  const [form, setForm] =
    useState({

      nombre: "",

      email: "",

      telefono: "",

      password: "",

      confirmPassword: "",

    });

  const token =
    localStorage.getItem("token");

  // 🔥 CARGAR PERFIL
  useEffect(() => {

    fetch(
      "http://localhost:3000/usuarios/perfil",
      {

        headers: {
          Authorization:
            `Bearer ${token}`,
        },

      }
    )

      .then(res => res.json())

      .then(data => {

        setUser(data);

        setForm({

          nombre:
            data.nombre || "",

          email:
            data.email || "",

          telefono:
            data.telefono || "",

          password: "",

          confirmPassword: "",

        });

      });

  }, []);

  // 🔥 CAMBIAR INPUTS
  const handleChange =
    (
      e: React.ChangeEvent<HTMLInputElement>
    ) => {

      setForm({

        ...form,

        [e.target.name]:
          e.target.value,

      });

    };

  // 💾 GUARDAR PERFIL
  const handleSave =
    async () => {

      try {

        // 🔥 actualizar perfil
        const response = await fetch(
          "http://localhost:3000/usuarios/perfil",
          {

            method: "PATCH",

            headers: {

              "Content-Type":
                "application/json",

              Authorization:
                `Bearer ${token}`,

            },

            body: JSON.stringify({

              nombre:
                form.nombre,

              email:
                form.email,

              telefono:
                form.telefono,

            }),

          }
        );

        const updatedUser =
          await response.json();

        // 🔥 cambiar password
        if (form.password) {

          if (
            form.password !==
            form.confirmPassword
          ) {

            alert(
              "Las contraseñas no coinciden"
            );

            return;

          }

          const passwordResponse =
            await fetch(
              "http://localhost:3000/usuarios/cambiar-password",
              {

                method: "PATCH",

                headers: {

                  "Content-Type":
                    "application/json",

                  Authorization:
                    `Bearer ${token}`,

                },

                body: JSON.stringify({

                  password:
                    form.password,

                }),

              }
            );

          // 🔥 si falla password
          if (!passwordResponse.ok) {

            const error =
              await passwordResponse.json();

            console.log(error);

            alert(
              error.message ||
              "Error al cambiar contraseña"
            );

            return;

          }

        }

        // 🔥 actualizar localStorage
        const localUser =
          JSON.parse(
            localStorage.getItem("user") || "{}"
          );

        const nuevoUsuario = {

          ...localUser,

          nombre: updatedUser.nombre,

          email: updatedUser.email,

          telefono: updatedUser.telefono,

        };

        localStorage.setItem(
          "user",
          JSON.stringify(nuevoUsuario)
        );

        // 🔥 actualizar estado visual
        setUser(nuevoUsuario);

        alert(
          "Perfil actualizado correctamente"
        );

        // 🔥 cerrar sesión
        localStorage.removeItem("token");

        localStorage.removeItem("user");

        navigate("/login");

      } catch (error) {

        console.log(error);

        alert(
          "Error al actualizar perfil"
        );

      }

    };

  if (!user) {

    return (

      <UserLayout>

        <div
          className="
          text-center
          py-20
          text-slate-500
        "
        >
          Cargando...
        </div>

      </UserLayout>

    );

  }

  return (

    <UserLayout>

      <div
        className="
        max-w-5xl
        mx-auto
        space-y-8
      "
      >

        {/* HEADER */}

        <div
          className="
          bg-gradient-to-r
          from-slate-900
          via-slate-800
          to-slate-900
          rounded-3xl
          p-8
          shadow-xl
          text-white
          flex
          flex-col
          md:flex-row
          items-center
          justify-between
          gap-6
        "
        >

          <div
            className="
            flex
            items-center
            gap-5
          "
          >

            {/* FOTO */}

            <div
              className="
              w-28
              h-28
              rounded-full
              bg-yellow-400
              text-black
              flex
              items-center
              justify-center
              text-4xl
              font-bold
              shadow-lg
            "
            >
              {
                user.nombre
                  ?.charAt(0)
                  ?.toUpperCase()
              }
            </div>

            <div>

              <h1
                className="
                text-3xl
                font-bold
              "
              >
                {user.nombre}
              </h1>

              <p
                className="
                text-slate-300
                mt-1
              "
              >
                {user.email}
              </p>

              <div
                className="
                mt-4
                flex
                gap-3
                flex-wrap
              "
              >

                <span
                  className="
                  bg-yellow-400
                  text-black
                  px-4
                  py-2
                  rounded-full
                  font-semibold
                  text-sm
                "
                >
                  {user.rol}
                </span>

              </div>

            </div>

          </div>

          {/* BOTON */}

          {!editMode ? (

            <button
              onClick={() =>
                setEditMode(true)
              }
              className="
              bg-white
              text-slate-900
              px-6
              py-3
              rounded-2xl
              font-semibold
              hover:bg-slate-200
              transition
            "
            >
              Editar Perfil
            </button>

          ) : (

            <div
              className="
              flex
              gap-3
            "
            >

              <button
                onClick={handleSave}
                className="
                bg-green-500
                hover:bg-green-600
                text-white
                px-6
                py-3
                rounded-2xl
                font-semibold
                transition
              "
              >
                Guardar
              </button>

              <button
                onClick={() =>
                  setEditMode(false)
                }
                className="
                bg-red-500
                hover:bg-red-600
                text-white
                px-6
                py-3
                rounded-2xl
                font-semibold
                transition
              "
              >
                Cancelar
              </button>

            </div>

          )}

        </div>

        {/* FORMULARIO */}

        <div
          className="
          bg-white
          rounded-3xl
          shadow-md
          border
          p-8
        "
        >

          <h2
            className="
            text-2xl
            font-bold
            text-slate-800
            mb-8
          "
          >
            Información Personal
          </h2>

          <div
            className="
            grid
            grid-cols-1
            md:grid-cols-2
            gap-6
          "
          >

            <Input
              label="Nombre"
              name="nombre"
              value={form.nombre}
              disabled={!editMode}
              onChange={handleChange}
            />

            <Input
              label="Correo"
              name="email"
              value={form.email}
              disabled={!editMode}
              onChange={handleChange}
            />

            <Input
              label="Teléfono"
              name="telefono"
              value={form.telefono}
              disabled={!editMode}
              onChange={handleChange}
            />

            <Input
              label="Rol"
              value={user.rol}
              disabled
            />

          </div>

          {/* PASSWORD */}

          {editMode && (

            <div
              className="
              mt-10
              border-t
              pt-8
            "
            >

              <h3
                className="
                text-xl
                font-bold
                mb-6
                text-slate-800
              "
              >
                Cambiar Contraseña
              </h3>

              <div
                className="
                grid
                grid-cols-1
                md:grid-cols-2
                gap-6
              "
              >

                <Input
                  label="Nueva contraseña"
                  name="password"
                  type="password"
                  value={form.password}
                  onChange={handleChange}
                />

                <Input
                  label="Confirmar contraseña"
                  name="confirmPassword"
                  type="password"
                  value={form.confirmPassword}
                  onChange={handleChange}
                />

              </div>

            </div>

          )}

        </div>

      </div>

    </UserLayout>

  );

}

interface InputProps {

  label: string;

  name?: string;

  value?: string;

  disabled?: boolean;

  onChange?: (
    e: React.ChangeEvent<HTMLInputElement>
  ) => void;

  type?: string;

}

function Input({

  label,

  name,

  value,

  disabled,

  onChange,

  type = "text",

}: InputProps) {

  return (

    <div
      className="
      flex
      flex-col
      gap-2
    "
    >

      <label
        className="
        text-sm
        font-semibold
        text-slate-600
      "
      >
        {label}
      </label>

      <input
        name={name}
        value={value}
        type={type}
        disabled={disabled}
        onChange={onChange}
        className={`
          border
          rounded-2xl
          px-4
          py-3
          outline-none
          transition

          ${
            disabled

              ? "bg-slate-100 text-slate-500"

              : `
                bg-white
                focus:ring-2
                focus:ring-yellow-400
                focus:border-yellow-400
              `
          }
        `}
      />

    </div>

  );

}

export default Profile;