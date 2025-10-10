export function Footer() {
  return (
    <footer className="bg-gradient-to-b from-gray-50 to-white border-t border-gray-200 py-12 mt-8">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* About */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-green-600 to-emerald-600 rounded-lg flex items-center justify-center shadow-md">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="24px"
                  viewBox="0 -960 960 960"
                  width="24px"
                  fill="#ffffff"
                >
                  <path d="M480-240q100 0 169-70t71-170v-240H480q-100 2-170 71t-70 169q0 100 70 170t170 70Zm-47-67 184-164q9-8 5-19t-16-13l-144-14 86-119q3-5 3.5-9.5T548-654q-4-5-10-4.5t-11 4.5L344-490q-9 8-5 19t16 13l144 14-87 119q-3 5-3 9.5t4 8.5q4 4 9.5 4t10.5-4Zm47 147q-56 0-105.5-17.5T284-227l-55 55q-6 6-13.5 9t-15.5 3q-17 0-28.5-11.5T160-200q0-8 3-15.5t9-13.5l55-55q-32-41-49.5-90.5T160-480q0-134 93-227t227-93h320v320q0 134-93 227t-227 93Zm0-320Z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-gray-900">
                Explorateur de Données Énergétiques
              </h3>
            </div>
            <p className="text-sm text-gray-600 leading-relaxed mb-4">
              Plateforme d'analyse interactive dédiée à la visualisation des
              données mondiales de production d'électricité. Explorez les
              tendances énergétiques par pays et par source avec des graphiques
              dynamiques et professionnels.
            </p>
            <div className="flex gap-2">
              <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-medium">
                Open Data
              </span>
              <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-medium">
                Visualisation Interactive
              </span>
            </div>
          </div>

          {/* Data Sources */}
          <div>
            <h3 className="font-bold text-gray-900 mb-4 text-sm uppercase tracking-wide flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="16px"
                viewBox="0 -960 960 960"
                width="16px"
                fill="currentColor"
              >
                <path d="M320-240h320v-80H320v80Zm0-160h320v-80H320v80ZM240-80q-33 0-56.5-23.5T160-160v-640q0-33 23.5-56.5T240-880h320l240 240v480q0 33-23.5 56.5T720-80H240Zm280-520v-200H240v640h480v-440H520ZM240-800v200-200 640-640Z" />
              </svg>
              Sources de Données
            </h3>
            <ul className="space-y-2.5 text-sm text-gray-600">
              <li className="hover:text-green-600 transition-colors cursor-pointer flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-green-600 rounded-full"></span>
                Our World in Data
              </li>
              <li className="hover:text-green-600 transition-colors cursor-pointer flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-green-600 rounded-full"></span>
                IEA (Agence Internationale)
              </li>
              <li className="hover:text-green-600 transition-colors cursor-pointer flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-green-600 rounded-full"></span>
                Banque Mondiale
              </li>
            </ul>
          </div>

          {/* Technologies */}
          <div>
            <h3 className="font-bold text-gray-900 mb-4 text-sm uppercase tracking-wide flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="16px"
                viewBox="0 -960 960 960"
                width="16px"
                fill="currentColor"
              >
                <path d="M160-160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h640q33 0 56.5 23.5T880-720v480q0 33-23.5 56.5T800-160H160Zm0-80h640v-400H160v400Zm140-40-56-56 103-104-104-104 57-56 160 160-160 160Zm180 0v-80h240v80H480Z" />
              </svg>
              Technologies
            </h3>
            <ul className="space-y-2.5 text-sm text-gray-600">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-blue-600 rounded-full"></span>
                React 18 + Vite
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-blue-600 rounded-full"></span>
                D3.js Visualisations
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-blue-600 rounded-full"></span>
                Tailwind CSS
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-200 mt-10 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-600">
              © 2025 Explorateur de Données Énergétiques. Tous droits réservés.
            </p>
            <p className="text-xs text-gray-500">
              Conçu pour l'analyse et la visualisation professionnelle de
              données énergétiques mondiales
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
