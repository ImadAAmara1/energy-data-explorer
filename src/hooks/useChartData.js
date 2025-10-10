import { useMemo } from "react";
import * as d3 from "d3";

export function processChartData(data, selectedCountries) {
  if (!data || data.length === 0) {
    return { dataByCountry: new Map(), countries: [], filteredData: [] };
  }

  const filteredData =
    selectedCountries.length > 0
      ? data.filter((row) => selectedCountries.includes(row.entity))
      : data;

  const dataByCountry = d3.group(filteredData, (d) => d.entity);
  const countries = Array.from(dataByCountry.keys());

  return { dataByCountry, countries, filteredData };
}

export function createColorScale(countries) {
  return d3.scaleOrdinal().domain(countries).range(d3.schemeCategory10);
}

// Hook pour utiliser dans les composants
export function useChartData(data, selectedCountries) {
  return useMemo(() => {
    return processChartData(data, selectedCountries);
  }, [data, selectedCountries]);
}

export function useColorScale(countries) {
  return useMemo(() => {
    return createColorScale(countries);
  }, [countries]);
}
