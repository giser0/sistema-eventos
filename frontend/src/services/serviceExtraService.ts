import api from "./api";

export const obtenerServicios =
  async () => {

    const response =
      await api.get(
        "/servicios-extra"
      );

    return response.data;

};