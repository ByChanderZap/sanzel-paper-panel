export function TableHeader({ colNames }: { colNames: string[] }) {
  const gridColsMap: Record<number, string> = {
    1: "grid-cols-1",
    2: "grid-cols-2",
    3: "grid-cols-3",
    4: "grid-cols-4",
    5: "grid-cols-5",
    6: "grid-cols-6",
    7: "grid-cols-7",
    8: "grid-cols-8",
    9: "grid-cols-9",
    10: "grid-cols-10",
    11: "grid-cols-11",
    12: "grid-cols-12",
  };

  const gridCols = gridColsMap[colNames.length] || "grid-cols-6";

  return (
    <div className={`grid ${gridCols} border-b border-gray-700`}>
      {colNames.map((colName, index) => (
        <div
          key={index}
          className="text-left py-3 px-4 font-medium text-gray-400"
        >
          {colName}
        </div>
      ))}
    </div>
  );
}
