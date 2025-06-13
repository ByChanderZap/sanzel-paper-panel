import { Clients } from "@prisma/client";
import { OrderFormState } from "@/types/orders";

export function OrderClientSelection({
  selectedClient,
  clients,
  setSelectedClient,
  formState,
}: {
  selectedClient: string;
  clients: Clients[];
  setSelectedClient: React.Dispatch<React.SetStateAction<string>>;
  formState: OrderFormState;
}) {
  return (
    <div className="bg-primary p-6 rounded-3xl border border-gray-400">
      <label className="block text-custom-white text-lg font-medium mb-4">
        Client
      </label>
      <select
        name="clientSelect"
        value={selectedClient}
        onChange={(e) => setSelectedClient(e.target.value)}
        className="w-full px-4 py-3 bg-primary border border-gray-600 rounded-2xl text-custom-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        required
      >
        <option value="">Select Client</option>
        {clients.map((client) => (
          <option key={client.id} value={client.id}>
            {client.name} {client.email && `(${client.email})`}
          </option>
        ))}
      </select>
      {formState.errors?.client && (
        <p className="text-red-400 text-sm mt-1">{formState.errors.client}</p>
      )}
    </div>
  );
}
