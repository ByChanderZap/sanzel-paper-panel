export function CustomTable({
  children,
  extraClasses,
}: {
  children: React.ReactNode;
  extraClasses?: string;
}) {
  return (
    <div className={`hidden md:block rounded-3xl p-2 ${extraClasses}`}>
      <div className="overflow-x-auto">{children}</div>
    </div>
  );
}
