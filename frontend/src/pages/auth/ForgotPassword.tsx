import { useState } from "react";
import api from "../../services/api";

function ForgotPassword() {

  const [email, setEmail] =
    useState("");

  const handleSubmit = async (
  e: React.FormEvent
) => {

  e.preventDefault();

  try {

    await api.post(

      "/auth/forgot-password",

      {
        email
      }

    );

    alert(
      "Se envió el enlace de recuperación"
    );

  } catch (error) {

    console.log(error);

    alert(
      "Error al enviar correo"
    );

  }

};

  return (

    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4">

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl p-8"
      >

        <h1 className="text-3xl font-bold text-white mb-6 text-center">

          Recuperar Contraseña

        </h1>

        <input
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
          className="w-full px-4 py-3 rounded-xl bg-slate-800 text-white border border-slate-700"
        />

        <button
          type="submit"
          className="w-full mt-5 bg-yellow-400 text-black py-3 rounded-xl font-bold"
        >

          Enviar enlace

        </button>

      </form>

    </div>

  );

}

export default ForgotPassword;