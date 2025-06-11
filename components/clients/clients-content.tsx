import { ClientsTableProprs } from "@/types/clients";
import { MobileClientsList } from "@/components/clients/mobile-clients-list";
import { ClientsTable } from "@/components/clients/clients-table";
import { fetchClientsWithStats } from "@/lib/clients/clients";

export async function ClientsPageContent({
  query,
  currentPage = 1,
}: ClientsTableProprs) {
  const clients = await fetchClientsWithStats(query, currentPage);

  return (
    <>
      {/* Desktop Layout */}
      <ClientsTable clients={clients} />
      {/* Mobile Layout */}
      <MobileClientsList clients={clients} />
    </>
  );
}
