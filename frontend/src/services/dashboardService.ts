import api from "./api";

export const obtenerDashboard = async () => {

  const response =
    await api.get("/reservas/dashboard");

  return response.data;

};