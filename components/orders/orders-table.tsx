import Link from "next/link";
import { getOrdersPreview } from "../../lib/data/fetchOrders";
import {
  CustomTable,
  TableHeader,
  TableBody,
  TableRow,
  TableRowContent,
} from "@/components/custom-table";
import { OrdersTableProps } from "../../types/orders";

// type OrdersTableProps = {
//   query: string;
//   currentPage?: number;
// };

export async function OrdersTable({
  query,
  currentPage = 1,
}: OrdersTableProps) {
  const orders = await getOrdersPreview(query, currentPage);

  return (
    <CustomTable>
      <TableHeader
        colNames={["Order Id", "Client", "Date", "Status", "Total"]}
      />
      <TableBody>
        {orders.map((order) => (
          <Link
            key={order.id}
            href={`/orders/${order.id}/summary`}
            className="block"
          >
            <TableRow>
              <TableRowContent content={order.id} className="font-medium" />
              <TableRowContent
                content={order.client}
                className="text-custom-gray"
              />
              <TableRowContent
                content={order.date}
                className="text-custom-gray"
              />
              <TableRowContent
                content={
                  <span className="px-3 py-1 rounded-full text-sm font-medium bg-secondary">
                    {order.status}
                  </span>
                }
              />
              <TableRowContent
                content={`$${order.total.toFixed(2)}`}
                className="font-medium"
              />
            </TableRow>
          </Link>
        ))}
        {orders.length === 0 && (
          <div className="text-center py-8 text-gray-400">
            No orders found matching your search.
          </div>
        )}
      </TableBody>
    </CustomTable>
  );
}
