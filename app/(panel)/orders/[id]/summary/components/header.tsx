import { Calendar } from "lucide-react";

export function OrderSummaryHeader({
  id,
  createdAt,
}: {
  id?: string;
  createdAt?: string;
}) {
  return (
    <div className="mb-8">
      <h1 className="text-3xl font-bold mb-2">Order {id}</h1>
      <div className="flex items-center text-gray-400">
        <Calendar className="h-4 w-4 mr-2" />
        <span>Placed on {createdAt}</span>
      </div>
    </div>
  );
}
