import { ClientsWithOrders } from "@/types/clients";
import { OrderStatus } from "@prisma/client";

export function MobileOrderHistory({
  orderHistory,
}: {
  orderHistory: ClientsWithOrders["orders"];
}) {
  const getStatusColor = (status: OrderStatus) => {
    switch (status) {
      case OrderStatus.CONFIRMED:
        return "bg-green-600";
      case OrderStatus.SHIPPED:
        return "bg-blue-600";
      case OrderStatus.PENDING:
        return "bg-yellow-600";
      case OrderStatus.PAID:
        return "bg-green-600";
      case OrderStatus.NOT_PAID:
        return "bg-red-600";
      default:
        return "bg-gray-600";
    }
  };

  return (
    <div className="block sm:hidden space-y-4">
      {orderHistory.map((order) => (
        <div key={order.id} className="bg-gray-700 rounded-lg p-4">
          <div className="flex justify-between items-start mb-2">
            <span className="font-medium text-sm truncate">{order.id}</span>
            <span
              className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                order.status
              )}`}
            >
              {order.status}
            </span>
          </div>
          <div className="text-gray-300 text-sm mb-1">
            {order.createdAt.toLocaleDateString()}
          </div>
          <div className="font-medium text-sm">{order.price}</div>
        </div>
      ))}
    </div>
  );
}
