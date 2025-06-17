export function BreadCrumb({
  title,
  href,
  currentContent,
  id,
}: {
  title: string;
  href: string;
  currentContent: string;
  id?: string;
}) {
  return (
    <div className="mb-6">
      <nav className="flex text-sm">
        <a href={href} className="text-gray-400 hover:text-white">
          {title}
        </a>
        <span className="mx-2 text-gray-500">/</span>
        <span className="text-white">
          {currentContent} {id}
        </span>
      </nav>
    </div>
  );
}
