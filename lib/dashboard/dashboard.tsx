import { getTotalOrders } from "@/lib/orders/orders";
import { getTotalClients } from "@/lib/clients/clients";
import { getTotalProducts } from "@/lib/products/products";

export interface DashboardStat {
  title: string;
  value: number;
}

export const getStats = async (): Promise<DashboardStat[]> => {
  const [ordersResult, clientsResult, productsResult] =
    await Promise.allSettled([
      getTotalOrders(),
      getTotalClients(),
      getTotalProducts(),
    ]);

  const stats: DashboardStat[] = [
    {
      title: "Total Orders",
      value: ordersResult.status === "fulfilled" ? ordersResult.value : 0,
    },
    {
      title: "Total Clients",
      value: clientsResult.status === "fulfilled" ? clientsResult.value : 0,
    },
    {
      title: "Total Products",
      value: productsResult.status === "fulfilled" ? productsResult.value : 0,
    },
  ];

  // Log any errors that occurred
  if (ordersResult.status === "rejected") {
    console.error("Failed to fetch total orders:", ordersResult.reason);
  }
  if (clientsResult.status === "rejected") {
    console.error("Failed to fetch total clients:", clientsResult.reason);
  }
  if (productsResult.status === "rejected") {
    console.error("Failed to fetch total products:", productsResult.reason);
  }

  return stats;
};
