export function ChartControls({ chartType, onChartTypeChange }) {
  const chartTypes = [
    { id: "line", label: " Lignes", description: "Évolution temporelle" },
    { id: "bar", label: " Barres", description: "Comparaison par année" },
  ];

  return (
    <div className="flex flex-col gap-2">
      <label className="font-medium uppercase tracking-wide text-xs text-gray-500">
        Type de visualisation
      </label>
      <div className="flex gap-2">
        {chartTypes.map((type) => (
          <button
            key={type.id}
            onClick={() => onChartTypeChange(type.id)}
            className={`flex-1 py-2 px-3 text-sm rounded-md transition-all ${
              chartType === type.id
                ? "bg-blue-500 text-white shadow-md"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
            title={type.description}
          >
            {type.label}
          </button>
        ))}
      </div>
    </div>
  );
}
