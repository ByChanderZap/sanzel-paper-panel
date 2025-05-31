export enum ORDER_STATUS {
  IN_PROCESS = "In Process",
  COMPLETED = "Completed",
}

export type OrderSummary = {
  id: string;
  client: string;
  total: number;
  date: string;
  status: ORDER_STATUS
}
