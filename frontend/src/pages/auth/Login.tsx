import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../services/authService";
import toast from "react-hot-toast";
import { Link }
  from "react-router-dom";
import {
  Eye,
  EyeOff,
} from "lucide-react";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] =
    useState(false);

  const [numero1] = useState(Math.floor(Math.random() * 10));
  const [numero2] = useState(Math.floor(Math.random() * 10));
  const [captcha, setCaptcha] = useState("");

  const handleLogin = async (
    e: React.FormEvent
  ) => {

    e.preventDefault();

    if (
      Number(captcha) !==
      numero1 + numero2
    ) {

      toast.error(
        "Captcha incorrecto"
      );

      return;

    }

    try {

      const data =
        await loginUser({

          email,
          password

        });

      localStorage.setItem(
        "token",
        data.token
      );

      localStorage.setItem(
        "user",
        JSON.stringify(
          data.usuario
        )
      );

      toast.success(
        `Bienvenido ${data.usuario.nombre}`
      );

      if (
        data.usuario.rol === "admin"
      ) {

        navigate(
          "/admin/dashboard"
        );

      } else {

        navigate(
          "/user/dashboard"
        );

      }

    } catch (error: any) {

      console.log(error);

      toast.error(

        error?.response?.data?.message ||

        "Error en login"

      );

    }

  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4">
      <form
        onSubmit={handleLogin}
        className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-xl"
      >
        <h1 className="text-3xl font-bold text-white text-center mb-6">
          Iniciar Sesión
        </h1>

        <input
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full mb-4 px-4 py-3 rounded-xl bg-slate-800 text-white border border-slate-700 focus:outline-none focus:border-yellow-400"
        />

        <div className="relative mb-4">

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
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
          >

            {
              showPassword
                ? <EyeOff size={20} />
                : <Eye size={20} />
            }

          </button>

        </div>

        <label className="text-slate-300 text-sm mb-2 block">
          ¿Cuánto es {numero1} + {numero2}?
        </label>

        <input
          type="number"
          value={captcha}
          onChange={(e) => setCaptcha(e.target.value)}
          className="w-full mb-6 px-4 py-3 rounded-xl bg-slate-800 text-white border border-slate-700 focus:outline-none focus:border-yellow-400"
        />
        <div className="text-right mb-4">

          <Link

            to="/forgot-password"

            className="
      text-yellow-400
      hover:underline
      text-sm
    "

          >

            ¿Olvidaste tu contraseña?

          </Link>

        </div>

        <button
          type="submit"
          className="w-full bg-yellow-400 text-black font-bold py-3 rounded-xl hover:bg-yellow-300 transition"
        >
          Ingresar
        </button>
      </form>
    </div>
  );
}

export default Login;