import { useEffect, useState } from "react";

import AdminLayout from "../../layouts/AdminLayout";

import { crearReserva } from "../../services/reservationService";

import { obtenerServicios } from "../../services/serviceExtraService";

import { localService } from "../../services/localService";

import api from "../../services/api";

function NewReservationAdmin() {

  const admin =
    JSON.parse(
      localStorage.getItem("user") || "{}"
    );

  const [precioLocal, setPrecioLocal] =
    useState(0);

  const [totalPago, setTotalPago] =
    useState(0);

  // cliente
  const [nombre, setNombre] =
    useState("");

  const [email, setEmail] =
    useState("");

  // reserva
  const [tipoEvento, setTipoEvento] =
    useState("");

  const [fechaEvento, setFechaEvento] =
    useState("");

  const [horaEvento, setHoraEvento] =
    useState("");

  const [
    cantidadPersonas,
    setCantidadPersonas
  ] = useState("");

  // servicios
  const [servicios, setServicios] =
    useState<any[]>([]);

  const [
    seleccionados,
    setSeleccionados
  ] = useState<number[]>([]);

  // local
  useEffect(() => {

    const cargarLocal =
      async () => {

        const local =
  await localService.getById(2);

        const precio =
          Number(local.precio);

        setPrecioLocal(precio);

        setTotalPago(precio);

      };

    cargarLocal();

  }, []);

  // servicios
  useEffect(() => {

    obtenerServicios()
      .then(setServicios);

  }, []);

  // recalcular total
  useEffect(() => {

    let total = precioLocal;

    servicios.forEach(servicio => {

      if (
        seleccionados.includes(
          servicio.id_servicio
        )
      ) {

        total +=
          Number(servicio.precio);

      }

    });

    setTotalPago(total);

  }, [
    seleccionados,
    servicios,
    precioLocal
  ]);

  const handleSubmit =
    async (
      e: React.FormEvent
    ) => {

      e.preventDefault();

      if (
        !nombre ||
        !email ||
        !tipoEvento ||
        !fechaEvento ||
        !horaEvento ||
        !cantidadPersonas
      ) {

        alert(
          "Completa todos los campos"
        );

        return;

      }

      try {

        let usuario;

        // buscar usuario
        try {

          const res =
            await api.get(
              `/auth/buscar-email?email=${email}`
            );

          usuario = res.data;

        } catch {

          // crear usuario si no existe
          const nuevo =
            await api.post(
              "/usuarios",
              {
                nombre,
                email,
                password: "123456",
                rol: "cliente"
              }
            );

          usuario = nuevo.data;

        }

        // crear reserva
        console.log(usuario);
        const reserva =
          await crearReserva({

            id_usuario: Number(
              usuario.id_usuario || usuario.id
            ),

            id_local: 2,

            creado_por:
              admin.id,

            fecha_evento:
              fechaEvento,

            hora_evento:
              horaEvento,

            tipo_evento:
              tipoEvento,

            cantidad_personas:
              Number(
                cantidadPersonas
              ),

            total_pago:
              totalPago,

            estado: "pendiente"

          });

        // guardar servicios
        for (
          const id_servicio
          of seleccionados
        ) {

          await api.post(
            "/reserva-servicio",
            {

              reserva: {
                id_reserva:
                  reserva.id_reserva
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
        setNombre("");
        setEmail("");
        setTipoEvento("");
        setFechaEvento("");
        setHoraEvento("");
        setCantidadPersonas("");
        setSeleccionados([]);
        setTotalPago(precioLocal);

      } catch (error: any) {

  console.log(error);

  alert(

    error?.response?.data?.message ||

    "Error al crear reserva"

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
          via-slate-800
          to-slate-900
          rounded-3xl
          p-8
          shadow-xl
          text-white
        "
        >

          <h1
            className="
            text-3xl
            font-bold
            mb-2
          "
          >
            Nueva Reserva Manual
          </h1>

          <p
            className="
            text-slate-300
          "
          >
            Registrar reservas para clientes
          </p>

        </div>

        {/* FORMULARIO */}

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

          {/* CLIENTE */}

          <div>

            <h2
              className="
              text-xl
              font-bold
              mb-5
            "
            >
              Datos del Cliente
            </h2>

            <div
              className="
              grid
              grid-cols-1
              md:grid-cols-2
              gap-5
            "
            >

              <input
                type="text"
                placeholder="Nombre cliente"
                value={nombre}
                onChange={(e) =>
                  setNombre(
                    e.target.value
                  )
                }
                className={inputStyle}
              />

              <input
                type="email"
                placeholder="Correo electrónico"
                value={email}
                onChange={(e) =>
                  setEmail(
                    e.target.value
                  )
                }
                className={inputStyle}
              />

            </div>

          </div>

          {/* EVENTO */}

          <div>

            <h2
              className="
              text-xl
              font-bold
              mb-5
            "
            >
              Información del Evento
            </h2>

            <div
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
                placeholder="Tipo de evento"
                value={tipoEvento}
                onChange={(e) =>
                  setTipoEvento(
                    e.target.value
                  )
                }
                className={inputStyle}
              />

              <input
                type="date"
                value={fechaEvento}
                onChange={(e) =>
                  setFechaEvento(
                    e.target.value
                  )
                }
                className={inputStyle}
              />

              <input
                type="time"
                value={horaEvento}
                onChange={(e) =>
                  setHoraEvento(
                    e.target.value
                  )
                }
                className={inputStyle}
              />

              <input
                type="number"
                placeholder="Cantidad personas"
                value={cantidadPersonas}
                onChange={(e) =>
                  setCantidadPersonas(
                    e.target.value
                  )
                }
                className={inputStyle}
              />

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
              Local Principal
            </h2>

            <p
              className="
              text-lg
              text-slate-700
            "
            >
              Precio Base:
              {" "}
              <span
                className="
                font-bold
                text-green-600
              "
              >
                Bs. {precioLocal}
              </span>
            </p>

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
              xl:grid-cols-3
              gap-5
            "
            >

              {servicios.map(
                (servicio) => {

                const activo =
                  seleccionados.includes(
                    servicio.id_servicio
                  );

                return (

                  <label
                    key={
                      servicio.id_servicio
                    }
                    className={`
                      border
                      rounded-2xl
                      p-5
                      cursor-pointer
                      transition
                      hover:shadow-lg

                      ${
                        activo
                          ? "border-yellow-400 bg-yellow-50"
                          : "bg-white"
                      }
                    `}
                  >

                    <div
                      className="
                      flex
                      justify-between
                      items-start
                    "
                    >

                      <div>

                        <h3
                          className="
                          font-bold
                          text-lg
                        "
                        >
                          {
                            servicio.nombre
                          }
                        </h3>

                        <p
                          className="
                          text-slate-500
                          mt-1
                        "
                        >
                          Bs.
                          {" "}
                          {
                            servicio.precio
                          }
                        </p>

                      </div>

                      <input
                        type="checkbox"
                        checked={activo}
                        onChange={() =>

                          setSeleccionados(

                            activo

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

                    </div>

                  </label>

                );

              })}

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
            md:items-center
            md:justify-between
            gap-5
          "
          >

            <div>

              <p
                className="
                text-slate-300
              "
              >
                Total a pagar
              </p>

              <h2
                className="
                text-4xl
                font-bold
                mt-2
              "
              >
                Bs. {totalPago}
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
            "
            >
              Crear Reserva
            </button>

          </div>

        </form>

      </div>

    </AdminLayout>

  );

}

const inputStyle = `
  w-full
  border
  border-slate-200
  rounded-2xl
  px-4
  py-3
  outline-none
  focus:ring-2
  focus:ring-yellow-400
`;

export default NewReservationAdmin;