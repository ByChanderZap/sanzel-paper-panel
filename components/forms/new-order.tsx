"use client";
import React, { useState, useMemo } from "react";
import { Trash2, Plus } from "lucide-react";

import {
  CustomTable,
  TableHeader,
  TableBody,
  TableRow,
  TableRowContent,
} from "@/components/custom-table";

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

export function NewOrderForm() {
  const [selectedClient, setSelectedClient] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("pending");
  const [orderItems, setOrderItems] = useState([]);

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
    const multiplier = (item.width * item.linearSize) / 1000; // Convert to m²
    return item.quantity * item.unitPrice * multiplier;
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
      productName: selectedProductData.name,
      quantity: quantity,
      width: width,
      linearSize: linearSize,
      unitPrice: selectedProductData.basePrice,
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
          <div className="lg:col-span-2">
            <div className="bg-secondary rounded-3xl border border-gray-700 overflow-hidden">
              <div className="p-6 border-b border-gray-700">
                <h3 className="text-custom-white text-lg font-medium">
                  Products
                </h3>
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
                                {item.productName}
                              </div>
                            }
                          />
                          <TableRowContent
                            content={
                              <input
                                type="number"
                                min="1"
                                value={item.quantity}
                                onChange={(e) =>
                                  updateOrderItem(
                                    item.id,
                                    "quantity",
                                    parseInt(e.target.value) || 1
                                  )
                                }
                                className="w-16 px-2 py-1 bg-primary border border-gray-600 rounded-xl text-custom-white text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 mx-auto"
                              />
                            }
                          />
                          <TableRowContent
                            content={
                              <input
                                type="number"
                                step="0.1"
                                value={item.width}
                                onChange={(e) =>
                                  updateOrderItem(
                                    item.id,
                                    "width",
                                    parseFloat(e.target.value) || 0
                                  )
                                }
                                className="w-20 px-2 py-1 bg-primary border border-gray-600 rounded-xl text-custom-white text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 mx-auto"
                              />
                            }
                          />
                          <TableRowContent
                            content={
                              <input
                                type="number"
                                step="0.1"
                                value={item.linearSize}
                                onChange={(e) =>
                                  updateOrderItem(
                                    item.id,
                                    "linearSize",
                                    parseFloat(e.target.value) || 0
                                  )
                                }
                                className="w-20 px-2 py-1 bg-primary border border-gray-600 rounded-xl text-custom-white text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 mx-auto"
                              />
                            }
                          />
                          <TableRowContent
                            content={
                              <div className="text-custom-white text-sm">
                                ${item.unitPrice.toFixed(2)}
                              </div>
                            }
                          />
                          <TableRowContent
                            content={
                              <div className="text-custom-white font-semibold text-sm">
                                ${calculateItemTotal(item).toFixed(2)}
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
                  <div className="bg-gray-700 px-6 py-4 border-t border-gray-600 rounded-b-lg">
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
