import { Plus } from "lucide-react";
import Link from "next/link";
import { ClientsPageContent } from "@/components/clients/clients-content";
import { SearchBar } from "@/components/search-bar";
import { fetchClientsTotalPages } from "@/lib/clients/clients";
import { Pagination } from "@/components/pagination";

type SearchParams = Promise<{
  query?: string;
  page?: string;
}>;

interface PageProps {
  searchParams: SearchParams;
}

export default async function ClientsPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const query = params.query || "";
  const currentPage = Number(params.page) || 1;
  const totalPages = await fetchClientsTotalPages(query);

  return (
    <>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Clients</h1>
        <Link
          href="/clients/new"
          className="bg-secondary hover:bg-secondary/80 px-6 py-2 rounded-full font-medium transition-colors"
        >
          <Plus size={24} />
        </Link>
      </div>

      {/* Search Bar */}
      <SearchBar placeholder="Search clients..." />

      <ClientsPageContent query={query} currentPage={currentPage} />
      <Pagination totalPages={totalPages} />
    </>
  );
}
