import Link from "next/link";
import { ClientPreview } from "@/types/clients";

export async function MobileClientsList({
  clients,
}: {
  clients: ClientPreview[];
}) {
  return (
    <div className="md:hidden space-y-4">
      {clients.map((client) => (
        <Link
          key={client.id}
          href={`/clients/${client.id}/summary`}
          className="block"
        >
          <div className="bg-secondary rounded-2xl p-4 hover:bg-gray-700/20 transition-colors">
            <div className="flex justify-between items-start mb-3">
              <div className="flex-1">
                <div className="font-medium text-white text-lg">
                  {client.client}
                </div>
                <div className="text-sm text-custom-gray mt-1">
                  {client.email}
                </div>
              </div>
              <span className="px-3 py-1 rounded-full text-sm font-medium bg-primary ml-2">
                {client.status}
              </span>
            </div>

            <div className="grid grid-cols-3 gap-4 text-sm">
              <div>
                <div className="text-custom-gray">Orders</div>
                <div className="text-white font-medium">{client.orders}</div>
              </div>
              <div>
                <div className="text-custom-gray">Total Spent</div>
                <div className="text-white font-medium">
                  ${client.totalSpent}
                </div>
              </div>
              <div>
                <div className="text-custom-gray">Last Order</div>
                <div className="text-white font-medium">{client.lastOrder}</div>
              </div>
            </div>
          </div>
        </Link>
      ))}

      {clients.length === 0 && (
        <div className="text-center py-8 text-gray-400">
          No clients matching your search.
        </div>
      )}
    </div>
  );
}
