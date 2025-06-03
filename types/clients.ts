export type ClientsTableProprs = {
  query: string;
  currentPage?: number;
}

export enum ClientStatus {
  ACTIVE = "Active",
  INACTIVE = "Inactive"
}

export type ClientPreview = {
  id: string;
  client: string;
  email: string;
  orders: number;
  totalSpent: number;
  status: ClientStatus;
  lastOrder: string;
}
