import { useState, useEffect } from "react";
import * as d3 from "d3";

export function CountrySelector({
  selectedCountries,
  onCountriesChange,
  source,
  dataLoading,
}) {
  const [availableCountries, setAvailableCountries] = useState([]);
  const [countriesLoading, setCountriesLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    async function loadCountries() {
      try {
        setCountriesLoading(true);
        const data = await d3.csv(`./data/generated-from-${source}.csv`);
        const countries = [...new Set(data.map((row) => row.Entity))].sort();
        setAvailableCountries(countries);
      } catch (error) {
        console.error("Erreur chargement pays:", error);
      } finally {
        setCountriesLoading(false);
      }
    }
    loadCountries();
  }, [source]);

  const handleCountryToggle = (country) => {
    if (dataLoading) return;

    const newSelection = selectedCountries.includes(country)
      ? selectedCountries.filter((c) => c !== country)
      : [...selectedCountries, country];
    onCountriesChange(newSelection);
  };

  const filteredCountries = availableCountries.filter((country) =>
    country.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const isLoading = countriesLoading || dataLoading;

  return (
    <div className="flex flex-col gap-2">
      <label className="font-semibold uppercase tracking-wide text-xs text-gray-700 flex items-center gap-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="16px"
          viewBox="0 -960 960 960"
          width="16px"
          fill="currentColor"
        >
          <path d="M480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm-40-82v-78q-33 0-56.5-23.5T360-320v-40L168-552q-3 18-5.5 36t-2.5 36q0 121 79.5 212T440-162Zm276-102q20-22 36-47.5t26.5-53q10.5-27.5 16-56.5t5.5-59q0-98-54.5-179T600-776v16q0 33-23.5 56.5T520-680h-80v80q0 17-11.5 28.5T400-560h-80v80h240q17 0 28.5 11.5T600-440v120h40q26 0 47 15.5t29 40.5Z" />
        </svg>
        Pays ({selectedCountries.length})
        {isLoading && (
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 border-2 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
            <span className="text-orange-600 text-xs font-normal">Chargement</span>
          </div>
        )}
      </label>

      {/* Barre de recherche */}
      <div className="relative">
        <input
          type="text"
          placeholder={isLoading ? "Chargement..." : "Rechercher un pays..."}
          value={searchTerm}
          onChange={(e) => !isLoading && setSearchTerm(e.target.value)}
          disabled={isLoading}
          className={`w-full border rounded-md py-2 pl-10 pr-3 text-sm focus:outline-none focus:ring-2 transition-all shadow-sm ${
            isLoading
              ? "border-gray-300 bg-gray-100 text-gray-500 cursor-not-allowed"
              : "border-gray-300 focus:ring-green-500 focus:border-green-500 hover:border-gray-400"
          }`}
        />
        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="16px"
            viewBox="0 -960 960 960"
            width="16px"
            fill="currentColor"
          >
            <path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z" />
          </svg>
        </div>
      </div>

      {/* Liste des pays */}
      <div className={`max-h-48 overflow-y-auto border rounded-md transition-all shadow-sm ${
        isLoading ? "border-gray-300 bg-gray-50" : "border-gray-300 bg-white"
      }`}>
        {isLoading ? (
          <div className="p-4 text-center text-gray-500">
            <div className="w-6 h-6 border-2 border-green-500 border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
            <p className="text-xs font-medium">Chargement des pays...</p>
          </div>
        ) : filteredCountries.length === 0 ? (
          <div className="p-4 text-center text-gray-500">
            <p className="text-xs font-medium">Aucun pays trouvé</p>
            <p className="text-xs mt-1">Essayez un autre terme</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {filteredCountries.map((country) => (
              <div
                key={country}
                className={`flex items-center gap-2 py-2 px-3 transition-colors cursor-pointer group ${
                  dataLoading ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-50"
                }`}
                onClick={() => handleCountryToggle(country)}
              >
                <div className={`w-4 h-4 border-2 rounded flex items-center justify-center transition-all ${
                  selectedCountries.includes(country)
                    ? "bg-green-600 border-green-600 text-white"
                    : dataLoading
                    ? "border-gray-300"
                    : "border-gray-300 group-hover:border-green-400"
                }`}>
                  {selectedCountries.includes(country) && (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="10px"
                      viewBox="0 -960 960 960"
                      width="10px"
                      fill="currentColor"
                    >
                      <path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z" />
                    </svg>
                  )}
                </div>
                <span className={`text-xs font-medium transition-colors ${
                  selectedCountries.includes(country)
                    ? "text-gray-900"
                    : dataLoading
                    ? "text-gray-500"
                    : "text-gray-700 group-hover:text-gray-900"
                }`}>
                  {country}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Boutons d'action */}
      <div className="flex gap-2">
        <button
          onClick={() => !isLoading && onCountriesChange(availableCountries)}
          disabled={isLoading || availableCountries.length === 0}
          className={`flex-1 py-2 rounded-md font-medium text-xs transition-all ${
            isLoading || availableCountries.length === 0
              ? "bg-gray-200 text-gray-500 cursor-not-allowed"
              : "bg-green-600 hover:bg-green-700 text-white shadow-sm"
          }`}
        >
          Tout sélectionner
        </button>
        <button
          onClick={() => !isLoading && onCountriesChange([])}
          disabled={isLoading || selectedCountries.length === 0}
          className={`flex-1 py-2 rounded-md font-medium text-xs transition-all ${
            isLoading || selectedCountries.length === 0
              ? "bg-gray-200 text-gray-500 cursor-not-allowed"
              : "bg-gray-600 hover:bg-gray-700 text-white shadow-sm"
          }`}
        >
          Désélectionner
        </button>
      </div>
    </div>
  );
}