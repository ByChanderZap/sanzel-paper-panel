import { getTotalOrders } from "@/lib/orders/orders";
import { getTotalClients } from "@/lib/clients/clients";
import { getTotalProducts } from "@/lib/products/products";

export const getStats = async (): Promise<
  {
    title: string;
    value: number;
  }[]
> => {
  const stats = [];

  // not a big fan of this but it works i guess
  try {
    stats.push({ title: "Total Orders", value: await getTotalOrders() });
  } catch (error) {
    console.error("Something went wrong while fetching total orders", error);
    stats.push({ title: "Total Orders", value: 0 });
  }
  try {
    stats.push({ title: "Total Clients", value: await getTotalClients() });
  } catch (error) {
    console.error("Something went wrong while fetching total clients", error);
    stats.push({ title: "Total Clients", value: 0 });
  }
  try {
    stats.push({ title: "Total Orders", value: await getTotalProducts() });
  } catch (error) {
    console.error("Something went wrong while fetching total products", error);
    stats.push({
      title: "Total Products",
      value: 0,
    });
  }
  return stats;
};
