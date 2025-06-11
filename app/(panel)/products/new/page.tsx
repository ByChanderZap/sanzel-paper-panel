import { NewProductForm } from "@/components/forms/new-product";
import { FormHeader } from "@/components/form-parts/form-header";
import { FormContainer } from "@/components/form-parts/form-container";

export default function CreateNewProductPage() {
  return (
    <div className="p-8 max-w-6xl mx-auto">
      <FormHeader
        title="Create New Product"
        targetPrevPage="products"
        previousPage="Products"
        currentPageTitle="Create New Product"
      />

      {/* Form Container */}

      <FormContainer>
        <NewProductForm />
      </FormContainer>
    </div>
  );
}
