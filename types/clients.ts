import { Clients, Prisma } from "@prisma/client";

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

export interface UpdateClientFormState {
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
  values?: {
    name?: string;
    email?: string;
    phone?: string;
    shippingNumber?: string;
    address?: string;
    city?: string;
    state?: string;
  };
}

// type ClientWithOrders = Prisma.clientsGetPayload<{
//   include: {
//     orders: {
//       select: {
//         id: true;
//         price: true;
//         createdAt: true;
//         status: true;
//       };
//     };
//   };
// }>;

export type ClientsWithOrders = Prisma.ClientsGetPayload<{
    include: {
    orders: {
      select: {
        id: true;
        price: true;
        createdAt: true;
        status: true;
      };
    };
  };
}>
