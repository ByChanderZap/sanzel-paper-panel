import { OrderSummary, ORDER_STATUS } from "@/types/dashboard";

export default function DashboardPage() {
  const stats = [
    { title: "Total Orders", value: 1234 },
    { title: "Total Clients", value: 3333 },
    { title: "Total Products", value: 500 },
  ];

  const recentOrders: OrderSummary[] = [
    {
      id: "1",
      client: "John Doe",
      total: 100.0,
      date: "2023-10-01",
      status: ORDER_STATUS.IN_PROCESS,
    },
    {
      id: "2",
      client: "Jane Smith",
      total: 200.0,
      date: "2023-10-02",
      status: ORDER_STATUS.COMPLETED,
    },
    {
      id: "3",
      client: "Alice Johnson",
      total: 150.0,
      date: "2023-10-03",
      status: ORDER_STATUS.COMPLETED,
    },
  ];

  return (
    <>
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Dashboard</h1>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div key={index} className="bg-secondary rounded-3xl p-6 shadow-md">
            <h3 className="text-custom-gray text-sm font-medium mb-2">
              {stat.title}
            </h3>
            <p className="text-3xl font-bold">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Recent Orders */}
      <div className="bg-primary rounded-3xl p-6">
        <h2 className="text-xl font-semibold mb-6">Recent Orders</h2>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="text-left py-3 px-4 font-medium text-gray-400">
                  Order ID
                </th>
                <th className="text-left py-3 px-4 font-medium text-gray-400">
                  Client
                </th>
                <th className="text-left py-3 px-4 font-medium text-gray-400">
                  Total
                </th>
                <th className="text-left py-3 px-4 font-medium text-gray-400">
                  Date
                </th>
                <th className="text-left py-3 px-4 font-medium text-gray-400">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.map((order, index) => (
                <tr
                  key={index}
                  className="border-b border-gray-700 hover:bg-gray-700/50 transition-colors"
                >
                  <td className="py-4 px-4 font-medium">{order.id}</td>
                  <td className="py-4 px-4 text-custom-gray">{order.client}</td>
                  <td className="py-4 px-4 text-custom-gray">{order.date}</td>
                  <td className="py-4 px-4">
                    <span className="px-3 py-1 rounded-full bg-secondary text-sm font-medium">
                      {order.status}
                    </span>
                  </td>
                  <td className="py-4 px-4 font-medium">
                    ${order.total.toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
