export function LoadingSpinner({ message = "Chargement des données..." }) {
  return (
    <div className="flex flex-col justify-center items-center h-64">
      <div className="relative">
        <div className="w-16 h-16 border-4 border-gray-200 rounded-full"></div>
        <div className="w-16 h-16 border-4 border-green-600 border-t-transparent rounded-full animate-spin absolute top-0 left-0"></div>
      </div>
      <p className="text-gray-700 mt-5 font-medium text-sm">{message}</p>
      <p className="text-gray-500 mt-1 text-xs">Veuillez patienter...</p>
    </div>
  );
}
