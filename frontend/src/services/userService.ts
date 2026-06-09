import api from "./api";

// obtener usuarios
export const obtenerUsuarios =
  async () => {

    const response =
      await api.get("/usuarios");

    return response.data;

  };

// crear usuario
export const crearUsuario =
  async (data: any) => {

    const response =
      await api.post(
        "/usuarios",
        data
      );

    return response.data;

  };

//  desactivar usuario
export const eliminarUsuario =
  async (id: number) => {

    const response =
      await api.patch(
        `/usuarios/eliminar/${id}`
      );

    return response.data;

  };

//  editar usuario
export const editarUsuario =
  async (
    id: number,
    data: any
  ) => {

    const response =
      await api.patch(
        `/usuarios/${id}`,
        data
      );

    return response.data;

  };