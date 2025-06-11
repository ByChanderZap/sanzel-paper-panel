"use client";
import { PaperQuality } from "@prisma/client";
import { InputFormText } from "@/components/form-parts/form-input-text";
import { InputFormSelect } from "@/components/form-parts/form-select";
import { InputFormTextarea } from "@/components/form-parts/text-area";
import { FormSendButton } from "@/components/form-parts/form-send-button";
import Link from "next/link.js";
import { ProductsFormState } from "@/types/products";
import { useActionState } from "react";
import { newProduct } from "@/actions/products";

const initialFormState: ProductsFormState = {
  errors: {},
  success: null,
};

export function NewProductForm() {
  const [state, formAction, isPending] = useActionState(
    newProduct,
    initialFormState
  );

  return (
    <form action={formAction}>
      {/* Basic Information Section */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold text-white mb-4 pb-2 border-b border-slate-600">
          Product Information
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InputFormText
            labelText="Product Name"
            required={true}
            type="text"
            placeholder="Enter product name"
            id="name"
            name="name"
            errors={state.errors?.name}
          />
          <InputFormSelect
            id="quality"
            name="quality"
            labelText="PaperQuality"
            required={true}
            options={Object.values(PaperQuality)}
            htmlFor="quality"
            errors={state.errors?.quality}
          />
          <div className="md:col-span-2">
            <InputFormTextarea
              id="description"
              name="description"
              labelText="Description"
              placeholder="Enter product description (optional)"
              // errors={}
              errors={state.errors?.description}
              rows={3}
            />
          </div>
        </div>
      </div>

      {/* Inventory & Pricing Section */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold text-white mb-4 pb-2 border-b border-slate-600">
          Inventory & Pricing
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InputFormText
            labelText="Stock Quantity"
            required={true}
            type="number"
            placeholder="Enter stock quantity"
            id="stock"
            name="stock"
            errors={state.errors?.stock}
          />

          <InputFormText
            labelText="Unit Price ($)"
            required={true}
            type="number"
            placeholder="Enter unit price"
            id="unit_price"
            name="unit_price"
            steps="0.01"
            errors={state.errors?.unit_price}
          />
        </div>
      </div>

      {/* Dimensions Section */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold text-white mb-4 pb-2 border-b border-slate-600">
          Dimensions
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InputFormText
            labelText="Width"
            required={true}
            type="number"
            placeholder="Enter width"
            id="width"
            name="width"
            steps="0.01"
            errors={state.errors?.width}
          />

          <InputFormText
            labelText="Linear Size"
            required={true}
            type="number"
            placeholder="Enter linear size"
            id="linear_size"
            name="linear_size"
            steps="0.01"
            errors={state.errors?.linear_size}
          />
        </div>
      </div>

      {/* Form Actions */}
      <div className="flex flex-col sm:flex-row gap-4 justify-end pt-6 border-t border-slate-600">
        {state.errorMessage && (
          <p className="mt-2 text-sm text-red-500">{state.errorMessage}</p>
        )}
        <Link
          href={isPending ? "#" : "/products"}
          aria-disabled={isPending}
          tabIndex={isPending ? -1 : 0}
          className={`px-6 py-3 bg-slate-600 text-slate-200 border border-slate-500 rounded-md transition-colors font-medium
          ${
            isPending
              ? "opacity-50 pointer-events-none cursor-not-allowed"
              : "hover:bg-slate-500"
          }
        `}
        >
          Cancel
        </Link>

        <FormSendButton
          text="Create Product"
          loadingText="Creating..."
          isPending={isPending}
        />
      </div>
    </form>
  );
}
