import { OrderFormState } from "@/types/orders";
import { Vendor } from "@prisma/client";

export function OrderVendorSelection({
  selectedVendor,
  vendors,
  setSelectedVendor,
  formState,
}: {
  selectedVendor: string;
  vendors: Vendor[];
  setSelectedVendor: React.Dispatch<React.SetStateAction<string>>;
  formState: OrderFormState;
}) {
  return (
    <div className="bg-primary p-6 rounded-3xl border border-gray-400">
      <label className="block text-custom-white text-lg font-medium mb-4">
        Vendor
      </label>
      <select
        name="clientSelect"
        value={selectedVendor}
        onChange={(e) => setSelectedVendor(e.target.value)}
        className="w-full px-4 py-3 bg-primary border border-gray-600 rounded-2xl text-custom-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        required
      >
        <option value="">Select Vendor</option>
        {vendors.map((vendor) => (
          <option key={vendor.id} value={vendor.id}>
            {vendor.name} {vendor.phone && `(${vendor.phone})`}
          </option>
        ))}
      </select>
      {formState.errors?.client && (
        <p className="text-red-400 text-sm mt-1">{formState.errors.client}</p>
      )}
    </div>
  );
}
