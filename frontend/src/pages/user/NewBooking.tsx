import { useEffect, useState } from "react";

import UserLayout from "../../layouts/UserLayout";

import {
  crearReserva
} from "../../services/reservationService";

import {
  obtenerServicios
} from "../../services/serviceExtraService";

import {
  localService
} from "../../services/localService";

import api from "../../services/api";

function NewBooking() {

  const user = JSON.parse(
    localStorage.getItem("user") || "{}"
  );

  const [precioLocal, setPrecioLocal] =
    useState(0);

  const [total, setTotal] =
    useState(0);

  const [tipoEvento, setTipoEvento] =
    useState("");

  const [fechaEvento, setFechaEvento] =
    useState("");

  const [horaEvento, setHoraEvento] =
    useState("");

  const [cantidadPersonas,
    setCantidadPersonas] =
    useState("");

  const [servicios, setServicios] =
    useState<any[]>([]);

  const [seleccionados,
    setSeleccionados] =
    useState<number[]>([]);

  // 🔥 cargar local
  useEffect(() => {

    localService
      .getById(1)
      .then(local => {

        const precio =
          Number(local.precio);

        setPrecioLocal(precio);

        setTotal(precio);

      });

  }, []);

  // 🔥 cargar servicios
  useEffect(() => {

    obtenerServicios()
      .then(setServicios);

  }, []);

  // 🔥 recalcular total
  useEffect(() => {

    let nuevoTotal =
      precioLocal;

    servicios.forEach(s => {

      if (
        seleccionados.includes(
          s.id_servicio
        )
      ) {

        nuevoTotal +=
          Number(s.precio);

      }

    });

    setTotal(nuevoTotal);

  }, [
    seleccionados,
    servicios,
    precioLocal
  ]);

  // 🔥 crear reserva
  const handleSubmit =
    async (
      e: React.FormEvent
    ) => {

      e.preventDefault();

      if (
  !tipoEvento ||
  !fechaEvento ||
  !cantidadPersonas
) {

        alert(
          "Completa todos los campos"
        );

        return;

      }

      try {

        const res =
  await crearReserva({

    id_usuario: user.id,

    id_local: 1,

    creado_por: user.id,

    fecha_evento: fechaEvento,

    hora_evento: horaEvento, // 🔥 AGREGAR ESTO

    tipo_evento: tipoEvento,

    cantidad_personas: Number(
      cantidadPersonas
    ),

    total_pago: total,

    estado: "pendiente"

  });

        // 🔥 guardar servicios
        for (
          const id_servicio
          of seleccionados
        ) {

          await api.post(
            "/reserva-servicio",
            {

              reserva: {
                id_reserva:
                  res.id_reserva
              },

              servicio: {
                id_servicio
              }

            }
          );

        }

        alert(
          "Reserva creada correctamente"
        );

        // limpiar
        setTipoEvento("");
        setFechaEvento("");
        setHoraEvento("");
        setCantidadPersonas("");
        setSeleccionados([]);
        setTotal(precioLocal);

      } catch (error: any) {

  console.log(error);

  alert(

    error?.response?.data?.message ||

    "Error al crear reserva"

  );

}
  };

  return (

    <UserLayout>

      <div className="space-y-8">

        {/* HEADER */}

        <div
          className="
          bg-gradient-to-r
          from-slate-900
          via-slate-800
          to-slate-900
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
            mb-2
          "
          >
            Nueva Reserva
          </h1>

          <p
            className="
            text-slate-300
          "
          >
            Reserva tu evento
            de manera rápida
            y sencilla
          </p>

        </div>

        {/* FORM */}

        <form
          onSubmit={handleSubmit}
          className="
          bg-white
          rounded-3xl
          shadow-md
          border
          p-8
          space-y-8
        "
        >

          {/* DATOS */}

          <div>

            <h2
              className="
              text-xl
              font-bold
              mb-5
            "
            >
              Información
              del Evento
            </h2>

            <div
              className="
              grid
              grid-cols-1
              md:grid-cols-2
              gap-5
            "
            >

              <div>

                <label
                  className="
                  block
                  mb-2
                  font-medium
                "
                >
                  Tipo de Evento
                </label>

                <input
                  type="text"
                  placeholder="Ej: Matrimonio"
                  value={tipoEvento}
                  onChange={(e) =>
                    setTipoEvento(
                      e.target.value
                    )
                  }
                  className="
                  w-full
                  border
                  rounded-xl
                  px-4
                  py-3
                  focus:outline-none
                  focus:ring-2
                  focus:ring-yellow-400
                "
                />

              </div>

              <div>

                <label
                  className="
                  block
                  mb-2
                  font-medium
                "
                >
                  Cantidad de Personas
                </label>

                <input
                  type="number"
                  placeholder="100"
                  value={cantidadPersonas}
                  onChange={(e) =>
                    setCantidadPersonas(
                      e.target.value
                    )
                  }
                  className="
                  w-full
                  border
                  rounded-xl
                  px-4
                  py-3
                  focus:outline-none
                  focus:ring-2
                  focus:ring-yellow-400
                "
                />

              </div>

              <div>

                <label
                  className="
                  block
                  mb-2
                  font-medium
                "
                >
                  Fecha
                </label>

                <input
                  type="date"
                  value={fechaEvento}
                  onChange={(e) =>
                    setFechaEvento(
                      e.target.value
                    )
                  }
                  className="
                  w-full
                  border
                  rounded-xl
                  px-4
                  py-3
                  focus:outline-none
                  focus:ring-2
                  focus:ring-yellow-400
                "
                />

              </div>

              <div>

                <label
                  className="
                  block
                  mb-2
                  font-medium
                "
                >
                  Hora
                </label>

                <input
                  type="time"
                  value={horaEvento}
                  onChange={(e) =>
                    setHoraEvento(
                      e.target.value
                    )
                  }
                  className="
                  w-full
                  border
                  rounded-xl
                  px-4
                  py-3
                  focus:outline-none
                  focus:ring-2
                  focus:ring-yellow-400
                "
                />

              </div>

            </div>

          </div>

          {/* LOCAL */}

          <div
            className="
            bg-slate-50
            border
            rounded-2xl
            p-6
          "
          >

            <h2
              className="
              text-xl
              font-bold
              mb-3
            "
            >
              Local Incluido
            </h2>

            <p
              className="
              text-gray-600
            "
            >
              Precio del local:
            </p>

            <h3
              className="
              text-3xl
              font-bold
              text-green-600
              mt-2
            "
            >
              Bs. {precioLocal}
            </h3>

          </div>

          {/* SERVICIOS */}

          <div>

            <h2
              className="
              text-xl
              font-bold
              mb-5
            "
            >
              Servicios Extra
            </h2>

            <div
              className="
              grid
              grid-cols-1
              md:grid-cols-2
              gap-4
            "
            >

              {servicios.map(
                servicio => (

                <label
                  key={
                    servicio.id_servicio
                  }
                  className="
                  flex
                  items-center
                  justify-between
                  border
                  rounded-2xl
                  p-5
                  cursor-pointer
                  hover:border-yellow-400
                  hover:shadow-md
                  transition
                "
                >

                  <div
                    className="
                    flex
                    items-center
                    gap-4
                  "
                  >

                    <input
                      type="checkbox"
                      checked={
                        seleccionados.includes(
                          servicio.id_servicio
                        )
                      }
                      onChange={() =>
                        setSeleccionados(

                          seleccionados.includes(
                            servicio.id_servicio
                          )

                          ? seleccionados.filter(
                              id =>
                                id !==
                                servicio.id_servicio
                            )

                          : [
                              ...seleccionados,
                              servicio.id_servicio
                            ]

                        )
                      }
                      className="
                      w-5
                      h-5
                    "
                    />

                    <div>

                      <h3
                        className="
                        font-semibold
                      "
                      >
                        {
                          servicio.nombre
                        }
                      </h3>

                    </div>

                  </div>

                  <span
                    className="
                    font-bold
                    text-green-600
                  "
                  >
                    Bs.
                    {" "}
                    {servicio.precio}
                  </span>

                </label>

              ))}

            </div>

          </div>

          {/* TOTAL */}

          <div
            className="
            bg-slate-900
            text-white
            rounded-3xl
            p-8
            flex
            flex-col
            md:flex-row
            items-center
            justify-between
            gap-5
          "
          >

            <div>

              <p
                className="
                text-slate-300
                mb-2
              "
              >
                Total a pagar
              </p>

              <h2
                className="
                text-5xl
                font-bold
                text-yellow-400
              "
              >
                Bs. {total}
              </h2>

            </div>

            <button
              type="submit"
              className="
              bg-yellow-400
              hover:bg-yellow-300
              text-black
              font-bold
              px-8
              py-4
              rounded-2xl
              transition
              shadow-lg
            "
            >
              Crear Reserva
            </button>

          </div>

        </form>

      </div>

    </UserLayout>

  );

}

export default NewBooking;