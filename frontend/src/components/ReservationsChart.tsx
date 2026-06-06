import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  Cell
} from "recharts";

type Props = {
  pendientes: number;
  confirmadas: number;
  canceladas: number;
};

function ReservationsChart({
  pendientes,
  confirmadas,
  canceladas
}: Props) {

  const data = [

    {
      name: "Pendientes",
      cantidad: pendientes,
      color: "#facc15"
    },

    {
      name: "Confirmadas",
      cantidad: confirmadas,
      color: "#22c55e"
    },

    {
      name: "Canceladas",
      cantidad: canceladas,
      color: "#ef4444"
    }

  ];

  return (

    <div>

      <h2
        className="
          text-2xl
          font-bold
          mb-6
          text-slate-800
        "
      >
        Estadísticas de Reservas
      </h2>

      <ResponsiveContainer
        width="100%"
        height={350}
      >

        <BarChart
          data={data}
          margin={{
            top: 20,
            right: 30,
            left: 0,
            bottom: 5,
          }}
        >

          <CartesianGrid
            strokeDasharray="3 3"
            opacity={0.2}
          />

          <XAxis
            dataKey="name"
            tick={{
              fill: "#475569",
              fontSize: 14
            }}
          />

          <YAxis
            tick={{
              fill: "#475569",
              fontSize: 14
            }}
          />

          <Tooltip
            contentStyle={{
              borderRadius: "14px",
              border: "none",
              boxShadow:
                "0 10px 25px rgba(0,0,0,0.15)"
            }}
          />

          <Legend />

          <Bar
            dataKey="cantidad"
            radius={[12, 12, 0, 0]}
            animationDuration={1200}
          >

            {
              data.map((entry, index) => (

                <Cell
                  key={index}
                  fill={entry.color}
                />

              ))
            }

          </Bar>

        </BarChart>

      </ResponsiveContainer>

    </div>

  );

}

export default ReservationsChart;