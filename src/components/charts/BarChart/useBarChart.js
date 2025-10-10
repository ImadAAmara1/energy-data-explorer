import { useCallback } from "react";
import * as d3 from "d3";
import {
  processChartData,
  createColorScale,
} from "../../../hooks/useChartData";

export function useBarChart() {
  const renderChart = useCallback(
    (svgElement, tooltipElement, data, selectedCountries, currentYear) => {
      const svg = d3.select(svgElement);

      // Ne pas tout supprimer pour permettre les transitions
      if (!svg.select("g.chart-group").node()) {
        svg.selectAll("*").remove();
      }

      // Si aucun pays sélectionné
      if (selectedCountries.length === 0) {
        svg
          .append("text")
          .attr("x", 400)
          .attr("y", 200)
          .attr("text-anchor", "middle")
          .attr("fill", "#6b7280")
          .attr("font-size", "16px")
          .text("Veuillez sélectionner au moins un pays");
        return;
      }

      if (!data || data.length === 0) return;

      const width = 800;
      const height = 500;
      const margin = { top: 60, right: 100, bottom: 50, left: 150 };

      svg
        .attr("viewBox", `0 0 ${width} ${height}`)
        .attr("preserveAspectRatio", "xMidYMid meet")
        .style("max-width", "100%")
        .style("height", "auto");

      let chart = svg.select("g.chart-group");
      if (chart.empty()) {
        chart = svg
          .append("g")
          .attr("class", "chart-group")
          .attr("transform", `translate(${margin.left},${margin.top})`);
      }

      const innerWidth = width - margin.left - margin.right;
      const innerHeight = height - margin.top - margin.bottom;

      // 🚨 CORRECTION : Utiliser les fonctions pures
      const { dataByCountry, countries } = processChartData(
        data,
        selectedCountries
      );
      const colorScale = createColorScale(countries);

      // Obtenir la dernière année disponible
      const years = [...new Set(data.map((d) => d.year))].sort();
      const targetYear = currentYear || years[years.length - 1];

      // Filtrer les données pour l'année cible
      const yearData = data
        .filter(
          (d) => d.year === targetYear && selectedCountries.includes(d.entity)
        )
        .sort((a, b) => b.electricity - a.electricity);

      // Échelles pour le graphique en barres
      const x = d3
        .scaleLinear()
        .domain([0, d3.max(yearData, (d) => d.electricity)])
        .range([0, innerWidth]);

      const y = d3
        .scaleBand()
        .domain(yearData.map((d) => d.entity))
        .range([0, innerHeight])
        .padding(0.2);

      // Animation des barres avec transitions fluides
      const t = d3.transition().duration(800).ease(d3.easeCubicOut);
      const bars = chart.selectAll(".bar").data(yearData, (d) => d.entity);

      // EXIT - Barres qui sortent
      bars
        .exit()
        .transition(t)
        .attr("y", innerHeight + 50)
        .attr("height", 0)
        .attr("width", 0)
        .style("opacity", 0)
        .remove();

      // ENTER + UPDATE - Nouvelles barres et mise à jour
      bars
        .enter()
        .append("rect")
        .attr("class", "bar")
        .attr("fill", (d) => colorScale(d.entity))
        .attr("x", 0)
        .attr("y", innerHeight + 50)
        .attr("height", 0)
        .attr("width", 0)
        .attr("rx", 3)
        .style("opacity", 0)
        .merge(bars)
        .transition(t)
        .attr("y", (d) => y(d.entity))
        .attr("height", y.bandwidth())
        .attr("width", (d) => x(d.electricity))
        .style("opacity", 1);

      // Labels des valeurs avec animation et compteur
      const labels = chart
        .selectAll(".bar-label")
        .data(yearData, (d) => d.entity);

      labels
        .exit()
        .transition(t)
        .attr("y", innerHeight + 50)
        .style("opacity", 0)
        .remove();

      labels
        .enter()
        .append("text")
        .attr("class", "bar-label")
        .attr("font-size", "12px")
        .attr("font-weight", "bold")
        .attr("fill", "#374151")
        .attr("dy", "0.35em")
        .attr("y", innerHeight + 50)
        .style("opacity", 0)
        .merge(labels)
        .transition(t)
        .attr("x", (d) => x(d.electricity) + 5)
        .attr("y", (d) => y(d.entity) + y.bandwidth() / 2)
        .style("opacity", 1)
        .tween("text", function (d) {
          const element = d3.select(this);
          const previousValue = +element.text().replace(/ TWh/g, "") || 0;
          const interpolator = d3.interpolateNumber(
            previousValue,
            d.electricity
          );
          return (t) => {
            element.text(`${interpolator(t).toFixed(1)} TWh`);
          };
        });

      // Axes avec transitions
      const xAxis = chart.selectAll(".x-axis").data([null]);
      xAxis
        .enter()
        .append("g")
        .attr("class", "x-axis")
        .attr("transform", `translate(0, ${innerHeight})`)
        .merge(xAxis)
        .transition(t)
        .call(d3.axisBottom(x));

      const yAxis = chart.selectAll(".y-axis").data([null]);
      yAxis
        .enter()
        .append("g")
        .attr("class", "y-axis")
        .merge(yAxis)
        .transition(t)
        .call(d3.axisLeft(y));

      // Titre avec l'année (mise à jour fluide)
      const title = chart.selectAll(".year-title").data([targetYear]);

      title
        .enter()
        .append("text")
        .attr("class", "year-title")
        .attr("x", innerWidth / 2)
        .attr("y", -20)
        .attr("text-anchor", "middle")
        .attr("fill", "#374151")
        .attr("font-size", "16px")
        .attr("font-weight", "bold")
        .merge(title)
        .text(`Production d'électricité - ${targetYear}`);
    },
    []
  );

  const startBarRace = useCallback(
    (data, setCurrentYear, animationRef, onComplete) => {
      const years = [...new Set(data.map((d) => d.year))].sort();
      let currentIndex = 0;

      const animateNextYear = () => {
        if (currentIndex < years.length) {
          setCurrentYear(years[currentIndex]);
          currentIndex++;
          animationRef.current = setTimeout(animateNextYear, 800);
        } else {
          onComplete();
        }
      };

      animateNextYear();
    },
    []
  );

  const stopBarRace = useCallback((animationRef) => {
    if (animationRef.current) {
      clearTimeout(animationRef.current);
      animationRef.current = null;
    }
  }, []);

  return { renderChart, startBarRace, stopBarRace };
}
