import { User, Phone } from "lucide-react";
import { Vendor } from "@prisma/client";

export function VendorTab({ vendor }: { vendor: Vendor | null | undefined }) {
  return (
    <div className="bg-gray-800 rounded-lg p-6 mt-8">
      <h2 className="text-xl font-semibold mb-6 flex items-center">
        <User className="h-5 w-5 mr-2" />
        Vendor Information
      </h2>
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">
              Vendor Name
            </label>
            <p className="text-white font-medium">{vendor?.name}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">
              Phone
            </label>
            <div className="flex items-center">
              <Phone className="h-4 w-4 mr-2 text-gray-400" />
              <p className="text-white">{vendor?.phone}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
