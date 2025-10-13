import { useCallback } from "react";
import * as d3 from "d3";
import {
  processChartData,
  createColorScale,
} from "../../../hooks/useChartData";

export function useLineChart() {
  const renderChart = useCallback(
    (svgElement, tooltipElement, data, selectedCountries) => {
      const svg = d3.select(svgElement);
      svg.selectAll("*").remove();

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

      // Traiter les données d'abord pour obtenir la liste des pays
      const { dataByCountry, countries } = processChartData(
        data,
        selectedCountries
      );
      
      // Calculer la largeur nécessaire pour la légende
      const maxCountryNameLength = Math.max(...countries.map(c => c.length));
      const legendWidth = Math.max(120, maxCountryNameLength * 8 + 40);
      
      const width = 800;
      const height = 500;
      const margin = { top: 60, right: legendWidth, bottom: 50, left: 70 };

      svg
        .attr("viewBox", `0 0 ${width} ${height}`)
        .attr("preserveAspectRatio", "xMidYMid meet")
        .style("max-width", "100%")
        .style("height", "auto");

      const chart = svg
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

      const innerWidth = width - margin.left - margin.right;
      const innerHeight = height - margin.top - margin.bottom;
      const colorScale = createColorScale(countries);

      // Échelles X et Y
      const x = d3
        .scaleLinear()
        .domain(d3.extent(data, (d) => d.year))
        .range([0, innerWidth]);

      const y = d3
        .scaleLinear()
        .domain([0, d3.max(data, (d) => d.electricity)])
        .nice()
        .range([innerHeight, 0]);

      // Grille horizontale
      const yTicks = y.ticks(6);
      chart
        .selectAll(".horizontal-grid")
        .data(yTicks)
        .enter()
        .append("line")
        .attr("class", "horizontal-grid")
        .attr("x1", 0)
        .attr("x2", innerWidth)
        .attr("y1", (d) => y(d))
        .attr("y2", (d) => y(d))
        .attr("stroke", "#f3f4f6")
        .attr("stroke-width", 1)
        .attr("stroke-dasharray", "2,2");

      // Ligne generator
      const lineGenerator = d3
        .line()
        .x((d) => x(d.year))
        .y((d) => y(d.electricity))
        .curve(d3.curveMonotoneX);

      // Animations pour les lignes
      countries.forEach((country, countryIndex) => {
        const countryData = dataByCountry.get(country);

        chart
          .append("path")
          .datum(countryData)
          .attr("fill", "none")
          .attr("stroke", colorScale(country))
          .attr("stroke-width", 2.5)
          .attr("d", lineGenerator)
          .style("opacity", 0)
          .transition()
          .duration(600)
          .delay(countryIndex * 150)
          .style("opacity", 1);

        // Points avec animation
        chart
          .selectAll(`circle.${country.replace(/\s+/g, "-")}`)
          .data(countryData)
          .enter()
          .append("circle")
          .attr("cx", (d) => x(d.year))
          .attr("cy", (d) => y(d.electricity))
          .attr("r", 0)
          .attr("fill", colorScale(country))
          .attr("opacity", 0.8)
          .transition()
          .duration(300)
          .delay((d, i) => countryIndex * 100 + i * 20)
          .attr("r", 4);
      });

      // Légende
      const legend = svg
        .append("g")
        .attr(
          "transform",
          `translate(${width - margin.right + 20}, ${margin.top})`
        );

      countries.forEach((country, i) => {
        const legendItem = legend
          .append("g")
          .attr("transform", `translate(0, ${i * 25})`)
          .style("opacity", 0);

        legendItem
          .append("rect")
          .attr("width", 15)
          .attr("height", 3)
          .attr("y", 9)
          .attr("fill", colorScale(country));

        legendItem
          .append("text")
          .attr("x", 20)
          .attr("y", 12)
          .attr("font-size", "11px")
          .attr("fill", "#374151")
          .attr("font-weight", "500")
          .text(country);

        legendItem
          .transition()
          .duration(400)
          .delay(400 + i * 80)
          .style("opacity", 1);
      });

      // Axes
      chart
        .append("g")
        .attr("transform", `translate(0, ${innerHeight})`)
        .call(d3.axisBottom(x).ticks(10).tickFormat(d3.format("d")));

      chart.append("g").call(d3.axisLeft(y).ticks(6));

      // Labels des axes
      chart
        .append("text")
        .attr("x", innerWidth / 2)
        .attr("y", innerHeight + 40)
        .attr("text-anchor", "middle")
        .attr("fill", "#374151")
        .attr("font-size", "13px")
        .text("Année");

      chart
        .append("text")
        .attr("transform", "rotate(-90)")
        .attr("x", -innerHeight / 2)
        .attr("y", -50)
        .attr("text-anchor", "middle")
        .attr("fill", "#374151")
        .attr("font-size", "13px")
        .text("Production (TWh)");

      // Tooltip et interactivité
      const tooltip = d3.select(tooltipElement);
      const verticalLine = chart
        .append("line")
        .attr("opacity", 0)
        .attr("stroke", "#6b7280")
        .attr("stroke-width", 1)
        .attr("stroke-dasharray", "4");

      const hoverArea = chart
        .append("rect")
        .attr("width", innerWidth)
        .attr("height", innerHeight)
        .attr("fill", "none")
        .attr("pointer-events", "all")
        .on("mouseover", () => {
          verticalLine.style("opacity", 1);
        })
        .on("mousemove", (event) => {
          const [xPos] = d3.pointer(event);
          const year = x.invert(xPos);

          verticalLine
            .attr("x1", x(year))
            .attr("x2", x(year))
            .attr("y1", 0)
            .attr("y2", innerHeight);

          let tooltipContent = `<div class="font-semibold text-gray-800 mb-2 border-b pb-1">Année ${Math.round(
            year
          )}</div>`;

          countries.forEach((country) => {
            const countryData = dataByCountry.get(country);
            const bisect = d3.bisector((d) => d.year).left;
            const index = bisect(countryData, year);

            let point;
            if (index === 0) point = countryData[0];
            else if (index === countryData.length)
              point = countryData[countryData.length - 1];
            else {
              const d0 = countryData[index - 1];
              const d1 = countryData[index];
              point = year - d0.year > d1.year - year ? d1 : d0;
            }

            // Ne pas afficher si l'année survolée est hors de la plage de données du pays
            const minYear = d3.min(countryData, (d) => d.year);
            const maxYear = d3.max(countryData, (d) => d.year);
            if (Math.round(year) < minYear || Math.round(year) > maxYear) {
              return;
            }

            tooltipContent += `
            <div class="flex items-center justify-between gap-4 py-1">
              <div class="flex items-center gap-2">
                <div style="background: ${colorScale(
                  country
                )}" class="w-3 h-3 rounded-full"></div>
                <span class="text-gray-700 text-sm">${country}</span>
              </div>
              <span class="font-semibold text-gray-900">${point.electricity.toFixed(
                1
              )} TWh</span>
            </div>
          `;
          });

          tooltip
            .style("opacity", 1)
            .html(tooltipContent)
            .style("left", event.offsetX + 15 + "px")
            .style("top", event.offsetY - 10 + "px");
        })
        .on("mouseleave", () => {
          tooltip.style("opacity", 0);
          verticalLine.style("opacity", 0);
        });
    },
    []
  );

  return { renderChart };
}
