import { DollarSign, ShoppingCart } from "lucide-react";

interface KPIData {
  totalRevenue: number;
  totalOrders: number;
}

interface KPICardsProps {
  data: KPIData;
}

export function KPICards({ data }: KPICardsProps) {
  const { totalRevenue, totalOrders } = data;

  const kpiItems = [
    {
      title: "Monthly Sales",
      value: `$${totalRevenue.toLocaleString()}`,
      icon: DollarSign,
      color: "text-green-400",
      bgColor: "bg-green-400/10",
    },
    {
      title: "Total Orders",
      value: totalOrders.toLocaleString(),
      icon: ShoppingCart,
      color: "text-blue-400",
      bgColor: "bg-blue-400/10",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      {kpiItems.map((item, index) => {
        const Icon = item.icon;
        return (
          <div
            key={index}
            className="bg-gray-800 border border-gray-700 rounded-lg p-6 hover:border-gray-600 transition-colors"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-400 mb-1">
                  {item.title}
                </p>
                <p className="text-2xl font-bold text-white">{item.value}</p>
              </div>
              <div className={`${item.bgColor} p-3 rounded-lg`}>
                <Icon className={`w-6 h-6 ${item.color}`} />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
