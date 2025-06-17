import {
  CustomTable,
  TableHeader,
  TableBody,
  TableRow,
  TableRowContent,
} from "@/components/custom-table";
import { DetailedOrder } from "@/types/orders";

type OrderItems = NonNullable<DetailedOrder>["orderItems"];

export function Details({
  orderItems,
  orderTotal,
}: {
  orderItems: OrderItems | null | undefined;
  orderTotal?: number;
}) {
  const colNames = ["Product", "Quantity", "Price", "Total"];

  return (
    <div className="bg-gray-800 rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-6">Order Details</h2>

      {/* Table */}
      <CustomTable>
        <TableHeader colNames={colNames} />
        <TableBody>
          {orderItems?.map((item) => (
            <TableRow key={item.id} colCount={colNames.length}>
              <TableRowContent content={item.product.name} />

              <TableRowContent content={item.quantity} />

              <TableRowContent content={item.product.unit_price} />

              <TableRowContent content={item.item_total} />
            </TableRow>
          ))}
        </TableBody>
      </CustomTable>
      {/* Order Summary */}
      <div className="mt-6 pt-6 border-t border-gray-700">
        {/* <div className="flex justify-between items-center mb-4">
                    <span className="text-gray-400">Subtotal</span>
                    <span className="text-white font-medium">
                      ${orderData.subtotal.toFixed(2)}
                    </span>
                  </div> */}
        <div className="flex justify-between items-center text-lg font-semibold">
          <span className="text-white">Total</span>
          <span className="text-white">${orderTotal}</span>
        </div>
      </div>
    </div>
  );
}
