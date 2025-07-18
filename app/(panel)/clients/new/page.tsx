import { FormHeader } from "@/components/form-parts/form-header";
import { FormContainer } from "@/components/form-parts/form-container";
import { NewClientForm } from "@/components/forms/new-client";

export default function NewClientPage() {
  return (
    <div className="p-8 max-w-6xl mx-auto">
      <FormHeader
        title="Create New Client"
        targetPrevPage="clients"
        previousPage="Clients"
        currentPageTitle="Create New Client"
      />

      {/* Form Container */}
      <FormContainer>
        <NewClientForm />
      </FormContainer>
    </div>
  );
}
