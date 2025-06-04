import Link from "next/link";
import { TempOrderType } from "@/types/orders";
import MobileCard from "@/components/mobile-card";
import MobileCardLayout from "@/components/mobile-card-layout";

export async function MobileOrdersTable({
  orders,
}: {
  orders: TempOrderType[];
}) {
  return (
    <MobileCardLayout>
      {orders.map((order) => (
        <Link
          key={order.id}
          href={`/orders/${order.id}/summary`}
          className="block"
        >
          <MobileCard order={order} />
        </Link>
      ))}

      {orders.length === 0 && (
        <div className="bg-primary rounded-2xl p-8 text-center text-gray-400">
          No orders found matching your search.
        </div>
      )}
    </MobileCardLayout>
  );
}
