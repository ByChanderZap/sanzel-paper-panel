import { OrderStatus } from "@prisma/client";

export const getStatusColor = (status: OrderStatus) => {
  switch (status) {
    case OrderStatus.PENDING:
      return "bg-yellow-600";
    case OrderStatus.CONFIRMED:
      return "bg-green-600";
    case OrderStatus.PROCESSING:
      return "bg-orange-500";
    case OrderStatus.SHIPPED:
      return "bg-blue-600";
    case OrderStatus.DELIVERED:
      return "bg-teal-600";
    case OrderStatus.CANCELLED:
      return "bg-gray-500";
    case OrderStatus.PAID:
      return "bg-green-700";
    case OrderStatus.NOT_PAID:
      return "bg-red-600";
    default:
      return "bg-gray-600";
  }
};

export function formatMexicanPhone(phone: string) {
  const cleaned = phone.replace(/\D/g, '');
  if (cleaned.length === 10) {
    return `${cleaned.slice(0,3)} ${cleaned.slice(3,6)} ${cleaned.slice(6)}`;
  }
  return phone;
}
