import { ClientsWithOrders } from "@/types/clients";
import { CustomTable } from "@/components/custom-table/table";
import { TableBody } from "@/components/custom-table/table-body";
import { TableRow } from "@/components/custom-table/table-row";
import { TableRowContent } from "@/components/custom-table/table-row-content";
import Link from "next/link";
import { getStatusColor } from "@/utils/utils";

export function OrderHistory({
  orderHistory,
}: {
  orderHistory: ClientsWithOrders["orders"];
}) {
  return (
    <>
      <p className="text-xs text-gray-400 mb-2">
        Only the last 10 orders will be displayed here.
      </p>
      <CustomTable extraClasses="w-full">
        {/* Table Header */}
        <TableRow colCount={4}>
          <TableRowContent
            content="Order ID"
            className="font-medium text-gray-400"
          />
          <TableRowContent
            content="Date"
            className="font-medium text-gray-400"
          />
          <TableRowContent
            content="Status"
            className="font-medium text-gray-400"
          />
          <TableRowContent
            content="Total"
            className="font-medium text-gray-400"
          />
        </TableRow>
        <TableBody>
          {orderHistory.map((order) => (
            <Link href={`/orders/${order.id}/summary`} key={order.id}>
              <TableRow colCount={4} key={order.id}>
                <TableRowContent content={order.id} className="font-medium" />
                <TableRowContent
                  content={order.createdAt.toLocaleDateString()}
                />
                <TableRowContent
                  content={
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                        order.status
                      )}`}
                    >
                      {order.status}
                    </span>
                  }
                />
                <TableRowContent
                  content={order.price}
                  className="font-medium"
                />
              </TableRow>
            </Link>
          ))}
        </TableBody>
      </CustomTable>
    </>
  );
}
