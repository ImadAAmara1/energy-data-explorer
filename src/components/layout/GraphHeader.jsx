export function GraphHeader({
  title,
  subtitle,
  chartType,
  onChartTypeChange,
  dataLoading,
}) {
  return (
    <div className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Titre et sous-titre avec indicateur de chargement */}
        <div className="flex-1">
          <div className="flex items-center gap-3">
            <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
          </div>
          <p className="text-gray-600 mt-1.5 text-sm">{subtitle}</p>
          <p className="text-xs text-gray-500">
            Toutes les données en TWh (Térawatt-heures)
          </p>
        </div>

        {/* Boutons de sélection de graphique - Désactivés pendant le chargement */}
        <div
          className={`flex gap-1 bg-gray-100 rounded-lg p-1 transition-all ${
            dataLoading ? "opacity-50" : ""
          }`}
        >
          <button
            onClick={() => !dataLoading && onChartTypeChange("line")}
            disabled={dataLoading}
            className={`px-4 py-2 rounded-md font-medium text-xs transition-all flex items-center gap-2 ${
              chartType === "line"
                ? "bg-white text-gray-900 shadow-sm"
                : dataLoading
                ? "text-gray-400 cursor-not-allowed"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="18px"
              viewBox="0 -960 960 960"
              width="18px"
              fill="currentColor"
            >
              <path d="m140-220-60-60 300-300 160 160 284-320 56 56-340 384-160-160-240 240Z" />
            </svg>
            Graphique Linéaire
          </button>
          <button
            onClick={() => !dataLoading && onChartTypeChange("bar")}
            disabled={dataLoading}
            className={`px-4 py-2 rounded-md font-medium text-xs transition-all flex items-center gap-2 ${
              chartType === "bar"
                ? "bg-white text-gray-900 shadow-sm"
                : dataLoading
                ? "text-gray-400 cursor-not-allowed"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="18px"
              viewBox="0 -960 960 960"
              width="18px"
              fill="currentColor"
            >
              <path d="M640-160v-280h160v280H640Zm-240 0v-640h160v640H400Zm-240 0v-440h160v440H160Z" />
            </svg>
            Graphique en Barres
          </button>
        </div>
      </div>
    </div>
  );
}
