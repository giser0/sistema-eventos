interface Props {
  title: string;
  value: string | number;
}

function StatCard({
  title,
  value,
}: Props) {
  return (
    <div className="bg-white rounded-2xl shadow-md border border-slate-200 p-6 hover:shadow-xl transition-all duration-300">

      <p className="text-slate-500 text-sm mb-2">
        {title}
      </p>

      <h2 className="text-3xl font-bold text-slate-900">
        {value}
      </h2>

    </div>
  );
}

export default StatCard;