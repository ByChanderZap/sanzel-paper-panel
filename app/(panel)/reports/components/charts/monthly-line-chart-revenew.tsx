"use client";
import { MonthlyRevenueData } from "@/lib/reports/charts";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export function MonthlyLineChartRevenew({
  data,
}: {
  data: MonthlyRevenueData[];
}) {
  if (!data || data.length === 0) {
    return (
      <div className="h-full w-full flex items-center justify-center">
        <div className="text-center">
          <div className="text-gray-400 text-lg mb-2">No data available</div>
          <div className="text-gray-500 text-sm">
            Generate a report to see the visualization
          </div>
        </div>
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        data={data}
        margin={{ top: 20, right: 40, left: 40, bottom: 20 }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.3} />
        <XAxis
          dataKey="month"
          stroke="#9CA3AF"
          fontSize={12}
          tick={{ fill: "#9CA3AF" }}
          axisLine={{ stroke: "#4B5563" }}
          tickLine={{ stroke: "#4B5563" }}
        />
        <YAxis
          stroke="#9CA3AF"
          fontSize={12}
          tick={{ fill: "#9CA3AF" }}
          axisLine={{ stroke: "#4B5563" }}
          tickLine={{ stroke: "#4B5563" }}
          tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: "#1F2937",
            border: "1px solid #374151",
            borderRadius: "8px",
            color: "#F9FAFB",
            boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
          }}
          formatter={(value: number) => [
            `$${value.toLocaleString()}`,
            "Revenue",
          ]}
          labelStyle={{ color: "#F9FAFB" }}
          cursor={{ stroke: "#EAB308", strokeWidth: 1, strokeDasharray: "3 3" }}
        />
        <Line
          type="monotone"
          dataKey="revenue"
          stroke="#EAB308"
          strokeWidth={3}
          dot={{ fill: "#EAB308", strokeWidth: 2, r: 5 }}
          activeDot={{
            r: 7,
            fill: "#EAB308",
            strokeWidth: 2,
            stroke: "#1F2937",
          }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
