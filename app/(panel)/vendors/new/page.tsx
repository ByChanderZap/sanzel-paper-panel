import { NewVendorForm } from "@/components/forms/new-vendor";

export default function NewVendorPage() {
  return (
    <div className="max-w-xl mx-auto py-8">
      <h1 className="text-2xl font-bold text-white mb-6">Create New Vendor</h1>
      <NewVendorForm />
    </div>
  );
}
