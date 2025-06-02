import Link from "next/link";
import { getOrdersPreview } from "../../lib/data/fetchOrders";
import { OrdersTableProps } from "../../types/orders";

export async function MobileOrdersTable({
  query,
  currentPage = 1,
}: OrdersTableProps) {
  const orders = await getOrdersPreview(query, currentPage);

  return (
    <div className="md:hidden space-y-4">
      {orders.map((order) => (
        <Link
          key={order.id}
          href={`/orders/${order.id}/summary`}
          className="block"
        >
          <div className="bg-primary rounded-2xl p-4 hover:bg-gray-700/20 transition-colors">
            <div className="flex justify-between items-start mb-3">
              <div>
                <div className="text-sm text-custom-gray">
                  Order #{order.id}
                </div>
                <div className="font-medium text-lg">{order.client}</div>
              </div>
              <span className="px-3 py-1 rounded-full text-sm font-medium bg-secondary">
                {order.status}
              </span>
            </div>

            <div className="flex justify-between items-center">
              <div className="text-custom-gray text-sm">{order.date}</div>
              <div className="font-medium text-lg">
                ${order.total.toFixed(2)}
              </div>
            </div>
          </div>
        </Link>
      ))}

      {orders.length === 0 && (
        <div className="bg-primary rounded-2xl p-8 text-center text-gray-400">
          No orders found matching your search.
        </div>
      )}
    </div>
  );
}
