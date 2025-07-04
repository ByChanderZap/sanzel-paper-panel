import { ClientsWithOrders, UpdateClientFormState } from "@/types/clients";
import { InputFormText } from "@/components/form-parts/form-input-text";

export function ShipmentDetails({
  client,
  isEditing,
  state,
  isPending,
}: {
  client: ClientsWithOrders;
  isEditing: boolean;
  state: UpdateClientFormState;
  isPending: boolean;
}) {
  return (
    <div className="bg-gray-800 rounded-lg p-4 sm:p-6 mb-6 sm:mb-8">
      <h3 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6">
        Shipping Details
      </h3>
      <div className="space-y-4">
        {/* Shipping Address */}
        <div className="flex flex-col sm:grid sm:grid-cols-3 gap-2 sm:gap-4 py-3 border-b border-gray-700">
          <span className="text-gray-400 font-medium text-sm sm:text-base">
            Shipping Number
          </span>
          {isEditing ? (
            <InputFormText
              labelText="Shipping Number"
              placeholder="Enter shipping number"
              id="shippingNumber"
              name="shippingNumber"
              type="text"
              defaultValue={
                state?.values?.shippingNumber || client.shippingNumber || ""
              }
              isPending={isPending}
              className="sm:col-span-2 bg-gray-700 border border-gray-600 rounded px-3 py-2 text-sm sm:text-base w-full"
              errors={state?.errors?.shippingNumber}
            />
          ) : (
            <span className="sm:col-span-2 text-sm sm:text-base">
              {client.shippingNumber ?? ""}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
