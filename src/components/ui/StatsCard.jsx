export function StatsCard({ icon, label, value, color = "blue", loading = false }) {
  const colorClasses = {
    blue: "bg-blue-50 text-blue-700 border-blue-200",
    green: "bg-green-50 text-green-700 border-green-200",
    orange: "bg-orange-50 text-orange-700 border-orange-200",
    purple: "bg-purple-50 text-purple-700 border-purple-200",
    red: "bg-red-50 text-red-700 border-red-200",
  };

  return (
    <div className={`rounded-lg border p-4 shadow-sm transition-all hover:shadow-md ${colorClasses[color]}`}>
      <div className="flex items-center gap-3">
        <div className={`p-2 rounded-lg ${color === 'blue' ? 'bg-blue-100' : color === 'green' ? 'bg-green-100' : color === 'orange' ? 'bg-orange-100' : color === 'purple' ? 'bg-purple-100' : 'bg-red-100'}`}>
          {icon}
        </div>
        <div className="flex-1">
          <p className="text-xs font-medium text-gray-600 uppercase tracking-wide">
            {label}
          </p>
          {loading ? (
            <div className="flex items-center gap-2 mt-1">
              <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin opacity-60"></div>
              <span className="text-sm font-bold">Chargement...</span>
            </div>
          ) : (
            <p className="text-2xl font-bold mt-1">
              {typeof value === 'number' && value % 1 !== 0 ? value.toFixed(1) : value}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}