"use client";
import React, { useState, useMemo } from "react";
import { Trash2, Plus } from "lucide-react";

import { OrderItemsWithProdsInfo } from "@/types/orders";
import { SelectedProductsList } from "@/components/orders/selected-products-list";
import { Clients, Products } from "@prisma/client";

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
    () => mockProducts.find((p) => p.id === selectedProduct),
    [selectedProduct]
  );

  // Calculate item total
  const calculateItemTotal = (item) => {
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
      : selectedProductData.defaultWidth;
    const linearSize = customLinearSize
      ? parseFloat(customLinearSize)
      : selectedProductData.defaultLinearSize;

    const newItem = {
      id: Date.now().toString(),
      productId: selectedProductData.id,
      name: selectedProductData.name,
      quantity: quantity,
      width: width,
      linear_size: linearSize,
      unit_price: selectedProductData.basePrice,
    };

    setOrderItems([...orderItems, newItem]);

    // Reset form
    setSelectedProduct("");
    setQuantity(1);
    setCustomWidth("");
    setCustomLinearSize("");
  };

  // Remove product from order
  const removeProductFromOrder = (itemId) => {
    setOrderItems(orderItems.filter((item) => item.id !== itemId));
  };

  // Update order item
  const updateOrderItem = (itemId, field, value) => {
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

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Form Inputs */}
          <div className="lg:col-span-1 space-y-6">
            {/* Client Selection */}
            <div className="bg-secondary p-6 rounded-3xl border border-gray-700">
              <label className="block text-custom-white text-lg font-medium mb-4">
                Client
              </label>
              <select
                value={selectedClient}
                onChange={(e) => setSelectedClient(e.target.value)}
                className="w-full px-4 py-3 bg-primary border border-gray-600 rounded-2xl text-custom-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select Client</option>
                {mockClients.map((client) => (
                  <option key={client.id} value={client.id}>
                    {client.name} {client.email && `(${client.email})`}
                  </option>
                ))}
              </select>
            </div>

            {/* Add Products */}
            <div className="bg-secondary p-6 rounded-3xl border border-gray-700">
              <h3 className="text-custom-white text-lg font-medium mb-4">
                Add Products
              </h3>

              <div className="space-y-4">
                {/* Product Selection */}
                <div>
                  <label className="block text-custom-white text-sm font-medium mb-2">
                    Product
                  </label>
                  <select
                    value={selectedProduct}
                    onChange={(e) => setSelectedProduct(e.target.value)}
                    className="w-full px-3 py-2 bg-primary border border-gray-600 rounded-2xl text-custom-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select Product</option>
                    {mockProducts.map((product) => (
                      <option key={product.id} value={product.id}>
                        {product.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Quantity */}
                <div>
                  <label className="block text-custom-white text-sm font-medium mb-2">
                    Quantity
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={quantity}
                    onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                    className="w-full px-3 py-2 bg-primary border border-gray-600 rounded-2xl text-custom-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* Custom Dimensions */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-custom-white text-sm font-medium mb-2">
                      Width (cm)
                    </label>
                    <input
                      type="number"
                      step="0.1"
                      value={customWidth}
                      onChange={(e) => setCustomWidth(e.target.value)}
                      placeholder={
                        selectedProductData?.defaultWidth?.toString() ||
                        "Default"
                      }
                      className="w-full px-3 py-2 bg-primary border border-gray-600 rounded-2xl text-custom-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-custom-white text-sm font-medium mb-2">
                      Linear Size (cm)
                    </label>
                    <input
                      type="number"
                      step="0.1"
                      value={customLinearSize}
                      onChange={(e) => setCustomLinearSize(e.target.value)}
                      placeholder={
                        selectedProductData?.defaultLinearSize?.toString() ||
                        "Default"
                      }
                      className="w-full px-3 py-2 bg-primary border border-gray-600 rounded-2xl text-custom-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                {/* Add Button */}
                <button
                  type="button"
                  onClick={addProductToOrder}
                  disabled={!selectedProduct}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 text-white rounded-2xl hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed transition-colors font-medium"
                >
                  <Plus size={18} />
                  Add to Order
                </button>
              </div>
            </div>

            {/* Status Selection */}
            <div className="bg-secondary p-6 rounded-3xl border border-gray-700">
              <label className="block text-custom-white text-lg font-medium mb-4">
                Status
              </label>
              <select
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
            type="button"
            disabled={!selectedClient || orderItems.length === 0}
            className="px-8 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed transition-colors font-medium"
          >
            Create Order
          </button>
        </div>
      </div>
    </div>
  );
}
