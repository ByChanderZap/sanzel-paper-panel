import Link from "next/link";
import { getOrdersPreview } from "../../lib/data/fetchOrders";
import { OrdersTableProps } from "../../types/orders";
import MobileCard from "../mobile-card";
import MobileCardLayout from "../mobile-card-layout";

export async function MobileOrdersTable({
  query,
  currentPage = 1,
}: OrdersTableProps) {
  const orders = await getOrdersPreview(query, currentPage);

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
