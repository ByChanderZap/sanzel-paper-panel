"use client";
import {
  CustomTable,
  TableHeader,
  TableBody,
  TableRow,
  TableRowContent,
} from "@/components/custom-table";
import { Trash2 } from "lucide-react";
import { OrderItemsWithProdsInfo } from "@/types/orders";

export function SelectedProductsList({
  orderItems,
  // updateOrderItem,
  // calculateItemTotal,
  orderTotal,
  removeProductFromOrder,
}: {
  orderTotal: number;
  orderItems: OrderItemsWithProdsInfo[];
  // updateOrderItem: (itemId: string, field: string, value: number) => void;
  // calculateItemTotal: (item: OrderItemsWithProdsInfo) => number;
  removeProductFromOrder: (itemId: string) => void;
}) {
  return (
    <div className="lg:col-span-2">
      <div className="bg-primary rounded-3xl border border-gray-400 overflow-hidden">
        <div className="p-6 border-b border-gray-400">
          <h3 className="text-custom-white text-lg font-medium">Products</h3>
        </div>

        {orderItems.length === 0 ? (
          <div className="p-8 text-center text-custom-white">
            No products added yet. Add products from the form on the left.
          </div>
        ) : (
          <>
            <CustomTable>
              <TableHeader
                colNames={[
                  "Product",
                  "Quantity",
                  "Width",
                  "Linear Size",
                  "Unit Price",
                  "Total",
                  "Actions",
                ]}
              />
              <TableBody>
                {orderItems.map((item) => (
                  <TableRow key={item.id} colCount={7}>
                    <TableRowContent
                      content={
                        <div className="text-custom-white text-sm font-medium">
                          {item.name}
                        </div>
                      }
                    />
                    <TableRowContent
                      content={
                        <div className="text-custom-white text-sm">
                          {item.quantity}
                        </div>
                      }
                    />
                    <TableRowContent
                      content={
                        <div className="text-custom-white text-sm">
                          {item.width}
                        </div>
                      }
                    />
                    <TableRowContent
                      content={
                        <div className="text-custom-white text-sm">
                          {item.linear_size}
                        </div>
                      }
                    />
                    <TableRowContent
                      content={
                        <div className="text-custom-white text-sm">
                          ${item.unit_price}
                        </div>
                      }
                    />
                    <TableRowContent
                      content={
                        <div className="text-custom-white font-semibold text-sm">
                          {/* ${calculateItemTotal(item).toFixed(2)} */}
                          {item.itemTotal?.toFixed(2)}
                        </div>
                      }
                    />
                    <TableRowContent
                      content={
                        <button
                          type="button"
                          onClick={() => removeProductFromOrder(item.id)}
                          className="p-2 text-red-400 hover:text-red-300 hover:bg-red-900/20 rounded-xl transition-colors mx-auto"
                          title="Remove product"
                        >
                          <Trash2 size={16} />
                        </button>
                      }
                    />
                  </TableRow>
                ))}
              </TableBody>
            </CustomTable>

            {/* Order Total */}
            <div className="bg-primary px-6 py-4 border-t border-gray-400 rounded-b-lg">
              <div className="flex justify-between items-center">
                <span className="text-lg font-semibold text-white">
                  Order Total:
                </span>
                <span className="text-2xl font-bold text-green-400">
                  ${orderTotal.toFixed(2)}
                </span>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
