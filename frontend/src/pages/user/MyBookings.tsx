import { useEffect, useState } from "react";

import UserLayout
from "../../layouts/UserLayout";

import {
  obtenerMisReservas,
  eliminarReserva
}
from "../../services/reservationService";

import {
  crearPago,
  descargarComprobantePDF
}
from "../../services/paymentService";

function MyBookings() {

  const [reservas, setReservas] =
    useState<any[]>([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {

    cargarReservas();

  }, []);

  const cargarReservas =
    async () => {

      try {

        const data =
          await obtenerMisReservas();

        setReservas(data);

      } catch (error) {

        console.log(error);

      } finally {

        setLoading(false);

      }

  };

  // ✅ ELIMINAR
  const eliminarMiReserva =
    async (id: number) => {

      const confirmar =
        window.confirm(
          "¿Eliminar reserva?"
        );

      if (!confirmar) return;

      try {

        await eliminarReserva(id);

        alert(
          "Reserva eliminada"
        );

        cargarReservas();

      } catch (error) {

        console.log(error);

        alert(
          "Error al eliminar"
        );

      }

  };

  // ✅ PAGAR
  const pagarReserva =
    async (reserva: any) => {

      try {

        console.log("RESERVA", reserva);
console.log("TOTAL", reserva.total_pago);

const pago =
  await crearPago({

    id_reserva:
      Number(reserva.id_reserva),

    monto:
      Number(reserva.total_pago),

    metodo:
      "efectivo",

  });

        alert(
          "Pago realizado correctamente"
        );

        await descargarComprobantePDF(
          pago.id_pago
        );

        cargarReservas();

      } catch (error: any) {

  console.log(error);

  console.log(
    "ERROR BACKEND:",
    error?.response?.data
  );

  alert(
    JSON.stringify(
      error?.response?.data
    )
  );

}

  };

  return (

    <UserLayout>

      <div className="space-y-8">

        {/* HEADER */}

        <div
          className="
          flex
          flex-col
          md:flex-row
          md:items-center
          md:justify-between
          gap-4
        "
        >

          <div>

            <h1
              className="
              text-3xl
              font-bold
              text-slate-800
            "
            >
              Mis Reservas
            </h1>

            <p
              className="
              text-slate-500
              mt-1
            "
            >
              Gestiona tus reservas y pagos
            </p>

          </div>

          <div
            className="
            bg-white
            px-5
            py-3
            rounded-2xl
            shadow-sm
            border
          "
          >

            <p
              className="
              text-sm
              text-slate-500
            "
            >
              Total Reservas
            </p>

            <h2
              className="
              text-2xl
              font-bold
              text-slate-800
            "
            >
              {reservas.length}
            </h2>

          </div>

        </div>

        {/* CONTENIDO */}

        <div
          className="
          bg-white
          rounded-3xl
          shadow-md
          border
          overflow-hidden
        "
        >

          {loading ? (

            <div
              className="
              p-10
              text-center
              text-slate-500
            "
            >
              Cargando reservas...
            </div>

          ) : reservas.length === 0 ? (

            <div
              className="
              p-10
              text-center
            "
            >

              <h2
                className="
                text-2xl
                font-bold
                text-slate-700
                mb-2
              "
              >
                No tienes reservas
              </h2>

              <p
                className="
                text-slate-500
              "
              >
                Aún no realizaste ninguna reserva
              </p>

            </div>

          ) : (

            <div className="overflow-x-auto">

              <table
                className="
                w-full
                min-w-[1100px]
              "
              >

                <thead
                  className="
                  bg-slate-100
                "
                >

                  <tr>

                    <th className={thClass}>
                      Evento
                    </th>

                    <th className={thClass}>
                      Fecha
                    </th>

                    <th className={thClass}>
                      Hora
                    </th>

                    <th className={thClass}>
                      Personas
                    </th>

                    <th className={thClass}>
                      Estado
                    </th>

                    <th className={thClass}>
                      Total
                    </th>

                    <th className={thClass}>
                      Local
                    </th>

                    <th className={thClass}>
                      Servicios
                    </th>

                    <th className={thClass}>
                      Pago
                    </th>

                    <th className={thClass}>
                      Acción
                    </th>

                  </tr>

                </thead>

                <tbody>

                  {reservas.map((reserva) => (

                    <tr
                      key={
                        reserva.id_reserva
                      }
                      className="
                      border-b
                      hover:bg-slate-50
                      transition
                    "
                    >

                      <td className={tdClass}>

                        <div>

                          <h3
                            className="
                            font-semibold
                            text-slate-800
                          "
                          >
                            {
                              reserva.tipo_evento
                            }
                          </h3>

                        </div>

                      </td>

                      <td className={tdClass}>
                        {
                          reserva.fecha_evento
                        }
                      </td>

                      <td className={tdClass}>
                        {
                          reserva.hora_evento
                        }
                      </td>

                      <td className={tdClass}>
                        {
                          reserva.cantidad_personas
                        }
                      </td>

                      <td className={tdClass}>

                        <span
                          className={`
                            px-3
                            py-1
                            rounded-full
                            text-xs
                            font-semibold

                            ${
                              reserva.estado ===
                              "confirmado"

                                ? "bg-green-100 text-green-700"

                                : reserva.estado ===
                                  "cancelado"

                                ? "bg-red-100 text-red-700"

                                : "bg-yellow-100 text-yellow-700"
                            }
                          `}
                        >
                          {reserva.estado}
                        </span>

                      </td>

                      <td className={tdClass}>

                        <span
                          className="
                          font-bold
                          text-slate-800
                        "
                        >
                          Bs. {
                            reserva.total_pago
                          }
                        </span>

                      </td>

                      <td className={tdClass}>
                        {
                          reserva.local?.nombre
                        }
                      </td>

                      {/* SERVICIOS */}

                      <td className={tdClass}>

                        <div
                          className="
                          flex
                          flex-col
                          gap-2
                        "
                        >

                          {
                            reserva.servicios?.length > 0

                            ? reserva.servicios.map(
                                (item: any) => (

                                <span
                                  key={item.id}
                                  className="
                                  bg-slate-100
                                  px-3
                                  py-1
                                  rounded-full
                                  text-xs
                                  w-fit
                                "
                                >
                                  {
                                    item.servicio?.nombre
                                  }
                                </span>

                              ))

                            : (

                              <span
                                className="
                                text-slate-400
                                text-sm
                              "
                              >
                                Sin servicios
                              </span>

                            )
                          }

                        </div>

                      </td>

                      {/* PAGO */}

                      <td className={tdClass}>

                        {reserva.pagos?.length > 0 ? (

                          <button
                            onClick={() =>
                              descargarComprobantePDF(
                                reserva.pagos[0]
                                  .id_pago
                              )
                            }
                            className="
                            bg-blue-600
                            hover:bg-blue-700
                            text-white
                            px-4
                            py-2
                            rounded-xl
                            text-sm
                            font-semibold
                            transition
                          "
                          >
                            Descargar PDF
                          </button>

                        ) : (

                          <button
                            onClick={() =>
                              pagarReserva(
                                reserva
                              )
                            }
                            className="
                            bg-green-600
                            hover:bg-green-700
                            text-white
                            px-4
                            py-2
                            rounded-xl
                            text-sm
                            font-semibold
                            transition
                          "
                          >
                            Pagar
                          </button>

                        )}

                      </td>

                      {/* ELIMINAR */}

                      <td className={tdClass}>

                        <button
                          onClick={() =>
                            eliminarMiReserva(
                              reserva.id_reserva
                            )
                          }
                          className="
                          bg-red-600
                          hover:bg-red-700
                          text-white
                          px-4
                          py-2
                          rounded-xl
                          text-sm
                          font-semibold
                          transition
                        "
                        >
                          Eliminar
                        </button>

                      </td>

                    </tr>

                  ))}

                </tbody>

              </table>

            </div>

          )}

        </div>

      </div>

    </UserLayout>

  );

}

const thClass = `
  text-left
  p-4
  text-sm
  font-semibold
  text-slate-600
`;

const tdClass = `
  p-4
  text-sm
  text-slate-700
`;

export default MyBookings;