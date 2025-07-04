import { InputFormText } from "@/components/form-parts/form-input-text";
import { ClientsWithOrders, UpdateClientFormState } from "@/types/clients";

export function ClientProfileSection({
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
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };
  return (
    <div className="bg-gray-800 rounded-lg p-4 sm:p-6 mb-6 sm:mb-8">
      <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6">
        <div className="w-16 h-16 sm:w-20 sm:h-20 bg-blue-600 rounded-full flex items-center justify-center text-xl sm:text-2xl font-bold mx-auto sm:mx-0">
          {getInitials(client.name)}
        </div>
        <div className="text-center sm:text-left">
          {isEditing ? (
            // <input
            //   type="text"
            //   name="name"
            //   defaultValue={client.name}
            //   className="text-xl sm:text-2xl font-bold bg-gray-700 border border-gray-600 rounded px-3 py-1 mb-2 w-full max-w-xs"
            //   required
            // />
            <InputFormText
              labelText="Name"
              placeholder="Enter name"
              id="name"
              name="name"
              type="text"
              defaultValue={state?.values?.name || client.name}
              isPending={isPending}
              className="text-xl sm:text-2xl font-bold bg-gray-700 border border-gray-600 rounded px-3 py-1 mb-2 w-full max-w-xs"
            />
          ) : (
            <h2 className="text-xl sm:text-2xl font-bold mb-1">
              {client.name}
            </h2>
          )}
          <p className="text-gray-400 text-sm">Client ID: {client.id}</p>
          <p className="text-gray-400 text-sm">
            Joined {client.createdAt.toLocaleDateString()}
          </p>
        </div>
      </div>
    </div>
  );
}
