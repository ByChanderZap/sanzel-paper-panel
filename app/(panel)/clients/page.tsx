import { SearchBar } from "@/components/search-bar";
import { ClientsTable } from "@/components/clients/clients-table";

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

      {/** Place holder for future content */}
      <ClientsTable query={query} currentPage={currentPage} />
    </>
  );
}
