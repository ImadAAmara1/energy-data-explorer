import { useEffect, useRef, useState } from "react";
import { useBarChart } from "./useBarChart";

export function BarChart({ data, selectedCountries }) {
  const svgRef = useRef(null);
  const tooltipRef = useRef(null);
  const [currentYear, setCurrentYear] = useState(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const animationRef = useRef(null);

  const { renderChart, startBarRace, stopBarRace } = useBarChart();

  useEffect(() => {
    if (data && selectedCountries.length > 0) {
      renderChart(
        svgRef.current,
        tooltipRef.current,
        data,
        selectedCountries,
        currentYear
      );
    }
  }, [data, selectedCountries, currentYear, renderChart]);

  const handleStartRace = () => {
    if (isAnimating) {
      stopBarRace(animationRef);
      setIsAnimating(false);
    } else {
      setIsAnimating(true);
      startBarRace(data, setCurrentYear, animationRef, () =>
        setIsAnimating(false)
      );
    }
  };

  if (!data || selectedCountries.length === 0) {
    return (
      <div className="flex items-center justify-center h-96 text-gray-500">
        Sélectionnez au moins un pays
      </div>
    );
  }

  return (
    <div className="relative w-full flex flex-col">
      {/* Bouton de contrôle en haut à droite */}
      <div className="flex justify-center md:justify-end mb-4">
        <button
          onClick={handleStartRace}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium transition-all shadow-md hover:shadow-lg ${
            isAnimating
              ? "bg-red-600 hover:bg-red-700 text-white"
              : "bg-green-600 hover:bg-green-700 text-white"
          }`}
        >
          {isAnimating ? (
            <>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="18px"
                viewBox="0 -960 960 960"
                width="18px"
                fill="currentColor"
              >
                <path d="M520-200v-560h240v560H520Zm-320 0v-560h240v560H200Zm400-80h80v-400h-80v400Zm-320 0h80v-400h-80v400Zm0-400v400-400Zm320 0v400-400Z" />
              </svg>
              Arrêter
            </>
          ) : (
            <>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="18px"
                viewBox="0 -960 960 960"
                width="18px"
                fill="currentColor"
              >
                <path d="M320-200v-560l440 280-440 280Zm80-280Zm0 134 210-134-210-134v268Z" />
              </svg>
              Lancer
            </>
          )}
        </button>
      </div>

      <div className="overflow-x-auto">
        <svg ref={svgRef} className="w-full h-auto min-w-[300px]"></svg>
      </div>
      <div
        ref={tooltipRef}
        className="absolute bg-white text-gray-700 text-sm shadow-xl rounded-lg px-4 py-3 pointer-events-none opacity-0 transition-all duration-200 border border-gray-200 min-w-48 backdrop-blur-sm"
      ></div>
    </div>
  );
}
