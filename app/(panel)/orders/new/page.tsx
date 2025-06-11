import { FormHeader } from "@/components/form-parts/form-header";
import { FormContainer } from "@/components/form-parts/form-container";
import { NewOrderForm } from "@/components/forms/new-order";

export default function CreateNewOrderPage() {
  return (
    <div className="p-8 max-w-6xl mx-auto">
      <FormHeader
        title="Create New Order"
        targetPrevPage="orders"
        previousPage="Orders"
        currentPageTitle="Create New Order"
      />

      {/* Form Container */}

      <FormContainer>
        <NewOrderForm />
      </FormContainer>
    </div>
  );
}
