import { useEffect, useRef } from "react";
import { useLineChart } from "./useLineChart";

export function LineChart({ data, selectedCountries }) {
  const svgRef = useRef(null);
  const tooltipRef = useRef(null);

  const { renderChart } = useLineChart();

  useEffect(() => {
    if (data && selectedCountries.length > 0) {
      renderChart(svgRef.current, tooltipRef.current, data, selectedCountries);
    }
  }, [data, selectedCountries, renderChart]);

  if (!data || selectedCountries.length === 0) {
    return (
      <div className="flex items-center justify-center h-96 text-gray-500">
        Sélectionnez au moins un pays
      </div>
    );
  }

  return (
    <div className="relative w-full">
      <svg ref={svgRef} className="w-full h-auto"></svg>
      <div
        ref={tooltipRef}
        className="absolute bg-white text-gray-700 text-sm shadow-xl rounded-lg px-4 py-3 pointer-events-none opacity-0 transition-all duration-200 border border-gray-200 min-w-48 backdrop-blur-sm"
      ></div>
    </div>
  );
}
