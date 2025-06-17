import { OrdersTableProps } from "@/types/orders";
import { OrdersTable } from "@/components/orders/orders-table";
import { MobileOrdersTable } from "@/components/orders/mobile-orders-table";
import { getOrdersSummary } from "@/lib/orders/orders";

export async function OrdersPageContent({
  query,
  currentPage = 1,
}: OrdersTableProps) {
  const orders = await getOrdersSummary(query, currentPage);

  return (
    <>
      <OrdersTable ordersSummary={orders} />

      <MobileOrdersTable ordersSummary={orders} />
    </>
  );
}
