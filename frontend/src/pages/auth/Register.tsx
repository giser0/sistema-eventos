import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../../services/authService";

import {
  Eye,
  EyeOff,
} from "lucide-react";

function Register() {
  const navigate = useNavigate();

  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [telefono, setTelefono] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] =
    useState("");

  const [showPassword, setShowPassword] =
    useState(false);

  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const [loading, setLoading] =
    useState(false);

  const getPasswordStrength = (
    password: string
  ) => {

    if (password.length < 6) {

      return {
        text: "Débil",
        color: "bg-red-500",
        width: "33%",
      };

    }

    const hasUpper =
      /[A-Z]/.test(password);

    const hasNumber =
      /[0-9]/.test(password);

    const hasSymbol =
      /[^A-Za-z0-9]/.test(password);

    if (
      password.length >= 8 &&
      hasUpper &&
      hasNumber &&
      hasSymbol
    ) {

      return {
        text: "Fuerte",
        color: "bg-green-500",
        width: "100%",
      };

    }

    return {
      text: "Intermedia",
      color: "bg-yellow-400",
      width: "66%",
    };

  };

  const strength =
    getPasswordStrength(password);

  const handleRegister = async (
    e: React.FormEvent
  ) => {

    e.preventDefault();

    if (
      !nombre ||
      !email ||
      !telefono ||
      !password ||
      !confirmPassword
    ) {

      toast.error(
        "Completa todos los campos"
      );

      return;

    }

    if (
      strength.text === "Débil"
    ) {

      toast.error(
        "La contraseña es demasiado débil"
      );

      return;

    }

    if (
      password !==
      confirmPassword
    ) {

      toast.error(
        "Las contraseñas no coinciden"
      );

      return;

    }

    try {

      setLoading(true);

      await registerUser({

        nombre,
        email,
        telefono,
        password,

      });

      toast.success(
        "Cuenta creada correctamente"
      );

      navigate("/login");

    } catch (error: any) {

      console.log(error);

      toast.error(

        error?.response?.data?.message ||

        "Error al registrarse"

      );

    } finally {

      setLoading(false);

    }

  };

  return (

    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4">

      <form
        onSubmit={handleRegister}
        className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-xl"
      >

        <h1 className="text-3xl font-bold text-white text-center mb-6">
          Crear Cuenta
        </h1>

        <input
          type="text"
          placeholder="Nombre completo"
          value={nombre}
          onChange={(e) =>
            setNombre(e.target.value)
          }
          className="w-full mb-4 px-4 py-3 rounded-xl bg-slate-800 text-white border border-slate-700 focus:outline-none focus:border-yellow-400"
        />

        <input
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
          className="w-full mb-4 px-4 py-3 rounded-xl bg-slate-800 text-white border border-slate-700 focus:outline-none focus:border-yellow-400"
        />

        <input
          type="text"
          placeholder="Teléfono"
          value={telefono}
          onChange={(e) =>
            setTelefono(e.target.value)
          }
          className="w-full mb-4 px-4 py-3 rounded-xl bg-slate-800 text-white border border-slate-700 focus:outline-none focus:border-yellow-400"
        />

        {/* CONTRASEÑA */}

        <div className="relative mb-3">

          <input
            type={
              showPassword
                ? "text"
                : "password"
            }
            placeholder="Contraseña"
            value={password}
            onChange={(e) =>
              setPassword(
                e.target.value
              )
            }
            className="w-full px-4 py-3 rounded-xl bg-slate-800 text-white border border-slate-700 focus:outline-none focus:border-yellow-400"
          />

          <button
            type="button"
            onClick={() =>
              setShowPassword(
                !showPassword
              )
            }
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
          >

            {
              showPassword
                ? <EyeOff size={20} />
                : <Eye size={20} />
            }

          </button>

        </div>

        {/* SEGURIDAD */}

        {password && (

          <>

            <div className="w-full h-3 bg-slate-700 rounded-full overflow-hidden mb-2">

              <div
                className={`h-full ${strength.color} transition-all duration-300`}
                style={{
                  width: strength.width,
                }}
              />

            </div>

            <p className="text-sm text-slate-300 mb-4">

              Seguridad:

              <span className="ml-2 font-bold">
                {strength.text}
              </span>

            </p>

          </>

        )}

        {/* CONFIRMAR CONTRASEÑA */}

        <div className="relative mb-6">

          <input
            type={
              showConfirmPassword
                ? "text"
                : "password"
            }
            placeholder="Confirmar contraseña"
            value={confirmPassword}
            onChange={(e) =>
              setConfirmPassword(
                e.target.value
              )
            }
            className="w-full px-4 py-3 rounded-xl bg-slate-800 text-white border border-slate-700 focus:outline-none focus:border-yellow-400"
          />

          <button
            type="button"
            onClick={() =>
              setShowConfirmPassword(
                !showConfirmPassword
              )
            }
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
          >

            {
              showConfirmPassword
                ? <EyeOff size={20} />
                : <Eye size={20} />
            }

          </button>

        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-yellow-400 text-black font-bold py-3 rounded-xl hover:bg-yellow-300 transition disabled:opacity-60"
        >

          {
            loading
              ? "Registrando..."
              : "Registrarse"
          }

        </button>

      </form>

    </div>

  );

}

export default Register;