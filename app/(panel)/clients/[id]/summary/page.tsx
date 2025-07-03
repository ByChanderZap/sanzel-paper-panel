import { Edit2, Save, X } from "lucide-react";
import Link from "next/link.js";
import { notFound } from "next/navigation.js";

export default async function ClientSummaryPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ edit?: string }>;
}) {
  const { id } = await params;
  const { edit } = await searchParams;

  const isEditing = edit === "true";

  // Mock data - replace with your actual fetch
  const clientData = {
    name: "Sophia Carter",
    clientId: id,
    joinedDate: "2 years ago",
    email: "sophia.carter@email.com",
    phone: "(555) 123-4567",
    address: "123 Main Street, Anytown, USA",
    shippingAddress: "456 Oak Avenue, Anytown, USA",
    preferredCarrier: "UPS",
  };

  const orderHistory = [
    { id: "#1001", date: "2023-01-15", status: "Completed", total: "$250.00" },
    { id: "#1002", date: "2023-02-20", status: "Shipped", total: "$180.00" },
    { id: "#1003", date: "2023-03-10", status: "Processing", total: "$320.00" },
  ];

  const getInitials = (name) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "completed":
        return "bg-green-600";
      case "shipped":
        return "bg-blue-600";
      case "processing":
        return "bg-yellow-600";
      default:
        return "bg-gray-600";
    }
  };

  return (
    <div className="min-h-screen rounded-4xl text-white p-4 sm:p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-2 mb-6 text-gray-400 text-sm">
          <span>Clients</span>
          <span>/</span>
          <span>Client Details</span>
        </div>

        {/* Title and Edit Button */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold mb-2">
              Client Details
            </h1>
            <p className="text-gray-400 text-sm sm:text-base">
              View and manage client information
            </p>
          </div>
          <div className="flex gap-2 flex-shrink-0">
            {isEditing ? (
              <>
                <button
                  type="submit"
                  form="client-form"
                  className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg transition-colors text-sm sm:text-base"
                >
                  <Save size={16} />
                  <span className="hidden sm:inline">Save</span>
                </button>
                <a
                  href={`/clients/${id}/summary`}
                  className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-gray-600 hover:bg-gray-700 rounded-lg transition-colors text-sm sm:text-base"
                >
                  <X size={16} />
                  <span className="hidden sm:inline">Cancel</span>
                </a>
              </>
            ) : (
              <Link
                href={`/clients/${id}/summary?edit=true`}
                className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors text-sm sm:text-base"
              >
                <Edit2 size={16} />
                <span className="hidden sm:inline">Edit</span>
              </Link>
            )}
          </div>
        </div>

        <form id="client-form" action={"" /* Your server action here */}>
          <input type="hidden" name="clientId" value={id} />

          {/* Client Profile Section */}
          <div className="bg-gray-800 rounded-lg p-4 sm:p-6 mb-6 sm:mb-8">
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-blue-600 rounded-full flex items-center justify-center text-xl sm:text-2xl font-bold mx-auto sm:mx-0">
                {getInitials(clientData.name)}
              </div>
              <div className="text-center sm:text-left">
                {isEditing ? (
                  <input
                    type="text"
                    name="name"
                    defaultValue={clientData.name}
                    className="text-xl sm:text-2xl font-bold bg-gray-700 border border-gray-600 rounded px-3 py-1 mb-2 w-full max-w-xs"
                    required
                  />
                ) : (
                  <h2 className="text-xl sm:text-2xl font-bold mb-1">
                    {clientData.name}
                  </h2>
                )}
                <p className="text-gray-400 text-sm">
                  Client ID: {clientData.clientId}
                </p>
                <p className="text-gray-400 text-sm">
                  Joined {clientData.joinedDate}
                </p>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="bg-gray-800 rounded-lg p-4 sm:p-6 mb-6 sm:mb-8">
            <h3 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6">
              Contact Information
            </h3>
            <div className="space-y-4">
              {/* Email */}
              <div className="flex flex-col sm:grid sm:grid-cols-3 gap-2 sm:gap-4 py-3 border-b border-gray-700">
                <span className="text-gray-400 font-medium text-sm sm:text-base">
                  Email
                </span>
                {isEditing ? (
                  <input
                    type="email"
                    name="email"
                    defaultValue={clientData.email}
                    className="sm:col-span-2 bg-gray-700 border border-gray-600 rounded px-3 py-2 text-sm sm:text-base w-full"
                    required
                  />
                ) : (
                  <span className="sm:col-span-2 text-sm sm:text-base break-all">
                    {clientData.email}
                  </span>
                )}
              </div>

              {/* Phone */}
              <div className="flex flex-col sm:grid sm:grid-cols-3 gap-2 sm:gap-4 py-3 border-b border-gray-700">
                <span className="text-gray-400 font-medium text-sm sm:text-base">
                  Phone
                </span>
                {isEditing ? (
                  <input
                    type="tel"
                    name="phone"
                    defaultValue={clientData.phone}
                    className="sm:col-span-2 bg-gray-700 border border-gray-600 rounded px-3 py-2 text-sm sm:text-base w-full"
                  />
                ) : (
                  <span className="sm:col-span-2 text-sm sm:text-base">
                    {clientData.phone}
                  </span>
                )}
              </div>

              {/* Address */}
              <div className="flex flex-col sm:grid sm:grid-cols-3 gap-2 sm:gap-4 py-3">
                <span className="text-gray-400 font-medium text-sm sm:text-base">
                  Address
                </span>
                {isEditing ? (
                  <textarea
                    name="address"
                    defaultValue={clientData.address}
                    className="sm:col-span-2 bg-gray-700 border border-gray-600 rounded px-3 py-2 resize-none text-sm sm:text-base w-full"
                    rows={3}
                  />
                ) : (
                  <span className="sm:col-span-2 text-sm sm:text-base">
                    {clientData.address}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Shipping Details */}
          <div className="bg-gray-800 rounded-lg p-4 sm:p-6 mb-6 sm:mb-8">
            <h3 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6">
              Shipping Details
            </h3>
            <div className="space-y-4">
              {/* Shipping Address */}
              <div className="flex flex-col sm:grid sm:grid-cols-3 gap-2 sm:gap-4 py-3 border-b border-gray-700">
                <span className="text-gray-400 font-medium text-sm sm:text-base">
                  Shipping Address
                </span>
                {isEditing ? (
                  <textarea
                    name="shippingAddress"
                    defaultValue={clientData.shippingAddress}
                    className="sm:col-span-2 bg-gray-700 border border-gray-600 rounded px-3 py-2 resize-none text-sm sm:text-base w-full"
                    rows={3}
                  />
                ) : (
                  <span className="sm:col-span-2 text-sm sm:text-base">
                    {clientData.shippingAddress}
                  </span>
                )}
              </div>

              {/* Preferred Carrier */}
              <div className="flex flex-col sm:grid sm:grid-cols-3 gap-2 sm:gap-4 py-3">
                <span className="text-gray-400 font-medium text-sm sm:text-base">
                  Preferred Carrier
                </span>
                {isEditing ? (
                  <select
                    name="preferredCarrier"
                    defaultValue={clientData.preferredCarrier}
                    className="sm:col-span-2 bg-gray-700 border border-gray-600 rounded px-3 py-2 text-sm sm:text-base w-full"
                  >
                    <option value="UPS">UPS</option>
                    <option value="FedEx">FedEx</option>
                    <option value="USPS">USPS</option>
                    <option value="DHL">DHL</option>
                  </select>
                ) : (
                  <span className="sm:col-span-2 text-sm sm:text-base">
                    {clientData.preferredCarrier}
                  </span>
                )}
              </div>
            </div>
          </div>
        </form>

        {/* Order History */}
        <div className="bg-gray-800 rounded-lg p-4 sm:p-6">
          <h3 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6">
            Order History
          </h3>

          {/* Mobile: Card Layout */}
          <div className="block sm:hidden space-y-4">
            {orderHistory.map((order) => (
              <div key={order.id} className="bg-gray-700 rounded-lg p-4">
                <div className="flex justify-between items-start mb-2">
                  <span className="font-medium text-sm">{order.id}</span>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                      order.status
                    )}`}
                  >
                    {order.status}
                  </span>
                </div>
                <div className="text-gray-300 text-sm mb-1">{order.date}</div>
                <div className="font-medium text-sm">{order.total}</div>
              </div>
            ))}
          </div>

          {/* Desktop: Table Layout */}
          <div className="hidden sm:block overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="text-left py-3 text-gray-400 font-medium">
                    Order ID
                  </th>
                  <th className="text-left py-3 text-gray-400 font-medium">
                    Date
                  </th>
                  <th className="text-left py-3 text-gray-400 font-medium">
                    Status
                  </th>
                  <th className="text-left py-3 text-gray-400 font-medium">
                    Total
                  </th>
                </tr>
              </thead>
              <tbody>
                {orderHistory.map((order) => (
                  <tr
                    key={order.id}
                    className="border-b border-gray-700 last:border-b-0"
                  >
                    <td className="py-4 font-medium">{order.id}</td>
                    <td className="py-4 text-gray-300">{order.date}</td>
                    <td className="py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                          order.status
                        )}`}
                      >
                        {order.status}
                      </span>
                    </td>
                    <td className="py-4 font-medium">{order.total}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
