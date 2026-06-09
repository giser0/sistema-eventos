import api from "./api";

interface LoginData {
  email: string;
  password: string;
}

interface RegisterData {
  nombre: string;
  email: string;
  telefono: string;
  password: string;
}

// LOGIN
export const loginUser =
  async (data: LoginData) => {

    const response =
      await api.post(
        "/auth/login",
        data
      );

    return response.data;

  };

// REGISTER
export const registerUser =
  async (data: RegisterData) => {

    const response =
      await api.post(
        "/usuarios",
        data
      );

    return response.data;

  };
export const resetPassword =
  async (

    email: string,
    password: string

  ) => {

    const response =
      await api.patch(

        "/auth/reset-password",

        {
          email,
          password
        }

      );

    return response.data;

  };

// LOGOUT
export const logoutUser =
  async () => {

    const response =
      await api.post(
        "/auth/logout"
      );

    return response.data;

  };