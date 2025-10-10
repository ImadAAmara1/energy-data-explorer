export function SourceDescription({ description }) {
  return (
    <div className="bg-green-50 rounded-lg p-4 border border-green-100">
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0 w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill="#1f1f1f"
          >
            <path d="M480-240q100 0 169-70t71-170v-240H480q-100 2-170 71t-70 169q0 100 70 170t170 70Zm-47-67 184-164q9-8 5-19t-16-13l-144-14 86-119q3-5 3.5-9.5T548-654q-4-5-10-4.5t-11 4.5L344-490q-9 8-5 19t16 13l144 14-87 119q-3 5-3 9.5t4 8.5q4 4 9.5 4t10.5-4Zm47 147q-56 0-105.5-17.5T284-227l-55 55q-6 6-13.5 9t-15.5 3q-17 0-28.5-11.5T160-200q0-8 3-15.5t9-13.5l55-55q-32-41-49.5-90.5T160-480q0-134 93-227t227-93h320v320q0 134-93 227t-227 93Zm0-320Z" />
          </svg>
        </div>
        <div>
          <h3 className="font-semibold text-gray-900 text-sm mb-1.5">
            À propos de cette source de données
          </h3>
          <p className="text-gray-700 leading-relaxed text-sm">{description}</p>
        </div>
      </div>
    </div>
  );
}
