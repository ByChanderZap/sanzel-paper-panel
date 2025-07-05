import { Mail, MapPin, Phone, User } from "lucide-react";
import { DetailedOrder } from "@/types/orders";
import { Details } from "./details";
import { VendorTab } from "./vendor-tab";

export function LeftOrderSummaryColumn({
  orderData,
}: {
  orderData: DetailedOrder | null;
}) {
  return (
    <div className="lg:col-span-2 space-y-8">
      {/* Client Information */}
      <div className="bg-gray-800 rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-6 flex items-center">
          <User className="h-5 w-5 mr-2" />
          Client Information
        </h2>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">
                Client Name
              </label>
              <p className="text-white font-medium">{orderData?.client.name}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">
                Email
              </label>
              <div className="flex items-center">
                <Mail className="h-4 w-4 mr-2 text-gray-400" />
                <p className="text-white">{orderData?.client.email}</p>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">
                Phone
              </label>
              <div className="flex items-center">
                <Phone className="h-4 w-4 mr-2 text-gray-400" />
                <p className="text-white">{orderData?.client.phone}</p>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">
                Address
              </label>
              <div className="flex items-center">
                <MapPin className="h-4 w-4 mr-2 text-gray-400" />
                <p className="text-white">{orderData?.client.address}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Order Details */}
      <Details
        orderItems={orderData?.orderItems}
        orderTotal={orderData?.price}
      />

      {/* Vendor Information */}
      <VendorTab vendor={orderData?.vendor} />
    </div>
  );
}
