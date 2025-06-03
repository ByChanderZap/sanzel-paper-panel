// import { OrderSummary } from "../types/dashboard";
import { TempOrderType } from "../types/orders";

export default function MobileCard({ order }: { order: TempOrderType }) {
  return (
    <div className="bg-secondary rounded-2xl p-4 hover:bg-gray-700/20 transition-colors">
      <div className="flex justify-between items-start mb-3">
        <div>
          <div className="text-sm text-custom-gray">Order #{order.id}</div>
          <div className="font-medium text-lg">{order.client}</div>
        </div>
        <span className="px-3 py-1 rounded-full text-sm font-medium bg-primary">
          {order.status}
        </span>
      </div>

      <div className="flex justify-between items-center">
        <div className="text-custom-gray text-sm">{order.date}</div>
        <div className="font-medium text-lg">${order.total.toFixed(2)}</div>
      </div>
    </div>
  );
}
