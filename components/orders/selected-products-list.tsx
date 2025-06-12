import {
  CustomTable,
  TableHeader,
  TableBody,
  TableRow,
  TableRowContent,
} from "@/components/custom-table";

export function SelectedProductsList() {
  <div className="lg:col-span-2">
    <div className="bg-secondary rounded-3xl border border-gray-700 overflow-hidden">
      <div className="p-6 border-b border-gray-700">
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
  </div>;
}
