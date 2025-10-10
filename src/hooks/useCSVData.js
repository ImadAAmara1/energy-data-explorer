import { useEffect, useState } from "react";
import * as d3 from "d3";

export function useCSVData(source, selectedCountries = []) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadData() {
      try {
        const rows = await d3.csv(`./data/generated-from-${source}.csv`);

        const processed = rows.map((row) => ({
          entity: row.Entity,
          year: +row.Year,
          electricity: +row.Electricity,
        }));

        const filteredData =
          selectedCountries.length > 0
            ? processed.filter((row) => selectedCountries.includes(row.entity))
            : processed;

        setData(filteredData);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [source, selectedCountries]);

  return { data, loading, error };
}
