type TableRowContentProps = {
  content: React.ReactNode;
  className?: string;
};

export function TableRowContent({
  content,
  className = "",
}: TableRowContentProps) {
  return <div className={className}>{content}</div>;
}
