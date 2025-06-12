import { OrderItems, Products } from "@prisma/client";

export type OrdersTableProps = {
  query: string;
  currentPage?: number;
};

export type TempOrderType = {
  id: string;
  client: string;
  date: string;
  total: number;
  status: "delivered" | "pending" | "cancelled";
  // material_name?: string;
  // quantity?: number;
  // coil_height?: number;
  // coil_length?: number;
  // square_meters?: number;
}

export type OrderItemsWithProdsInfo = OrderItems & Partial<Products>
