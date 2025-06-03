export default function MobileCardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="md:hidden space-y-4">{children}</div>;
}
