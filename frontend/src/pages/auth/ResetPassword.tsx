import { useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../services/api";
import { useNavigate } from "react-router-dom";

function ResetPassword() {

  const { token } = useParams();

  const [password, setPassword] =
    useState("");

  const [confirmPassword,
    setConfirmPassword] =
    useState("");
  const navigate = useNavigate();
  const handleSubmit = async (

    e: React.FormEvent
  ) => {

    e.preventDefault();

    if (
      password !== confirmPassword
    ) {

      alert(
        "Las contraseñas no coinciden"
      );

      return;

    }

    try {

      await api.patch(

        "/auth/reset-password",

        {
          token,
          password

        }

      );

      alert(
        "Contraseña actualizada correctamente"
      );

      navigate("/login");

    } catch {

      alert(
        "Error al actualizar contraseña"
      );

    }

  };

  return (

    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4">

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl p-8"
      >

        <h1 className="text-3xl font-bold text-white text-center mb-6">

          Nueva Contraseña

        </h1>

        <input
          type="password"
          placeholder="Nueva contraseña"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
          className="w-full mb-4 px-4 py-3 rounded-xl bg-slate-800 text-white border border-slate-700"
        />

        <input
          type="password"
          placeholder="Confirmar contraseña"
          value={confirmPassword}
          onChange={(e) =>
            setConfirmPassword(
              e.target.value
            )
          }
          className="w-full mb-6 px-4 py-3 rounded-xl bg-slate-800 text-white border border-slate-700"
        />

        <button
          type="submit"
          className="w-full bg-yellow-400 text-black py-3 rounded-xl font-bold"
        >

          Cambiar contraseña

        </button>

      </form>

    </div>

  );

}

export default ResetPassword;