import {
  useEffect,
  useState
} from "react";

import AdminLayout
from "../../layouts/AdminLayout";

import {
  localService
} from "../../services/localService";

function Locales() {

  const [locales, setLocales] =
    useState<any[]>([]);

  const [editLocal, setEditLocal] =
    useState<any | null>(null);

  useEffect(() => {

    cargarLocales();

  }, []);

  const cargarLocales =
    async () => {

      const data =
        await localService.getAll();

      setLocales(data);

  };

  const handleSave =
    async () => {

      if (!editLocal) return;

      try {

        await localService.update(

          editLocal.id_local,

          editLocal

        );

        setEditLocal(null);

        cargarLocales();

        alert(
          "Local actualizado"
        );

      } catch (error: any) {

        console.error(error);

        alert(
          "ERROR AL GUARDAR"
        );

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
            rounded-3xl
            p-8
            text-white
            shadow-xl
          "
        >

          <h1
            className="
              text-3xl
              font-bold
            "
          >
            Gestión de Locales
          </h1>

          <p
            className="
              text-slate-300
              mt-2
            "
          >
            Administra la información
            de tus salones y eventos
          </p>

        </div>

        {/* LISTA */}

        <div className="space-y-6">

          {locales.map((local) => (

            <div
              key={local.id_local}
              className="
                bg-white
                rounded-3xl
                overflow-hidden
                shadow-sm
                border
                border-slate-200
                hover:shadow-xl
                transition
                flex
                flex-col
                lg:flex-row
              "
            >

              {/* IMAGEN */}

              <div
                className="
                  lg:w-80
                  h-64
                  bg-gradient-to-r
                  from-yellow-400
                  to-orange-500
                  flex
                  items-center
                  justify-center
                  shrink-0
                "
              >

                <span className="text-7xl">
                  🏛️
                </span>

              </div>

              {/* CONTENIDO */}

              <div
                className="
                  flex-1
                  p-8
                  flex
                  flex-col
                  justify-between
                "
              >

                <div>

                  <div
                    className="
                      flex
                      flex-col
                      md:flex-row
                      md:items-center
                      md:justify-between
                      gap-4
                      mb-6
                    "
                  >

                    <div>

                      <h2
                        className="
                          text-3xl
                          font-bold
                          text-slate-800
                        "
                      >
                        {local.nombre}
                      </h2>

                      <p
                        className="
                          text-slate-500
                          mt-2
                        "
                      >
                        Salón para eventos
                        y celebraciones
                      </p>

                    </div>

                    <span
                      className="
                        bg-emerald-100
                        text-emerald-700
                        text-sm
                        font-semibold
                        px-4
                        py-2
                        rounded-full
                        w-fit
                      "
                    >
                      Disponible
                    </span>

                  </div>

                  <div
                    className="
                      grid
                      grid-cols-1
                      md:grid-cols-3
                      gap-5
                    "
                  >

                    <div
                      className="
                        bg-slate-50
                        rounded-2xl
                        p-5
                      "
                    >

                      <p
                        className="
                          text-slate-400
                          text-sm
                        "
                      >
                        Dirección
                      </p>

                      <h3
                        className="
                          text-slate-800
                          font-semibold
                          mt-2
                        "
                      >
                        {local.direccion}
                      </h3>

                    </div>

                    <div
                      className="
                        bg-slate-50
                        rounded-2xl
                        p-5
                      "
                    >

                      <p
                        className="
                          text-slate-400
                          text-sm
                        "
                      >
                        Teléfono
                      </p>

                      <h3
                        className="
                          text-slate-800
                          font-semibold
                          mt-2
                        "
                      >
                        {local.telefono}
                      </h3>

                    </div>

                    <div
                      className="
                        bg-slate-50
                        rounded-2xl
                        p-5
                      "
                    >

                      <p
                        className="
                          text-slate-400
                          text-sm
                        "
                      >
                        Capacidad
                      </p>

                      <h3
                        className="
                          text-slate-800
                          font-semibold
                          mt-2
                        "
                      >
                        👥 {local.capacidad}
                        personas
                      </h3>

                    </div>

                  </div>

                </div>

                <div
                  className="
                    flex
                    flex-col
                    md:flex-row
                    md:items-center
                    md:justify-between
                    gap-5
                    mt-8
                  "
                >

                  <div>

                    <p
                      className="
                        text-slate-400
                        text-sm
                      "
                    >
                      Precio del salón
                    </p>

                    <h2
                      className="
                        text-4xl
                        font-bold
                        text-yellow-500
                      "
                    >
                      Bs. {local.precio}
                    </h2>

                  </div>

                  <button
                    onClick={() =>
                      setEditLocal({
                        ...local
                      })
                    }
                    className="
                      bg-slate-900
                      hover:bg-slate-800
                      text-white
                      px-8
                      py-4
                      rounded-2xl
                      font-semibold
                      transition
                    "
                  >
                    Editar Local
                  </button>

                </div>

              </div>

            </div>

          ))}

        </div>

        {/* MODAL */}

        {editLocal && (

          <div
            className="
              fixed
              inset-0
              bg-black/50
              backdrop-blur-sm
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
                rounded-3xl
                shadow-2xl
                w-full
                max-w-2xl
                p-8
              "
            >

              <div
                className="
                  flex
                  items-center
                  justify-between
                  mb-8
                "
              >

                <div>

                  <h2
                    className="
                      text-2xl
                      font-bold
                      text-slate-800
                    "
                  >
                    Editar Local
                  </h2>

                  <p
                    className="
                      text-slate-500
                      mt-1
                    "
                  >
                    Actualiza la información
                    del salón
                  </p>

                </div>

                <button
                  onClick={() =>
                    setEditLocal(null)
                  }
                  className="
                    text-slate-400
                    hover:text-slate-700
                    text-2xl
                  "
                >
                  ✕
                </button>

              </div>

              <div
                className="
                  grid
                  grid-cols-1
                  md:grid-cols-2
                  gap-5
                "
              >

                <div>

                  <label className={labelClass}>
                    Nombre
                  </label>

                  <input
                    value={editLocal.nombre}
                    onChange={(e) =>
                      setEditLocal({
                        ...editLocal,
                        nombre:
                          e.target.value
                      })
                    }
                    className={inputClass}
                  />

                </div>

                <div>

                  <label className={labelClass}>
                    Teléfono
                  </label>

                  <input
                    value={editLocal.telefono}
                    onChange={(e) =>
                      setEditLocal({
                        ...editLocal,
                        telefono:
                          e.target.value
                      })
                    }
                    className={inputClass}
                  />

                </div>

                <div className="md:col-span-2">

                  <label className={labelClass}>
                    Dirección
                  </label>

                  <input
                    value={editLocal.direccion}
                    onChange={(e) =>
                      setEditLocal({
                        ...editLocal,
                        direccion:
                          e.target.value
                      })
                    }
                    className={inputClass}
                  />

                </div>

                <div>

                  <label className={labelClass}>
                    Capacidad
                  </label>

                  <input
                    type="number"
                    value={editLocal.capacidad}
                    onChange={(e) =>
                      setEditLocal({
                        ...editLocal,
                        capacidad:
                          Number(
                            e.target.value
                          )
                      })
                    }
                    className={inputClass}
                  />

                </div>

                <div>

                  <label className={labelClass}>
                    Precio
                  </label>

                  <input
                    type="number"
                    value={editLocal.precio}
                    onChange={(e) =>
                      setEditLocal({
                        ...editLocal,
                        precio:
                          Number(
                            e.target.value
                          )
                      })
                    }
                    className={inputClass}
                  />

                </div>

              </div>

              <div
                className="
                  flex
                  justify-end
                  gap-4
                  mt-8
                "
              >

                <button
                  onClick={() =>
                    setEditLocal(null)
                  }
                  className="
                    px-5
                    py-3
                    rounded-xl
                    border
                    border-slate-300
                    text-slate-700
                    hover:bg-slate-100
                    transition
                  "
                >
                  Cancelar
                </button>

                <button
                  onClick={handleSave}
                  className="
                    bg-yellow-400
                    hover:bg-yellow-300
                    text-black
                    font-semibold
                    px-6
                    py-3
                    rounded-xl
                    transition
                  "
                >
                  Guardar Cambios
                </button>

              </div>

            </div>

          </div>

        )}

      </div>

    </AdminLayout>

  );

}

const labelClass =
  `
    block
    text-sm
    font-medium
    text-slate-700
    mb-2
  `;

const inputClass =
  `
    w-full
    border
    border-slate-300
    rounded-xl
    px-4
    py-3
    outline-none
    focus:ring-2
    focus:ring-yellow-400
    focus:border-yellow-400
  `;

export default Locales;