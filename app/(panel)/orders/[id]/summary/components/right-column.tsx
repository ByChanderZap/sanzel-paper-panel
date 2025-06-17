import { OrderStatusForm } from "./order-status-form";
import { OrderStatus } from "@prisma/client";

export function RightOrderSummaryColumn({
  id,
  datePlaced,
  itemsQuantity,
  orderStatus,
}: {
  id?: string;
  datePlaced?: string;
  itemsQuantity?: number;
  orderStatus?: OrderStatus;
}) {
  return (
    <div className="space-y-6">
      <OrderStatusForm currentStatus={orderStatus} orderId={id} />

      {/* Additional Order Info */}
      <div className="bg-gray-800 rounded-lg p-6">
        <h3 className="text-lg font-semibold mb-4">Order Information</h3>
        <div className="space-y-3 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-400">Order ID</span>
            <span className="text-white font-medium">{id}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Date Placed</span>
            <span className="text-white">{datePlaced}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Items</span>
            <span className="text-white">{itemsQuantity} items</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Current Status</span>
            <div className="flex items-center">
              <div
                className={`w-2 h-2 rounded-full mr-2`}
                // className={`w-2 h-2 rounded-full mr-2 ${getCurrentStatusColor()}`}
              ></div>
              <span className="text-white text-xs font-medium">
                {/* {statusOptions
                      .find((s) => s.value === selectedStatus)
                      ?.label.toUpperCase()} */}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
