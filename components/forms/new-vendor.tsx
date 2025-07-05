"use client";

import { InputFormText } from "@/components/form-parts/form-input-text";
import { FormSendButton } from "@/components/form-parts/form-send-button";
import { useActionState } from "react";
import { newVendor } from "@/actions/vendors";
import { VendorsFormState } from "@/types/vendors";

const initialFormState: VendorsFormState = {
  errors: {},
  success: null,
};

export function NewVendorForm() {
  const [state, formAction, isPending] = useActionState(
    newVendor,
    initialFormState
  );
  return (
    <form action={formAction}>
      <div className="mb-8">
        <h3 className="text-xl font-semibold text-white mb-4 pb-2 border-b border-slate-600">
          Vendor Information
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InputFormText
            id="name"
            name="name"
            labelText="Name"
            required={true}
            placeholder="Enter vendor name"
            type="text"
            errors={state.errors?.name}
          />
          <InputFormText
            id="phone"
            name="phone"
            labelText="Phone Number"
            required={true}
            placeholder="Enter phone number"
            type="tel"
            errors={state.errors?.phone}
          />
        </div>
      </div>
      <div className="flex flex-col sm:flex-row gap-4 justify-end pt-6 border-t border-slate-600">
        <FormSendButton
          loadingText="Creating..."
          text="Create Vendor"
          isPending={isPending}
        />
      </div>
    </form>
  );
}
