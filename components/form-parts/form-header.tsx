import Link from "next/link";

export function FormHeader({
  title,
  targetPrevPage,
  previousPage,
  currentPageTitle,
}: {
  title: string;
  targetPrevPage: string;
  previousPage: string;
  currentPageTitle: string;
}) {
  return (
    <div className="mb-8">
      <h1 className="text-3xl font-semibold text-white mb-2">{title}</h1>
      <div className="text-sm text-slate-400">
        <Link
          href={`/${targetPrevPage}`}
          className="text-orange-500 hover:underline"
        >
          {previousPage}
        </Link>
        <span> / {currentPageTitle}</span>
      </div>
    </div>
  );
}
