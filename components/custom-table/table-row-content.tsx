type TableRowContentProps = {
  content: React.ReactNode;
  className?: string;
};

export function TableRowContent({
  content,
  className = "",
}: TableRowContentProps) {
  return (
    <div className={`py-4 px-4 text-gray-300 truncate ${className}`}>
      {content}
    </div>
  );
}
