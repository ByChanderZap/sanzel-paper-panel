import Link from "next/link";
import { ClientWithStats } from "@/types/clients";
import { MobileCardLayout } from "@/components/mobile-card/mobile-card-layout";
import { MobileCardTop } from "@/components/mobile-card/mobile-card-top";
import MobileCardBottom from "@/components/mobile-card/mobile-card-bottom";

export async function MobileClientsList({
  clients,
}: {
  clients: ClientWithStats[];
}) {
  return (
    <div className="md:hidden space-y-4">
      {clients.map((client) => (
        <Link
          key={client.id}
          href={`/clients/${client.id}/summary`}
          className="block"
        >
          <MobileCardLayout>
            <MobileCardTop
              pinText={client.phone ?? undefined}
              primaryContent={client.name}
              secondaryContent={client?.email ?? "No email"}
            />
            <MobileCardBottom
              leftTextHeader="Orders"
              leftTextContent={client.totalOrders?.toString()}
              middleTextHeader="Total Spent"
              middleTextContent={client.totalSpent?.toString()}
              rightTextHeader="Last Order"
              rightTextContent={client.lastOrder?.toDateString()}
            />
          </MobileCardLayout>
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
