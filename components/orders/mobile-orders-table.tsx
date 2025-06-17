import Link from "next/link";
import MobileCard from "@/components/mobile-card";
import MobileCardLayout from "@/components/mobile-card-layout";
import { OrdersPreview } from "@/types/orders";

export async function MobileOrdersTable({
  ordersSummary,
}: {
  ordersSummary: OrdersPreview[];
}) {
  return (
    <MobileCardLayout>
      {ordersSummary.map((order) => (
        <Link
          key={order.id}
          href={`/orders/${order.id}/summary`}
          className="block"
        >
          <MobileCard order={order} />
        </Link>
      ))}

      {ordersSummary.length === 0 && (
        <div className="bg-primary rounded-2xl p-8 text-center text-gray-400">
          No orders found matching your search.
        </div>
      )}
    </MobileCardLayout>
  );
}
