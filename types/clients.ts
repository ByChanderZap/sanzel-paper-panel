import { Clients } from "@prisma/client";

export type ClientsTableProprs = {
  query: string;
  currentPage?: number;
}

export enum ClientStatus {
  ACTIVE = "Active",
  INACTIVE = "Inactive"
}

export type ClientWithStats = Clients & {
  totalOrders: number;
  totalSpent: number;
  lastOrder: Date | null;
};

export interface ClientsFormState {
  errorMessage?: string | null;
  success?: string | null;
  errors?: {
    name?: string[];
    email?: string[];
    phone?: string[];
    shippingNumber?: string[];
    address?: string[];
    city?: string[];
    state?: string[];
  };
}
