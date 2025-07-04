"use client";
import { OrderStatus } from "@prisma/client";
import { ChevronDown } from "lucide-react";
import { OrderStatusFormState } from "@/types/orders";
import { updateOrderStatusAction } from "@/actions/orders";
import { useActionState } from "react";

const statusLabels: Record<OrderStatus, string> = {
  PENDING: "Pending",
  CONFIRMED: "Confirmed",
  PROCESSING: "Processing",
  SHIPPED: "Shipped",
  DELIVERED: "Delivered",
  CANCELLED: "Cancelled",
  NOT_PAID: "Not Paid",
  PAID: "Paid",
};

const statusColors: Record<OrderStatus, string> = {
  PENDING: "bg-yellow-500",
  CONFIRMED: "bg-blue-500",
  PROCESSING: "bg-orange-500",
  SHIPPED: "bg-purple-500",
  DELIVERED: "bg-green-500",
  CANCELLED: "bg-red-500",
  NOT_PAID: "bg-red-500",
  PAID: "bg-green-500",
};

const statusOptions = Object.values(OrderStatus).map((status) => ({
  value: status,
  label: statusLabels[status],
  color: statusColors[status],
}));

const initialState: OrderStatusFormState = {
  errors: {},
};

export function OrderStatusForm({
  orderId,
  currentStatus,
}: {
  orderId?: string;
  currentStatus?: OrderStatus;
}) {
  const currentOption = statusOptions.find((s) => s.value === currentStatus);

  const [formState, formAction] = useActionState(
    updateOrderStatusAction,
    initialState
  );

  return (
    <div className="bg-gray-800 rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-6">Order Status</h2>

      <form action={formAction} className="space-y-4">
        {/* HIDDEN INPUTS TO BE PASSED TO THE FORM ACTION */}
        {/* This might not be the best approach, but i like it, i feel it is like elegant shit 💩 */}
        <input type="hidden" name="id" value={orderId} />

        {/* Global success message */}
        {formState.success && formState.message && (
          <div className="bg-green-900/50 border border-green-500 text-green-200 px-4 py-3 rounded-lg">
            {formState.message}
          </div>
        )}

        {/* Global error message */}
        {formState.success === false && formState.message && (
          <div className="bg-red-900/50 border border-red-500 text-red-200 px-4 py-3 rounded-lg">
            {formState.message}
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-gray-400 mb-2">
            Status
          </label>
          <div className="relative">
            <select
              name="status"
              defaultValue={currentStatus}
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white appearance-none hover:bg-gray-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {statusOptions.map((status) => (
                <option key={status.value} value={status.value}>
                  {status.label}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
          </div>

          {/* Status field errors */}
          {formState.errors?.status && (
            <div className="mt-2 space-y-1">
              {formState.errors.status.map((error, index) => (
                <p key={index} className="text-sm text-red-400">
                  {error}
                </p>
              ))}
            </div>
          )}

          {/* Current status indicator */}
          <div className="mt-3 flex items-center text-sm text-gray-300">
            <div
              className={`w-3 h-3 rounded-full mr-2 ${currentOption?.color}`}
            ></div>
            <span>Current: {currentOption?.label}</span>
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-colors"
        >
          Update Status
        </button>
      </form>
    </div>
  );
}
