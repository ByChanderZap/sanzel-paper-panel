"use client";

import { InputFormText } from "@/components/form-parts/form-input-text";
import { FormSendButton } from "@/components/form-parts/form-send-button";
import { ClientsFormState } from "@/types/clients";
import { newClient } from "@/actions/clients";
import { useActionState } from "react";

const initialFormState: ClientsFormState = {
  errors: {},
  success: null,
};

export function NewClientForm() {
  const [state, formAction, isPending] = useActionState(
    newClient,
    initialFormState
  );
  return (
    <form action={formAction}>
      {/* Basic Information Section */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold text-white mb-4 pb-2 border-b border-slate-600">
          Basic Information
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InputFormText
            id="name"
            name="name"
            labelText="Name"
            required={true}
            placeholder="Enter client name"
            type="text"
            errors={state.errors?.name}
          />

          <InputFormText
            id="email"
            name="email"
            labelText="Email"
            placeholder="Enter email address"
            type="email"
            required={false}
            errors={state.errors?.email}
          />
          <InputFormText
            id="phone"
            name="phone"
            labelText="Phone Number"
            placeholder="Enter phone number"
            type="tel"
            required={true}
            errors={state.errors?.phone}
          />
          <InputFormText
            id="shippingNumber"
            name="shippingNumber"
            labelText="Client Number for Shipping"
            placeholder="Enter client shipping number"
            type="text"
            required={false}
            errors={state.errors?.shippingNumber}
          />
        </div>
      </div>

      {/* Address Information Section */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold text-white mb-4 pb-2 border-b border-slate-600">
          Address Information
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InputFormText
            id="address"
            name="address"
            labelText="Address"
            required={true}
            placeholder="Enter street address"
            type="text"
            errors={state.errors?.address}
          />
          <InputFormText
            id="city"
            name="city"
            labelText="City"
            required={true}
            placeholder="Enter city"
            type="text"
            errors={state.errors?.city}
          />
          <InputFormText
            id="state"
            name="state"
            labelText="State"
            required={true}
            placeholder="Enter state"
            type="text"
            errors={state.errors?.state}
          />
        </div>
      </div>

      {/* Form Actions */}
      <div className="flex flex-col sm:flex-row gap-4 justify-end pt-6 border-t border-slate-600">
        <FormSendButton
          loadingText="Creating..."
          text="Create Client"
          isPending={isPending}
        />
      </div>
    </form>
  );
}
