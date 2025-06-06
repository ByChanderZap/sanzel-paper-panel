export function MobileCardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-secondary rounded-2xl p-4 hover:bg-gray-700/20 transition-colors">
      {children}
    </div>
  );
}
