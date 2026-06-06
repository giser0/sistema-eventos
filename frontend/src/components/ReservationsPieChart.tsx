import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";

type Props = {
  pendientes: number;
  confirmadas: number;
  canceladas: number;
};

function ReservationsPieChart({
  pendientes,
  confirmadas,
  canceladas
}: Props) {

  const data = [

    {
      name: "Pendientes",
      value: pendientes,
      color: "#facc15"
    },

    {
      name: "Confirmadas",
      value: confirmadas,
      color: "#22c55e"
    },

    {
      name: "Canceladas",
      value: canceladas,
      color: "#ef4444"
    }

  ];

  return (

    <div
      className="
      bg-gradient-to-br
      from-slate-900
      to-slate-800
      rounded-3xl
      p-6
      shadow-xl
      border
      border-slate-700
      hover:scale-[1.01]
      transition
    "
    >

      <div className="flex items-center justify-between mb-5">

        <div>

          <h2
            className="
            text-2xl
            font-bold
            text-white
          "
          >
            Estadísticas
          </h2>

          <p className="text-slate-400 text-sm">
            Reservas por estado
          </p>

        </div>

        <div
          className="
          w-4
          h-4
          rounded-full
          bg-green-500
          animate-pulse
        "
        />

      </div>

      <ResponsiveContainer
        width="100%"
        height={320}
      >

        <PieChart>

          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            outerRadius={110}
            innerRadius={60}
            paddingAngle={5}
            label={({ percent }) =>
             `${((percent || 0) * 100).toFixed(0)}%`
            }
          >

            {
              data.map((entry, index) => (

                <Cell
                  key={index}
                  fill={entry.color}
                />

              ))
            }

          </Pie>

          <Tooltip />

          <Legend />

        </PieChart>

      </ResponsiveContainer>

    </div>

  );

}

export default ReservationsPieChart;