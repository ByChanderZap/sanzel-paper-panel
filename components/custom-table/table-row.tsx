export function TableRow({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-5 gap-4 py-4 border-b border-gray-700 hover:bg-gray-700/50 transition-colors">
      {children}
    </div>
  );
}
