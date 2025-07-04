import { InputFormText } from "@/components/form-parts/form-input-text";
import { ClientsWithOrders, UpdateClientFormState } from "@/types/clients";

export function ClientInformation({
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
        Contact Information
      </h3>
      <div className="space-y-4">
        {/* Email */}
        <div className="flex flex-col sm:grid sm:grid-cols-3 gap-2 sm:gap-4 py-3 border-b border-gray-700">
          <span className="text-gray-400 font-medium text-sm sm:text-base">
            Email
          </span>
          {isEditing ? (
            <InputFormText
              labelText="Email"
              placeholder="Enter email"
              id="email"
              name="email"
              type="email"
              defaultValue={state?.values?.email || client.email || ""}
              isPending={isPending}
              className="sm:col-span-2 bg-gray-700 border border-gray-600 rounded px-3 py-2 text-sm sm:text-base w-full"
              errors={state?.errors?.email}
            />
          ) : (
            <span className="sm:col-span-2 text-sm sm:text-base break-all">
              {client.email ?? ""}
            </span>
          )}
        </div>

        {/* Phone */}
        <div className="flex flex-col sm:grid sm:grid-cols-3 gap-2 sm:gap-4 py-3 border-b border-gray-700">
          <span className="text-gray-400 font-medium text-sm sm:text-base">
            Phone
          </span>
          {isEditing ? (
            <InputFormText
              labelText="Phone"
              placeholder="Enter phone"
              id="phone"
              name="phone"
              type="tel"
              defaultValue={state?.values?.phone || client.phone || ""}
              isPending={isPending}
              errors={state?.errors?.phone}
              className="sm:col-span-2 bg-gray-700 border border-gray-600 rounded px-3 py-2 text-sm sm:text-base w-full"
            />
          ) : (
            <span className="sm:col-span-2 text-sm sm:text-base">
              {client.phone ?? ""}
            </span>
          )}
        </div>

        {/* Address */}
        <div className="flex flex-col sm:grid sm:grid-cols-3 gap-2 sm:gap-4 py-3">
          <span className="text-gray-400 font-medium text-sm sm:text-base">
            Address
          </span>
          {isEditing ? (
            <div className="sm:col-span-2 grid grid-cols-1 sm:grid-cols-3 gap-2">
              <InputFormText
                labelText="Address"
                placeholder="Enter address"
                id="address"
                name="address"
                type="text"
                defaultValue={state?.values?.address || client.address || ""}
                isPending={isPending}
                className="bg-gray-700 border border-gray-600 rounded px-3 py-2 text-sm sm:text-base w-full"
                errors={state?.errors?.address}
              />
              <InputFormText
                labelText="City"
                placeholder="Enter city"
                id="city"
                name="city"
                type="text"
                defaultValue={state?.values?.city || client.city || ""}
                isPending={isPending}
                className="bg-gray-700 border border-gray-600 rounded px-3 py-2 text-sm sm:text-base w-full"
                errors={state?.errors?.city}
              />
              <InputFormText
                labelText="State"
                placeholder="Enter state"
                id="state"
                name="state"
                type="text"
                defaultValue={state?.values?.state || client.state || ""}
                isPending={isPending}
                errors={state?.errors?.state}
                className="bg-gray-700 border border-gray-600 rounded px-3 py-2 text-sm sm:text-base w-full"
              />
            </div>
          ) : (
            <span className="sm:col-span-2 text-sm sm:text-base">
              {[client.address, client.city, client.state]
                .filter(Boolean)
                .join(", ")}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
