import Link from "next/link.js";
import { InputFormSelect } from "@/components/form-parts/form-select";
import { FormSendButton } from "@/components/form-parts/form-send-button";

export function NewOrderForm() {
  const orderItems = [];
  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-white mb-8">Create New Order</h1>

      <form className="space-y-8">
        {/* Client Selection */}
        <div>
          <label className="block text-white text-lg font-medium mb-3">
            Client
          </label>
          <InputFormSelect
            id="clientId"
            name="clientId"
            labelText=""
            required={true}
            // options={[
            //   { value: "", label: "Select Client" },
            //   ...clients.map(client => ({
            //     value: client.id,
            //     label: client.name + (client.email ? ` (${client.email})` : '')
            //   }))
            // ]}
            options={["a", "b", "c"]}
            htmlFor="clientId"
            // value={selectedClient}
            // onChange={(e) => setSelectedClient(e.target.value)}
          />
        </div>

        {/* Product Selection */}
        <div>
          <label className="block text-white text-lg font-medium mb-3">
            Add Products
          </label>
          <div className="bg-secondary p-6 rounded-lg border border-slate-600">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-4">
              <div>
                <label className="block text-slate-200 text-sm font-medium mb-2">
                  Product
                </label>
                <select
                  // value={selectedProduct}
                  // onChange={(e) => setSelectedProduct(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select Product</option>
                  {/* {products.map(product => (
                    <option key={product.id} value={product.id}>
                      {product.name}
                    </option>
                  ))} */}
                  {["uno", "dos", "tres"].map((product) => (
                    <option key={product} value={product}>
                      {product}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-slate-200 text-sm font-medium mb-2">
                  Quantity
                </label>
                <input
                  type="number"
                  min="1"
                  // value={quantity}
                  // onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                  className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-slate-200 text-sm font-medium mb-2">
                  Custom Width
                </label>
                <input
                  type="number"
                  step="0.01"
                  placeholder="Default"
                  // value={customWidth}
                  // onChange={(e) => setCustomWidth(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-slate-200 text-sm font-medium mb-2">
                  Custom Linear Size
                </label>
                <input
                  type="number"
                  step="0.01"
                  placeholder="Default"
                  // value={customLinearSize}
                  // onChange={(e) => setCustomLinearSize(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="flex items-end">
                <button
                  type="button"
                  // onClick={addProductToOrder}
                  // disabled={!selectedProduct}
                  className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-slate-600 disabled:cursor-not-allowed transition-colors font-medium"
                >
                  Add to Order
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Products Table */}
        {orderItems.length > 0 && (
          <div>
            <label className="block text-white text-lg font-medium mb-3">
              Products
            </label>
            <div className="bg-slate-800 rounded-lg border border-slate-600 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-slate-700">
                    <tr>
                      <th className="px-6 py-4 text-left text-white font-medium">
                        Product
                      </th>
                      <th className="px-6 py-4 text-left text-white font-medium">
                        Quantity
                      </th>
                      <th className="px-6 py-4 text-left text-white font-medium">
                        Width
                      </th>
                      <th className="px-6 py-4 text-left text-white font-medium">
                        Linear Size
                      </th>
                      <th className="px-6 py-4 text-left text-white font-medium">
                        Unit Price
                      </th>
                      <th className="px-6 py-4 text-left text-white font-medium">
                        Total
                      </th>
                      <th className="px-6 py-4 text-left text-white font-medium">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-600">
                    {orderItems.map((item) => (
                      <tr key={item.id} className="hover:bg-slate-750">
                        <td className="px-6 py-4 text-white">
                          {item.productName}
                        </td>
                        <td className="px-6 py-4">
                          <input
                            type="number"
                            min="1"
                            value={item.quantity}
                            // onChange={(e) =>
                            //   updateOrderItem(
                            //     item.id,
                            //     "quantity",
                            //     parseInt(e.target.value) || 1
                            //   )
                            // }
                            className="w-20 px-2 py-1 bg-slate-700 border border-slate-600 rounded text-white text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                          />
                        </td>
                        <td className="px-6 py-4">
                          <input
                            type="number"
                            step="0.01"
                            value={item.width}
                            // onChange={(e) =>
                            //   updateOrderItem(
                            //     item.id,
                            //     "width",
                            //     parseFloat(e.target.value) || 0
                            //   )
                            // }
                            className="w-24 px-2 py-1 bg-slate-700 border border-slate-600 rounded text-white text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                          />
                        </td>
                        <td className="px-6 py-4">
                          <input
                            type="number"
                            step="0.01"
                            value={item.linearSize}
                            // onChange={(e) =>
                            //   updateOrderItem(
                            //     item.id,
                            //     "linearSize",
                            //     parseFloat(e.target.value) || 0
                            //   )
                            // }
                            className="w-24 px-2 py-1 bg-slate-700 border border-slate-600 rounded text-white text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                          />
                        </td>
                        <td className="px-6 py-4 text-white">
                          ${item.unitPrice.toFixed(2)}
                        </td>
                        <td className="px-6 py-4 text-white font-semibold">
                          {/* ${calculateItemTotal(item).toFixed(2)} */}11
                        </td>
                        <td className="px-6 py-4">
                          <button
                            type="button"
                            // onClick={() => removeProductFromOrder(item.id)}
                            className="px-3 py-1 bg-red-600 text-white rounded text-sm hover:bg-red-700 transition-colors"
                          >
                            Remove
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Order Total */}
              <div className="bg-slate-700 px-6 py-4 border-t border-slate-600">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold text-white">
                    Order Total:
                  </span>
                  <span className="text-2xl font-bold text-green-400">
                    {/* ${calculateOrderTotal().toFixed(2)} */}1111
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Status Selection */}
        <div>
          <label className="block text-white text-lg font-medium mb-3">
            Status
          </label>
          <InputFormSelect
            id="status"
            name="status"
            labelText=""
            required={true}
            options={["a", "b", "c"]}
            htmlFor="status"
            // value={selectedStatus}
            // onChange={(e) => setSelectedStatus(e.target.value)}
          />
        </div>

        {/* Form Actions */}
        <div className="flex justify-end gap-4 pt-6">
          <Link
            href="/orders"
            className="px-8 py-3 bg-slate-600 text-slate-200 border border-slate-500 rounded-md transition-colors font-medium hover:bg-slate-500"
          >
            Cancel
          </Link>

          <FormSendButton
            text="Create Order"
            loadingText="Creating Order..."
            isPending={false}
            // disabled={
            //   !selectedClient || orderItems.length === 0 || !selectedStatus
            // }
          />
        </div>
      </form>
    </div>
  );
}
