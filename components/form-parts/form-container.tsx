export function FormContainer({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-secondary rounded-lg p-8 shadow-lg">{children}</div>
  );
}
