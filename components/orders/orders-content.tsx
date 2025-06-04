import { OrdersTableProps } from "@/types/orders";
import { getOrdersPreview } from "@/lib/data/fetchOrders";
import { OrdersTable } from "@/components/orders/orders-table";
import { MobileOrdersTable } from "@/components/orders/mobile-orders-table";

export async function OrdersPageContent({
  query,
  currentPage = 1,
}: OrdersTableProps) {
  const orders = await getOrdersPreview(query, currentPage);

  return (
    <>
      <OrdersTable orders={orders} />

      <MobileOrdersTable orders={orders} />
    </>
  );
}
