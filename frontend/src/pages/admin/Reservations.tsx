import {
  useEffect,
  useState
} from "react";

import AdminLayout
from "../../layouts/AdminLayout";

import PageHeader
from "../../components/PageHeader";

import Table
from "../../components/Table";

import ActionButton
from "../../components/ActionButton";

import {
  obtenerReservas,
  cambiarEstadoReserva,
  eliminarReserva
}
from "../../services/reservationService";

function Reservations() {

  const [reservas, setReservas] =
    useState<any[]>([]);

  const [busqueda, setBusqueda] =
    useState("");

  useEffect(() => {

    cargarReservas();

  }, []);

  const cargarReservas =
    async () => {

      try {

        const data =
          await obtenerReservas();

        setReservas(data);

      } catch (error) {

        console.log(error);

      }

  };

  const cambiarEstado =
    async (
      id: number,
      estado: string
    ) => {

      try {

        await cambiarEstadoReserva(
          id,
          estado
        );

        cargarReservas();

      } catch (error) {

        console.log(error);

      }

  };

  const eliminar =
    async (
      id: number
    ) => {

      const confirmar =
        window.confirm(
          "¿Deseas eliminar esta reserva?"
        );

      if (!confirmar) return;

      try {

        await eliminarReserva(id);

        cargarReservas();

      } catch (error) {

        console.log(error);

      }

  };

  // FILTRO
  const reservasFiltradas =
    reservas.filter((reserva) => {

      const texto =
        busqueda.toLowerCase();

      return (

        reserva.usuario?.nombre
          ?.toLowerCase()
          .includes(texto)

        ||

        reserva.tipo_evento
          ?.toLowerCase()
          .includes(texto)

        ||

        reserva.id_reserva
          .toString()
          .includes(texto)

      );

    });

  return (

    <AdminLayout>

      <div className="space-y-6">

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

          <PageHeader
            title="Reservas"
            subtitle="Gestiona todas las reservas del sistema"
          />

          {/* BUSCADOR */}

          <input
            type="text"
            placeholder="Buscar reserva..."
            value={busqueda}
            onChange={(e) =>
              setBusqueda(
                e.target.value
              )
            }
            className="
              w-full
              md:w-72
              px-4
              py-3
              rounded-xl
              border
              border-slate-300
              bg-white
              shadow-sm
              focus:outline-none
              focus:ring-2
              focus:ring-slate-800
            "
          />

        </div>

        {/* TABLA */}

        <Table>

          <thead
            className="
              bg-slate-100
              text-slate-700
            "
          >

            <tr>

              <th className={th}>
                ID
              </th>

              <th className={th}>
                Cliente
              </th>

              <th className={th}>
                Evento
              </th>

              <th className={th}>
                Fecha
              </th>

              <th className={th}>
                Hora
              </th>

              <th className={th}>
                Estado
              </th>

              <th className={th}>
                Pago
              </th>

              <th className={th}>
                Acciones
              </th>

            </tr>

          </thead>

          <tbody>

            {reservasFiltradas.map(
              (reserva) => (

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

                <td className={td}>
                  #{reserva.id_reserva}
                </td>

                <td className={td}>
                  {reserva.usuario?.nombre}
                </td>

                <td className={td}>
                  {reserva.tipo_evento}
                </td>

                <td className={td}>
                  {reserva.fecha_evento}
                </td>

                <td className={td}>
                  {reserva.hora_evento}
                </td>

                {/* ESTADO */}

                <td className={td}>

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

                <td
                  className={`${td} font-semibold`}
                >
                  Bs. {reserva.total_pago}
                </td>

                {/* BOTONES */}

                <td className={td}>

                  <div
                    className="
                      flex
                      flex-wrap
                      gap-2
                    "
                  >

                    <ActionButton
                      color="green"
                      onClick={() =>
                        cambiarEstado(
                          reserva.id_reserva,
                          "confirmado"
                        )
                      }
                    >
                      Confirmar
                    </ActionButton>

                    <ActionButton
                      color="red"
                      onClick={() =>
                        cambiarEstado(
                          reserva.id_reserva,
                          "cancelado"
                        )
                      }
                    >
                      Cancelar
                    </ActionButton>

                    <ActionButton
                      onClick={() =>
                        eliminar(
                          reserva.id_reserva
                        )
                      }
                    >
                      Eliminar
                    </ActionButton>

                  </div>

                </td>

              </tr>

            ))}

          </tbody>

        </Table>

      </div>

    </AdminLayout>

  );

}

const th =
  `
    text-left
    px-6
    py-4
    font-semibold
    text-sm
  `;

const td =
  `
    px-6
    py-4
    text-sm
    text-slate-700
  `;

export default Reservations;