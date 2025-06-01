import { OrderSummary, ORDER_STATUS } from "@/types/dashboard";
import { CustomTable } from "@/components/table";
import { TableHeader } from "@/components/table-header";
import { TableBody } from "@/components/table-body";
import { TableRow } from "@/components/table-row";
import { TableRowContent } from "@/components/table-row-content";

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
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 mb-8">
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
      <div className="bg-primary rounded-3xl p-0 md:p-0">
        <h2 className="text-xl font-semibold mb-6">Recent Orders</h2>

        {/* Desktop Table - Hidden on mobile */}
        <CustomTable>
          <TableHeader
            colNames={["Order ID", "Client", "Date", "Status", "Total"]}
          />
          <TableBody>
            {recentOrders.map((order) => (
              <TableRow key={order.id}>
                <TableRowContent content={order.id} className="font-medium" />
                <TableRowContent
                  content={order.client}
                  className="text-custom-gray"
                />
                <TableRowContent
                  content={order.date}
                  className="text-custom-gray"
                />
                <TableRowContent
                  content={
                    <span className="px-3 py-1 rounded-full text-sm font-medium bg-secondary">
                      {order.status}
                    </span>
                  }
                />
                <TableRowContent
                  content={order.total}
                  className="font-medium text-lg"
                />
              </TableRow>
            ))}
          </TableBody>
        </CustomTable>

        {/* Mobile Card Layout - Hidden on desktop */}
        <div className="md:hidden space-y-4">
          {recentOrders.map((order, index) => (
            <div
              key={index}
              className="bg-secondary rounded-2xl p-4 hover:bg-gray-700/20 transition-colors"
            >
              <div className="flex justify-between items-start mb-3">
                <div>
                  <div className="text-sm text-custom-gray">
                    Order #{order.id}
                  </div>
                  <div className="font-medium text-lg">{order.client}</div>
                </div>
                <span className="px-3 py-1 rounded-full text-sm font-medium bg-primary">
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
          ))}

          {recentOrders.length === 0 && (
            <div className="text-center py-8 text-gray-400">
              No recent orders found.
            </div>
          )}
        </div>
      </div>
    </>
  );
}
