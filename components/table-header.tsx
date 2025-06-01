export function TableHeader({ colNames }: { colNames: string[] }) {
  return (
    <div className="grid grid-cols-5 gap-4 border-b border-gray-700 pb-3 mb-4">
      {colNames.map((colName, index) => (
        <div key={index} className="text-left font-medium text-custom-gray">
          {colName}
        </div>
      ))}
    </div>
  );
}
