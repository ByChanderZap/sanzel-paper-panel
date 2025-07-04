import {
  getCurrentMonthRevenue,
  getMonthlyRevenue,
  getMonthlySales,
} from "@/lib/reports/charts";
import { MonthlyLineChartRevenew } from "./monthly-line-chart-revenew";
import { ChartCard } from "./chart-card";
import { ChartTitle } from "./chart-title";
import { ChartSummary } from "./chart-summary";
import { KPICards } from "./kpi-cards";

export async function ChartsSection() {
  const monthlySales = await getMonthlySales();
  const monthlyRevenue = await getMonthlyRevenue();
  const totalOrders = await getCurrentMonthRevenue();
  return (
    <section className="mb-8">
      <h2 className="text-xl font-semibold text-white mb-6">Reports</h2>
      {/* KPI cards */}
      <KPICards
        data={{
          totalRevenue: monthlyRevenue || 0,
          totalOrders: totalOrders || 0,
        }}
      />

      {/* Single Chart Card */}
      <ChartCard>
        <div className="mb-6">
          <ChartTitle title="Sales Trend" />
          <ChartSummary
            mainText={`$ ${monthlySales
              .reduce((sum, item) => sum + item.revenue, 0)
              .toLocaleString()}`}
            subText="Total Revenue of the last 12 months"
          />
        </div>

        {/* Chart Container */}
        <div className="h-80 w-full">
          <MonthlyLineChartRevenew data={monthlySales} />
        </div>
      </ChartCard>
    </section>
  );
}
