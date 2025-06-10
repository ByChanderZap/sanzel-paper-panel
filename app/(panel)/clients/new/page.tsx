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
        {/* Messages */}
        {/* {message.text && (
          <div className={`p-4 rounded-md mb-6 ${
            message.type === 'success' 
              ? 'bg-green-800 border border-green-600 text-green-100'
              : 'bg-red-800 border border-red-600 text-red-100'
          }`}>
            {message.text}
          </div>
        )} */}

        <NewClientForm />
      </FormContainer>
    </div>
  );
}
