import { ClientsPageContent } from "@/components/clients/clients-content";
import { SearchBar } from "@/components/search-bar";

export default async function ClientsPage({
  searchParams,
}: {
  searchParams: { query?: string; page?: string };
}) {
  const params = await searchParams;
  const query = params.query || "";
  const currentPage = Number(params.page) || 1;

  return (
    <>
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Clients</h1>
      </div>

      {/* Search Bar */}
      <SearchBar placeholder="Search clients..." />

      <ClientsPageContent query={query} currentPage={currentPage} />
    </>
  );
}
