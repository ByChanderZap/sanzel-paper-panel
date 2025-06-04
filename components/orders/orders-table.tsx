import Link from "next/link";
import { TempOrderType } from "@/types/orders";
import {
  CustomTable,
  TableHeader,
  TableBody,
  TableRow,
  TableRowContent,
} from "@/components/custom-table";

export async function OrdersTable({ orders }: { orders: TempOrderType[] }) {
  const colNames = ["Order Id", "Client", "Date", "Status", "Total"];

  return (
    <CustomTable>
      <TableHeader colNames={colNames} />
      <TableBody>
        {orders.map((order) => (
          <Link
            key={order.id}
            href={`/orders/${order.id}/summary`}
            className="block"
          >
            <TableRow colCount={colNames.length}>
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
