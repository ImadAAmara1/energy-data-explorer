import { useState } from "react";
import { useCSVData } from "./hooks/useCSVData";
import { CountrySelector } from "./components/CountrySelector";
import { ChartContainer } from "./components/ui/ChartContainer";
import { LoadingSpinner } from "./components/ui/LoadingSpinner";
import { LineChart, BarChart } from "./components/charts";
import { Header } from "./components/layout/Header";
import { Footer } from "./components/layout/Footer";
import { GraphHeader } from "./components/layout/GraphHeader";
import { SourceDescription } from "./components/layout/SourceDescription";
import "./index.css";
import { SOURCE_DATA } from "./constants/sourceData";

function App() {
  const [source, setSource] = useState("renouvelable");
  const [selectedCountries, setSelectedCountries] = useState([
    "France",
    "Germany",
    "United States",
    "China",
  ]);
  const [chartType, setChartType] = useState("line");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const { data, loading, error } = useCSVData(source, selectedCountries);

  const onChangeSource = (e) => {
    setSource(e.target.value);
    setSelectedCountries(["France", "Germany", "United States", "China"]);
  };

  // 🎯 FONCTION DE RENDU DU GRAPHIQUE AVEC GESTION DU CHARGEMENT
  const renderChartContent = () => {
    if (loading) {
      return (
        <div className="flex items-center justify-center h-96">
          <LoadingSpinner message="Chargement des données du graphique..." />
        </div>
      );
    }

    if (error) {
      return (
        <div className="flex items-center justify-center h-96 text-red-500">
          <div className="text-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="48px"
              viewBox="0 -960 960 960"
              width="48px"
              fill="#ef4444"
              className="mx-auto mb-4"
            >
              <path d="M40-120v-80h880v80H40Zm120-120L80-720l200-120 200 120 200-120 200 120-80 480H160Zm84-80h472l54-336-146-88-174 104-174-104-146 88 54 336Zm196-120q17 0 28.5-11.5T480-480q0-17-11.5-28.5T440-520q-17 0-28.5 11.5T400-480q0 17 11.5 28.5T440-440Zm80-120q17 0 28.5-11.5T560-600q0-17-11.5-28.5T520-640q-17 0-28.5 11.5T480-600q0 17 11.5 28.5T520-560ZM244-320h472-472Z" />
            </svg>
            <p className="text-lg font-semibold">Erreur de chargement</p>
            <p className="text-sm mt-2">{error.message}</p>
          </div>
        </div>
      );
    }

    switch (chartType) {
      case "line":
        return <LineChart data={data} selectedCountries={selectedCountries} />;
      case "bar":
        return <BarChart data={data} selectedCountries={selectedCountries} />;
      default:
        return <LineChart data={data} selectedCountries={selectedCountries} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* HEADER - Toujours visible */}
      <Header />

      <div className="flex-1 flex relative">
        {/* Bouton Menu Mobile */}
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="lg:hidden fixed bottom-6 right-6 z-50 bg-green-600 text-white p-4 rounded-full shadow-lg hover:bg-green-700 transition-all"
          aria-label="Toggle menu"
        >
          <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor">
            <path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z"/>
          </svg>
        </button>

        {/* Overlay Mobile */}
        {sidebarOpen && (
          <div
            className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-30"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* PANEAU LATÉRAL - Responsive */}
        <div className={`
          fixed lg:relative
          inset-y-0 left-0
          z-40 lg:z-0
          w-72 bg-white shadow-sm p-4 flex flex-col space-y-3 border-r border-gray-200
          transform transition-transform duration-300 ease-in-out
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}>
          {/* Sélecteur de source - Toujours visible */}
          <div className="flex flex-col gap-1.5">
            <label className="font-semibold uppercase tracking-wide text-xs text-gray-700">
              Source d'énergie
            </label>
            <select
              value={source}
              onChange={onChangeSource}
              className="border border-gray-300 rounded-md py-2 px-3 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 text-gray-800 transition-all hover:border-gray-400 shadow-sm"
            >
              {Object.entries(SOURCE_DATA).map(([key, { title }]) => (
                <option key={key} value={key}>
                  {title}
                </option>
              ))}
            </select>
          </div>

          {/* Sélecteur de pays - Peut montrer le chargement */}
          <CountrySelector
            selectedCountries={selectedCountries}
            onCountriesChange={setSelectedCountries}
            source={source}
            dataLoading={loading} // 🆕 Prop pour indiquer le chargement des données
          />

          {/* Indicateur de sélection - Toujours visible */}
          <div className="p-2.5 bg-gray-50 rounded-md border border-gray-200 flex-1 flex flex-col">
            <h3 className="font-semibold text-gray-800 text-xs mb-1.5 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 bg-green-600 rounded-full animate-pulse"></span>
              Pays sélectionnés ({selectedCountries.length})
            </h3>
            {selectedCountries.length === 0 ? (
              <p className="text-gray-500 text-xs italic">
                Aucun pays sélectionné
              </p>
            ) : (
              <div className="flex-1 overflow-y-auto space-y-0.5">
                {selectedCountries.map((country) => (
                  <div
                    key={country}
                    className="text-gray-700 text-xs py-1 px-1.5 bg-white rounded border border-gray-200"
                  >
                    • {country}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* ZONE PRINCIPALE - Toujours visible */}
        <div className="flex-1 flex flex-col">
          {/* EN-TÊTE DU GRAPHIQUE - Toujours visible */}
          <GraphHeader
            title={SOURCE_DATA[source].title}
            subtitle={SOURCE_DATA[source].description}
            chartType={chartType}
            onChartTypeChange={setChartType}
            dataLoading={loading} // 🆕 Indicateur de chargement
          />

          {/* CONTENU GRAPHIQUE - Montre le chargement si nécessaire */}
          <div className="flex-1 p-3 md:p-5 space-y-3 md:space-y-5">
            <ChartContainer>
              {renderChartContent()} {/* 🎯 Ici le chargement s'affiche */}
            </ChartContainer>

            {/* DESCRIPTION DE LA SOURCE - Toujours visible */}
            <SourceDescription
              description={SOURCE_DATA[source].fullDescription}
            />
          </div>
        </div>
      </div>

      {/* FOOTER - Toujours visible */}
      <Footer />
    </div>
  );
}

export default App;
