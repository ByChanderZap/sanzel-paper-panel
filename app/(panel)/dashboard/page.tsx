import { CustomTable } from "@/components/custom-table/table";
import { TableHeader } from "@/components/custom-table/table-header";
import { TableBody } from "@/components/custom-table/table-body";
import { TableRow } from "@/components/custom-table/table-row";
import { TableRowContent } from "@/components/custom-table/table-row-content";
import MobileCard from "@/components/mobile-card";
import MobileCardLayout from "@/components/mobile-card-layout";
import { getOrdersSummary } from "@/lib/orders/orders";

export default async function DashboardPage() {
  const stats = [
    { title: "Total Orders", value: 1234 },
    { title: "Total Clients", value: 3333 },
    { title: "Total Products", value: 500 },
  ];

  const colNames = ["Order ID", "Client", "Date", "Status", "Total"];

  const recentOrders = await getOrdersSummary();

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
          <TableHeader colNames={colNames} />
          <TableBody>
            {recentOrders.map((order) => (
              <TableRow key={order.id} colCount={colNames.length}>
                <TableRowContent content={order.id} className="font-medium" />
                <TableRowContent
                  content={order.client.name}
                  className="text-custom-gray"
                />
                <TableRowContent
                  content={order.createdAt.toDateString()}
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
                  content={order.price}
                  className="font-medium text-lg"
                />
              </TableRow>
            ))}
          </TableBody>
        </CustomTable>

        {/* Mobile Card Layout - Hidden on desktop */}
        <MobileCardLayout>
          {recentOrders.map((order) => (
            <MobileCard order={order} key={order.id} />
          ))}

          {recentOrders.length === 0 && (
            <div className="text-center py-8 text-gray-400">
              No recent orders found.
            </div>
          )}
        </MobileCardLayout>
      </div>
    </>
  );
}
