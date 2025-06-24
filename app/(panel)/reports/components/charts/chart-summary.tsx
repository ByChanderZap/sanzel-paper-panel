export function ChartSummary({
  mainText,
  subText,
}: {
  mainText: string;
  subText: string;
}) {
  return (
    <div className="flex items-center space-x-4">
      <span className="text-3xl font-bold text-white">{mainText}</span>
      <span className="text-sm text-gray-400">{subText}</span>
    </div>
  );
}
