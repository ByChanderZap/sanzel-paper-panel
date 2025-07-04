import { getClientById } from "@/lib/clients/clients";
import { ClientSummaryForm } from "./components/form";
import { MobileOrderHistory } from "./components/mobile-order-history";
import { OrderHistory } from "./components/order-history";

export default async function ClientSummaryPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ edit?: string }>;
}) {
  const { id } = await params;
  const { edit } = await searchParams;

  const isEditing = edit === "true";

  const client = await getClientById(id);

  return (
    <div className="min-h-screen rounded-4xl text-white p-4 sm:p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-2 mb-6 text-gray-400 text-sm">
          <span>Clients</span>
          <span>/</span>
          <span>View and manage client information</span>
        </div>

        {/* Title and Edit Button */}

        <ClientSummaryForm client={client} id={id} isEditing={isEditing} />
        {/* Order History */}
        <div className="bg-gray-800 rounded-lg p-4 sm:p-6">
          <h3 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6">
            Order History
          </h3>
          {/* Mobile: Card layout */}
          <div className="block md:hidden">
            <MobileOrderHistory orderHistory={client?.orders ?? []} />
          </div>
          {/* Desktop: Table layout */}
          <div className="hidden md:block">
            <OrderHistory orderHistory={client?.orders ?? []} />
          </div>
        </div>
      </div>
    </div>
  );
}
