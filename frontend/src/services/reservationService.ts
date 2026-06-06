import api from "./api";

export const obtenerReservas = async () => {

  const response =
    await api.get("/reservas");

  return response.data;

};
export const crearReserva =
  async (reserva: any) => {

    const response =
      await api.post(
        "/reservas",
        reserva
      );

    return response.data;

};
export const obtenerMisReservas =
  async () => {

    const response =
      await api.get(
        "/reservas/mis-reservas"
      );

    return response.data;

};
export const descargarReportePDF =
  async () => {

    const response =
      await api.get(
        "/reservas/reporte/pdf",
        {
          responseType: "blob",
        }
      );

    return response.data;

};
export const eliminarReserva =
  async (id: number) => {

    const response =
      await api.patch(
        `/reservas/eliminar/${id}`
      );

    return response.data;

};
export const cambiarEstadoReserva =
  async (
    id: number,
    estado: string
  ) => {

    const response =
      await api.patch(
        `/reservas/${id}`,
        { estado }
      );

    return response.data;


};