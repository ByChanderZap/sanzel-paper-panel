"use client";
import React, { useState, useMemo, useActionState } from "react";

import {
  OrderFormState,
  OrderItemsWithProdsInfo,
  Products,
} from "@/types/orders";
import { SelectedProductsList } from "@/components/orders/selected-products-list";
import { Clients, OrderStatus, Vendor } from "@prisma/client";
import { createOrderAction } from "@/actions/orders"; // You'll need to create this
import { AddProducts } from "@/components/orders/new-order/add-products";
import { OrderClientSelection } from "@/components/orders/new-order/client-selection";
import { OrderVendorSelection } from "@/components/orders/new-order/vendor-selection";

const statusLabels: Record<OrderStatus, string> = {
  PENDING: "Pending",
  CONFIRMED: "Confirmed",
  PROCESSING: "Processing",
  SHIPPED: "Shipped",
  DELIVERED: "Delivered",
  CANCELLED: "Cancelled",
  PAID: "Paid",
  NOT_PAID: "Not Paid",
};

const statusOptions = Object.values(OrderStatus).map((status) => ({
  value: status,
  label: statusLabels[status],
}));

const initialState: OrderFormState = {
  message: null,
  success: null,
  errors: {},
};
export function NewOrderFormContent({
  clients,
  products,
  vendors,
}: {
  clients: Clients[];
  products: Products[];
  vendors: Vendor[];
}) {
  const [formState, formAction] = useActionState(
    createOrderAction,
    initialState
  );

  const [selectedClient, setSelectedClient] = useState("");
  const [selectedVendor, setSelectedVendor] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("pending");
  const [orderItems, setOrderItems] = useState<OrderItemsWithProdsInfo[]>([]);
  const [discount, setDiscount] = useState(0);

  // Product form state
  const [selectedProduct, setSelectedProduct] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [customWidth, setCustomWidth] = useState("");
  const [customLinearSize, setCustomLinearSize] = useState("");
  const [customUnitPrice, setCustomUnitPrice] = useState("");

  // Get selected product details
  const selectedProductData = useMemo(
    () => products.find((p) => p.id === selectedProduct),
    [selectedProduct, products]
  );

  // Calculate item total
  const calculateItemTotal = (item: OrderItemsWithProdsInfo) => {
    const multiplier = (item.width * item.linear_size) / 100;
    return item.quantity * item.unit_price * multiplier;
  };

  // Calculate order total
  const orderTotal = useMemo(
    () => orderItems.reduce((sum, item) => sum + calculateItemTotal(item), 0),
    [orderItems]
  );

  // Calculate discounted total
  const discountedTotal = useMemo(
    () => orderTotal * (1 - (discount > 0 ? discount / 100 : 0)),
    [orderTotal, discount]
  );

  // Add product to order
  const addProductToOrder = () => {
    if (!selectedProductData) return;

    const width = customWidth
      ? parseFloat(customWidth)
      : selectedProductData.width;
    const linearSize = customLinearSize
      ? parseFloat(customLinearSize)
      : selectedProductData.linear_size;

    const unitPrice = customUnitPrice
      ? parseFloat(customUnitPrice)
      : selectedProductData.unit_price;

    // Calculate item total
    const multiplier = (width * linearSize) / 100;
    const itemTotal = quantity * unitPrice * multiplier;

    const newItem: OrderItemsWithProdsInfo = {
      id: Date.now().toString(),
      productId: selectedProductData.id,
      name: selectedProductData.name,
      quantity: quantity,
      width: width,
      linear_size: linearSize,
      unit_price: unitPrice,
      itemTotal: parseFloat(itemTotal.toFixed(2)),
      // Optional fields can be omitted during creation
    };

    setOrderItems([...orderItems, newItem]);

    // Reset form
    setSelectedProduct("");
    setQuantity(1);
    setCustomWidth("");
    setCustomLinearSize("");
    setCustomUnitPrice("");
  };

  // Remove product from order
  const removeProductFromOrder = (itemId: string) => {
    setOrderItems(orderItems.filter((item) => item.id !== itemId));
  };

  return (
    <div className="min-h-screen ">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-custom-white mb-8">
          Create New Order
        </h1>

        <form action={formAction}>
          {/* Hidden inputs for server action */}
          <input type="hidden" name="clientId" value={selectedClient} />
          <input type="hidden" name="vendorId" value={selectedVendor} />
          <input type="hidden" name="status" value={selectedStatus} />
          <input
            type="hidden"
            name="orderItems"
            value={JSON.stringify(orderItems)}
          />
          <input
            type="hidden"
            name="orderTotal"
            value={orderTotal.toString()}
          />
          <input type="hidden" name="discount" value={discount} />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Form Inputs */}
            <div className="lg:col-span-1 space-y-6">
              {/* Client Selection */}
              <OrderClientSelection
                clients={clients}
                formState={formState}
                selectedClient={selectedClient}
                setSelectedClient={setSelectedClient}
              />

              {/* Vendor Selection */}

              <OrderVendorSelection
                vendors={vendors}
                formState={formState}
                selectedVendor={selectedVendor}
                setSelectedVendor={setSelectedVendor}
              />

              {/* Add Products */}
              <AddProducts
                customLinearSize={customLinearSize}
                customWidth={customWidth}
                quantity={quantity}
                selectedProduct={selectedProduct}
                selectedProductData={selectedProductData}
                customUnitPrice={customUnitPrice}
                products={products}
                errors={formState.errors?.orderItems}
                addProductToOrder={addProductToOrder}
                setCustomLinearSize={setCustomLinearSize}
                setCustomWidth={setCustomWidth}
                setQuantity={setQuantity}
                setSelectedProduct={setSelectedProduct}
                setCustomUnitPrice={setCustomUnitPrice}
              />

              {/* Status Selection */}
              <div className="bg-primary p-6 rounded-3xl border border-gray-400">
                <label className="block text-custom-white text-lg font-medium mb-4">
                  Status
                </label>
                <select
                  name="statusSelect" // For accessibility, but we use hidden input for actual submission
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="w-full px-4 py-3 bg-primary border border-gray-600 rounded-2xl text-custom-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {statusOptions.map((status) => (
                    <option key={status.value} value={status.value}>
                      {status.label}
                    </option>
                  ))}
                </select>
                {formState.errors?.status && (
                  <p className="text-red-400 text-sm mt-1">
                    {formState.errors.status}
                  </p>
                )}
              </div>

              {/* Discount Input */}
              <div className="bg-primary p-6 rounded-3xl border border-gray-400 mt-4">
                <label className="block text-custom-white text-lg font-medium mb-4">
                  Discount (%)
                </label>
                <input
                  type="number"
                  name="discountInput"
                  min={0}
                  max={100}
                  value={discount}
                  onChange={(e) => setDiscount(Number(e.target.value))}
                  className="w-full px-4 py-3 bg-primary border border-gray-600 rounded-2xl text-custom-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter discount percentage (optional)"
                />
              </div>
            </div>

            {/* Right Column - Products Table */}
            <SelectedProductsList
              orderItems={orderItems}
              orderTotal={orderTotal}
              discountedTotal={discountedTotal}
              removeProductFromOrder={removeProductFromOrder}
            />
          </div>

          {/* Form Actions */}
          <div className="flex justify-end gap-4 mt-8">
            <button
              type="button"
              className="px-8 py-3 bg-gray-600 text-gray-200 border border-gray-500 rounded-md transition-colors font-medium hover:bg-gray-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!selectedClient || orderItems.length === 0}
              className="px-8 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed transition-colors font-medium"
            >
              Create Order
            </button>
          </div>

          {/* Display form state messages */}
          {formState.message && (
            <div
              className={`my-6 p-4 rounded-lg ${
                formState.success
                  ? "bg-green-600 text-white"
                  : "bg-red-600 text-white"
              }`}
            >
              {formState.message}
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
