import { useEffect, useState } from "react";
import UserLayout from "../../layouts/UserLayout";
import { obtenerMisReservas } from "../../services/reservationService";

function Dashboard() {

  const user = JSON.parse(
    localStorage.getItem("user") || "{}"
  );

  const [reservas, setReservas] =
    useState<any[]>([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    cargarReservas();
  }, []);

  const cargarReservas = async () => {

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

  const totalReservas =
    reservas.length;

  const pendientes =
    reservas.filter(
      r => r.estado === "pendiente"
    ).length;

  const confirmadas =
    reservas.filter(
      r => r.estado === "confirmado"
    ).length;

  const totalGastado =
    reservas.reduce(
      (acc, r) =>
        acc +
        Number(
          r.total_pago || 0
        ),
      0
    );

  const proxima =
    reservas.find(
      r => r.estado !== "cancelado"
    );

  return (

    <UserLayout>

      <div className="space-y-8">

        {/* CABECERA */}

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
            Bienvenido,
            {" "}
            {user.nombre}
          </h1>

          <p
            className="
            text-slate-300
          "
          >
            {user.email}
          </p>

          <div
            className="
            mt-6
            flex
            gap-3
            flex-wrap
          "
          >

            <span
              className="
              px-4
              py-2
              rounded-full
              bg-yellow-400
              text-black
              font-semibold
            "
            >
              Cliente
            </span>

            <span
              className="
              px-4
              py-2
              rounded-full
              bg-white/10
            "
            >
              Reservas: {totalReservas}
            </span>

          </div>

        </div>

        {/* ESTADISTICAS */}

        <div
          className="
          grid
          grid-cols-1
          md:grid-cols-2
          xl:grid-cols-4
          gap-5
        "
        >

          <div
            className="
            bg-white
            p-6
            rounded-2xl
            shadow-md
            border
            hover:shadow-xl
            hover:-translate-y-1
            transition
          "
          >
            <p className="text-gray-500">
              Total Reservas
            </p>

            <h2
              className="
              text-4xl
              font-bold
              mt-2
            "
            >
              {totalReservas}
            </h2>
          </div>

          <div
            className="
            bg-white
            p-6
            rounded-2xl
            shadow-md
            border
            hover:shadow-xl
            hover:-translate-y-1
            transition
          "
          >
            <p className="text-gray-500">
              Pendientes
            </p>

            <h2
              className="
              text-4xl
              font-bold
              text-yellow-500
              mt-2
            "
            >
              {pendientes}
            </h2>
          </div>

          <div
            className="
            bg-white
            p-6
            rounded-2xl
            shadow-md
            border
            hover:shadow-xl
            hover:-translate-y-1
            transition
          "
          >
            <p className="text-gray-500">
              Confirmadas
            </p>

            <h2
              className="
              text-4xl
              font-bold
              text-green-600
              mt-2
            "
            >
              {confirmadas}
            </h2>
          </div>

          <div
            className="
            bg-white
            p-6
            rounded-2xl
            shadow-md
            border
            hover:shadow-xl
            hover:-translate-y-1
            transition
          "
          >
            <p className="text-gray-500">
              Total Gastado
            </p>

            <h2
              className="
              text-4xl
              font-bold
              text-blue-600
              mt-2
            "
            >
              Bs. {totalGastado}
            </h2>
          </div>

        </div>

        {/* PROXIMA RESERVA */}

        <div
          className="
          bg-white
          rounded-3xl
          shadow-md
          border
          p-6
        "
        >

          <h2
            className="
            text-xl
            font-bold
            mb-5
          "
          >
            Próxima Reserva
          </h2>

          {loading ? (

            <p>
              Cargando...
            </p>

          ) : proxima ? (

            <div
              className="
              bg-slate-50
              rounded-2xl
              p-5
              border
            "
            >

              <h3
                className="
                text-lg
                font-bold
                mb-3
              "
              >
                {proxima.tipo_evento}
              </h3>

              <p>
                <b>Fecha:</b> {proxima.fecha_evento}
              </p>

              <p>
                <b>Hora:</b> {proxima.hora_evento}
              </p>

              <p>
                <b>Total:</b> Bs. {proxima.total_pago}
              </p>

              <span
                className={`
                  inline-block
                  mt-4
                  px-4
                  py-2
                  rounded-full
                  text-sm
                  font-semibold

                  ${proxima.estado ===
                    "confirmado"
                    ? "bg-green-100 text-green-700"
                    : "bg-yellow-100 text-yellow-700"
                  }
                `}
              >
                {proxima.estado}
              </span>

            </div>

          ) : (

            <p>
              No tienes reservas aún
            </p>

          )}

        </div>

        {/* HISTORIAL */}

        <div
          className="
          bg-white
          rounded-3xl
          shadow-md
          border
          p-6
        "
        >

          <h2
            className="
            text-xl
            font-bold
            mb-5
          "
          >
            Últimas Reservas
          </h2>

          {

            reservas.length === 0

              ? (

                <p>
                  No existen reservas
                </p>

              )

              : (

                <div className="space-y-4">

                  {
                    reservas
                      .slice(0, 5)
                      .map(reserva => (

                        <div
                          key={
                            reserva.id_reserva
                          }
                          className="
                        flex
                        justify-between
                        items-center
                        border-b
                        pb-4
                      "
                        >

                          <div>

                            <h3
                              className="
                            font-semibold
                          "
                            >
                              {
                                reserva.tipo_evento
                              }
                            </h3>

                            <p
                              className="
                            text-sm
                            text-gray-500
                          "
                            >
                              {
                                reserva.fecha_evento
                              }
                            </p>

                          </div>

                          <div
                            className="
                          text-right
                        "
                          >

                            <p
                              className="
                            font-semibold
                          "
                            >
                              Bs.
                              {" "}
                              {
                                reserva.total_pago
                              }
                            </p>

                            <span
                              className="
                            text-xs
                            bg-slate-100
                            px-3
                            py-1
                            rounded-full
                          "
                            >
                              {
                                reserva.estado
                              }
                            </span>

                          </div>

                        </div>

                      ))
                  }

                </div>

              )

          }

        </div>

      </div>

    </UserLayout>

  );

}

export default Dashboard;