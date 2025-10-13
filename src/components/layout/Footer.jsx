export function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="container mx-auto px-4 md:px-6 py-3">
        <div className="text-center text-sm text-gray-600">
          <p>
            Explorateur interactif de données énergétiques mondiales avec{" "}
            <span className="font-semibold">React</span>,{" "}
            <span className="font-semibold">D3.js</span> et{" "}
            <span className="font-semibold">Tailwind CSS</span>
          </p>
          <p className="text-xs text-gray-500 mt-1">
            Sources: <a href="https://ourworldindata.org/energy" target="_blank" rel="noopener noreferrer" className="hover:text-green-600 transition-colors">Our World in Data</a>, <a href="https://www.iea.org/" target="_blank" rel="noopener noreferrer" className="hover:text-green-600 transition-colors">IEA</a>, <a href="https://www.worldbank.org/" target="_blank" rel="noopener noreferrer" className="hover:text-green-600 transition-colors">Banque Mondiale</a> | Visualisations interactives | Créé pour UM6P
          </p>
        </div>
      </div>
    </footer>
  );
}
