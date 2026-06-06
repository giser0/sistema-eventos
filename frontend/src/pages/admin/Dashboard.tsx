import { useEffect, useState } from "react";

import AdminLayout from "../../layouts/AdminLayout";

import ReservationsChart from "../../components/ReservationsChart";

import { obtenerDashboard } from "../../services/dashboardService";
import { descargarReportePDF } from "../../services/reservationService";

import ReservationsPieChart
from "../../components/ReservationsPieChart";

function Dashboard() {

  const user = JSON.parse(
    localStorage.getItem("user") || "{}"
  );

  const [dashboard, setDashboard] =
    useState<any>(null);

  useEffect(() => {
    cargarDashboard();
  }, []);

  const cargarDashboard = async () => {

    try {

      const data =
        await obtenerDashboard();

      setDashboard(data);

    } catch (error) {

      console.log(error);

    }

  };

  const descargarPDF = async () => {

    try {

      const data =
        await descargarReportePDF();

      const url =
        window.URL.createObjectURL(
          new Blob([data])
        );

      const link =
        document.createElement("a");

      link.href = url;

      link.setAttribute(
        "download",
        "reporte_reservas.pdf"
      );

      document.body.appendChild(link);

      link.click();

      link.remove();

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
            text-4xl
            font-bold
          "
          >
              Administrador
          </h1>

          <p
            className="
            text-slate-300
            mt-2
          "
          >
            Bienvenido {user.nombre}
          </p>

          <div
            className="
            flex
            gap-3
            mt-5
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
              {user.rol}
            </span>

            <span
              className="
              px-4
              py-2
              rounded-full
              bg-white/10
            "
            >
              Sistema de Reservas
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
            rounded-2xl
            p-6
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
              text-slate-900
              mt-2
            "
            >
              {dashboard?.total_reservas || 0}
            </h2>
          </div>

          <div
            className="
            bg-white
            rounded-2xl
            p-6
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
              {dashboard?.pendientes || 0}
            </h2>
          </div>

          <div
            className="
            bg-white
            rounded-2xl
            p-6
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
              {dashboard?.confirmadas || 0}
            </h2>
          </div>

          <div
            className="
            bg-white
            rounded-2xl
            p-6
            shadow-md
            border
            hover:shadow-xl
            hover:-translate-y-1
            transition
          "
          >
            <p className="text-gray-500">
              Ingresos Totales
            </p>

            <h2
              className="
              text-4xl
              font-bold
              text-blue-600
              mt-2
            "
            >
              Bs. {dashboard?.ingresos_totales || 0}
            </h2>
          </div>

        </div>

        {/* ACCIONES RAPIDAS */}

        <div
          className="
          grid
          md:grid-cols-2
          gap-6
        "
        >

          <div
            className="
            bg-white
            rounded-3xl
            p-6
            shadow-md
            border
          "
          >

            <h2
              className="
              text-xl
              font-bold
              mb-3
            "
            >
              Información del Administrador
            </h2>

            <p>
              <b>Nombre:</b> {user.nombre}
            </p>

            <p>
              <b>Rol:</b> {user.rol}
            </p>

          </div>

          <div
            className="
            bg-white
            rounded-3xl
            p-6
            shadow-md
            border
          "
          >

            <h2
              className="
              text-xl
              font-bold
              mb-4
            "
            >
              Acciones Rápidas
            </h2>

            <button
              onClick={descargarPDF}
              className="
              bg-yellow-400
              hover:bg-yellow-300
              text-black
              font-semibold
              px-5
              py-3
              rounded-xl
              transition
            "
            >
              Descargar Reporte PDF
            </button>

          </div>

        </div>

        {/* GRAFICOS */}

<div
  className="
  grid
  md:grid-cols-2
  gap-6
"
>

  {/* GRAFICO CIRCULAR */}

  <div
    className="
    bg-white
    rounded-3xl
    p-6
    shadow-md
    border
  "
  >

    <ReservationsChart
      pendientes={
        dashboard?.pendientes || 0
      }
      confirmadas={
        dashboard?.confirmadas || 0
      }
      canceladas={
        dashboard?.canceladas || 0
      }
    />

  </div>

  {/* GRAFICO BARRAS */}

  <div
    className="
rounded-3xl
shadow-xl
transition
hover:-translate-y-1
"
  >

    <ReservationsPieChart
  pendientes={
    dashboard?.pendientes || 0
  }
  confirmadas={
    dashboard?.confirmadas || 0
  }
  canceladas={
    dashboard?.canceladas || 0
  }
/>

  </div>

</div>
      </div>

    </AdminLayout>

  );

}

export default Dashboard;