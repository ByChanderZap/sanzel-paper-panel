"use client";
import React, { useState, useMemo, useActionState } from "react";

import { OrderItemsWithProdsInfo } from "@/types/orders";
import { SelectedProductsList } from "@/components/orders/selected-products-list";
import { Clients, Products } from "@prisma/client";
import { createOrderAction } from "@/actions/orders"; // You'll need to create this
import { AddProducts } from "@/components/orders/new-order/add-products";

// Mock data - replace with your server actions
const mockClients = [
  { id: "1", name: "John Doe", email: "john@example.com" },
  { id: "2", name: "Jane Smith", email: "jane@example.com" },
  { id: "3", name: "Acme Corp", email: "contact@acme.com" },
];

const mockProducts = [
  {
    id: "1",
    name: "A4 Paper",
    basePrice: 0.5,
    defaultWidth: 21.0,
    defaultLinearSize: 29.7,
  },
  {
    id: "2",
    name: "A3 Paper",
    basePrice: 0.75,
    defaultWidth: 29.7,
    defaultLinearSize: 42.0,
  },
  {
    id: "3",
    name: "Envelopes",
    basePrice: 0.2,
    defaultWidth: 11.0,
    defaultLinearSize: 22.0,
  },
];

const statusOptions = [
  { value: "pending", label: "Pending" },
  { value: "processing", label: "Processing" },
  { value: "completed", label: "Completed" },
  { value: "cancelled", label: "Cancelled" },
];

export function NewOrderFormContent({
  clients,
  products,
}: {
  clients: Clients[];
  products: Products[];
}) {
  // Form state with useFormState for server actions
  // console.log(products);
  const [formState, formAction] = useActionState(createOrderAction, {
    success: false,
    message: "",
    errors: {},
  });

  const [selectedClient, setSelectedClient] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("pending");
  const [orderItems, setOrderItems] = useState<OrderItemsWithProdsInfo[]>([]);

  // Product form state
  const [selectedProduct, setSelectedProduct] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [customWidth, setCustomWidth] = useState("");
  const [customLinearSize, setCustomLinearSize] = useState("");

  // Get selected product details
  const selectedProductData = useMemo(
    () => products.find((p) => p.id === selectedProduct),
    [selectedProduct, products]
  );

  console.log("SELECTED PRODUCT DATA");
  console.log(selectedProductData);
  // Calculate item total
  const calculateItemTotal = (item: OrderItemsWithProdsInfo) => {
    const multiplier = (item.width * item.linear_size) / 1000; // Convert to m²
    return item.quantity * item.unit_price * multiplier;
  };

  // Calculate order total
  const orderTotal = useMemo(
    () => orderItems.reduce((sum, item) => sum + calculateItemTotal(item), 0),
    [orderItems]
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

    const newItem: OrderItemsWithProdsInfo = {
      id: Date.now().toString(),
      productId: selectedProductData.id,
      name: selectedProductData.name,
      quantity: quantity,
      width: width,
      linear_size: linearSize,
      unit_price: selectedProductData.unit_price,
    };
    setOrderItems([...orderItems, newItem]);

    // Reset form
    setSelectedProduct("");
    setQuantity(1);
    setCustomWidth("");
    setCustomLinearSize("");
  };

  // Remove product from order
  const removeProductFromOrder = (itemId: string) => {
    setOrderItems(orderItems.filter((item) => item.id !== itemId));
  };

  // Update order item
  const updateOrderItem = (itemId: string, field: string, value: any) => {
    setOrderItems(
      orderItems.map((item) =>
        item.id === itemId ? { ...item, [field]: value } : item
      )
    );
  };

  return (
    <div className="min-h-screen bg-primary p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-custom-white mb-8">
          Create New Order
        </h1>

        {/* Display form state messages */}
        {formState.message && (
          <div
            className={`mb-6 p-4 rounded-lg ${
              formState.success
                ? "bg-green-600 text-white"
                : "bg-red-600 text-white"
            }`}
          >
            {formState.message}
          </div>
        )}

        <form action={formAction}>
          {/* Hidden inputs for server action */}
          <input type="hidden" name="clientId" value={selectedClient} />
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

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Form Inputs */}
            <div className="lg:col-span-1 space-y-6">
              {/* Client Selection */}
              <div className="bg-secondary p-6 rounded-3xl border border-gray-700">
                <label className="block text-custom-white text-lg font-medium mb-4">
                  Client
                </label>
                <select
                  name="clientSelect" // For accessibility, but we use hidden input for actual submission
                  value={selectedClient}
                  onChange={(e) => setSelectedClient(e.target.value)}
                  className="w-full px-4 py-3 bg-primary border border-gray-600 rounded-2xl text-custom-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="">Select Client</option>
                  {mockClients.map((client) => (
                    <option key={client.id} value={client.id}>
                      {client.name} {client.email && `(${client.email})`}
                    </option>
                  ))}
                </select>
                {formState.errors?.clientId && (
                  <p className="text-red-400 text-sm mt-1">
                    {formState.errors.clientId}
                  </p>
                )}
              </div>

              {/* Add Products */}
              <AddProducts
                addProductToOrder={addProductToOrder}
                customLinearSize={customLinearSize}
                customWidth={customWidth}
                products={products}
                quantity={quantity}
                selectedProduct={selectedProduct}
                selectedProductData={selectedProductData}
                setCustomLinearSize={setCustomLinearSize}
                setCustomWidth={setCustomWidth}
                setQuantity={setQuantity}
                setSelectedProduct={setSelectedProduct}
              />

              {/* Status Selection */}
              <div className="bg-secondary p-6 rounded-3xl border border-gray-700">
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
            </div>

            {/* Right Column - Products Table */}
            <SelectedProductsList
              calculateItemTotal={calculateItemTotal}
              orderItems={orderItems}
              orderTotal={orderTotal}
              removeProductFromOrder={removeProductFromOrder}
              updateOrderItem={updateOrderItem}
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

          {/* Display validation errors */}
          {formState.errors?.orderItems && (
            <p className="text-red-400 text-sm mt-2">
              {formState.errors.orderItems}
            </p>
          )}
        </form>
      </div>
    </div>
  );
}
