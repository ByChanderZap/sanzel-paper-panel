import { ClientsTableProprs } from "@/types/clients";
import { fetchClients } from "@/lib/data/fetchClients";
import { MobileClientsList } from "@/components/clients/mobile-clients-list";
import { ClientsTable } from "@/components/clients/clients-table";

export async function ClientsPageContent({
  query,
  currentPage = 1,
}: ClientsTableProprs) {
  const clients = await fetchClients(query, currentPage);

  return (
    <>
      {/* Desktop Layout */}
      <ClientsTable clients={clients} />
      {/* Mobile Layout */}
      <MobileClientsList clients={clients} />
    </>
  );
}
