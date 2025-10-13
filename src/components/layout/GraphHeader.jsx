export function GraphHeader({
  title,
  subtitle,
  chartType,
  onChartTypeChange,
  dataLoading,
}) {
  return (
    <div className="bg-white border-b border-gray-200 px-4 md:px-6 py-4">
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
        {/* Titre et sous-titre avec indicateur de chargement */}
        <div className="flex-1">
          <div className="flex items-center gap-3">
            <h2 className="text-xl md:text-2xl font-bold text-gray-900">{title}</h2>
            {dataLoading && (
              <div className="flex items-center gap-2 bg-blue-50 px-2 py-1 rounded-md">
                <div className="w-3 h-3 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                <span className="text-xs text-blue-700 font-medium">Chargement...</span>
              </div>
            )}
          </div>
          <p className="text-gray-600 mt-1.5 text-sm">{subtitle}</p>
          <p className="text-xs text-gray-500 mt-1">
            Données en TWh (Térawatt-heures) | Visualisations interactives
          </p>
        </div>

        {/* Boutons de sélection de graphique */}
        <div className="flex gap-1 bg-gray-100 rounded-lg p-1 w-full lg:w-auto">
          <button
            onClick={() => !dataLoading && onChartTypeChange("line")}
            disabled={dataLoading}
            className={`px-3 py-2 rounded-md font-medium text-xs transition-all flex items-center gap-2 flex-1 lg:flex-none justify-center ${
              chartType === "line"
                ? "bg-white text-gray-900 shadow-sm"
                : dataLoading
                ? "text-gray-400 cursor-not-allowed"
                : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
            }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="16px"
              viewBox="0 -960 960 960"
              width="16px"
              fill="currentColor"
            >
              <path d="m140-220-60-60 300-300 160 160 284-320 56 56-340 384-160-160-240 240Z" />
            </svg>
            Linéaire
          </button>
          <button
            onClick={() => !dataLoading && onChartTypeChange("bar")}
            disabled={dataLoading}
            className={`px-3 py-2 rounded-md font-medium text-xs transition-all flex items-center gap-2 flex-1 lg:flex-none justify-center ${
              chartType === "bar"
                ? "bg-white text-gray-900 shadow-sm"
                : dataLoading
                ? "text-gray-400 cursor-not-allowed"
                : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
            }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="16px"
              viewBox="0 -960 960 960"
              width="16px"
              fill="currentColor"
            >
              <path d="M640-160v-280h160v280H640Zm-240 0v-640h160v640H400Zm-240 0v-440h160v440H160Z" />
            </svg>
            Barres
          </button>
        </div>
      </div>
    </div>
  );
}