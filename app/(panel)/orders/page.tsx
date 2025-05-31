import { Plus } from "lucide-react";
import Link from "next/link";

export default function OrdersPage() {
  const orders = [
    {
      id: "1",
      client: "john doe",
      date: "2023-10-01",
      total: 1000,
      status: "delivered",
      // material_name: "material A",
      // quantity: 10,
      // coil_height: 11.5,
      // coil_length: 1500,
      // square_meters: 20.7,
    },
    {
      id: "2",
      client: "john doe",
      date: "2023-10-01",
      total: 2000,
      status: "delivered",
    },
    {
      id: "3",
      client: "john doe",
      date: "2023-10-01",
      total: 3000,
      status: "delivered",
    },
    {
      id: "4",
      client: "john doe",
      date: "2023-10-01",
      total: 4000,
      status: "delivered",
    },
    {
      id: "41",
      client: "john doe",
      date: "2023-10-01",
      total: 4000,
      status: "delivered",
    },
    {
      id: "5",
      client: "john doe",
      date: "2023-10-01",
      total: 4000,
      status: "delivered",
    },
    {
      id: "6",
      client: "john doe",
      date: "2023-10-01",
      total: 4000,
      status: "delivered",
    },
    {
      id: "7",
      client: "john doe",
      date: "2023-10-01",
      total: 4000,
      status: "delivered",
    },
    {
      id: "8",
      client: "john doe",
      date: "2023-10-01",
      total: 4000,
      status: "delivered",
    },
  ];

  return (
    <>
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Orders</h1>
        <Link
          href="/orders/new"
          className="bg-secondary hover:bg-secondary/80 px-6 py-2 rounded-full font-medium transition-colors"
        >
          <Plus size={24} />
        </Link>
      </div>

      {/* Search Bar */}
      <div className="mb-6">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <svg
              className="h-5 w-5 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
          <input
            type="text"
            placeholder="Search orders"
            className="w-full bg-secondary border-0 rounded-2xl py-3 pl-12 pr-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Desktop Table - Hidden on mobile */}
      <div className="hidden md:block bg-primary rounded-3xl p-6">
        <div className="overflow-x-auto">
          {/* Table Header */}
          <div className="grid grid-cols-5 gap-4 border-b border-gray-700 pb-3 mb-4">
            <div className="text-left font-medium text-custom-gray">
              Order Id
            </div>
            <div className="text-left font-medium text-custom-gray">Client</div>
            <div className="text-left font-medium text-custom-gray">Date</div>
            <div className="text-left font-medium text-custom-gray">Status</div>
            <div className="text-left font-medium text-custom-gray">Total</div>
          </div>

          {/* Table Body */}
          <div className="space-y-0">
            {orders.map((order) => (
              <Link
                key={order.id}
                href={`/orders/${order.id}/summary`}
                className="block"
              >
                <div className="grid grid-cols-5 gap-4 py-4 border-b border-gray-700 hover:bg-gray-700/50 transition-colors cursor-pointer">
                  <div className="font-medium">{order.id}</div>
                  <div className="text-custom-gray">{order.client}</div>
                  <div className="text-custom-gray">{order.date}</div>
                  <div>
                    <span className="px-3 py-1 rounded-full text-sm font-medium bg-secondary">
                      {order.status}
                    </span>
                  </div>
                  <div className="font-medium">${order.total.toFixed(2)}</div>
                </div>
              </Link>
            ))}
          </div>

          {orders.length === 0 && (
            <div className="text-center py-8 text-gray-400">
              No orders found matching your search.
            </div>
          )}
        </div>
      </div>

      {/* Mobile Card Layout - Hidden on desktop */}
      <div className="md:hidden space-y-4">
        {orders.map((order) => (
          <Link
            key={order.id}
            href={`/orders/${order.id}/summary`}
            className="block"
          >
            <div className="bg-primary rounded-2xl p-4 hover:bg-gray-700/20 transition-colors">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <div className="text-sm text-custom-gray">
                    Order #{order.id}
                  </div>
                  <div className="font-medium text-lg">{order.client}</div>
                </div>
                <span className="px-3 py-1 rounded-full text-sm font-medium bg-secondary">
                  {order.status}
                </span>
              </div>

              <div className="flex justify-between items-center">
                <div className="text-custom-gray text-sm">{order.date}</div>
                <div className="font-medium text-lg">
                  ${order.total.toFixed(2)}
                </div>
              </div>
            </div>
          </Link>
        ))}

        {orders.length === 0 && (
          <div className="bg-primary rounded-2xl p-8 text-center text-gray-400">
            No orders found matching your search.
          </div>
        )}
      </div>
    </>
  );
}
