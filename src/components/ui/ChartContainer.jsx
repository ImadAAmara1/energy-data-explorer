export function ChartContainer({ children, className = "" }) {
  return (
    <div
      className={`bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden p-6 ${className}`}
    >
      {children}
    </div>
  );
}
