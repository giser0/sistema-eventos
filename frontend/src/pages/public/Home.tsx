import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { localService } from "../../services/localService";

function Home() {
  const [local, setLocal] = useState<any>(null);

 useEffect(() => {

  const cargarLocal = async () => {

    try {

      const locales =
        await localService.getAll();

      if (locales.length > 0) {
        setLocal(locales[0]);
      }

    } catch (error) {

      console.log(error);

    }

  };

  cargarLocal();

}, []);
  if (!local) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950 text-white">
        Cargando información del local...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* HEADER */}
      <header className="absolute top-0 w-full z-10">
        <div className="max-w-7xl mx-auto px-6 py-6 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-yellow-400">
            EventLux
          </h1>

          <div className="flex gap-4">
            <Link
              to="/login"
              className="px-5 py-2 rounded-xl border border-white/20 hover:bg-white/10 transition"
            >
              Iniciar sesión
            </Link>

            <Link
              to="/register"
              className="px-5 py-2 rounded-xl bg-yellow-400 text-black font-semibold hover:bg-yellow-300 transition"
            >
              Registrarse
            </Link>
          </div>
        </div>
      </header>

      {/* HERO */}
      <section className="relative h-screen flex items-center">
        <img
          src="https://images.unsplash.com/photo-1519167758481-83f550bb49b3"
          alt="evento"
          className="absolute inset-0 w-full h-full object-cover opacity-25"
        />

        <div className="relative max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
          <div>
            <span className="inline-block mb-4 px-4 py-2 text-sm rounded-full bg-yellow-400/10 text-yellow-400">
              Sistema profesional de reservas
            </span>

            <h2 className="text-6xl font-extrabold leading-tight mb-6">
              {local.nombre}
              <br />
              <span className="text-yellow-400">
                El lugar perfecto para tu evento
              </span>
            </h2>

            <p className="text-slate-300 text-lg mb-8 max-w-xl">
              Dirección: {local.direccion} <br />
              Teléfono: {local.telefono}
            </p>

            <div className="flex gap-4">
              <Link
                to="/register"
                className="px-8 py-4 bg-yellow-400 text-black rounded-xl font-bold hover:bg-yellow-300 transition"
              >
                Reservar ahora
              </Link>

              <Link
                to="/login"
                className="px-8 py-4 border border-white/20 rounded-xl hover:bg-white/10 transition"
              >
                Ver disponibilidad
              </Link>
            </div>
          </div>

          {/* STATS */}
          <div className="bg-slate-900/70 backdrop-blur-md border border-slate-800 rounded-3xl p-10 grid grid-cols-2 gap-6 text-center">
            <div>
              <h3 className="text-3xl font-bold text-yellow-400">
                Bs. {local.precio}
              </h3>
              <p className="text-slate-400 mt-2">
                Precio base
              </p>
            </div>

            <div>
              <h3 className="text-3xl font-bold text-yellow-400">
                {local.capacidad}
              </h3>
              <p className="text-slate-400 mt-2">
                Capacidad máxima
              </p>
            </div>

            <div>
              <h3 className="text-3xl font-bold text-yellow-400">
                4.9
              </h3>
              <p className="text-slate-400 mt-2">
                Calificación
              </p>
            </div>

            <div>
              <h3 className="text-3xl font-bold text-yellow-400">
                24/7
              </h3>
              <p className="text-slate-400 mt-2">
                Atención
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* GALERÍA */}
      <section className="py-28">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-6">
            Espacios diseñados para impresionar
          </h2>

          <p className="text-slate-400 text-center max-w-2xl mx-auto mb-16">
            Ambientes modernos y elegantes ideales para todo tipo de eventos.
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              "https://images.unsplash.com/photo-1492684223066-81342ee5ff30",
              "https://images.unsplash.com/photo-1511578314322-379afb476865",
              "https://images.unsplash.com/photo-1527529482837-4698179dc6ce",
            ].map((img, index) => (
              <div
                key={index}
                className="overflow-hidden rounded-3xl border border-slate-800 group"
              >
                <img
                  src={img}
                  alt="evento"
                  className="h-96 w-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="bg-slate-900 py-24">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-14">
            ¿Por qué elegir EventLux?
          </h2>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              "Locales modernos",
              "Reservas rápidas",
              "Pagos seguros",
              "Atención personalizada",
            ].map((item, index) => (
              <div
                key={index}
                className="bg-slate-950 border border-slate-800 rounded-2xl p-8 text-center hover:border-yellow-400/40 transition"
              >
                <p className="text-lg font-semibold">
                  {item}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-slate-800 py-12">
        <div className="max-w-7xl mx-auto px-6 text-center text-slate-400">
          <p>
            © {new Date().getFullYear()} EventLux
          </p>
          <p className="mt-2">
            {local.direccion}
          </p>
        </div>
      </footer>
    </div>
  );
}

export default Home;