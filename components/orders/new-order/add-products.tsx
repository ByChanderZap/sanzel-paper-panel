import { Plus } from "lucide-react";
import { Products } from "@/types/orders";

export function AddProducts({
  selectedProduct,
  products,
  quantity,
  customWidth,
  setSelectedProduct,
  setQuantity,
  setCustomWidth,
  setCustomLinearSize,
  selectedProductData,
  customLinearSize,
  addProductToOrder,
  customUnitPrice,
  setCustomUnitPrice,
}: {
  selectedProduct: string;
  products: Products[];
  quantity: number;
  customWidth: string;
  customLinearSize: string;
  customUnitPrice: string;
  setCustomLinearSize: React.Dispatch<React.SetStateAction<string>>;
  setSelectedProduct: React.Dispatch<React.SetStateAction<string>>;
  setQuantity: React.Dispatch<React.SetStateAction<number>>;
  setCustomWidth: React.Dispatch<React.SetStateAction<string>>;
  addProductToOrder: () => void;
  selectedProductData: Products | undefined;
  setCustomUnitPrice: React.Dispatch<React.SetStateAction<string>>;
}) {
  return (
    <div className="bg-primary p-6 rounded-3xl border border-gray-400">
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
            {products.map((product) => (
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
              placeholder={selectedProductData?.width?.toString() || "Default"}
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
                selectedProductData?.linear_size?.toString() || "Default"
              }
              className="w-full px-3 py-2 bg-primary border border-gray-600 rounded-2xl text-custom-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Custom Unit Price */}
        <div>
          <label className="block text-custom-white text-sm font-medium mb-2">
            Unit Price ($)
          </label>
          <input
            type="number"
            step="0.01"
            min="0"
            value={customUnitPrice}
            onChange={(e) => setCustomUnitPrice(e.target.value)}
            placeholder={
              selectedProductData?.unit_price?.toString() || "Default"
            }
            className="w-full px-3 py-2 bg-primary border border-gray-600 rounded-2xl text-custom-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
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
  );
}
