"use client";

import { ClientsWithOrders, UpdateClientFormState } from "@/types/clients";
import { ClientProfileSection } from "./clientProfileSection";
import { ClientInformation } from "./client-information";
import { ShipmentDetails } from "./shipment-details";
import { useActionState } from "react";
import { updateClientAction } from "@/actions/clients";
import { FormHeader } from "@/components/form-parts/form-header";
import { ToggleEditButtons } from "./toggle-edit-buttons";

export function ClientSummaryForm({
  isEditing,
  id,
  client,
}: {
  isEditing: boolean;
  id: string;
  client: ClientsWithOrders | null;
}) {
  const initialState: UpdateClientFormState = {
    errors: {},
    success: null,
  };

  const [state, formAction, isPending] = useActionState(
    updateClientAction,
    initialState
  );

  if (!client) {
    return null;
  }

  return (
    <form id="client-form" action={formAction}>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 gap-4">
        <FormHeader
          title="Client Details"
          targetPrevPage="clients"
          previousPage="Clients"
          currentPageTitle="Client Details"
        />
        <ToggleEditButtons
          id={id}
          isEditing={isEditing}
          isPending={isPending}
        />
      </div>
      <input type="hidden" name="clientId" value={id} />

      {/* Client Profile Section */}
      <ClientProfileSection
        client={client}
        isEditing={isEditing}
        state={state}
        isPending={isPending}
      />

      {/* Contact Information */}
      <ClientInformation
        client={client}
        isEditing={isEditing}
        state={state}
        isPending={isPending}
      />

      {/* Shipping Details */}
      <ShipmentDetails
        client={client}
        isEditing={isEditing}
        state={state}
        isPending={isPending}
      />
    </form>
  );
}
