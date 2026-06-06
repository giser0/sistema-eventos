import api from "./api";

// 🔥 OBTENER PAGOS
export const obtenerPagos =
async () => {

  const response =
    await api.get("/pagos");

  return response.data;

};

// 🔥 CREAR PAGO
export const crearPago =
async (data: any) => {

  const response =
    await api.post(
      "/pagos",
      data
    );

  return response.data;

};

// 🔥 ELIMINAR PAGO
export const eliminarPago =
async (id: number) => {

  const response =
    await api.patch(
      `/pagos/eliminar/${id}`
    );

  return response.data;

};

// 🔥 DESCARGAR PDF
export const descargarComprobantePDF =
async (idPago: number) => {

  const response =
    await api.get(
      `/pagos/comprobante/${idPago}`,
      {
        responseType: "blob",
      }
    );

  const url =
    window.URL.createObjectURL(
      new Blob([response.data])
    );

  const link =
    document.createElement("a");

  link.href = url;

  link.setAttribute(
    "download",
    `comprobante_${idPago}.pdf`
  );

  document.body.appendChild(link);

  link.click();

  link.remove();

};