import { $Enums, OrderStatus } from "@prisma/client";

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

export type OrderItems = {
  id: string;
  orderId: string;
  productId: string;
  quantity: number;
  unit_price: number;
  width: number;
  linear_size: number;
  createdAt: Date;
  updatedAt: Date;
}

export type Products = {
  name: string;
  id: string;
  unit_price: number;
  width: number;
  linear_size: number;
  createdAt: Date;
  updatedAt: Date;
  description: string | null;
  quality: $Enums.PaperQuality;
  stock: number;
  deletedAt: Date | null;
}

// For displaying order items with product information
export type OrderItemsWithProdsInfo = {
  id: string;
  productId: string;
  name: string; // from Products
  quantity: number;
  unit_price: number;
  width: number;
  linear_size: number;
  // Optional fields from OrderItems that we don't need during creation
  orderId?: string;
  createdAt?: Date;
  updatedAt?: Date;
  // Optional additional product info if needed
  description?: string | null;
  quality?: $Enums.PaperQuality;
  stock?: number;
  itemTotal?: number;
}

export interface OrderFormState {
  message?: string | null;
  success?: boolean | null;
  errors?: {
    client?: string[];
    status?: string[];
    orderItems?: string[];
    orderTotal?: string[];
  };
}

export interface CreateOrderData {
  clientId: string
  orderTotal: number
  status: OrderStatus
  orderItems: CreateOrderItemData[]
}

export interface CreateOrderItemData {
  productId: string
  quantity: number
  unit_price: number // This should be in cents/integer format
  item_total: number
  width: number
  linear_size: number
}
