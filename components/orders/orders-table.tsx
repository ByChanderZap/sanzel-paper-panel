import Link from "next/link";
// import { TempOrderType } from "@/types/orders";
import {
  CustomTable,
  TableHeader,
  TableBody,
  TableRow,
  TableRowContent,
} from "@/components/custom-table";
import { OrdersPreview } from "@/types/orders";

export async function OrdersTable({
  ordersSummary,
}: {
  ordersSummary: OrdersPreview[];
}) {
  const colNames = ["Order Id", "Client", "Date", "Status", "Total"];

  return (
    <CustomTable>
      <TableHeader colNames={colNames} />
      <TableBody>
        {ordersSummary.map((order) => (
          <Link
            key={order.id}
            href={`/orders/${order.id}/summary`}
            className="block"
          >
            <TableRow colCount={colNames.length}>
              <TableRowContent content={order.id} className="font-medium" />
              <TableRowContent
                content={order.client.name}
                className="text-custom-gray"
              />
              <TableRowContent
                content={order.createdAt.toDateString()}
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
                content={`$${order.price}`}
                className="font-medium"
              />
            </TableRow>
          </Link>
        ))}
        {ordersSummary.length === 0 && (
          <div className="text-center py-8 text-gray-400">
            No orders found matching your search.
          </div>
        )}
      </TableBody>
    </CustomTable>
  );
}
