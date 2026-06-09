import {
  useEffect,
  useState
} from "react";

import AdminLayout
  from "../../layouts/AdminLayout";

import {
  obtenerLogs
} from "../../services/logService";

function Logs() {

  const [logs, setLogs] =
    useState<any[]>([]);

  useEffect(() => {

    cargarLogs();

  }, []);

  const cargarLogs =
    async () => {

      try {

        const data =
          await obtenerLogs();

        setLogs(data);

      } catch (error) {

        console.log(error);

      }

    };

  return (

    <AdminLayout>

      {/* HEADER */}
      <div className="flex items-center justify-between mb-8">

        <div>
          <h1 className="text-3xl font-bold text-slate-800">
            Logs de Acceso
          </h1>

          <p className="text-slate-500 mt-1">
            Historial de actividad y accesos del sistema
          </p>
        </div>

      </div>

      {/* TABLA */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">

        <div className="overflow-x-auto">

          <table className="w-full">

            <thead className="bg-slate-100">

              <tr>

                <th className={thStyle}>
                  ID
                </th>

                <th className={thStyle}>
                  Usuario
                </th>

                <th className={thStyle}>
                  Evento
                </th>

                <th className={thStyle}>
                  IP
                </th>

                <th className={thStyle}>
                  Fecha
                </th>

                <th className={thStyle}>
                  Navegador
                </th>

                <th className={thStyle}>
                  Correo
                </th>

              </tr>

            </thead>

            <tbody>

              {logs.length === 0 ? (

                <tr>

                  <td
                    colSpan={7}
                    className="text-center py-10 text-slate-500"
                  >
                    No existen logs registrados
                  </td>

                </tr>

              ) : (

                logs.map((log) => (

                  <tr
                    key={log.id_log}
                    className="border-b border-slate-100 hover:bg-slate-50 transition"
                  >

                    <td className={tdStyle}>
                      #{log.id_log}
                    </td>

                    <td className={tdStyle}>
                      <span className="font-semibold text-slate-700">
                        {log.usuario?.nombre || "Sin usuario"}
                      </span>
                    </td>

                    <td className={tdStyle}>

                      <span className="
                        bg-blue-100
                        text-blue-700
                        px-3
                        py-1
                        rounded-full
                        text-xs
                        font-semibold
                      ">
                        {log.evento}
                      </span>

                    </td>

                    <td className={tdStyle}>

                      <span className="
                        bg-slate-100
                        px-3
                        py-1
                        rounded-lg
                        text-sm
                        text-slate-700
                      ">
                        {
                          log.ip === "::1"
                            ? "localhost"
                            : log.ip || "Sin IP"
                        }
                      </span>

                    </td>

                    <td className={tdStyle}>
                      {
                        new Date(
                          log.fecha
                        ).toLocaleString()
                      }
                    </td>

                    <td className={tdStyle}>
                      {log.browser || "Sin navegador"}
                    </td>

                    <td className={tdStyle}>
                      {log.usuario?.email || "Sin correo"}
                    </td>

                  </tr>

                ))

              )}

            </tbody>

          </table>

        </div>

      </div>

    </AdminLayout>

  );

}

const thStyle =
  "text-left px-6 py-4 text-sm font-bold text-slate-700";

const tdStyle =
  "px-6 py-4 text-sm text-slate-600";

export default Logs;