import {
  useEffect,
  useState
} from "react";

import AdminLayout
  from "../../layouts/AdminLayout";

import {
  obtenerPagos,
  crearPago,
  eliminarPago,
  descargarComprobantePDF
} from "../../services/paymentService";

import {
  obtenerReservas
} from "../../services/reservationService";

function Payments() {

  const [pagos, setPagos] =
    useState<any[]>([]);

  const [
    reservasPendientes,
    setReservasPendientes
  ] = useState<any[]>([]);

  useEffect(() => {

    cargarDatos();

  }, []);

  const cargarDatos =
    async () => {

      try {

        const pagosData =
          await obtenerPagos();

        const pagosFiltrados =
          pagosData.filter(
            (p: any) =>
              p.estado !== "eliminado"
          );

        setPagos(
          pagosFiltrados
        );

        const reservasData =
          await obtenerReservas();

        const pendientes =
          reservasData.filter(
            (r: any) =>
              r.estado === "pendiente"
          );

        setReservasPendientes(
          pendientes
        );

      } catch (error) {

        console.log(error);

      }

    };

  const registrarPago =
    async (
      reserva: any
    ) => {

      try {

        await crearPago({

          id_reserva:
            reserva.id_reserva,

          monto:
            reserva.total_pago,

          metodo:
            "efectivo"

        });

        alert(
          "Pago registrado correctamente"
        );

        cargarDatos();

      } catch (error) {

        console.log(error);

        alert(
          "Error al registrar pago"
        );

      }

    };

  const eliminarPagoHandler =
    async (
      id_pago: number
    ) => {

      const confirmar =
        confirm(
          "¿Eliminar este pago?"
        );

      if (!confirmar) return;

      try {

        await eliminarPago(
          id_pago
        );

        alert(
          "Pago eliminado"
        );

        cargarDatos();

      } catch (error) {

        console.log(error);

        alert(
          "Error al eliminar"
        );

      }

    };

  const descargarPDF =
    async (
      id_pago: number
    ) => {

      try {

        await descargarComprobantePDF(
          id_pago
        );

      } catch (error) {

        console.log(error);

        alert(
          "Error al descargar PDF"
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
            Gestión de Pagos
          </h1>

          <p
            className="
              text-slate-300
              mt-2
            "
          >
            Administra pagos y comprobantes
            del sistema
          </p>

        </div>

        {/* RESERVAS PENDIENTES */}

        <div
          className="
            bg-white
            rounded-3xl
            shadow-sm
            border
            border-slate-200
            overflow-hidden
          "
        >

          <div
            className="
              px-6
              py-5
              border-b
              bg-slate-50
            "
          >

            <h2
              className="
                text-xl
                font-bold
                text-slate-800
              "
            >
              Reservas Pendientes
            </h2>

          </div>

          <div className="overflow-x-auto">

            <table className="w-full">

              <thead
                className="
                  bg-slate-100
                  text-slate-700
                "
              >

                <tr>

                  <th className={thClass}>
                    Reserva
                  </th>

                  <th className={thClass}>
                    Cliente
                  </th>

                  <th className={thClass}>
                    Evento
                  </th>

                  <th className={thClass}>
                    Total
                  </th>

                  <th className={thClass}>
                    Estado
                  </th>

                  <th className={thClass}>
                    Acción
                  </th>

                </tr>

              </thead>

              <tbody>

                {
                  reservasPendientes.length === 0 ? (

                    <tr>

                      <td
                        colSpan={6}
                        className="
                          text-center
                          py-10
                          text-slate-500
                        "
                      >
                        No hay reservas pendientes
                      </td>

                    </tr>

                  ) : (

                    reservasPendientes.map(
                      (reserva: any) => (

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
                            #{reserva.id_reserva}
                          </td>

                          <td className={tdClass}>
                            {
                              reserva.usuario?.nombre
                            }
                          </td>

                          <td className={tdClass}>
                            {
                              reserva.tipo_evento
                            }
                          </td>

                          <td
                            className="
                            px-6
                            py-4
                            font-semibold
                            text-emerald-600
                          "
                          >
                            Bs. {
                              reserva.total_pago
                            }
                          </td>

                          <td className={tdClass}>

                            <span
                              className="
                              bg-yellow-100
                              text-yellow-700
                              text-xs
                              font-semibold
                              px-3
                              py-1
                              rounded-full
                            "
                            >
                              {
                                reserva.estado
                              }
                            </span>

                          </td>

                          <td className={tdClass}>

                            <button
                              onClick={() =>
                                registrarPago(
                                  reserva
                                )
                              }
                              className="
                              bg-emerald-500
                              hover:bg-emerald-600
                              text-white
                              px-4
                              py-2
                              rounded-xl
                              text-sm
                              font-medium
                              transition
                            "
                            >
                              Registrar Pago
                            </button>

                          </td>

                        </tr>

                      ))

                  )
                }

              </tbody>

            </table>

          </div>

        </div>

        {/* PAGOS REALIZADOS */}

        <div
          className="
            bg-white
            rounded-3xl
            shadow-sm
            border
            border-slate-200
            overflow-hidden
          "
        >

          <div
            className="
              px-6
              py-5
              border-b
              bg-slate-50
            "
          >

            <h2
              className="
                text-xl
                font-bold
                text-slate-800
              "
            >
              Pagos Realizados
            </h2>

          </div>

          <div className="overflow-x-auto">

            <table className="w-full">

              <thead
                className="
                  bg-slate-100
                  text-slate-700
                "
              >

                <tr>

                  <th className={thClass}>
                    Pago
                  </th>

                  <th className={thClass}>
                    Cliente
                  </th>

                  <th className={thClass}>
                    Reserva
                  </th>

                  <th className={thClass}>
                    Monto
                  </th>

                  <th className={thClass}>
                    Método
                  </th>

                  <th className={thClass}>
                    Fecha
                  </th>

                  <th className={thClass}>
                    Acciones
                  </th>

                </tr>

              </thead>

              <tbody>

                {
                  pagos.length === 0 ? (

                    <tr>

                      <td
                        colSpan={7}
                        className="
                          text-center
                          py-10
                          text-slate-500
                        "
                      >
                        No hay pagos registrados
                      </td>

                    </tr>

                  ) : (

                    pagos.map((pago: any) => (

                      <tr
                        key={pago.id_pago}
                        className="
                          border-b
                          hover:bg-slate-50
                          transition
                        "
                      >

                        <td className={tdClass}>
                          #{pago.id_pago}
                        </td>

                        <td className={tdClass}>
                          {
                            pago.reserva?.usuario?.nombre
                          }
                        </td>

                        <td className={tdClass}>
                          {
                            pago.reserva?.id_reserva
                          }
                        </td>

                        <td
                          className="
                            px-6
                            py-4
                            font-semibold
                            text-emerald-600
                          "
                        >
                          Bs. {pago.monto}
                        </td>

                        <td className={tdClass}>

                          <span
                            className="
                              bg-blue-100
                              text-blue-700
                              text-xs
                              font-semibold
                              px-3
                              py-1
                              rounded-full
                            "
                          >
                            {pago.metodo}
                          </span>

                        </td>

                        <td className={tdClass}>
                          {
                            new Date(
                              pago.fecha_pago
                            ).toLocaleDateString()
                          }
                        </td>

                        <td className={tdClass}>

                          <div className="flex gap-3">

                            <button
                              onClick={() =>
                                descargarPDF(
                                  pago.id_pago
                                )
                              }
                              className="
                                bg-blue-500
                                hover:bg-blue-600
                                text-white
                                px-4
                                py-2
                                rounded-xl
                                text-sm
                                font-medium
                                transition
                              "
                            >
                              PDF
                            </button>

                            <button
                              onClick={() =>
                                eliminarPagoHandler(
                                  pago.id_pago
                                )
                              }
                              className="
                                bg-red-500
                                hover:bg-red-600
                                text-white
                                px-4
                                py-2
                                rounded-xl
                                text-sm
                                font-medium
                                transition
                              "
                            >
                              Eliminar
                            </button>

                          </div>

                        </td>

                      </tr>

                    ))

                  )
                }

              </tbody>

            </table>

          </div>

        </div>

      </div>

    </AdminLayout>

  );

}

const thClass =
  `
    px-6
    py-4
    text-left
    text-sm
    font-semibold
  `;

const tdClass =
  `
    px-6
    py-4
    text-sm
    text-slate-700
  `;

export default Payments;