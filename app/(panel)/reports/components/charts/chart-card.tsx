export function ChartCard({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-gray-800 my-6 border border-gray-700 rounded-lg p-6">
      {/* Chart Header */}
      {children}
    </div>
  );
}
