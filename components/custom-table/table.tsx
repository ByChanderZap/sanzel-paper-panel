export function CustomTable({ children }: { children: React.ReactNode }) {
  return (
    <div className="hidden md:block bg-primary rounded-3xl p-2">
      <div className="overflow-x-auto">{children}</div>
    </div>
  );
}
